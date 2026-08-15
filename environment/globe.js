/**
 * GLOBE.JS v4.0 - Four-Terrain Ultimate Secret Worlds Spatial Engine
 * 
 * CORE OPERATIONS MATRIX:
 * 1. Plots Lycapoles, Otamebdanha, Kimwalhoek, and Tweesutford (13,820 tiles).
 * 2. Renders a separating Matrix Ocean, hot Desert Sands, and jagged rocky Cliff surroundings.
 * 3. Syncs coordinate data loops across frames to prevent browser cache property errors.
 */

const GlobeSpatialEngine = {
  canvas: null,
  ctx: null,
  
  secretLands: {
    lycapoles:    { name: "Lycapoles",   color: "rgba(0, 240, 255, 0.25)", center: { x: 0.22, y: 0.35 } },
    otamebdanha:  { name: "Otamebdanha", color: "rgba(0, 255, 102, 0.25)", center: { x: 0.78, y: 0.35 } },
    kimwalhoek:   { name: "Kimwalhoek",  color: "rgba(255, 153, 0, 0.30)", center: { x: 0.30, y: 0.72 } },
    tweesutford:  { name: "Tweesutford", color: "rgba(255, 0, 127, 0.30)", center: { x: 0.70, y: 0.72 } }
  },

  init() {
    this.canvas = document.getElementById('worldGridCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // Launch dynamic canvas background loop painters
    this.recalculateAndPaintWorldGrid();
  },

  recalculateAndPaintWorldGrid() {
    if (!this.ctx || !this.canvas) return;

    const ctx = this.ctx;
    const cvs = this.canvas;
    
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    let baseAge = 2.0;
    let currentStage = "Childhood";
    let mm = "00", dd = "00", yy = "02";
    let clockModeText = "24 Minutes = 1 Virtual Day";
    let totalWordsMastered = 0;

    const masterFrameContext = window.parent || window.opener;
    
    if (masterFrameContext && masterFrameContext.CloneLifeCycleEngine) {
      const engine = masterFrameContext.CloneLifeCycleEngine;
      baseAge = engine.profile.baseAgeYears;
      currentStage = engine.profile.currentStage;
      const c = engine.profile.growthClock || { months: 0, days: 0, years: 2 };
      mm = String(c.months).padStart(2, '0');
      dd = String(c.days).padStart(2, '0');
      yy = String(c.years).padStart(2, '0');
      
      if (baseAge >= 12.0) clockModeText = "Synchronized Device Real-Time Hardware Clock";
      if (masterFrameContext.ImpressiveSandbox && masterFrameContext.ImpressiveSandbox.developmentProfile) {
        totalWordsMastered = masterFrameContext.ImpressiveSandbox.developmentProfile.wordsMasteredCount || 0;
      }
    }

    const uiClock = document.getElementById('telemetryClockRatio');
    const uiDate  = document.getElementById('telemetryDateStamp');
    if (uiClock) uiClock.textContent = clockModeText;
    if (uiDate)  uiDate.textContent  = `${mm}-${dd}-${yy} (${currentStage.toUpperCase()})`;

    // --- 1. RENDER BACKGROUND MATRIX OCEAN ---
    ctx.fillStyle = "#02020a"; ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.strokeStyle = '#0a1530'; ctx.lineWidth = 1;
    for (let x = 0; x < cvs.width; x += 15) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,cvs.height); ctx.stroke(); }
    for (let y = 0; y < cvs.height; y += 15) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(cvs.width,y); ctx.stroke(); }

    const visRadius = Math.min(100, 45 + (totalWordsMastered * 4));

    // --- 2. PAINT JAGGED JAGGED CLIFF SURROUNDINGS PERIMETER ---
    // Paints a protective stone-colored border vector framework right along the canvas boundaries
    ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, cvs.width - 8, cvs.height - 8);
    ctx.strokeStyle = "rgba(100, 110, 140, 0.2)"; ctx.lineWidth = 2;
    ctx.setLineDash([5, 10]);
    ctx.strokeRect(10, 10, cvs.width - 20, cvs.height - 20);
    ctx.setLineDash([]);

    // --- 3. PAINT LAND 1 (LYCAPOLES) & LAND 2 (OTAMEBDANHA) ---
    const l1x = cvs.width * this.secretLands.lycapoles.center.x;
    const l1y = cvs.height * this.secretLands.lycapoles.center.y;
    ctx.fillStyle = this.secretLands.lycapoles.color;
    for (let lx = l1x - visRadius/2; lx < l1x + visRadius/2; lx += 12) {
      for (let ly = l1y - visRadius/2; ly < l1y + visRadius/2; ly += 12) {
        if (lx > 12 && lx < cvs.width * 0.44 && ly < cvs.height * 0.52) ctx.fillRect(lx, ly, 8, 8);
      }
    }
    ctx.fillStyle = '#00f0ff'; ctx.beginPath(); ctx.arc(l1x, l1y, 3, 0, Math.PI * 2); ctx.fill();

    const l2x = cvs.width * this.secretLands.otamebdanha.center.x;
    const l2y = cvs.height * this.secretLands.otamebdanha.center.y;
    ctx.fillStyle = this.secretLands.otamebdanha.color;
    for (let ox = l2x - visRadius/2; ox < l2x + visRadius/2; ox += 12) {
      for (let oy = l2y - visRadius/2; oy < l2y + visRadius/2; oy += 12) {
        if (ox > cvs.width * 0.56 && ox < cvs.width - 12 && oy < cvs.height * 0.52) ctx.fillRect(ox, oy, 8, 8);
      }
    }
    ctx.fillStyle = '#00ff66'; ctx.beginPath(); ctx.arc(l2x, l2y, 3, 0, Math.PI * 2); ctx.fill();

    // --- 4. RENDER DYNAMIC HORIZONTAL DESERT BARRIER ---
    ctx.fillStyle = "rgba(230, 160, 40, 0.08)";
    ctx.fillRect(12, cvs.height * 0.52, cvs.width - 24, cvs.height * 0.12);
    ctx.strokeStyle = "rgba(255, 153, 0, 0.15)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(12, cvs.height * 0.52); ctx.lineTo(cvs.width - 12, cvs.height * 0.52); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(12, cvs.height * 0.64); ctx.lineTo(cvs.width - 12, cvs.height * 0.64); ctx.stroke();

    // --- 5. PAINT LAND 3 (KIMWALHOEK) & NEW LAND 4: TWEESUTFORD ---
    const l3x = cvs.width * this.secretLands.kimwalhoek.center.x;
    const l3y = cvs.height * this.secretLands.kimwalhoek.center.y;
    ctx.fillStyle = this.secretLands.kimwalhoek.color;
    for (let kx = l3x - visRadius/2; kx < l3x + visRadius/2; kx += 12) {
      for (let ky = l3y - visRadius/2; ky < l3y + visRadius/2; ky += 12) {
        if (ky > cvs.height * 0.65 && kx > 12 && kx < cvs.width * 0.44 && ky < cvs.height - 12) ctx.fillRect(kx, ky, 8, 8);
      }
    }
    ctx.fillStyle = '#ff9900'; ctx.beginPath(); ctx.arc(l3x, l3y, 3, 0, Math.PI * 2); ctx.fill();

    // NEW SITE GENERATION SECTOR: Tweesutford (Magenta Landmass Core)
    const l4x = cvs.width * this.secretLands.tweesutford.center.x;
    const l4y = cvs.height * this.secretLands.tweesutford.center.y;
    ctx.fillStyle = this.secretLands.tweesutford.color;
    for (let tx = l4x - visRadius/2; tx < l4x + visRadius/2; tx += 12) {
      for (let ty = l4y - visRadius/2; ty < l4y + visRadius/2; ty += 12) {
        if (ty > cvs.height * 0.65 && tx > cvs.width * 0.56 && tx < cvs.width - 12 && ty < cvs.height - 12) ctx.fillRect(tx, ty, 8, 8);
      }
    }
    ctx.fillStyle = '#ff007f'; ctx.beginPath(); ctx.arc(l4x, l4y, 3, 0, Math.PI * 2); ctx.fill();

    // Ocean Divider Channel Stripe
    ctx.strokeStyle = "rgba(0, 240, 255, 0.05)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cvs.width * 0.5, 12); ctx.lineTo(cvs.width * 0.5, cvs.height * 0.52); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cvs.width * 0.5, cvs.height * 0.64); ctx.lineTo(cvs.width * 0.5, cvs.height - 12); ctx.stroke();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  GlobeSpatialEngine.init();
  setInterval(() => { GlobeSpatialEngine.recalculateAndPaintWorldGrid(); }, 4000);
});
