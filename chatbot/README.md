# ProjectVault WhatsApp Chatbot 🎓🤖

A lightweight, automated WhatsApp virtual assistant built with Node.js, `whatsapp-web.js`, and Google Gemini. It handles student project queries, provides project details based on keywords, tracks order statuses, answers common FAQs, and integrates AI for custom technical chats.

---

## ✨ Features

- **Main Menu**: Directs users to search, tracking, FAQs, or human support.
- **Dynamic Search**: Instantly parses keyword searches (e.g. `IoT`, `face recognition`) to return matches from `projectsData.js` with descriptions and website checkout links.
- **Order Tracking**: Reads `ordersDb.json` in real-time to report transaction statuses like `Payment Verified`, `Files Compiling`, or download links.
- **Smart FAQ**: Instant responses to university project concerns (plagiarism, delivery guarantees, packages).
- **Gemini AI Chat**: Hand-off to Gemini 2.5 Flash for natural conversations about software/hardware guides, viva preparation tips, and custom developer inquiries.

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v18+ recommended)
- A smartphone with WhatsApp installed

### Step 1: Install Dependencies
Open your terminal inside the `chatbot` folder and run:
```bash
npm install
```

### Step 2: Configure Environment
Create a copy of `.env` or open the existing one and fill in:
- `GEMINI_API_KEY`: Get a free key from [Google AI Studio](https://aistudio.google.com/).
- `SUPPORT_NUMBER`: Your WhatsApp support phone number (e.g., `917026387931` with country code, no `+` or spaces).

### Step 3: Run the Chatbot
Start the local server:
```bash
npm start
```

### Step 4: Scan the QR Code
1. Once launched, a **QR Code** will render directly in your terminal.
2. Open WhatsApp on your phone.
3. Tap **Settings** / **Menu (three dots)** > **Linked Devices** > **Link a Device**.
4. Scan the terminal's QR code.
5. Once scanned, the terminal will log `🚀 ProjectVault WhatsApp Bot is LIVE & ready!`.

---

## 🔬 Testing Chatbot Interactions

To test the chatbot, send a message (e.g., "Hi") to your scanned phone number from another WhatsApp account:

1. **Test Greeting**: Type `Hi` or `Menu` to get the interactive welcome list.
2. **Test Search**: Type `1` (or Search) and enter `IoT` or `Android` to see project matches.
3. **Test Track Order**: Type `2` (or Track) and enter `PV-128472` to see order details.
4. **Test FAQs**: Type `3` (or FAQ) and reply with `D` to see package deliverables.
5. **Test AI Assist**: Type a custom query like `What is an ESP32 chip?` or `Can you explain React?` to get a smart Gemini-powered answer.

---

## 📁 File Reference

- `package.json` — Defines package packages.
- `index.js` — Client initializer and event dispatch router.
- `botLogic.js` — State machine flow rules and Gemini client handler.
- `projectsData.js` — Catalog database copied from the web frontend.
- `ordersDb.json` — Local database of order codes. Add new orders here to enable tracking instantly!
