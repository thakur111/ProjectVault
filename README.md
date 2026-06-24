# ProjectVault | College Project Solutions Landing Page

A high-converting, premium landing page designed for **ProjectVault** (College Project Solutions). Built from scratch using modern web design principles (glassmorphism, vibrant gradients, and micro-interactions) with zero external script frameworks for maximum speed and simplicity.

---

## 🚀 Key Features

1. **Sticky Glassmorphism Nav** — Shrinks and adds backdrop blurs automatically on scroll. Includes a fully responsive mobile hamburger menu drawer.
2. **Hero Search with Autocomplete** — Integrated search engine allowing students to type project queries (e.g., "Smart", "AI", "Face") and select matches directly from autocomplete suggestions.
3. **Live Stats Grid** — High-end indicator cards displaying verification metrics (500+ Project Titles, 2,400+ Students, 48hr Delivery, 4.9★ Rating) to secure student trust.
4. **Interactive Terminal Simulator** — Dynamic typewriter terminal simulating server transaction handshakes, repository cloning, report compiling, slide deck packaging, and WhatsApp status delivery checks. Runs on scroll intersection.
5. **Dynamic Domain Filter Showcase** — Toggles between 7 engineering domain categories (IoT, AI/ML, Web, Android, Security, Cloud, and Blockchain) to render customized project grids.
6. **Direct Checkout & Payments** — Built-in simulated Razorpay overlay interface capturing name, email, and WhatsApp numbers with a dynamic pricing tier toggle (Basic ₹999 vs. Full Bundle ₹2,499).
7. **Instant ZIP Downloader** — Payment success automatically triggers a dynamic file generator downloading setup guides, unique order hashes, and project files tailored to the student's selected title.
8. **WhatsApp Floating CTA** — Pulsing green Floating Action Button that formats encoded text inquiries automatically depending on user context.
9. **FAQ Accordion** — Smoothly expanding accordions answering common student concerns on guides, plagiarism, delivery, and refunds.

---

## 📁 File Structure

- `index.html` — Semantic structure containing all 10 visual blocks and the payment modal.
- `style.css` — Custom theme styling sheet using HSL tokens, animations, keyframes, and media queries.
- `script.js` — All interactive frontend logic, search filter indexes, terminal scripts, and checkout flows.

---

## 🛠️ Quick Local Setup

### Option 1: Double-Click (Simple)
Simply open the `index.html` file in any modern web browser directly to view the static site under the `file://` scheme.

### Option 2: Run a Local Server (Recommended)
Running it on a local HTTP server handles path resolutions and media queries more cleanly. 

1. **Using Node.js (`npx`):**
   ```bash
   npx http-server -p 8080 -c-1 -o
   ```
2. **Using Python:**
   ```bash
   python -m http.server 8080
   ```
Then visit **`http://localhost:8080`** in your web browser.

---

## ⚙️ Configuration & Customization

- **Change WhatsApp Target Number:** Search for `917026387931` in `index.html` and `script.js` and replace it with your active business phone number.
- **Add New Projects to Catalog:** Open the `projectsData` array in `script.js` and add project records following the schema structure. The autocomplete index and domain tags will update automatically!
- **Edit Brand details:** Swap `ProjectVault` in the logo section of `index.html` to reflect your custom agency name.
