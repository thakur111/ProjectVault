import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { projectsData } from './projectsData.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Google Gen AI client if API key is provided
let aiClient = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    try {
        aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        console.log('Gemini AI Client initialized successfully.');
    } catch (err) {
        console.error('Failed to initialize Gemini AI Client:', err.message);
    }
} else {
    console.log('Gemini API key not configured. Smart AI query responses will be disabled.');
}

const SUPPORT_NUMBER = process.env.SUPPORT_NUMBER || '917026387931';
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes session timeout
const sessions = {};

// Load orders dynamically to reflect updates in real-time
function getOrderStatus(orderId) {
    try {
        const filePath = path.resolve('ordersDb.json');
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const orders = JSON.parse(fileContent);
        
        // Match case-insensitively and support partial or exact match
        const searchKey = orderId.trim().toUpperCase();
        if (orders[searchKey]) {
            return orders[searchKey];
        }
        
        // Also look for exact matches without 'PV-' prefix if entered
        const alternateKey = searchKey.startsWith('PV-') ? searchKey : `PV-${searchKey}`;
        if (orders[alternateKey]) {
            return orders[alternateKey];
        }
        
        return null;
    } catch (err) {
        console.error('Error reading ordersDb.json:', err.message);
        return null;
    }
}

// Generate Main Menu text
function getMainMenu() {
    return `🎓 *ProjectVault Support Bot* 🎓
Your virtual college project assistant.

How can we help you today? Please reply with a number (*1-4*):

1️⃣ *Search Projects* (Browse categories & details)
2️⃣ *Track Order Status* (Check your project delivery)
3️⃣ *Frequently Asked Questions* (FAQ)
4️⃣ *Talk to Support* (Human escalation)

_Type *menu* at any time to return to this screen._`;
}

// Generate FAQ Menu text
function getFaqMenu() {
    return `💬 *Frequently Asked Questions* 💬

Reply with the number of your query (*A-E*):

*A)* How will I receive the project files?
*B)* Can I request custom modifications to the project?
*C)* Will the project documentation pass plagiarism checks?
*D)* What is included in the "Full Academic Bundle"?
*E)* What is your refund policy?

_Type *menu* to return to the main menu._`;
}

// Handle AI Queries with Gemini
async function handleGeminiAI(userPrompt) {
    if (!aiClient) {
        return `🤖 *ProjectVault AI Assistant* is currently offline (API key not configured). Please contact support at wa.me/${SUPPORT_NUMBER} for assistance.`;
    }

    try {
        const systemInstruction = `You are ProjectVault's Virtual Support Assistant. 
ProjectVault is a premium platform for final year college engineering projects (IoT, AI/ML, Web, Android, Cybersecurity, Cloud, Blockchain).
Your goal is to help students with their technical or product queries politely, professionally, and concisely.

Product Details:
- We offer two packages: Basic Code License (₹999) and Full Academic Project Bundle (₹2,499).
- The Full Academic Bundle includes: Full source code, a comprehensive 80-100 page IEEE-formatted report, project presentation slides, step-by-step setup guides, and 1-on-1 installation support via Zoom/AnyDesk.
- Projects are delivered instantly or within 24-48 hours depending on custom changes requested.
- Support Hours: 10 AM to 8 PM IST. Support Phone: +${SUPPORT_NUMBER}.

Response Rules:
1. Be direct, friendly, and helpful.
2. Keep answers short (under 3-4 sentences/bullet points) so they are easy to read on WhatsApp.
3. Offer suggestions based on our catalog domains: IoT (ESP32/NodeMCU), AI/ML (Python/TensorFlow/OpenCV), Web (React/Node.js/PHP), Android (Flutter/Java), Cybersecurity (Encrypted chat/SQL Injection detection), Blockchain (Ethereum/Solidity), and Cloud (AWS/Serverless).
4. If they ask to buy or checkout, direct them to our website.`;

        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                maxOutputTokens: 250
            }
        });

        return `🤖 *AI Assistant*:\n\n${response.text.trim()}\n\n_(Type *menu* to see main options)_`;
    } catch (err) {
        console.error('Gemini API Error:', err.message);
        return `⚠️ Sorry, I encountered an issue while generating an AI response. Please try again or ask for support.`;
    }
}

// Process the message text based on user session state
export async function handleIncomingMessage(senderId, messageText) {
    const text = messageText.trim().toLowerCase();
    
    // Initialize or retrieve session
    if (!sessions[senderId]) {
        sessions[senderId] = { state: 'IDLE', lastActive: Date.now() };
    }
    
    const session = sessions[senderId];
    const now = Date.now();
    
    // Reset session if timed out
    if (now - session.lastActive > SESSION_TIMEOUT) {
        session.state = 'IDLE';
    }
    session.lastActive = now;
    
    // Global override to return to main menu
    if (text === 'menu' || text === 'hi' || text === 'hello' || text === 'hey' || text === 'start') {
        session.state = 'IDLE';
        return getMainMenu();
    }
    
    // Main State Machine
    switch (session.state) {
        case 'IDLE':
            if (text === '1' || text.includes('search') || text.includes('browse') || text.includes('project')) {
                session.state = 'SEARCH';
                return `🔍 *Project Catalog Search*
                
Please enter a *domain keyword* (e.g. \`IoT\`, \`AI\`, \`Web\`, \`Android\`, \`Security\`, \`Blockchain\`, \`Cloud\`) or type any keyword to search (e.g., \`agriculture\`, \`attendance\`, \`face\`).

_Type *menu* to go back._`;
            }
            
            if (text === '2' || text.includes('track') || text.includes('order') || text.includes('status')) {
                session.state = 'TRACK';
                return `📦 *Track Project Order*
                
Please reply with your *Order ID* (e.g. \`PV-128472\` or just the 6-digit number).

_Type *menu* to go back._`;
            }
            
            if (text === '3' || text.includes('faq') || text.includes('question')) {
                session.state = 'FAQ';
                return getFaqMenu();
            }
            
            if (text === '4' || text.includes('support') || text.includes('human') || text.includes('talk') || text.includes('call')) {
                return `📞 *Human Support Escalation*
                
You can reach our lead developer and support team directly via WhatsApp:
👉 https://wa.me/${SUPPORT_NUMBER}

We are available from 10:00 AM to 8:00 PM IST daily to help with viva prep, setup assistance, or payment validation.

_Type *menu* to return to the main options._`;
            }
            
            // Fall back to Gemini AI smart chat if enabled, otherwise show menu
            if (aiClient) {
                return await handleGeminiAI(messageText);
            } else {
                return `⚠️ Invalid option. Please select *1*, *2*, *3*, or *4*.\n\n${getMainMenu()}`;
            }

        case 'SEARCH': {
            // Find projects that match the query
            const matches = projectsData.filter(p => 
                p.title.toLowerCase().includes(text) || 
                p.tech.toLowerCase().includes(text) ||
                p.domain.toLowerCase().includes(text)
            );
            
            if (matches.length > 0) {
                let response = `✅ Found *${matches.length}* matching projects:\n\n`;
                matches.slice(0, 3).forEach((proj, idx) => {
                    response += `*${idx + 1}. ${proj.title}*\n`;
                    response += `📂 Domain: ${proj.domain.toUpperCase()}\n`;
                    response += `🛠️ Tech: ${proj.tech}\n`;
                    response += `💰 Price: ${proj.price} (Basic ₹999)\n`;
                    response += `📝 Desc: ${proj.desc}\n\n`;
                });
                
                if (matches.length > 3) {
                    response += `_And ${matches.length - 3} more. Try refining your keyword._\n\n`;
                }
                
                response += `🔗 To buy a project, click here to visit our catalog:\nhttps://projectvault.in\n\n_Type another keyword to search or *menu* to go back._`;
                return response;
            } else {
                // If no direct project matches, try querying Gemini to suggest topics or explain
                if (aiClient) {
                    const aiSuggestion = await handleGeminiAI(`The user searched for college project topic "${messageText}" but we didn't find it in our static catalog. Suggest how they can build this project, or suggest related project domains we offer.`);
                    return `🔍 No exact match in our catalog for "${messageText}".\n\n${aiSuggestion}`;
                } else {
                    return `🔍 No matches found for "${messageText}". Try keywords like \`ESP32\`, \`React\`, \`Machine Learning\`, or \`Android\`.\n\n_Type another keyword to search or *menu* to go back._`;
                }
            }
        }

        case 'TRACK': {
            const order = getOrderStatus(messageText);
            if (order) {
                let response = `📦 *Order Tracking Details*:\n\n`;
                response += `👤 *Student*: ${order.studentName}\n`;
                response += `📄 *Project*: ${order.projectTitle}\n`;
                response += `🏷️ *Tier*: ${order.tier}\n`;
                response += `🔄 *Status*: *${order.status}*\n`;
                response += `📅 *Delivery*: ${order.deliveryDate}\n`;
                if (order.downloadLink) {
                    response += `📥 *Download Link*: ${order.downloadLink}\n`;
                }
                response += `\nNeed setup support? Setup is scheduled via AnyDesk. Contact support at wa.me/${SUPPORT_NUMBER}\n\n_Type another Order ID to track or *menu* to go back._`;
                return response;
            } else {
                return `❌ *Order Not Found*
                
We couldn't find an order matching "${messageText}". Please check your Order ID (it should look like \`PV-128472\` or you can enter the 6 digits).

_Type another Order ID to try again or *menu* to go back._`;
            }
        }

        case 'FAQ':
            if (text === 'a') {
                return `📦 *Delivery Method*
                
After successful payment simulation on our portal, you will be redirect to the Success page to download the project source files ZIP instantly.
Additionally, a download link and order confirmation receipt will be sent to your registered Email and WhatsApp number.

_Select another option (A-E) or type *menu* to go back._`;
            }
            if (text === 'b') {
                return `🛠️ *Custom Modifications*
                
Yes! We can customize project features, integrate extra sensors for IoT, or modify frontend UI templates. 
Customizations incur a nominal fee depending on complexity. Contact our lead engineer directly at wa.me/${SUPPORT_NUMBER} to discuss.

_Select another option (A-E) or type *menu* to go back._`;
            }
            if (text === 'c') {
                return `📝 *Plagiarism & IEEE Standards*
                
Every project reports in the *Full Bundle* contains unique flowcharts, block diagrams, and written descriptions structured to pass standard university plagiarism checks (Turnitin guidelines). We don't provide copy-pasted templates.

_Select another option (A-E) or type *menu* to go back._`;
            }
            if (text === 'd') {
                return `🎁 *Full Academic Bundle Components*
                
For ₹2,499, you get:
1. Full compilable Source Code (zero errors).
2. 80+ Page IEEE formatted Project Report (PDF/Word).
3. PowerPoint Presentation Slides (20+ slides).
4. Step-by-step Setup & Deployment Guide.
5. 1-on-1 AnyDesk/Zoom support sessions to run the project on your laptop.

_Select another option (A-E) or type *menu* to go back._`;
            }
            if (text === 'e') {
                return `💰 *Refund Policy*
                
If you face setup compilation errors that our support team cannot resolve within 48 hours, we will issue a full 100% refund. Please check terms on website checkout.

_Select another option (A-E) or type *menu* to go back._`;
            }
            
            return `⚠️ Please select *A*, *B*, *C*, *D*, or *E*.\n\n${getFaqMenu()}`;

        default:
            session.state = 'IDLE';
            return getMainMenu();
    }
}
