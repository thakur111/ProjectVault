import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import express from 'express';
import dotenv from 'dotenv';
import { handleIncomingMessage } from './botLogic.js';

dotenv.config();

console.log('Starting ProjectVault WhatsApp Chatbot...');

import fs from 'fs';
import os from 'os';

// Find system Chrome executable to ensure compatibility on Windows
function findChromeExecutable() {
    if (os.platform() === 'win32') {
        const paths = [
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            (process.env.LOCALAPPDATA || '') + '\\Google\\Chrome\\Application\\chrome.exe'
        ];
        for (const p of paths) {
            if (p && fs.existsSync(p)) {
                console.log(`Found system Chrome at: ${p}`);
                return p;
            }
        }
    }
    return undefined; // fallback to default puppeteer chromium
}

const chromePath = findChromeExecutable();
// Store auth session files in AppData folder to prevent OneDrive sync locking conflicts
const authPath = 'C:\\Users\\91638\\.gemini\\antigravity\\chatbot_auth';

// Initialize WhatsApp Web Client with Remote Version Cache, Custom UA, Chrome, and local auth paths
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "projectvault-session",
        dataPath: authPath
    }),
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1042035268-alpha.html'
    },
    puppeteer: {
        headless: true,
        executablePath: chromePath,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        ]
    }
});

// Event listener for QR code generation
client.on('qr', (qr) => {
    console.clear();
    console.log('================================================================');
    console.log('📲 WHATSAPP SCAN REQUIRED');
    console.log('================================================================');
    console.log('Please scan the QR code below using your WhatsApp App:');
    console.log('Go to: WhatsApp > Settings > Linked Devices > Link a Device');
    console.log('----------------------------------------------------------------');
    
    // Print QR code in terminal
    qrcode.generate(qr, { small: true });
    
    console.log('----------------------------------------------------------------');
    console.log('Waiting for scan...');
});

// Event listener for successful authentication
client.on('authenticated', () => {
    console.log('✅ Authentication successful! Restoring session...');
});

client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failure:', msg);
});

// Event listener for client ready state
client.on('ready', () => {
    console.log('\n================================================================');
    console.log('🚀 ProjectVault WhatsApp Bot is LIVE & ready to answer queries!');
    console.log('================================================================\n');
});

// Message listener
client.on('message', async (msg) => {
    // Ignore messages from group chats or status updates
    if (msg.from.endsWith('@g.us') || msg.isStatus) {
        return;
    }
    
    console.log(`📥 [Msg Received] From: ${msg.from} | text: "${msg.body}"`);
    
    try {
        // Show typing indicator
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        
        // Generate response from botLogic
        const response = await handleIncomingMessage(msg.from, msg.body);
        
        // Send reply
        await msg.reply(response);
        console.log(`📤 [Msg Sent] To: ${msg.from}`);
    } catch (err) {
        console.error(`❌ Error responding to ${msg.from}:`, err.message);
    }
});

client.on('disconnected', (reason) => {
    console.log('⚠️ WhatsApp Client was disconnected:', reason);
    console.log('Attempting to re-initialize...');
    client.initialize();
});

// Initialize client
client.initialize().catch(err => {
    console.error('Fatal: Failed to initialize WhatsApp client:', err.message);
});

// Express server setup for health checks & keeping connection active
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'online',
        service: 'ProjectVault WhatsApp Chatbot',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🖥️  Local Health Check Server is running on http://localhost:${PORT}`);
});
