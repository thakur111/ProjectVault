// Project Database
const projectsData = [
    {
        id: "IOT-101",
        title: "IoT-Based Smart Agriculture Monitoring System",
        domain: "iot",
        tech: "ESP32, Soil Moisture Sensor, Blynk IoT, C++",
        difficulty: "easy",
        desc: "Automated soil moisture tracking and irrigation pump control. Sends real-time sensor graphs to Blynk smartphone app.",
        price: "₹2,499"
    },
    {
        id: "IOT-102",
        title: "Smart Home Automation using NodeMCU & Alexa",
        domain: "iot",
        tech: "NodeMCU ESP8266, Relays, Sinric Pro, C++",
        difficulty: "easy",
        desc: "Control home appliances via voice commands, physical switches, or smartphone dashboard with sync feedback status.",
        price: "₹2,499"
    },
    {
        id: "IOT-103",
        title: "Patient Health Monitoring System using ESP32 & ThingsSpeak",
        domain: "iot",
        tech: "ESP32, Pulse Oximeter Max30102, DHT11, ThingsSpeak API",
        difficulty: "medium",
        desc: "Tracks heartbeat, SpO2 levels, and body temperature. Triggers email/SMS alerts if vital parameters cross safe thresholds.",
        price: "₹2,499"
    },
    {
        id: "AIML-201",
        title: "Real-Time Face Recognition Attendance System",
        domain: "ai-ml",
        tech: "Python, OpenCV, Face Recognition Library, Tkinter",
        difficulty: "medium",
        desc: "Detects and recognizes faces from live webcam feeds, automatically marking attendance in a local Excel/CSV sheet.",
        price: "₹2,499"
    },
    {
        id: "AIML-202",
        title: "Heart Disease Prediction using Machine Learning",
        domain: "ai-ml",
        tech: "Python, Flask, Scikit-Learn, Pandas, Random Forest",
        difficulty: "easy",
        desc: "Predicts cardiac arrest risks based on patient symptoms and vitals. Includes a clean web UI for clinical data input.",
        price: "₹2,499"
    },
    {
        id: "AIML-203",
        title: "Sign Language Recognition with Deep Learning",
        domain: "ai-ml",
        tech: "Python, OpenCV, TensorFlow, Keras, LSTM",
        difficulty: "hard",
        desc: "Converts hand gestures into readable text and voice commands in real-time, helping bridge communication barriers.",
        price: "₹2,499"
    },
    {
        id: "WEB-301",
        title: "E-Commerce Web App with Razorpay Integration",
        domain: "web",
        tech: "React.js, Node.js, Express, MongoDB, TailwindCSS",
        difficulty: "medium",
        desc: "Complete online storefront with search filters, shopping cart, admin control panel, and active payment gateway sandbox.",
        price: "₹2,499"
    },
    {
        id: "WEB-302",
        title: "Online College Placement Management Portal",
        domain: "web",
        tech: "HTML5, CSS3, JS, PHP, MySQL, Bootstrap",
        difficulty: "easy",
        desc: "Streamlines college placement activities. Allows students to upload resumes and companies to post job drives.",
        price: "₹2,499"
    },
    {
        id: "AND-401",
        title: "GPS-Based Women Safety Android App",
        domain: "android",
        tech: "Java, Android Studio, Firebase, Google Maps API",
        difficulty: "medium",
        desc: "Triggers emergency alerts with live location tracking links to preset contacts upon double pressing the power button.",
        price: "₹2,499"
    },
    {
        id: "AND-402",
        title: "Flutter-Based Fitness & Calorie Tracker App",
        domain: "android",
        tech: "Flutter, Dart, SQLite, Provider State Management",
        difficulty: "medium",
        desc: "Clean, responsive mobile dashboard for step counting, calorie calculations, weight tracking, and daily workout regimens.",
        price: "₹2,499"
    },
    {
        id: "CYB-501",
        title: "Secure Encrypted Chat Application",
        domain: "cyber",
        tech: "Python, Socket Programming, AES Encryption, RSA Keys",
        difficulty: "medium",
        desc: "Enables secure terminal-to-terminal messaging. Encrypts chat payloads on the client side using robust AES/RSA logic.",
        price: "₹2,499"
    },
    {
        id: "CYB-502",
        title: "SQL Injection Detection & Prevention System",
        domain: "cyber",
        tech: "Python, Flask, regex-based SQL Parser, MySQL",
        difficulty: "hard",
        desc: "Analyses incoming HTTP requests to block SQL injection payloads, showing warning notifications on a security console.",
        price: "₹2,499"
    },
    {
        id: "BC-601",
        title: "Decentralized E-Voting System on Ethereum",
        domain: "blockchain",
        tech: "Solidity, React.js, Web3.js, Truffle, Metamask",
        difficulty: "hard",
        desc: "Ensures tamper-proof digital voting. Voters log in via Metamask wallet and write cryptographically verified votes to a block.",
        price: "₹2,499"
    },
    {
        id: "CLD-701",
        title: "Serverless File Sharing Web Application",
        domain: "cloud",
        tech: "React, AWS Lambda, Amazon S3, DynamoDB, API Gateway",
        difficulty: "hard",
        desc: "Fast serverless file storage. Uploaded files generate short-lived signed URLs with automatic expiration timers.",
        price: "₹2,499"
    }
];

// Initialize UI Functions when DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Sticky Navbar scroll handler
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Mobile Menu Toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    const menuIcon = document.getElementById("menuIcon");

    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const isActive = navMenu.classList.contains("active");
        
        // Change toggle icon
        if (isActive) {
            menuIcon.setAttribute("data-lucide", "x");
        } else {
            menuIcon.setAttribute("data-lucide", "menu");
        }
        
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    // Close menu when clicking nav link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuIcon.setAttribute("data-lucide", "menu");
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    });

    // 4. FAQ Accordion toggle
    const faqTriggers = document.querySelectorAll(".faq-trigger");
    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const faqItem = trigger.parentElement;
            const content = faqItem.querySelector(".faq-content");
            const isOpen = faqItem.classList.contains("active");

            // Close all other accordions
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".faq-content").style.maxHeight = null;
            });

            // Toggle current accordion
            if (!isOpen) {
                faqItem.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 5. Render Project Category Showcase
    const showcaseGrid = document.getElementById("projectShowcase");
    const categoryTabs = document.getElementById("categoryTabs");

    function renderProjects(domainFilter = "all") {
        showcaseGrid.innerHTML = "";
        
        const filteredProjects = domainFilter === "all" 
            ? projectsData.slice(0, 6) // Show top 6 featured if 'all'
            : projectsData.filter(p => p.domain === domainFilter);

        if (filteredProjects.length === 0) {
            showcaseGrid.innerHTML = `<div class="no-projects">No projects found in this domain yet.</div>`;
            return;
        }

        filteredProjects.forEach(proj => {
            const card = document.createElement("div");
            card.className = "project-card";
            
            card.innerHTML = `
                <div>
                    <div class="project-header">
                        <span class="project-tech">${proj.tech}</span>
                        <span class="project-difficulty ${proj.difficulty}">${proj.difficulty}</span>
                    </div>
                    <h4>${proj.title}</h4>
                    <p>${proj.desc}</p>
                </div>
                <div class="project-footer">
                    <div class="project-price">${proj.price} <span>Full Bundle</span></div>
                    <button class="btn btn-primary btn-card-cta btn-checkout-trigger" data-project-id="${proj.id}">
                        Get Project
                    </button>
                </div>
            `;
            showcaseGrid.appendChild(card);
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Handle tab switching
    if (categoryTabs) {
        categoryTabs.addEventListener("click", (e) => {
            const btn = e.target.closest(".tab-btn");
            if (!btn) return;

            // Remove active from all tabs
            document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
            btn.classList.add("active");

            const domain = btn.getAttribute("data-domain");
            renderProjects(domain);
        });
    }

    // Initial project render
    renderProjects("all");

    // 6. Interactive Search Autocomplete
    const searchInput = document.getElementById("projectSearch");
    const searchSuggestions = document.getElementById("searchSuggestions");
    const searchBtn = document.getElementById("searchBtn");

    function handleSearch(query) {
        if (!query.trim()) {
            searchSuggestions.classList.remove("active");
            return;
        }

        const matches = projectsData.filter(p => 
            p.title.toLowerCase().includes(query.toLowerCase()) || 
            p.tech.toLowerCase().includes(query.toLowerCase())
        );

        if (matches.length > 0) {
            searchSuggestions.innerHTML = "";
            matches.slice(0, 5).forEach(match => {
                const div = document.createElement("div");
                div.className = "suggestion-item";
                div.innerHTML = `
                    <span class="suggestion-text">${match.title}</span>
                    <span class="suggestion-domain">${match.domain}</span>
                `;
                div.addEventListener("click", () => {
                    searchInput.value = match.title;
                    searchSuggestions.classList.remove("active");
                    
                    // Directly show selected project in the grid
                    showcaseGrid.innerHTML = "";
                    const card = document.createElement("div");
                    card.className = "project-card";
                    card.innerHTML = `
                        <div>
                            <div class="project-header">
                                <span class="project-tech">${match.tech}</span>
                                <span class="project-difficulty ${match.difficulty}">${match.difficulty}</span>
                            </div>
                            <h4>${match.title}</h4>
                            <p>${match.desc}</p>
                        </div>
                        <div class="project-footer">
                            <div class="project-price">${match.price} <span>Full Bundle</span></div>
                            <button class="btn btn-primary btn-card-cta btn-checkout-trigger" data-project-id="${match.id}">
                                Get Project
                            </button>
                        </div>
                    `;
                    showcaseGrid.appendChild(card);
                    if (window.lucide) window.lucide.createIcons();
                    
                    // Scroll to showcase section
                    document.getElementById("categories").scrollIntoView({ behavior: 'smooth' });
                });
                searchSuggestions.appendChild(div);
            });
            searchSuggestions.classList.add("active");
        } else {
            searchSuggestions.innerHTML = `<div style="padding: 14px; color: var(--text-muted); font-size: 13.5px;">No matches found. Try another query.</div>`;
            searchSuggestions.classList.add("active");
        }
    }

    searchInput.addEventListener("input", (e) => {
        handleSearch(e.target.value);
    });

    // Close suggestions when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-box-wrapper")) {
            searchSuggestions.classList.remove("active");
        }
    });

    // Handle Search Button Click
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value;
        if (!query.trim()) return;

        searchSuggestions.classList.remove("active");
        showcaseGrid.innerHTML = "";
        
        const matches = projectsData.filter(p => 
            p.title.toLowerCase().includes(query.toLowerCase()) || 
            p.tech.toLowerCase().includes(query.toLowerCase())
        );

        if (matches.length > 0) {
            matches.forEach(proj => {
                const card = document.createElement("div");
                card.className = "project-card";

                card.innerHTML = `
                    <div>
                        <div class="project-header">
                            <span class="project-tech">${proj.tech}</span>
                            <span class="project-difficulty ${proj.difficulty}">${proj.difficulty}</span>
                        </div>
                        <h4>${proj.title}</h4>
                        <p>${proj.desc}</p>
                    </div>
                    <div class="project-footer">
                        <div class="project-price">${proj.price} <span>Full Bundle</span></div>
                        <button class="btn btn-primary btn-card-cta btn-checkout-trigger" data-project-id="${proj.id}">
                            Get Project
                        </button>
                    </div>
                `;
                showcaseGrid.appendChild(card);
            });
            if (window.lucide) window.lucide.createIcons();
            document.getElementById("categories").scrollIntoView({ behavior: 'smooth' });
        } else {
            showcaseGrid.innerHTML = `<div class="no-projects" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">No projects matched your search. Try browsing by domain categories below.</div>`;
            document.getElementById("categories").scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Tag button searches
    document.querySelectorAll(".tag-search").forEach(tagBtn => {
        tagBtn.addEventListener("click", () => {
            const val = tagBtn.textContent;
            searchInput.value = val;
            handleSearch(val);
            searchBtn.click();
        });
    });

    // 7. Terminal Simulator Execution on Intersection
    const terminalBody = document.getElementById("terminalBody");
    const terminalLines = [
        { type: "cmd", text: "pv buy --project IOT-101 --tier full_bundle" },
        { type: "info", text: "Connecting to ProjectVault secure pipeline..." },
        { type: "info", text: "Verifying payment validation gateway... Done." },
        { type: "success", text: "[OK] Payment verified. Fetching digital repository..." },
        { type: "info", text: "Initializing repository download: git clone https://github.com/projectvault/iot-smart-agriculture.git" },
        { type: "success", text: "[SUCCESS] Cloned source files (32 MB) in 1.4s" },
        { type: "info", text: "Analyzing syntax & libraries (C++, ESP32 Core)..." },
        { type: "success", text: "[OK] 0 errors, 0 compilation warnings. Verification pass." },
        { type: "info", text: "Packaging IEEE-formatted report: doc_generator --pages 85 --format ieee" },
        { type: "success", text: "[SUCCESS] ProjectVault_Agriculture_Report.pdf created." },
        { type: "info", text: "Generating examiner presentation deck (20 slides)..." },
        { type: "success", text: "[SUCCESS] ProjectVault_Agriculture_Deck.pptx created." },
        { type: "info", text: "Scheduling WhatsApp dispatch & AnyDesk remote support ticket..." },
        { type: "success", text: "===> STATUS: DELIVERED | WhatsApp confirmation message sent!" },
        { type: "cmd", text: "pv help --next-steps" },
        { type: "info", text: "Next steps: Schedule Zoom session with developer. Prepare code viva." },
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let terminalActive = false;

    function typeTerminal() {
        if (lineIndex >= terminalLines.length) {
            // Keep caret blinking at end
            const caret = document.createElement("span");
            caret.className = "terminal-caret";
            terminalBody.appendChild(caret);
            return;
        }

        const currentLine = terminalLines[lineIndex];
        
        if (currentLine.type === "cmd") {
            // Type command character by character
            if (charIndex === 0) {
                const lineDiv = document.createElement("div");
                lineDiv.className = "terminal-line";
                lineDiv.innerHTML = `<span class="terminal-prompt">guest@projectvault:~$ </span><span class="terminal-command" id="cmd-${lineIndex}"></span><span class="terminal-caret" id="caret-${lineIndex}"></span>`;
                terminalBody.appendChild(lineDiv);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }

            const cmdSpan = document.getElementById(`cmd-${lineIndex}`);
            if (charIndex < currentLine.text.length) {
                cmdSpan.textContent += currentLine.text.charAt(charIndex);
                charIndex++;
                setTimeout(typeTerminal, 40); // speed of command typing
            } else {
                // Remove caret from current line
                document.getElementById(`caret-${lineIndex}`).remove();
                charIndex = 0;
                lineIndex++;
                setTimeout(typeTerminal, 600); // pause after command execution
            }
        } else {
            // Print output line instantly
            const lineDiv = document.createElement("div");
            lineDiv.className = `terminal-line terminal-${currentLine.type}`;
            lineDiv.textContent = currentLine.text;
            terminalBody.appendChild(lineDiv);
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            lineIndex++;
            setTimeout(typeTerminal, 350); // delay between outputs
        }
    }

    // Trigger terminal animation only when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !terminalActive) {
                terminalActive = true;
                typeTerminal();
            }
        });
    }, { threshold: 0.3 });

    const terminalSection = document.querySelector(".terminal-wrapper");
    if (terminalSection) {
        observer.observe(terminalSection);
    }

    // ==========================================================================
    // Checkout & Payment Simulation Logic
    // ==========================================================================
    const checkoutModal = document.getElementById("checkoutModal");
    const closeModalBtn = document.getElementById("closeModal");
    const modalProjectTitle = document.getElementById("modalProjectTitle");
    const checkoutForm = document.getElementById("checkoutForm");
    
    const tierOptionBasic = document.getElementById("tierOptionBasic");
    const tierOptionFull = document.getElementById("tierOptionFull");
    const tierRadios = document.querySelectorAll('input[name="projectTier"]');
    
    const submitPriceText = document.getElementById("submitPriceText");
    const razorpayAmountText = document.getElementById("razorpayAmountText");
    const payPriceText = document.getElementById("payPriceText");
    
    const stageForm = document.getElementById("stageForm");
    const stagePayment = document.getElementById("stagePayment");
    const stageProcessing = document.getElementById("stageProcessing");
    const stageSuccess = document.getElementById("stageSuccess");
    
    const btnSimulatePayment = document.getElementById("btnSimulatePayment");
    const btnDownloadFiles = document.getElementById("btnDownloadFiles");
    const btnFinishCheckout = document.getElementById("btnFinishCheckout");
    const successEmail = document.getElementById("successEmail");
    
    const downloadZipName = document.getElementById("downloadZipName");
    const downloadZipMeta = document.getElementById("downloadZipMeta");
    
    let activeProject = null;
    let selectedTier = "basic"; // default
    let selectedPrice = 999;    // default
    
    // Toggle active classes on radio tier selectors
    tierRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            selectedTier = e.target.value;
            
            if (selectedTier === "basic") {
                tierOptionBasic.classList.add("active");
                tierOptionFull.classList.remove("active");
                selectedPrice = 999;
            } else {
                tierOptionBasic.classList.remove("active");
                tierOptionFull.classList.add("active");
                selectedPrice = 2499;
            }
            
            // Update prices across screens
            submitPriceText.textContent = `₹${selectedPrice}`;
            razorpayAmountText.textContent = `₹${selectedPrice}`;
            payPriceText.textContent = `₹${selectedPrice}`;
        });
    });
    
    // Handle opening the modal
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest(".btn-checkout-trigger");
        if (!trigger) return;
        
        // Extract project ID or pricing tier
        const projectId = trigger.getAttribute("data-project-id");
        const pricingTier = trigger.getAttribute("data-pricing-tier");
        
        if (projectId) {
            // Opened via project card
            activeProject = projectsData.find(p => p.id === projectId);
            if (activeProject) {
                modalProjectTitle.textContent = activeProject.title;
            }
        } else if (pricingTier) {
            // Opened via pricing grid Order buttons
            activeProject = {
                id: pricingTier === "basic" ? "PRICING-BASIC" : "PRICING-FULL",
                title: pricingTier === "basic" ? "Project Vault - Basic Code License" : "Project Vault - Full Academic Project Bundle"
            };
            modalProjectTitle.textContent = activeProject.title;
            
            // Pre-select correct tier radio
            const targetRadio = document.querySelector(`input[name="projectTier"][value="${pricingTier}"]`);
            if (targetRadio) {
                targetRadio.checked = true;
                targetRadio.dispatchEvent(new Event("change"));
            }
        }
        
        // Reset stages
        stageForm.classList.add("active");
        stagePayment.classList.remove("active");
        stageProcessing.classList.remove("active");
        stageSuccess.classList.remove("active");
        
        // Open modal
        checkoutModal.classList.add("active");
    });
    
    // Close modal functions
    function closeModal() {
        checkoutModal.classList.remove("active");
    }
    
    closeModalBtn.addEventListener("click", closeModal);
    btnFinishCheckout.addEventListener("click", closeModal);
    
    // Close when clicking overlay backdrop
    checkoutModal.addEventListener("click", (e) => {
        if (e.target === checkoutModal) {
            closeModal();
        }
    });
    
    // Step 1 Form Submit -> Show Step 2 Payment
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Transition to payment simulation
        stageForm.classList.remove("active");
        stagePayment.classList.add("active");
    });
    
    // Payment method tabs inside simulation
    const payMethods = document.querySelectorAll(".pay-method-btn");
    payMethods.forEach(method => {
        method.addEventListener("click", () => {
            payMethods.forEach(m => m.classList.remove("active"));
            method.classList.add("active");
        });
    });
    
    // Simulate payment execution
    btnSimulatePayment.addEventListener("click", () => {
        // Transition to spinner
        stagePayment.classList.remove("active");
        stageProcessing.classList.add("active");
        
        setTimeout(() => {
            // Transition to success screen
            stageProcessing.classList.remove("active");
            stageSuccess.classList.add("active");
            
            // Set student's details
            const emailInput = document.getElementById("studentEmail").value;
            successEmail.textContent = emailInput;
            
            // Format zip details depending on project title
            let safeTitle = "project_vault_source_code";
            if (activeProject) {
                safeTitle = activeProject.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "_")
                    .replace(/(^_+|_+$)/g, "");
            }
            
            if (selectedTier === "basic") {
                downloadZipName.textContent = `${safeTitle}_basic_code.zip`;
                downloadZipMeta.textContent = "ZIP File • 4.6 MB";
            } else {
                downloadZipName.textContent = `${safeTitle}_full_bundle.zip`;
                downloadZipMeta.textContent = "ZIP File • 18.2 MB";
            }
        }, 2000); // 2 seconds spinner simulation
    });
    
    // Trigger dynamic browser download of mock package
    btnDownloadFiles.addEventListener("click", () => {
        const zipName = downloadZipName.textContent;
        const projectTitle = activeProject ? activeProject.title : "ProjectVault Solution";
        
        // Generate mock download content
        const fileContent = `==========================================================================
PROJECTVAULT DIGITAL FILE DELIVERY RECEIPT
==========================================================================
Project Title  : ${projectTitle}
Deliverable    : ${selectedTier === "basic" ? "Basic Code Only License" : "Full Academic Bundle"}
Status         : PAID & VERIFIED
Download Date  : ${new Date().toLocaleString()}
==========================================================================

INSTRUCTIONS:
1. Extract the contents of this ZIP (or rename this file to .txt to review guidelines).
2. Open the 'docs' folder to access your IEEE-format project documentation.
3. Review 'instructions.txt' to configure your local environmental dependencies.
4. If you have active AnyDesk setup support scheduled, contact support on WhatsApp with your Order ID: PV-${Math.floor(100000 + Math.random() * 900000)}.

Thank you for choosing ProjectVault!`;

        const blob = new Blob([fileContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        // In static browsers, downloading a txt file is safer and demonstrates download capability instantly.
        a.download = zipName.replace(".zip", "_instructions.txt");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // ==========================================================================
    // AI Advisor & Recommendation Engine
    // ==========================================================================
    const aiAdvisorForm = document.getElementById("aiAdvisorForm");
    const aiConsoleBody = document.getElementById("aiConsoleBody");
    const complexityBtns = document.querySelectorAll(".complexity-btn");
    
    // Manage active state of complexity buttons inside the panel
    complexityBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            complexityBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Check the hidden radio inside
            const radio = btn.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
    
    if (aiAdvisorForm) {
        aiAdvisorForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Extract values
            const branch = document.getElementById("aiBranch").value;
            const lang = document.getElementById("aiLang").value;
            const keywordsText = document.getElementById("aiKeywords").value;
            const complexity = document.querySelector('input[name="aiComplexity"]:checked').value;
            
            // Clean console and show running logs
            aiConsoleBody.innerHTML = "";
            
            const logSteps = [
                { text: `Initializing ProjectAI Matcher Pipeline...`, type: "log" },
                { text: `Reading preferences: Dept: ${branch.toUpperCase()} | Lang: ${lang.toUpperCase()} | Complexity: ${complexity.toUpperCase()}`, type: "log" },
                { text: `Querying local index files...`, type: "log" },
                { text: `Parsing search keys for: "${keywordsText}"`, type: "log" },
                { text: `Filtering matching titles...`, type: "thinking" }
            ];
            
            let currentLogIndex = 0;
            
            function printLogs() {
                if (currentLogIndex < logSteps.length) {
                    const step = logSteps[currentLogIndex];
                    const div = document.createElement("div");
                    div.className = `ai-log-entry ${step.type === 'thinking' ? 'thinking' : ''}`;
                    div.innerHTML = `<span style="color: var(--primary-light);">[AI]</span> ${step.text}`;
                    aiConsoleBody.appendChild(div);
                    aiConsoleBody.scrollTop = aiConsoleBody.scrollHeight;
                    
                    currentLogIndex++;
                    setTimeout(printLogs, 600); // speed of logs printing
                } else {
                    // Logs complete, execute matching logic
                    executeMatcher(branch, lang, keywordsText, complexity);
                }
            }
            
            printLogs();
        });
    }
    
    function executeMatcher(branch, lang, keywordsText, complexity) {
        const keywords = keywordsText.toLowerCase().split(/[\s,]+/).filter(k => k.length > 2);
        
        // Match catalog projects
        let matchedProjects = projectsData.filter(proj => {
            let score = 0;
            
            // 1. Branch match
            if (branch === "cse") {
                if (["ai-ml", "web", "cyber", "blockchain", "cloud", "android"].includes(proj.domain)) score += 3;
            } else if (["ece", "eee", "mech"].includes(branch)) {
                if (proj.domain === "iot") score += 5; // highly relevant for hardware
            }
            
            // 2. Language match
            const techLower = proj.tech.toLowerCase();
            if (lang === "python" && (techLower.includes("python") || techLower.includes("flask") || techLower.includes("tensorflow"))) score += 4;
            if (lang === "javascript" && (techLower.includes("react") || techLower.includes("node") || techLower.includes("express") || techLower.includes("mongodb"))) score += 4;
            if (lang === "cpp" && (techLower.includes("esp32") || techLower.includes("nodemcu") || techLower.includes("c++"))) score += 4;
            if (lang === "java" && (techLower.includes("java") || techLower.includes("android studio"))) score += 4;
            
            // 3. Keywords match
            const titleLower = proj.title.toLowerCase();
            const descLower = proj.desc.toLowerCase();
            keywords.forEach(word => {
                if (titleLower.includes(word) || descLower.includes(word) || techLower.includes(word)) {
                    score += 5; // high weight for keyword matches
                }
            });
            
            // 4. Complexity match
            if (proj.difficulty === complexity) score += 2;
            
            proj._aiScore = score;
            // Return only projects that have a basic affinity (score > 4) or keyword matches
            return score > 4;
        });
        
        // Sort by match score descending
        matchedProjects.sort((a, b) => b._aiScore - a._aiScore);
        
        // Clear thinking log and print final status
        aiConsoleBody.innerHTML += `<div class="ai-log-entry success"><span style="color: #22c55e;">[AI]</span> Recommendation matching analysis complete!</div>`;
        
        // Render results
        if (matchedProjects.length > 0) {
            const topProjects = matchedProjects.slice(0, 2); // Show top 2 matches
            
            topProjects.forEach(proj => {
                const matchPct = Math.min(65 + (proj._aiScore * 5), 98); // calculate mock match percentage
                
                const recCard = document.createElement("div");
                recCard.className = "ai-recommendation-card";
                recCard.innerHTML = `
                    <div class="ai-rec-header">
                        <span class="ai-rec-tag catalog">Catalog Match</span>
                        <span class="ai-rec-match">${matchPct}% AI Match</span>
                    </div>
                    <div class="ai-rec-title">${proj.title}</div>
                    <div class="ai-rec-desc">${proj.desc}</div>
                    <div class="ai-rec-footer">
                        <span class="ai-rec-tech">${proj.tech}</span>
                        <button class="btn btn-primary btn-pay ai-rec-btn btn-checkout-trigger" data-project-id="${proj.id}">
                            Get Project (${proj.price})
                        </button>
                    </div>
                `;
                aiConsoleBody.appendChild(recCard);
            });
        }
        
        // GENERATE A CUSTOM GENERATIVE PROJECT (Advanced AI Title Generator Feature)
        // This generates a custom title based on their keywords and branch and builds dynamic card!
        const cleanKeyword = keywords.length > 0 ? keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1) : "Smart Core";
        
        let genTitle = "";
        let genTech = "";
        let genDesc = "";
        
        if (branch === "cse") {
            if (lang === "python") {
                genTitle = `AI-Powered ${cleanKeyword} Prediction & Diagnostic System`;
                genTech = "Python, Flask, PyTorch, Pandas, Scikit-Learn";
                genDesc = `An advanced intelligence system utilizing deep learning neural networks to analyze ${cleanKeyword.toLowerCase()} patterns, creating predictive diagnostics and real-time visual dashboard metrics.`;
            } else if (lang === "javascript") {
                genTitle = `Decentralized ${cleanKeyword} Management Platform`;
                genTech = "React.js, Node.js, Express, MongoDB, Web3.js";
                genDesc = `A fully secure, enterprise-grade cloud portal enabling real-time authentication, automated schema mapping, and cryptographic logging of ${cleanKeyword.toLowerCase()} records.`;
            } else {
                genTitle = `Cloud-Integrated ${cleanKeyword} Optimization Engine`;
                genTech = "Python, AWS Lambda, React, DynamoDB, API Gateway";
                genDesc = `A modern serverless web portal built to aggregate and optimize ${cleanKeyword.toLowerCase()} streams with low-latency visual analytics.`;
            }
        } else {
            // ECE/EEE/MECH IoT
            genTitle = `IoT-Based ${cleanKeyword} Monitoring & Control System`;
            genTech = "ESP32, C++, Relays, MQTT Protocol, Blynk Dashboard";
            genDesc = `A comprehensive hardware solution featuring custom calibrated sensor arrays, automated relays, and ESP32 Blynk triggers to manage and secure ${cleanKeyword.toLowerCase()} environments.`;
        }
        
        // Format WhatsApp URL specifically for this generated title
        const waGenMsg = encodeURIComponent(`Hey ProjectVault, your AI Matcher generated a custom project for me: "${genTitle}" (Tech: ${genTech}). I'm interested in the Basic/Full package. Let's discuss building it!`);
        const waGenUrl = `https://wa.me/919876543210?text=${waGenMsg}`;
        
        const genCard = document.createElement("div");
        genCard.className = "ai-recommendation-card custom-gen";
        genCard.innerHTML = `
            <div class="ai-rec-header">
                <span class="ai-rec-tag custom">Custom AI Generated</span>
                <span class="ai-rec-match" style="color: var(--secondary-light);">Tailored Topic</span>
            </div>
            <div class="ai-rec-title">${genTitle}</div>
            <div class="ai-rec-desc">${genDesc}</div>
            <div class="ai-rec-footer">
                <span class="ai-rec-tech">${genTech}</span>
                <a href="${waGenUrl}" class="btn btn-outline ai-rec-btn" target="_blank" rel="noopener noreferrer">
                    <i data-lucide="message-square"></i> Discuss Build
                </a>
            </div>
        `;
        
        // Brief typing/loading delay for generative output to feel real
        setTimeout(() => {
            aiConsoleBody.innerHTML += `<div class="ai-log-entry success"><span style="color: var(--secondary-light);">[AI]</span> Generative topic compilation successful! Custom title compiled.</div>`;
            aiConsoleBody.appendChild(genCard);
            aiConsoleBody.scrollTop = aiConsoleBody.scrollHeight;
            if (window.lucide) window.lucide.createIcons();
        }, 1200);
    }
});
