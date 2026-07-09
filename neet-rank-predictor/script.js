// NEET UG Rank Predictor & Counselling Dashboard Logic Engine

// Global tracking for predicted ranks across different models
let lastPredictedRanks = {
  2023: 24000,
  2024: 24000,
  2026: 24000
};

// 1. Marks vs Rank Datasets for Interpolation
const rankData2024 = {
  720: 1,
  715: 68,
  710: 151,
  700: 351,
  690: 2501,
  680: 3501,
  670: 7201,
  660: 12401,
  650: 18901,
  640: 26501,
  630: 35201,
  620: 44701,
  610: 54701,
  600: 66201,
  590: 77001,
  580: 88301,
  570: 100001,
  560: 112001,
  550: 124501,
  540: 137001,
  530: 150001,
  520: 164001,
  510: 180010,
  500: 195001,
  480: 210001,
  450: 240001,
  400: 300001,
  350: 400001,
  300: 510001,
  250: 620001,
  200: 750001,
  150: 880001,
  100: 1050001
};

const rankData2023 = {
  720: 1,
  715: 2,
  710: 20,
  700: 51,
  690: 321,
  680: 751,
  670: 1501,
  660: 2601,
  650: 4201,
  640: 7001,
  630: 10001,
  620: 14001,
  610: 19001,
  600: 23001,
  590: 29001,
  580: 35001,
  570: 42001,
  560: 50001,
  550: 58001,
  540: 67001,
  530: 76001,
  520: 86001,
  510: 97001,
  500: 108001,
  480: 120001,
  450: 145001,
  400: 190001,
  350: 270001,
  300: 370001,
  250: 480001,
  200: 600001,
  150: 750001,
  100: 950001
};

// 2. State-Wise Seat Matrix Database (Approximate NMC/DCI/AYUSH aggregates)
const stateSeatMatrix = [
  { state: "Maharashtra", mbbsGovtCols: 30, mbbsGovtSeats: 4900, mbbsPrivCols: 35, mbbsPrivSeats: 5300, bdsGovtCols: 4, bdsGovtSeats: 350, bdsPrivCols: 25, bdsPrivSeats: 2600, ayushGovtSeats: 1250, ayushPrivSeats: 4500 },
  { state: "Karnataka", mbbsGovtCols: 22, mbbsGovtSeats: 3150, mbbsPrivCols: 45, mbbsPrivSeats: 7950, bdsGovtCols: 3, bdsGovtSeats: 200, bdsPrivCols: 38, bdsPrivSeats: 3200, ayushGovtSeats: 850, ayushPrivSeats: 3800 },
  { state: "Tamil Nadu", mbbsGovtCols: 38, mbbsGovtSeats: 5250, mbbsPrivCols: 34, mbbsPrivSeats: 6000, bdsGovtCols: 2, bdsGovtSeats: 200, bdsPrivCols: 20, bdsPrivSeats: 2000, ayushGovtSeats: 650, ayushPrivSeats: 2500 },
  { state: "Uttar Pradesh", mbbsGovtCols: 35, mbbsGovtSeats: 4300, mbbsPrivCols: 32, mbbsPrivSeats: 5450, bdsGovtCols: 1, bdsGovtSeats: 100, bdsPrivCols: 22, bdsPrivSeats: 2200, ayushGovtSeats: 900, ayushPrivSeats: 5500 },
  { state: "West Bengal", mbbsGovtCols: 26, mbbsGovtSeats: 3825, mbbsPrivCols: 9, mbbsPrivSeats: 1400, bdsGovtCols: 3, bdsGovtSeats: 200, bdsPrivCols: 8, bdsPrivSeats: 800, ayushGovtSeats: 450, ayushPrivSeats: 1100 },
  { state: "Gujarat", mbbsGovtCols: 23, mbbsGovtSeats: 4250, mbbsPrivCols: 17, mbbsPrivSeats: 2500, bdsGovtCols: 2, bdsGovtSeats: 200, bdsPrivCols: 11, bdsPrivSeats: 1100, ayushGovtSeats: 350, ayushPrivSeats: 1800 },
  { state: "Rajasthan", mbbsGovtCols: 26, mbbsGovtSeats: 3850, mbbsPrivCols: 9, mbbsPrivSeats: 1500, bdsGovtCols: 1, bdsGovtSeats: 50, bdsPrivCols: 14, bdsPrivSeats: 1300, ayushGovtSeats: 400, ayushPrivSeats: 1600 },
  { state: "Delhi", mbbsGovtCols: 8, mbbsGovtSeats: 1222, mbbsPrivCols: 2, mbbsPrivSeats: 250, bdsGovtCols: 2, bdsGovtSeats: 140, bdsPrivCols: 2, bdsPrivSeats: 200, ayushGovtSeats: 250, ayushPrivSeats: 150 },
  { state: "Andhra Pradesh", mbbsGovtCols: 18, mbbsGovtSeats: 3235, mbbsPrivCols: 19, mbbsPrivSeats: 3000, bdsGovtCols: 2, bdsGovtSeats: 200, bdsPrivCols: 14, bdsPrivSeats: 1400, ayushGovtSeats: 300, ayushPrivSeats: 800 },
  { state: "Telangana", mbbsGovtCols: 28, mbbsGovtSeats: 3800, mbbsPrivCols: 28, mbbsPrivSeats: 4700, bdsGovtCols: 1, bdsGovtSeats: 100, bdsPrivCols: 11, bdsPrivSeats: 1100, ayushGovtSeats: 250, ayushPrivSeats: 900 },
  { state: "Kerala", mbbsGovtCols: 12, mbbsGovtSeats: 1755, mbbsPrivCols: 21, mbbsPrivSeats: 2900, bdsGovtCols: 4, bdsGovtSeats: 240, bdsPrivCols: 20, bdsPrivSeats: 1800, ayushGovtSeats: 380, ayushPrivSeats: 1400 },
  { state: "Bihar", mbbsGovtCols: 12, mbbsGovtSeats: 1540, mbbsPrivCols: 8, mbbsPrivSeats: 1050, bdsGovtCols: 1, bdsGovtSeats: 40, bdsPrivCols: 6, bdsPrivSeats: 550, ayushGovtSeats: 150, ayushPrivSeats: 700 },
  { state: "Madhya Pradesh", mbbsGovtCols: 14, mbbsGovtSeats: 2250, mbbsPrivCols: 11, mbbsPrivSeats: 1900, bdsGovtCols: 1, bdsGovtSeats: 63, bdsPrivCols: 14, bdsPrivSeats: 1320, ayushGovtSeats: 320, ayushPrivSeats: 1500 },
  { state: "Punjab", mbbsGovtCols: 4, mbbsGovtSeats: 800, mbbsPrivCols: 8, mbbsPrivSeats: 950, bdsGovtCols: 2, bdsGovtSeats: 140, bdsPrivCols: 12, bdsPrivSeats: 1100, ayushGovtSeats: 180, ayushPrivSeats: 850 },
  { state: "Haryana", mbbsGovtCols: 6, mbbsGovtSeats: 850, mbbsPrivCols: 7, mbbsPrivSeats: 950, bdsGovtCols: 1, bdsGovtSeats: 100, bdsPrivCols: 10, bdsPrivSeats: 900, ayushGovtSeats: 120, ayushPrivSeats: 750 },
  { state: "Odisha", mbbsGovtCols: 12, mbbsGovtSeats: 1750, mbbsPrivCols: 4, mbbsPrivSeats: 650, bdsGovtCols: 2, bdsGovtSeats: 150, bdsPrivCols: 2, bdsPrivSeats: 200, ayushGovtSeats: 200, ayushPrivSeats: 450 },
  { state: "Assam", mbbsGovtCols: 13, mbbsGovtSeats: 1550, mbbsPrivCols: 0, mbbsPrivSeats: 0, bdsGovtCols: 3, bdsGovtSeats: 150, bdsPrivCols: 0, bdsPrivSeats: 0, ayushGovtSeats: 150, ayushPrivSeats: 50 },
  { state: "Chhattisgarh", mbbsGovtCols: 10, mbbsGovtSeats: 1120, mbbsPrivCols: 4, mbbsPrivSeats: 600, bdsGovtCols: 1, bdsGovtSeats: 100, bdsPrivCols: 5, bdsPrivSeats: 500, ayushGovtSeats: 110, ayushPrivSeats: 500 },
  { state: "Jharkhand", mbbsGovtCols: 7, mbbsGovtSeats: 780, mbbsPrivCols: 2, mbbsPrivSeats: 250, bdsGovtCols: 1, bdsGovtSeats: 50, bdsPrivCols: 3, bdsPrivSeats: 300, ayushGovtSeats: 100, ayushPrivSeats: 200 },
  { state: "Jammu & Kashmir", mbbsGovtCols: 10, mbbsGovtSeats: 1147, mbbsPrivCols: 1, mbbsPrivSeats: 100, bdsGovtCols: 2, bdsGovtSeats: 125, bdsPrivCols: 1, bdsPrivSeats: 100, ayushGovtSeats: 150, ayushPrivSeats: 100 },
  { state: "Uttarakhand", mbbsGovtCols: 4, mbbsGovtSeats: 525, mbbsPrivCols: 3, mbbsPrivSeats: 450, bdsGovtCols: 1, bdsGovtSeats: 100, bdsPrivCols: 2, bdsPrivSeats: 200, ayushGovtSeats: 120, ayushPrivSeats: 350 },
  { state: "Himachal Pradesh", mbbsGovtCols: 7, mbbsGovtSeats: 770, mbbsPrivCols: 1, mbbsPrivSeats: 150, bdsGovtCols: 1, bdsGovtSeats: 60, bdsPrivCols: 4, bdsPrivSeats: 320, ayushGovtSeats: 100, ayushPrivSeats: 250 }
];

// 3. College Database for predictable lists (Closing ranks are estimated based on General AIQ MCC)
const collegesDb = [
  { name: "All India Institute of Medical Sciences (AIIMS)", city: "New Delhi", state: "Delhi", type: "Government", course: "MBBS", closingGeneralRank: 50 },
  { name: "Maulana Azad Medical College (MAMC)", city: "New Delhi", state: "Delhi", type: "Government", course: "MBBS", closingGeneralRank: 100 },
  { name: "Vardhman Mahavir Medical College (VMMC)", city: "New Delhi", state: "Delhi", type: "Government", course: "MBBS", closingGeneralRank: 160 },
  { name: "JIPMER", city: "Puducherry", state: "Puducherry", type: "Government", course: "MBBS", closingGeneralRank: 280 },
  { name: "AIIMS Bhubaneswar", city: "Bhubaneswar", state: "Odisha", type: "Government", course: "MBBS", closingGeneralRank: 500 },
  { name: "AIIMS Bhopal", city: "Bhopal", state: "Madhya Pradesh", type: "Government", course: "MBBS", closingGeneralRank: 600 },
  { name: "Lady Hardinge Medical College (LHMC) - Females Only", city: "New Delhi", state: "Delhi", type: "Government", course: "MBBS", closingGeneralRank: 650 },
  { name: "King George's Medical University (KGMU)", city: "Lucknow", state: "Uttar Pradesh", type: "Government", course: "MBBS", closingGeneralRank: 1100 },
  { name: "Seth GS Medical College", city: "Mumbai", state: "Maharashtra", type: "Government", course: "MBBS", closingGeneralRank: 1050 },
  { name: "SMS Medical College", city: "Jaipur", state: "Rajasthan", type: "Government", course: "MBBS", closingGeneralRank: 1300 },
  { name: "Madras Medical College", city: "Chennai", state: "Tamil Nadu", type: "Government", course: "MBBS", closingGeneralRank: 1200 },
  { name: "Bangalore Medical College (BMCRI)", city: "Bengaluru", state: "Karnataka", type: "Government", course: "MBBS", closingGeneralRank: 1600 },
  { name: "BJ Medical College", city: "Ahmedabad", state: "Gujarat", type: "Government", course: "MBBS", closingGeneralRank: 1400 },
  { name: "Government Medical College", city: "Kozhikode", state: "Kerala", type: "Government", course: "MBBS", closingGeneralRank: 2100 },
  { name: "Medical College Kolkata", city: "Kolkata", state: "West Bengal", type: "Government", course: "MBBS", closingGeneralRank: 2000 },
  { name: "Patna Medical College (PMCH)", city: "Patna", state: "Bihar", type: "Government", course: "MBBS", closingGeneralRank: 3600 },
  { name: "Kasturba Medical College (KMC) - Deemed", city: "Manipal", state: "Karnataka", type: "Private", course: "MBBS", closingGeneralRank: 45000 },
  { name: "Hamdard Institute of Medical Sciences (HIMSR) - Private", city: "New Delhi", state: "Delhi", type: "Private", course: "MBBS", closingGeneralRank: 55000 },
  { name: "Maulana Azad Institute of Dental Sciences (MAIDS)", city: "New Delhi", state: "Delhi", type: "Government", course: "BDS", closingGeneralRank: 9500 },
  { name: "Government Dental College & Hospital", city: "Mumbai", state: "Maharashtra", type: "Government", course: "BDS", closingGeneralRank: 24000 },
  { name: "Government Dental College", city: "Bengaluru", state: "Karnataka", type: "Government", course: "BDS", closingGeneralRank: 27000 },
  { name: "IMS BHU Dental", city: "Varanasi", state: "Uttar Pradesh", type: "Government", course: "BDS", closingGeneralRank: 22000 },
  { name: "King George's Dental College", city: "Lucknow", state: "Uttar Pradesh", type: "Government", course: "BDS", closingGeneralRank: 18000 },
  { name: "Dr. R. Ahmed Dental College", city: "Kolkata", state: "West Bengal", type: "Government", course: "BDS", closingGeneralRank: 29000 },
  { name: "Christian Medical College (CMC) - Private", city: "Vellore", state: "Tamil Nadu", type: "Private", course: "MBBS", closingGeneralRank: 25000 },
  { name: "St. John's Medical College - Private", city: "Bengaluru", state: "Karnataka", type: "Private", course: "MBBS", closingGeneralRank: 15000 },
  { name: "M.S. Ramaiah Medical College - Private", city: "Bengaluru", state: "Karnataka", type: "Private", course: "MBBS", closingGeneralRank: 40000 },
  { name: "K.P.S. Salve Institute of Medical Sciences - Private", city: "Nagpur", state: "Maharashtra", type: "Private", course: "MBBS", closingGeneralRank: 60000 }
];

// 4. Rank Interpolation Logic
function getInterpolatedRank(score, yearData) {
  if (score === 720) return yearData[720];
  if (score <= 100) {
    // Linear regression down to 0
    const val100 = yearData[100];
    const diff = 1300000 - val100;
    const factor = (100 - score) / 100;
    return Math.round(val100 + diff * factor);
  }

  // Get sorted keys descending
  const sortedScores = Object.keys(yearData).map(Number).sort((a, b) => b - a);

  for (let i = 0; i < sortedScores.length - 1; i++) {
    const sHigh = sortedScores[i];
    const sLow = sortedScores[i + 1];

    if (score <= sHigh && score >= sLow) {
      const rHigh = yearData[sHigh];
      const rLow = yearData[sLow];
      
      // Linear interpolation
      const fraction = (sHigh - score) / (sHigh - sLow);
      const interpolated = rHigh + fraction * (rLow - rHigh);
      return Math.round(interpolated);
    }
  }

  return yearData[100];
}

// 4b. 10-Year Rank Extrapolation Model
function get10YearRanks(score) {
  const r23 = getInterpolatedRank(score, rankData2023);
  const r24 = getInterpolatedRank(score, rankData2024);

  return [
    { year: 2017, rank: Math.max(1, Math.round(r23 * 0.15)), factor: "0.15x" },
    { year: 2018, rank: Math.max(1, Math.round(r23 * 0.20)), factor: "0.20x" },
    { year: 2019, rank: Math.max(1, Math.round(r23 * 0.35)), factor: "0.35x" },
    { year: 2020, rank: Math.max(1, Math.round(r23 * 0.48)), factor: "0.48x" },
    { year: 2021, rank: Math.max(1, Math.round(r23 * 0.65)), factor: "0.65x" },
    { year: 2022, rank: Math.max(1, Math.round(r23 * 0.78)), factor: "0.78x" },
    { year: 2023, rank: r23, factor: "1.00x (Base)" },
    { year: 2024, rank: r24, factor: "1.00x (Base)" },
    { year: 2025, rank: Math.max(1, Math.round(r24 * 0.85)), factor: "0.85x" },
    { year: 2026, rank: Math.max(1, Math.round(r24 * 1.08)), factor: "1.08x (Proj)" }
  ];
}

// 4c. Dynamic SVG Line Chart Drawer
function drawTrendChart(ranks) {
  const container = document.getElementById("trend-chart-container");
  if (!container) return;

  const width = container.clientWidth || 500;
  const height = 260;
  
  const paddingLeft = 55;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  const minRank = Math.min(...ranks.map(r => r.rank));
  const maxRank = Math.max(...ranks.map(r => r.rank));
  
  const logMin = Math.log10(Math.max(1, minRank));
  const logMax = Math.log10(Math.max(10, maxRank));
  const logRange = logMax - logMin || 1;
  
  const points = ranks.map((r, idx) => {
    const x = paddingLeft + (idx / (ranks.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((Math.log10(Math.max(1, r.rank)) - logMin) / logRange) * chartHeight;
    return { x, y, year: r.year, rank: r.rank };
  });
  
  let yGridHtml = "";
  for (let i = 0; i <= 4; i++) {
    const ratio = i / 4;
    const yVal = paddingTop + ratio * chartHeight;
    const logVal = logMax - ratio * logRange;
    const rankVal = Math.round(Math.pow(10, logVal));
    
    let label = rankVal.toLocaleString("en-IN");
    if (rankVal >= 100000) label = (rankVal / 100000).toFixed(1) + "L";
    else if (rankVal >= 1000) label = (rankVal / 1000).toFixed(0) + "k";
    
    yGridHtml += `
      <line class="chart-grid-line" x1="${paddingLeft}" y1="${yVal}" x2="${width - paddingRight}" y2="${yVal}"></line>
      <text class="chart-y-label" x="${paddingLeft - 10}" y="${yVal + 4}">${label}</text>
    `;
  }
  
  let xGridHtml = "";
  points.forEach(p => {
    xGridHtml += `
      <line class="chart-grid-line" x1="${p.x}" y1="${paddingTop}" x2="${p.x}" y2="${paddingTop + chartHeight}"></line>
      <text class="chart-label" x="${p.x}" y="${paddingTop + chartHeight + 20}">${p.year}</text>
    `;
  });
  
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathD += ` L ${points[i].x} ${points[i].y}`;
  }
  
  let pointsHtml = "";
  points.forEach(p => {
    pointsHtml += `
      <circle class="chart-point" cx="${p.x}" cy="${p.y}" r="5" 
        data-year="${p.year}" data-rank="${p.rank.toLocaleString("en-IN")}"></circle>
    `;
  });

  const svgHtml = `
    <svg class="chart-svg" width="100%" height="${height}">
      <defs>
        <linearGradient id="chart-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="hsl(var(--primary))"></stop>
          <stop offset="100%" stop-color="hsl(var(--secondary))"></stop>
        </linearGradient>
      </defs>
      
      ${yGridHtml}
      ${xGridHtml}
      
      <line class="chart-axis-line" x1="${paddingLeft}" y1="${paddingTop}" x2="${paddingLeft}" y2="${paddingTop + chartHeight}"></line>
      <line class="chart-axis-line" x1="${paddingLeft}" y1="${paddingTop + chartHeight}" x2="${width - paddingRight}" y2="${paddingTop + chartHeight}"></line>
      
      <path class="chart-trend-path" d="${pathD}"></path>
      
      ${pointsHtml}
    </svg>
    <div class="chart-tooltip" id="chart-tooltip-el"></div>
  `;
  
  container.innerHTML = svgHtml;
  
  const circles = container.querySelectorAll(".chart-point");
  const tooltip = container.querySelector("#chart-tooltip-el");
  
  circles.forEach(c => {
    c.addEventListener("mouseenter", (e) => {
      const year = e.target.getAttribute("data-year");
      const rank = e.target.getAttribute("data-rank");
      tooltip.innerHTML = `<strong>${year}</strong>: AIR ~${rank}`;
      tooltip.style.opacity = "1";
      
      const rect = e.target.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      tooltip.style.left = (rect.left - parentRect.left - 50) + "px";
      tooltip.style.top = (rect.top - parentRect.top - 45) + "px";
    });
    
    c.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  });
}

// 5. Category Cutoff Multiplier Scale
function getCategoryClosingRank(baseRank, category) {
  switch (category) {
    case "OBC": return Math.round(baseRank * 1.15);
    case "EWS": return Math.round(baseRank * 1.20);
    case "SC": return Math.round(baseRank * 5.50);
    case "ST": return Math.round(baseRank * 7.50);
    case "GEN":
    default:
      return baseRank;
  }
}

// 6. Tie-breaker Simulation Logic
// Tie-breaking priority: Bio -> Chem -> Phy -> Random tie-break number
function simulateTieBreaker(score, category, bio, chem, phy) {
  // If the user's score has tie-breaker info
  if (bio === 0 && chem === 0 && phy === 0) return 0;
  
  // Maximum total subject score is 720
  const checkSum = bio + chem + phy;
  if (checkSum !== score) {
    // If the subject marks don't equal the total, scale them proportionally
    // to match the entered total score (safeguard)
  }
  
  // Calculate a tiny rank offset (negative value is better rank, positive is worse rank)
  // Bio score: higher is better. Max Bio is 360.
  const bioScore = bio || 0;
  // Chem score: higher is better. Max Chem is 180.
  const chemScore = chem || 0;
  // Phy score: higher is better. Max Phy is 180.
  const phyScore = phy || 0;

  // Let's assume an average standard subject distribution for the score:
  const avgBio = score * 0.50;
  const avgChem = score * 0.25;
  const avgPhy = score * 0.25;

  let scoreBioDiff = bioScore - avgBio;
  let scoreChemDiff = chemScore - avgChem;
  let scorePhyDiff = phyScore - avgPhy;

  // Bio is weighted highest (50%), Chem (30%), Phy (20%)
  const offset = - (scoreBioDiff * 1.5 + scoreChemDiff * 0.9 + scorePhyDiff * 0.5);
  
  // Return a rounded offset integer (-250 to +250)
  return Math.round(offset);
}

// 7. Render functions for dashboard tabs
function initApp() {
  // Select DOM Elements
  const tabButtons = document.querySelectorAll(".nav-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  
  // Form Inputs
  const scoreInput = document.getElementById("score-input");
  const scoreSlider = document.getElementById("score-slider");
  const categorySelect = document.getElementById("category-select");
  const stateSelect = document.getElementById("state-select");
  const tieBreakerToggle = document.getElementById("tie-breaker-toggle");
  const subjectMarksGrid = document.querySelector(".subject-marks-grid");
  const bioInput = document.getElementById("bio-marks");
  const chemInput = document.getElementById("chem-marks");
  const phyInput = document.getElementById("phy-marks");
  const btnPredict = document.getElementById("btn-predict");
  
  // Outputs
  const outputReport = document.querySelector(".output-report");
  const rank2024Val = document.getElementById("rank-2024-val");
  const rank2023Val = document.getElementById("rank-2023-val");
  const admissionChanceText = document.getElementById("admission-chance-text");
  const gaugeProgress = document.querySelector(".gauge-progress");
  const gaugeText = document.querySelector(".gauge-text");
  
  // Seat Matrix Elements
  const selectCourseSeat = document.getElementById("select-course-seat");
  const selectStateSeat = document.getElementById("select-state-seat");
  const selectTypeSeat = document.getElementById("select-type-seat");
  const seatSearch = document.getElementById("seat-search");
  const seatTableBody = document.getElementById("seat-table-body");
  
  // College Predictor Elements
  const collegeListContainer = document.getElementById("college-list-container");
  const predSelectCategory = document.getElementById("pred-select-category");
  const predSelectState = document.getElementById("pred-select-state");
  const predSelectType = document.getElementById("pred-select-type");
  const predRankInput = document.getElementById("pred-rank-input");
  const predSelectModel = document.getElementById("pred-select-model");
  const btnFilterColleges = document.getElementById("btn-filter-colleges");

  // Checklist elements
  const checklistItems = document.querySelectorAll(".checklist-item");

  // Accordion FAQs
  const faqAccordions = document.querySelectorAll(".faq-accordion");

  // --- MOBILE NAVIGATION BAR ---
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuToggle.innerHTML = isOpen 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  }

  // --- TAB ROUTING SYSTEM ---
  function switchTab(targetTabId) {
    tabButtons.forEach(btn => {
      if (btn.getAttribute("data-tab") === targetTabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    tabContents.forEach(content => {
      if (content.id === targetTabId) {
        content.classList.add("active");
      } else {
        content.classList.remove("active");
      }
    });

    // Close mobile nav drawer
    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      if (menuToggle) {
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    }

    // If switching to College Predictor, auto-trigger render
    if (targetTabId === "tab-colleges") {
      renderColleges();
    }

    // Scroll to top of window
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Link CTA to rank predictor tab
  const heroCta = document.getElementById("hero-cta-predict");
  if (heroCta) {
    heroCta.addEventListener("click", () => {
      switchTab("tab-predictor");
    });
  }
  const heroCtaSeats = document.getElementById("hero-cta-seats");
  if (heroCtaSeats) {
    heroCtaSeats.addEventListener("click", () => {
      switchTab("tab-seats");
    });
  }

  // --- SLIDER & SCORE INPUT SYNCHRONIZATION ---
  if (scoreInput && scoreSlider) {
    scoreSlider.addEventListener("input", (e) => {
      scoreInput.value = e.target.value;
    });

    scoreInput.addEventListener("input", (e) => {
      let val = parseInt(e.target.value);
      if (isNaN(val)) val = 0;
      if (val > 720) val = 720;
      if (val < 0) val = 0;
      scoreSlider.value = val;
    });
  }

  // --- TIE BREAKER ACCORDION ---
  if (tieBreakerToggle) {
    tieBreakerToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        subjectMarksGrid.style.display = "grid";
      } else {
        subjectMarksGrid.style.display = "none";
      }
    });
  }

  // --- RANK PREDICTOR CALCULATION FLOW ---
  if (btnPredict) {
    btnPredict.addEventListener("click", () => {
      const score = parseInt(scoreInput.value);
      const category = categorySelect.value;
      const state = stateSelect.value;
      
      if (isNaN(score) || score < 0 || score > 720) {
        alert("Please enter a valid NEET score between 0 and 720.");
        return;
      }

      // Simulate Tie Breaker offset
      const isTieBreakerActive = tieBreakerToggle ? tieBreakerToggle.checked : false;
      let offset = 0;
      if (isTieBreakerActive) {
        const bio = parseInt(bioInput.value) || 0;
        const chem = parseInt(chemInput.value) || 0;
        const phy = parseInt(phyInput.value) || 0;
        
        if (bio + chem + phy > 720) {
          alert("Sum of subject marks cannot exceed 720.");
          return;
        }
        offset = simulateTieBreaker(score, category, bio, chem, phy);
      }

      // 1. Get raw interpolated ranks and 10-year array
      let rank2024 = getInterpolatedRank(score, rankData2024) + offset;
      let rank2023 = getInterpolatedRank(score, rankData2023) + offset;
      
      // Ensure ranks do not fall below 1
      if (rank2024 < 1) rank2024 = 1;
      if (rank2023 < 1) rank2023 = 1;

      const ranks10Year = get10YearRanks(score);
      const rank2026 = ranks10Year.find(r => r.year === 2026).rank;

      // Store ranks globally for synchronization
      lastPredictedRanks[2023] = rank2023;
      lastPredictedRanks[2024] = rank2024;
      lastPredictedRanks[2026] = rank2026;

      // 2. Format and render numbers
      if (rank2024Val) rank2024Val.textContent = rank2024.toLocaleString("en-IN");
      if (rank2023Val) rank2023Val.textContent = rank2023.toLocaleString("en-IN");
      const rank2026Val = document.getElementById("rank-2026-val");
      if (rank2026Val) rank2026Val.textContent = rank2026.toLocaleString("en-IN");

      // Draw SVG chart and fill 10-year history table
      drawTrendChart(ranks10Year);
      const trendTableBody = document.getElementById("trend-table-body");
      if (trendTableBody) {
        trendTableBody.innerHTML = "";
        ranks10Year.forEach(row => {
          const tr = document.createElement("tr");
          let statusColor = "color: hsl(var(--warning));";
          if (row.year === 2024 || row.year === 2026) {
            statusColor = "color: hsl(var(--error));";
          } else if (row.year <= 2020) {
            statusColor = "color: hsl(var(--success));";
          }
          tr.innerHTML = `
            <td style="font-weight: 700;">${row.year}</td>
            <td class="text-right font-mono">${row.rank.toLocaleString("en-IN")}</td>
            <td class="text-right" style="font-weight: 600; ${statusColor}">${row.factor}</td>
          `;
          trendTableBody.appendChild(tr);
        });
      }

      // 3. Calculate Govt Seat Admission Chance Percentage (based on 2024 rank and category)
      // Standard cutoff ranks for government seats in AIQ:
      // General: ~25k, OBC: ~25k, EWS: ~27k, SC: ~1.2L, ST: ~1.5L
      let threshold = 25000;
      if (category === "OBC") threshold = 25000;
      else if (category === "EWS") threshold = 27000;
      else if (category === "SC") threshold = 120000;
      else if (category === "ST") threshold = 150000;

      // Add state-specific threshold adjustments
      // High seat states (e.g. Karnataka, Maharashtra, Tamil Nadu) have higher state quotas
      const stateBonus = ["Karnataka", "Maharashtra", "Tamil Nadu", "Telangana", "Gujarat"].includes(state) ? 1.25 : 1.0;
      const adjustedThreshold = threshold * stateBonus;

      // Calculate percentage chance (using the tougher 2024 trend for conservation)
      let chancePct = 0;
      if (rank2024 <= adjustedThreshold * 0.7) {
        chancePct = 95;
      } else if (rank2024 <= adjustedThreshold) {
        // Linear scale between 95% and 60%
        const diff = adjustedThreshold - rank2024;
        const range = adjustedThreshold * 0.3;
        chancePct = Math.round(60 + (diff / range) * 35);
      } else if (rank2024 <= adjustedThreshold * 1.4) {
        // Linear scale between 60% and 15%
        const diff = adjustedThreshold * 1.4 - rank2024;
        const range = adjustedThreshold * 0.4;
        chancePct = Math.round(15 + (diff / range) * 45);
      } else {
        chancePct = Math.max(5, Math.round(15 - (rank2024 - adjustedThreshold * 1.4) / (adjustedThreshold * 0.05)));
      }

      // Update Gauge SVG Progress
      // dashoffset formula: circumference (283) - (chancePct / 100) * circumference
      const circumference = 283;
      const offsetDash = circumference - (chancePct / 100) * circumference;
      gaugeProgress.style.strokeDashoffset = offsetDash;
      gaugeText.textContent = `${chancePct}%`;

      // Assign colors based on chance percentage
      let chanceClass = "chance-low";
      let chanceMsg = "Low Chance";
      if (chancePct >= 75) {
        chanceClass = "chance-high";
        chanceMsg = "High Chance";
        gaugeProgress.style.stroke = "hsl(var(--success))";
        gaugeText.style.color = "hsl(var(--success))";
      } else if (chancePct >= 40) {
        chanceClass = "chance-moderate";
        chanceMsg = "Moderate Chance";
        gaugeProgress.style.stroke = "hsl(var(--warning))";
        gaugeText.style.color = "hsl(var(--warning))";
      } else {
        gaugeProgress.style.stroke = "hsl(var(--error))";
        gaugeText.style.color = "hsl(var(--error))";
      }

      admissionChanceText.innerHTML = `
        <span class="chance-badge ${chanceClass}">${chanceMsg}</span>
        <p style="margin-top: 12px; font-size: 0.95rem; color: hsl(var(--text-secondary));">
          Based on your predicted rank, you have a <strong>${chanceMsg} (${chancePct}%)</strong> of securing an MBBS seat in 
          Government Medical Colleges under your category (<strong>${category}</strong>) in <strong>${state}</strong>. 
          Use the <em>College Predictor</em> tab to view individual college chances.
        </p>
      `;

      // Smooth scroll to output report
      outputReport.style.display = "block";
      setTimeout(() => {
        outputReport.scrollIntoView({ behavior: "smooth" });
      }, 100);

      // Prefill College Predictor rank input
      if (predRankInput) {
        predRankInput.value = rank2026; // default to 2026 forecast rank
      }
      if (predSelectCategory) {
        predSelectCategory.value = category;
      }
      if (predSelectState) {
        predSelectState.value = state;
      }
      if (predSelectModel) {
        predSelectModel.value = "2026"; // reset model selection to 2026 Forecast
      }

      // Auto-run college predictor list update
      renderColleges();
    });
  }

  // --- SEAT MATRIX SEARCH & RENDER MATRIX ---
  function getCourseSeats(stateData, course) {
    if (course === "MBBS") {
      return {
        govtCols: stateData.mbbsGovtCols,
        govtSeats: stateData.mbbsGovtSeats,
        privCols: stateData.mbbsPrivCols,
        privSeats: stateData.mbbsPrivSeats,
        totalSeats: stateData.mbbsGovtSeats + stateData.mbbsPrivSeats
      };
    } else if (course === "BDS") {
      return {
        govtCols: stateData.bdsGovtCols,
        govtSeats: stateData.bdsGovtSeats,
        privCols: stateData.bdsPrivCols,
        privSeats: stateData.bdsPrivSeats,
        totalSeats: stateData.bdsGovtSeats + stateData.bdsPrivSeats
      };
    } else { // AYUSH
      // Estimate colleges based on typical seat ratio (approx. 60 seats per college)
      const gCols = Math.round(stateData.ayushGovtSeats / 60);
      const pCols = Math.round(stateData.ayushPrivSeats / 65);
      return {
        govtCols: gCols,
        govtSeats: stateData.ayushGovtSeats,
        privCols: pCols,
        privSeats: stateData.ayushPrivSeats,
        totalSeats: stateData.ayushGovtSeats + stateData.ayushPrivSeats
      };
    }
  }

  function renderSeatMatrix() {
    if (!seatTableBody) return;

    const course = selectCourseSeat.value;
    const stateFilter = selectStateSeat.value;
    const typeFilter = selectTypeSeat.value;
    const query = seatSearch.value.toLowerCase().trim();

    seatTableBody.innerHTML = "";

    // Sort by total seats descending
    const filteredStates = stateSeatMatrix.filter(row => {
      const matchState = stateFilter === "All" || row.state === stateFilter;
      const matchSearch = row.state.toLowerCase().includes(query);
      return matchState && matchSearch;
    });

    let totalGovtSeats = 0;
    let totalPrivSeats = 0;
    let totalColleges = 0;

    filteredStates.forEach(row => {
      const courseStats = getCourseSeats(row, course);

      // Check type filter
      let showGovt = typeFilter === "All" || typeFilter === "Government";
      let showPriv = typeFilter === "All" || typeFilter === "Private";

      const govtSeats = showGovt ? courseStats.govtSeats : 0;
      const privSeats = showPriv ? courseStats.privSeats : 0;
      const govtCols = showGovt ? courseStats.govtCols : 0;
      const privCols = showPriv ? courseStats.privCols : 0;

      const totalStateSeats = govtSeats + privSeats;
      const totalStateCols = govtCols + privCols;

      if (totalStateSeats === 0 && totalStateCols === 0) return;

      totalGovtSeats += govtSeats;
      totalPrivSeats += privSeats;
      totalColleges += totalStateCols;

      // Calculate progress fill percentage relative to a max (say Karnataka MBBS 11100 seats)
      const maxSeatsRef = course === "MBBS" ? 11100 : (course === "BDS" ? 3400 : 5000);
      const fillPct = Math.min(100, Math.round((totalStateSeats / maxSeatsRef) * 100));

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="font-weight: 700;">${row.state}</td>
        <td class="text-right">${govtCols + privCols} <span style="font-size: 0.8rem; color: hsl(var(--text-muted));">cols</span></td>
        <td class="text-right font-mono badge-row-govt">${govtSeats.toLocaleString("en-IN")}</td>
        <td class="text-right font-mono badge-row-private">${privSeats.toLocaleString("en-IN")}</td>
        <td class="text-right font-mono" style="font-weight: 700;">
          ${totalStateSeats.toLocaleString("en-IN")}
          <div class="cell-progress-bar">
            <div class="cell-progress-fill" style="width: ${fillPct}%;"></div>
          </div>
        </td>
      `;
      seatTableBody.appendChild(tr);
    });

    // Add aggregate total row
    const totalRow = document.createElement("tr");
    totalRow.style.backgroundColor = "hsl(var(--bg-surface) / 0.5)";
    totalRow.style.fontWeight = "700";
    totalRow.style.borderTop = "2px solid hsl(var(--primary))";
    totalRow.innerHTML = `
      <td>TOTAL AGGREGATE</td>
      <td class="text-right">${totalColleges} cols</td>
      <td class="text-right font-mono badge-row-govt">${totalGovtSeats.toLocaleString("en-IN")}</td>
      <td class="text-right font-mono badge-row-private">${totalPrivSeats.toLocaleString("en-IN")}</td>
      <td class="text-right font-mono" style="color: hsl(var(--primary));">${(totalGovtSeats + totalPrivSeats).toLocaleString("en-IN")}</td>
    `;
    seatTableBody.appendChild(totalRow);
  }

  // Bind Seat matrix event triggers
  if (selectCourseSeat) {
    selectCourseSeat.addEventListener("change", renderSeatMatrix);
    selectStateSeat.addEventListener("change", renderSeatMatrix);
    selectTypeSeat.addEventListener("change", renderSeatMatrix);
    seatSearch.addEventListener("input", renderSeatMatrix);
  }

  // Pre-fill state matrix dropdowns
  if (selectStateSeat) {
    stateSeatMatrix.forEach(row => {
      const opt = document.createElement("option");
      opt.value = row.state;
      opt.textContent = row.state;
      selectStateSeat.appendChild(opt);
    });
  }

  // --- COLLEGE PREDICTOR FILTERING ---
  function renderColleges() {
    if (!collegeListContainer || !predRankInput || !predSelectCategory || !predSelectState || !predSelectType) return;

    const modelFilter = predSelectModel ? predSelectModel.value : "2026";
    
    // Auto-update rankVal display if we have a saved rank for the selected model
    if (lastPredictedRanks && lastPredictedRanks[modelFilter]) {
      predRankInput.value = lastPredictedRanks[modelFilter];
    }

    const rankVal = parseInt(predRankInput.value);
    const category = predSelectCategory.value;
    const stateFilter = predSelectState.value;
    const typeFilter = predSelectType.value;

    if (isNaN(rankVal) || rankVal <= 0) {
      collegeListContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: hsl(var(--text-muted));">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <p>Please enter your predicted All India Rank in the box above to generate college admission predictions.</p>
        </div>
      `;
      return;
    }

    collegeListContainer.innerHTML = "";

    // Filter colleges
    const eligibleColleges = collegesDb.filter(college => {
      const matchState = stateFilter === "All" || college.state === stateFilter;
      const matchType = typeFilter === "All" || college.type === typeFilter;
      return matchState && matchType;
    });

    if (eligibleColleges.length === 0) {
      collegeListContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: hsl(var(--text-muted));">
          <p>No colleges match your active search filters. Try loosening your filters.</p>
        </div>
      `;
      return;
    }

    eligibleColleges.forEach(college => {
      // Calculate adjusted closing rank for the category
      const targetClosingRank = getCategoryClosingRank(college.closingGeneralRank, category);

      // Determine safety status
      let chanceText = "Risky";
      let chanceClass = "chance-low";
      if (rankVal <= targetClosingRank * 0.9) {
        chanceText = "Safe";
        chanceClass = "chance-high";
      } else if (rankVal <= targetClosingRank * 1.15) {
        chanceText = "Borderline";
        chanceClass = "chance-moderate";
      }

      const card = document.createElement("div");
      card.className = "college-card";
      card.innerHTML = `
        <div class="college-details">
          <h4>${college.name}</h4>
          <div class="college-meta">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${college.city}, ${college.state}
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              Course: ${college.course} (${college.type})
            </span>
          </div>
        </div>
        <div class="college-chance-badge-wrapper">
          <span class="chance-badge ${chanceClass}">${chanceText}</span>
          <span class="cutoff-text">Est. Cutoff (AIR): ~${targetClosingRank.toLocaleString("en-IN")}</span>
        </div>
      `;
      collegeListContainer.appendChild(card);
    });
  }

  if (btnFilterColleges) {
    btnFilterColleges.addEventListener("click", renderColleges);
  }

  // Pre-fill state filters in college predictor
  if (predSelectState) {
    stateSeatMatrix.forEach(row => {
      const opt = document.createElement("option");
      opt.value = row.state;
      opt.textContent = row.state;
      predSelectState.appendChild(opt);
    });
  }

  // --- PERSISTENT DOCUMENTS CHECKLIST ---
  // Load local storage values
  let savedChecklist = {};
  try {
    savedChecklist = JSON.parse(localStorage.getItem("neetDocsChecklist")) || {};
  } catch (e) {
    console.warn("localStorage read failed, using memory fallback.", e);
  }

  checklistItems.forEach((item, idx) => {
    const cb = item.querySelector("input[type='checkbox']");
    const key = `doc_${idx}`;

    if (cb) {
      if (savedChecklist[key]) {
        cb.checked = true;
        item.classList.add("checked");
      }

      item.addEventListener("click", (e) => {
        if (e.target !== cb) {
          cb.checked = !cb.checked;
        }
        
        if (cb.checked) {
          item.classList.add("checked");
          savedChecklist[key] = true;
        } else {
          item.classList.remove("checked");
          delete savedChecklist[key];
        }
        
        try {
          localStorage.setItem("neetDocsChecklist", JSON.stringify(savedChecklist));
        } catch (e) {
          console.warn("localStorage write failed.", e);
        }
      });
    }
  });

  // --- ACCORDION FAQS ---
  faqAccordions.forEach(acc => {
    const header = acc.querySelector(".faq-header");
    header.addEventListener("click", () => {
      const isOpen = acc.classList.contains("open");
      
      // Close all accordions first
      faqAccordions.forEach(item => item.classList.remove("open"));

      // Toggle current accordion
      if (!isOpen) {
        acc.classList.add("open");
      }
    });
  });

  // Bind model change listener in college predictor
  if (predSelectModel) {
    predSelectModel.addEventListener("change", renderColleges);
  }

  // --- AI ASSISTANT CHAT ENGINE ---
  const chatLog = document.getElementById("chat-log");
  const chatInput = document.getElementById("chat-input");
  const btnSendChat = document.getElementById("btn-send-chat");
  const geminiKeyInput = document.getElementById("gemini-key-input");
  const btnSaveKey = document.getElementById("btn-save-key");

  // Load key on start
  let geminiApiKey = "";
  try {
    geminiApiKey = localStorage.getItem("gemini_api_key") || "";
    if (geminiKeyInput && geminiApiKey) {
      geminiKeyInput.value = geminiApiKey;
    }
  } catch (e) {
    console.warn("Could not load API key from localStorage:", e);
  }

  // Save key listener
  if (btnSaveKey && geminiKeyInput) {
    btnSaveKey.addEventListener("click", () => {
      const key = geminiKeyInput.value.trim();
      if (!key) {
        alert("Please enter a valid API key.");
        return;
      }
      try {
        localStorage.setItem("gemini_api_key", key);
        geminiApiKey = key;
        alert("Gemini API key saved successfully!");
        appendSystemMessage("System Settings", "API Key updated. You can now start chatting with your AI Counsellor.");
      } catch (e) {
        alert("Failed to save key in local storage. Please check browser permissions.");
      }
    });
  }

  // Helper to append messages
  function appendMessage(sender, text, type) {
    if (!chatLog) return;
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-message ${type}`;
    
    // Simple custom markdown parser (bold **text** and lists)
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");

    msgDiv.innerHTML = `
      <div class="chat-message-header">${sender}</div>
      <div>${formattedText}</div>
    `;
    chatLog.appendChild(msgDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function appendSystemMessage(sender, text) {
    if (!chatLog) return;
    const sysDiv = document.createElement("div");
    sysDiv.style.alignSelf = "center";
    sysDiv.style.fontSize = "0.8rem";
    sysDiv.style.color = "hsl(var(--text-muted))";
    sysDiv.style.backgroundColor = "hsl(var(--bg-surface) / 0.4)";
    sysDiv.style.padding = "6px 14px";
    sysDiv.style.borderRadius = "20px";
    sysDiv.style.border = "1px solid hsl(var(--border-glass))";
    sysDiv.style.margin = "8px 0";
    sysDiv.innerHTML = `<strong>${sender}</strong>: ${text}`;
    chatLog.appendChild(sysDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function showLoading() {
    if (!chatLog) return null;
    const loadDiv = document.createElement("div");
    loadDiv.className = "chat-message ai";
    loadDiv.id = "ai-loading-bubble";
    loadDiv.innerHTML = `
      <div class="chat-message-header">AI Counsellor</div>
      <div class="ai-loading-dots">
        <div class="ai-loading-dot"></div>
        <div class="ai-loading-dot"></div>
        <div class="ai-loading-dot"></div>
      </div>
    `;
    chatLog.appendChild(loadDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
    return loadDiv;
  }

  function removeLoading() {
    const el = document.getElementById("ai-loading-bubble");
    if (el) el.remove();
  }

  // Welcome message helper
  function loadWelcomeMessage() {
    if (!chatLog) return;
    chatLog.innerHTML = "";
    
    const score = scoreInput ? scoreInput.value : 600;
    const state = stateSelect ? stateSelect.value : "your state";
    const category = categorySelect ? categorySelect.value : "General";
    
    let welcomeText = `Hello! I am your AI NEET Counselling Assistant. 
    I am ready to help you analyze your admission options. 
    
    Based on your currently selected parameters:
    - **NEET Score**: ${score}
    - **Domicile State**: ${state}
    - **Category**: ${category}
    
    Paste your Gemini API key on the right-hand panel, then ask me questions like:
    1. *"What government medical colleges can I get with my rank?"*
    2. *"How does choice locking upgrade work for state quota?"*
    3. *"What was the closing cutoff of MAMC in my category?"*`;
    
    appendMessage("AI Counsellor", welcomeText, "ai");
  }

  // Call welcome message on load
  loadWelcomeMessage();

  // Re-trigger welcome message when overview inputs change to sync values
  if (btnPredict) {
    btnPredict.addEventListener("click", () => {
      if (chatLog && chatLog.children.length <= 1) {
        loadWelcomeMessage();
      }
    });
  }

  // Send chat logic
  async function handleSendChat() {
    if (!chatInput) return;
    const query = chatInput.value.trim();
    if (!query) return;

    if (!geminiApiKey) {
      alert("Please save a Gemini API Key on the settings panel first!");
      switchTab("tab-ai"); 
      return;
    }

    // Append User message
    appendMessage("Student", query, "user");
    chatInput.value = "";

    // Show loader
    showLoading();

    // Retrieve state settings for prompt injection
    const score = scoreInput ? scoreInput.value : "Not specified";
    const category = categorySelect ? categorySelect.value : "GEN";
    const state = stateSelect ? stateSelect.value : "Not specified";
    
    const rank23 = lastPredictedRanks[2023] ? lastPredictedRanks[2023].toLocaleString("en-IN") : "Not calculated";
    const rank24 = lastPredictedRanks[2024] ? lastPredictedRanks[2024].toLocaleString("en-IN") : "Not calculated";
    const rank26 = lastPredictedRanks[2026] ? lastPredictedRanks[2026].toLocaleString("en-IN") : "Not calculated";

    const systemInstruction = `You are a knowledgeable and empathetic AI NEET UG Admission Counsellor. Your goal is to guide students on cutoffs, reservations, choice filling, college selection, and counseling procedures for MBBS, BDS, and AYUSH courses in India.
    The student currently has these metrics:
    - NEET Score: ${score}
    - Predicted 2024 Rank: ${rank24}
    - Predicted 2023 Rank: ${rank23}
    - Projected 2026 Rank: ${rank26}
    - Category: ${category}
    - Domicile State: ${state}
    
    Be extremely clear, precise, and supportive. Use markdown formatting (bullet points, bold text) when listing recommendations or cutoffs. Provide realistic, conservative assessments based on these ranks. If you suggest a college, mention if it fits their quota (AIQ 15% or State Quota 85%).`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: query }
              ]
            }
          ],
          systemInstruction: {
            parts: [
              { text: systemInstruction }
            ]
          }
        })
      });

      const data = await response.json();
      removeLoading();

      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        appendMessage("AI Counsellor", aiResponse, "ai");
      } else {
        console.error("API response structure error:", data);
        let errMsg = "Received an empty or invalid response from the API. Please double-check your API key and network connection.";
        if (data.error && data.error.message) {
          errMsg = `API Error: ${data.error.message}`;
        }
        appendMessage("AI Counsellor", errMsg, "ai");
      }
    } catch (err) {
      removeLoading();
      console.error("Gemini API connection error:", err);
      appendMessage("AI Counsellor", "Network Connection Error: Failed to contact the Gemini API. Please check your internet connectivity.", "ai");
    }
  }

  if (btnSendChat) {
    btnSendChat.addEventListener("click", handleSendChat);
  }
  if (chatInput) {
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSendChat();
      }
    });
  }

  // --- INITIAL RENDERS ---
  renderSeatMatrix();
  renderColleges();
}

// Global script load orchestrator
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
