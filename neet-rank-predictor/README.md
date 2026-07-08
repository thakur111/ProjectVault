# NEET UG Rank Predictor & Counselling Seat Dashboard

A premium, interactive web application dashboard designed for NEET-UG aspirants to estimate their All India Rank (AIR), explore state-wise and course-wise seat distributions, evaluate admission probability for government medical colleges, and check document checklists for counselling registration.

## Features

1. **Vibrant & Modern UI (Glassmorphic Dark Mode)**: Built with HSL custom properties, featuring glowing cards, backdrop blurs (`backdrop-filter`), smooth fade-in animations, responsive hamburger drawers, and custom SVG gauges.
2. **Double-Trend Rank Prediction**: 
   - Compares the **2024 hyper-inflation trend** (high competitive benchmark) against the **2023 moderate trend** (conservative benchmark) using smooth linear interpolation.
   - Provides optional **Tie-Breaker inputs** (Biology, Chemistry, Physics scores) to resolve equal marks according to NTA guidelines.
3. **Interactive Seat Matrix Explorer**: 
   - Filters state-wise seats of Government vs. Private medical colleges across India.
   - Supports **MBBS**, **BDS**, and **AYUSH** course selections.
   - Provides live aggregation stats totals.
4. **Target College Predictor**:
   - Compares candidate ranks against closing statistics of top government and private medical institutions.
   - Evaluates admission probability status: **Safe (Green)**, **Borderline (Amber)**, or **Risky (Red)**, scaling cutoff ranks based on the selected category (General, OBC, SC, ST, EWS).
5. **Counselling Guide & Local Verification Checklist**:
   - Guides students through round timelines (Round 1, Round 2, Mop-Up, Stray Vacancy).
   - Features a persistent verification checklist. Selected document ticks are cached automatically in `localStorage`.

---

## Technical Details

### Rank Interpolation Formula
The calculator interpolates intermediate scores by checking surrounding dataset values:

$$\text{Rank} = \text{Rank}_{\text{High}} + \frac{\text{Score}_{\text{High}} - \text{Score}_{\text{Entered}}}{\text{Score}_{\text{High}} - \text{Score}_{\text{Low}}} \times (\text{Rank}_{\text{Low}} - \text{Rank}_{\text{High}})$$

### Category-wise scaling factors
Colleges cutoffs are scaled from the base General closing rank:
- **General (UR)**: $1.0\times$
- **OBC-NCL**: $1.15\times$
- **EWS**: $1.20\times$
- **SC**: $5.50\times$
- **ST**: $7.50\times$

---

## File Structure

- `index.html` — Document structure containing all dashboard viewports, form filters, and checklists.
- `style.css` — Layout styles containing variable themes, layout media queries, and slide transitions.
- `script.js` — All rank calculation formulas, seat matrices, and rendering operations.

---

## Local Setup

### Direct File Execution
Double click the `index.html` file inside the `neet-rank-predictor` folder to run the application immediately in any modern web browser.

### Local Web Server
Alternatively, serve the directory using Node.js or Python to resolve asset pathways cleanly:

#### Node.js:
```bash
npx http-server -p 8080 -c-1 -o
```

#### Python:
```bash
python -m http.server 8080
```
Then visit **`http://localhost:8080/neet-rank-predictor`** in your browser.
