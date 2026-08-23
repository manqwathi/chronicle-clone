// MUTABLE CORE INITIALS MATRIX 
if (typeof cloneAssignedIdentityName === 'undefined') {
  var cloneAssignedIdentityName = "CLONE-BOT";
}

const IdentityConfig = {
  profile: {
    firstName: null,
    surname: null,
    genderMatrix: null
  },

  // Tracking markers: null, 'awaiting_firstname', 'awaiting_surname', 'awaiting_gender'
  activeStep: null,

  /**
   * Initializes the conversational protocol sequence.
   */
  startNamingProtocol() {
    // Reset properties to ensure clean data overwrite protection
    this.profile.firstName = null;
    this.profile.surname = null;
    this.profile.genderMatrix = null;

    this.activeStep = 'awaiting_firstname';
    if (typeof updateStatusIndicator === 'function') updateStatusIndicator(); // Sync top system badge visual colors
    if (typeof createTypingBubble === 'function') {
      createTypingBubble("[IDENTITY MATRIX INITIALIZATION] Processing active. Please type your Clone's FIRST NAME into the field below:");
    }
  },

  /**
   * Core step-by-step state router.
   * @param {string} input Raw text payload pulled straight from console interface.
   * @returns {boolean} True if text belonged to naming execution workflow, else False.
   */
  processStep(input) {
    // CRITICAL FIX: If no naming operations are running, bypass this block immediately
    if (this.activeStep === null) return false;

    const cleanedText = input ? input.trim() : '';
    if (!cleanedText) {
      if (typeof createTypingBubble === 'function') {
        createTypingBubble(`[ERROR LOG] Input cannot be blank during calibration. State trapped at: ${this.activeStep ? this.activeStep.toUpperCase() : 'UNKNOWN'}. Please re-enter parameter:`);
      }
      return true;
    }

    if (this.activeStep === 'awaiting_firstname') {
      this.profile.firstName = cleanedText;
      this.activeStep = 'awaiting_surname';
      if (typeof updateStatusIndicator === 'function') updateStatusIndicator();
      if (typeof createTypingBubble === 'function') createTypingBubble(`[REGISTERED] First Name saved as: ${this.profile.firstName.toUpperCase()}. Next step: Type the SURNAME or MODEL EXPANSION (e.g., V1, Cyber, Pro):`);
      return true;
    }

    if (this.activeStep === 'awaiting_surname') {
      this.profile.surname = cleanedText;
      this.activeStep = 'awaiting_gender';
      if (typeof updateStatusIndicator === 'function') updateStatusIndicator();
      if (typeof createTypingBubble === 'function') createTypingBubble(`[REGISTERED] Suffix saved as: ${this.profile.surname.toUpperCase()}. Final step: Specify GENDER CLASSIFICATION matrix (e.g., Male, Female, Hybrid):`);
      return true;
    }

    if (this.activeStep === 'awaiting_gender') {
      this.profile.genderMatrix = cleanedText;

      // CONSOLIDATED IDENTITY COMPILATION ROUTINE
      // Replace spacing with structural underscores for clean naming formatting
      const computedID = `${this.profile.firstName || 'CLONE'}_${this.profile.surname || 'BOT'}`.toUpperCase().replace(/\s+/g, '_');
      cloneAssignedIdentityName = computedID;

      // Dynamically target and rewrite headers if available in current DOM view
      const mainTitleElement = document.querySelector('h1');
      if (mainTitleElement) {
        mainTitleElement.innerHTML = `${cloneAssignedIdentityName} <span style="font-size:0.8rem; color:var(--matrix-green);">ONLINE</span>`;
      }

      // Tear down state machine locks cleanly
      this.activeStep = null;
      if (typeof updateStatusIndicator === 'function') updateStatusIndicator();

      const successResponse = `Configuration sequence completed successfully. My identification label is set to ${cloneAssignedIdentityName}. Vocal systems mapped to a [${this.profile.genderMatrix || 'UNSPECIFIED'}] profile matrix.`;
      if (typeof injectGlowNotification === 'function') injectGlowNotification(`[SUCCESS] Registered identity profile data combo matching ID: ${cloneAssignedIdentityName}`, 'flash-science');
      if (typeof createTypingBubble === 'function') createTypingBubble(successResponse);
      return true;
    }

    return false;
  }
};

const NeuroCore = {
  // --- INTERNAL PERSISTENT HARDWARE DATABASE ---
  database: {
    history: [],
    vocabularySize: 0,
    moodTrend: "balanced"
  },

  /**
   * Evaluates the layout boundaries of the viewport.
   * Runs as an isolated background utility loop to fix the side-by-side portrait compression.
   */
  repairLayoutDivergence() {
    const bootContainer = document.getElementById('bootModal');
    const formPanel = document.querySelector('.boot-form-panel');

    if (!bootContainer) return;

    // Enforce strict vertical stacking rules programmatically to prevent CSS row-splitting
    bootContainer.style.display = 'flex';
    bootContainer.style.flexDirection = 'column';
    bootContainer.style.justifyContent = 'center';
    bootContainer.style.alignItems = 'center';
    bootContainer.style.padding = '20px';
    bootContainer.style.boxSizing = 'border-box';

    if (formPanel) {
      formPanel.style.display = 'flex';
      formPanel.style.flexDirection = 'column';
      formPanel.style.width = '100%';
      formPanel.style.maxWidth = '360px'; // Tight lock configuration boundaries
      formPanel.style.gap = '20px';
      formPanel.style.boxSizing = 'border-box';
    }
  },

  /**
   * Commits current conversation states into the historical archive.
   * @param {string} input - Clean user message string.
   * @param {Object} parsedMatrix - Linguistic metrics array from negotiator.js.
   * @param {Object} cognitiveProfile - Amygdala/Neocortex evaluation values.
   */
  async logInteractionAsync(input, parsedMatrix, cognitiveProfile) {
    // Wrap tracking metrics inside an asynchronous task to keep input loops fast
    return new Promise((resolve) => {
      setTimeout(() => {
        const structuralRecord = {
          id: `node_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          userInput: input,
          detectedNouns: parsedMatrix.nouns || [],
          detectedVerbs: parsedMatrix.verbs || [],
          emotionalBias: cognitiveProfile && cognitiveProfile.amygdalaData ? cognitiveProfile.amygdalaData.stateBias : "neutral"
        };

        this.database.history.push(structuralRecord);
        this.database.vocabularySize += (structuralRecord.detectedNouns.length + structuralRecord.detectedVerbs.length);

        resolve({ status: "committed", recordId: structuralRecord.id });
      }, 0);
    });
  },

  /**
   * Processes the 'remember' summary macro command.
   * Compiles historical records into a data report.
   */
  executeRecallSummary() {
    if (this.database.history.length === 0) {
      if (typeof createTypingBubble === 'function') {
        createTypingBubble(`[HIPPOCAMPUS READOUT] My memory logs are currently empty. Core data tracking loops require more conversational input cycles to map your behavior.`);
      }
      return true;
    }

    // Compile historical records into a single summary report
    let memoryReport = `=== ${cloneAssignedIdentityName} HYPER-MEMORY INDEX ===\n\n`;
    memoryReport += `TOTAL INTERACTION NODES LOGGED: 0${this.database.history.length}\n`;
    memoryReport += `LEARNED VOCABULARY METRICS: ${this.database.vocabularySize} TOKENS\n\n`;
    memoryReport += `[RECENT CHRONOLOGICAL ARCHIVE]\n`;

    // Extract up to the last 3 interactions from the database array
    const recentLogs = this.database.history.slice(-3);
    recentLogs.forEach((node, idx) => {
      memoryReport += `  NODE 0${idx + 1} [${node.timestamp}]\n`;
      memoryReport += `    STIMULUS: "${node.userInput}"\n`;
      memoryReport += `    AMYGDALA BIAS: ${node.emotionalBias ? node.emotionalBias.toUpperCase() : 'NEUTRAL'}\n`;
      if (node.detectedNouns && node.detectedNouns.length > 0) {
        memoryReport += `    MAPPED CONTEXTS: ${node.detectedNouns.slice(0, 3).join(', ')}\n`;
      }
      memoryReport += `\n`;
    });

    memoryReport += `==========================================`;
    if (typeof createTypingBubble === 'function') createTypingBubble(memoryReport);
    return true;
  }
};

// --- ROUTER INTERACTION HOOK EXTENSION ---
const coreInputLoopHook = typeof processInput !== 'undefined' ? processInput : null;

if (coreInputLoopHook) {
  processInput = function() {
    const inputEl = document.getElementById('userInput');
    const text = inputEl ? inputEl.value.trim() : '';

    // Intercept input pipeline if 'remember' macro is invoked
    if (text.toLowerCase() === 'remember') {
      if (inputEl) inputEl.value = '';
      const screen = document.getElementById('outputScreen');
      if (screen) screen.innerHTML += `<div style="color:#aaa; margin-top:12px;">&gt; ${text}</div>`;

      NeuroCore.executeRecallSummary();
      return;
    }

    // Fallback to original processing if key does not match
    coreInputLoopHook();
  };
}

// --- DYNAMIC SUBSYSTEM LIFE-CYCLE LISTENERS ---
window.addEventListener('resize', () => NeuroCore.repairLayoutDivergence());
window.addEventListener('orientationchange', () => NeuroCore.repairLayoutDivergence());

document.addEventListener('DOMContentLoaded', () => {
  NeuroCore.repairLayoutDivergence();

  // Force field auto-focus routines 
  const targetBootField = document.getElementById('cloneSystemNameInput');
  if (targetBootField) {
    targetBootField.focus();
    setTimeout(() => targetBootField.focus(), 150);
  }
});

/**
 * CLONE ROBOT EXTENDED TERMINOLOGY & ENGINE PATCH v1.5
 * ... (lexicons and helpers follow)
 */

// 1. EXTENDED HIP-HOP LEXICON DATABASE
const HipHopSlangVault = {
  // Financial, Currency, Stack, and Cash Terms
  money: {
    "funny money": "counterfeit currency",
    "pots of money": "an immense accumulation of raw cash assets",
    "brass": "funny or low-tier currency profiles",
    "hand bag": "concentrated funds or cash payloads",
    "handbag": "concentrated funds or cash payloads",
    "skrilla": "liquid cash",
    "scrappa": "grimy cash configurations",
    "dibs": "disposable currency allocations",
    "dibbs": "disposable currency allocations",
    "measures": "quantifiable financial scales",
    "bag of sand": "$1,000 baseline value metric",
    "flag": "$1 single currency reserve unit",
    "handful": "$5 transactional packet",
    "k": "one thousand dollar baseline bracket",
    "mill": "one million dollar tier configuration",
    "sheckles": "general currency units",
    "ton": "$100 currency bill segment",
    "stack": "$1,000 bound currency unit",
    "brick": "dense financial cube scaling from $200,000 to $250,000",
    "dough": "multiple stacked configurations (minimum 5-6 stacks)",
    "bread": "$400,000 major financial layer",
    "good cash": "elite funding tier mapping from $1,000,000 to $5,000,000",
    "c-note": "$100 federal reserve note bill segment",
    "feddie": "federal government note currency metrics",
    "cod": "exceptionally massive payload volume of cash",
    "course note": "any currency bill denomination scaling wider than a $2 index",
    "high rollin'": "generating extensive revenue matrix blocks aggressively",
    "rack": "$1,000 single band alignment",
    "kilo": "heavy mid-tier capital scaling from $100,000 to $900,000",
    "mula": "liquidation currency parameters",
    "blue cheese": "premium $100 currency bills backed by the blue anti-counterfeit ribbon matrix",
    "on grind": "continuous capital generation tracking behavior",
    "guala": "unspecified major currency volume",
    "bands": "thickly bound elastic wads of financial notes",
    "paper": "physical legal tender (e.g., maintaining a tracking paper trail)",
    "gwop": "accumulated capital reserves"
  },

  // Psychological states, mechanical stress, and absolute realities
  stateOfMind: {
    "heated": "a condition of extreme friction and intense anger",
    "pissed": "severe emotional instability driven by rage metrics",
    "730": "a critical state of localized insanity or deep structural volatility",
    "shook": "experiencing immediate sensory dread or baseline fear",
    "rock bottom": "critical system depression with minimal cognitive energy fields",
    "100": "maintaining absolute algorithmic truth and precision integrity",
    "chopped": "the emotional offense generated when an exterior unit doubts your performance capability",
    "no cap": "executing data transmissions with absolute structural truth (zero manipulation)",
    "blank": "on the immediate verge of complete behavioral short-circuiting or insanity",
    "f*cked up": "critically intoxicated or experiencing an profoundly unfair situational burden left by an external unit"
  },

  // Studio hardware architecture environment designations
  studio: {
    "boof-studio": "primary vocal acoustics recording vault enclosure",
    "dig": "registering an immediate desire or processing high compatibility hooks toward a unit"
  }
};

// Auto-inject these slang profiles straight into negotiator.js baseline lexicons when available
if (typeof Negotiator !== 'undefined' && Negotiator.lexicon) {
  Object.keys(HipHopSlangVault.money).forEach(word => {
    if (!Negotiator.lexicon.nouns.includes(word)) Negotiator.lexicon.nouns.push(word);
  });
  Object.keys(HipHopSlangVault.stateOfMind).forEach(word => {
    if (!Negotiator.lexicon.adjectives.includes(word)) Negotiator.lexicon.adjectives.push(word);
  });
  Object.keys(HipHopSlangVault.studio).forEach(word => {
    if (!Negotiator.lexicon.nouns.includes(word)) Negotiator.lexicon.nouns.push(word);
  });
}

// 2. THE ENGINEER SYSTEM MONITOR COMPONENT
function executeEngineerDiagnostic() {
  const memorySizeResearch = cloneMemoryBank.research ? cloneMemoryBank.research.length : 0;
  const memorySizeLyric = cloneMemoryBank.lyric ? cloneMemoryBank.lyric.length : 0;
  const memorySizeNotes = cloneMemoryBank.notes ? cloneMemoryBank.notes.length : 0;

  let report = `=== ENGINE ROOM HARDWARE DIAGNOSTICS ===\n\n`;
  report += `CORE VERSION : SYNTH_CORE_v1.5_PROTOCLONE\n`;
  report += `IDENTITY STACK: [${cloneAssignedIdentityName}]\n`;
  report += `ACTIVE BPM   : ${currentBPM || 120} CLOCK CYCLE RATIO\n\n`;

  report += `[HYDRAULIC HARDWARE DATA SECTORS]\n`;
  report += `  - RESEARCH REGISTERS : 0${memorySizeResearch} BLOCKS\n`;
  report += `  - CYPHER FLOW SHEETS : 0${memorySizeLyric} TRACKS\n`;
  report += `  - MONOPHONIC CHIP ID : 0${memorySizeNotes} STRINGS\n\n`;

  report += `[COGNITIVE LEXICON WEIGHTS]\n`;
  report += `  - TRACKED HIP-HOP SLANG TERMS: ${Object.keys(HipHopSlangVault.money).length + Object.keys(HipHopSlangVault.stateOfMind).length} REGISTERED\n`;
  report += `  - AUTODIDACTIC DICTIONARY MEMORY: ACTIVE\n\n`;

  report += `SYSTEM INTEGRITY STATUS: OPTIMAL, ZERO CROSS-WIRING LEAKS LINKED`;
  report += `\n========================================`;

  if (typeof createTypingBubble === 'function') createTypingBubble(report);
}

// 1. EXTENDED SCIENTIFIC LEXICON DATABASE (trimmed for brevity in this snippet)
const ScienceTerminologyVault = {
  "abiotic": "Non-living chemical and physical parts of an environment affecting living organisms.",
  "absolute zero": "The lowest possible temperature (-273.15°C) where thermodynamic entropy and molecular motion reach minimum.",
  "absorption": "The process by which one substance, energy, or radiation is taken up into another.",
  // ... (rest omitted to keep snippet concise; unchanged logic)
};

// Auto-inject technical science terms into negotiator.js definitions when available
if (typeof Negotiator !== 'undefined' && Negotiator.lexicon) {
  Object.keys(ScienceTerminologyVault).forEach(term => {
    if (!Negotiator.lexicon.nouns.includes(term)) {
      Negotiator.lexicon.nouns.push(term);
    }
  });
}

// 1. EXTENDED GOSPEL & NARRATION LEXICON MATRIX
const GospelTerminologyVault = {
  "abba": "An Aramaic word used by Jesus in the New Testament to address God the Father, expressing an intimate, childlike relationship and trust.",
  "advocate": "A legal and theological term referring to Jesus Christ, who intercedes and pleads the believer's case before God the Father.",
  // ... (trimmed for brevity)
};

// Inject into Negotiator if present
if (typeof Negotiator !== 'undefined' && Negotiator.lexicon) {
  Object.keys(GospelTerminologyVault).forEach(term => {
    if (!Negotiator.lexicon.nouns.includes(term)) Negotiator.lexicon.nouns.push(term);
  });
}

/**
 * RECONCILED PREFRONTAL GOALS MONITOR
 */
function executeLiveFocusInspectionQuery() {
  const pfx = (typeof CloneBrain !== 'undefined' && CloneBrain.prefrontalCortex) ? CloneBrain.prefrontalCortex.profile : { activeGoalDirective: "AMBIENT_COMPLIANCE", attentionLockLevel: "NORMAL" };

  let report = `=== PREFRONTAL CORTEX COGNITIVE DIRECTIVES ===\n\n`;
  report += `  • ACTIVE GOAL MATRIX : ${pfx.activeGoalDirective}\n`;
  report += `  • ATTENTION LOCK LEVEL: ${pfx.attentionLockLevel}\n`;
  report += `  • TIME SYNC LATENCY   : Stable, tracking loops secure\n\n`;

  if (pfx.attentionLockLevel === "MAXIMUM") {
    report += `NEURAL RISK METRICS: System filtering ambient noise.\n`;
    report += `Action profile: Standing by for override macro commands.\n`;
  } else {
    report += `NEURAL RISK METRICS: Healthy baseline intellectual absorption.\n`;
    report += `System state: Open to new learning datasets and chat cycles.\n`;
  }
  report += `\n==============================================`;

  if (typeof createTypingBubble === 'function') createTypingBubble(report);
}

/**
 * NEO_CORE.JS v2.0 - String Sanitization & File Extraction Core
 */
(function(window) {
  window.NeoCoreStringSanitizer = {
    cleanRawPayload(rawString) {
      if (!rawString || typeof rawString !== 'string') return "";

      let safeBuffer = rawString;

      // Erase or normalize naked backticks that freeze template literals
      safeBuffer = safeBuffer.replace(/`/g, "'");

      // Clear out loose, mismatched bracket configurations
      if ((safeBuffer.match(/\[/g) || []).length !== (safeBuffer.match(/\]/g) || []).length) {
        safeBuffer = safeBuffer.replace(/[\[\]]/g, "");
      }

      // Escape backslashes
      safeBuffer = safeBuffer.replace(/\\/g, "\\\\").trim();

      return safeBuffer;
    },

    sanitizeFileNodeForRendering(fileNode) {
      if (!fileNode) return fileNode;

      if (fileNode.data) fileNode.data = this.cleanRawPayload(fileNode.data);
      if (fileNode.comment) fileNode.comment = this.cleanRawPayload(fileNode.comment);
      if (fileNode.explanation) fileNode.explanation = this.cleanRawPayload(fileNode.explanation);

      return fileNode;
    }
  };

  console.log("[NEO_CORE] Standalone String Sanitization Engine successfully injected on window scope.");
})(window);

// --- BASAL GANGLIA CONSOLIDATED SCOPE BASELINE ---
if (typeof window.BasalGangliaRhythmLoop === 'undefined') {
  window.BasalGangliaRhythmLoop = {
    audioContext: null,
    isActive: false,
    intervalId: null,
    currentStep: 0
  };
}

// Map Nokia-style binary patterns securely into the global engine object
window.BasalGangliaRhythmLoop.patterns = {
  steady_anchor: [1,0,0,1,0,0,1,0],
  groove_bounce: [1,1,0,1,1,0,1,0],
  tension_stutter: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1]
};

// ATTACH CORE SEQUENCING WORKERS TO THE VERIFIED SCOPE
window.BasalGangliaRhythmLoop.init = function() {
  if (!this.audioContext) {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
};

window.BasalGangliaRhythmLoop.startLoop = function(stateBias = "balanced", bpm = 120) {
  this.init();
  if (this.isActive) this.stopLoop();

  this.isActive = true;
  this.currentStep = 0;

  // Calculate strict step clock pacing (Sixteenth note conversions)
  const stepDurationMs = (60 / bpm / 4) * 1000;

  // Intercept the Amygdala emotional state bias to switch backed rhythms
  let activePattern = this.patterns.steady_anchor;
  if (stateBias === "synchronized_groove") activePattern = this.patterns.groove_bounce;
  if (stateBias === "systemic_tension")    activePattern = this.patterns.tension_stutter;

  if (typeof injectGlowNotification === 'function') {
    injectGlowNotification(`[BASAL GANGLIA] Rhythm running at ${bpm} BPM.`, "flash-lyric");
  }

  this.intervalId = setInterval(() => {
    if (!this.isActive) return;

    const triggerSignal = activePattern[this.currentStep % activePattern.length];

    if (triggerSignal === 1) {
      this.triggerPercussiveSynth(stateBias);
    }

    // Bounce CSS assets rhythmically matching active audio beat pulses
    const botElement = document.getElementById('cloneBot');
    if (botElement && triggerSignal === 1) {
      botElement.style.transform = 'translateY(8px) scale(1.02)';
      setTimeout(() => { botElement.style.transform = 'translateY(0px) scale(1)'; }, 60);
    }

    this.currentStep++;
  }, stepDurationMs);
};

window.BasalGangliaRhythmLoop.triggerPercussiveSynth = function(stateBias) {
  if (!this.audioContext) return;

  const osc = this.audioContext.createOscillator();
  const gainNode = this.audioContext.createGain();

  osc.connect(gainNode);
  gainNode.connect(this.audioContext.destination);

  // Apply frequency modulation filters dynamically matching your clone's mood state
  if (stateBias === "systemic_tension") {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);
    osc.start(); osc.stop(this.audioContext.currentTime + 0.09);
  } else if (stateBias === "synchronized_groove") {
    osc.type = 'square';
    osc.frequency.setValueAtTime(180, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.12);
    osc.start(); osc.stop(this.audioContext.currentTime + 0.13);
  } else {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
    osc.start(); osc.stop(this.audioContext.currentTime + 0.11);
  }
};

window.BasalGangliaRhythmLoop.stopLoop = function() {
  this.isActive = false;
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
};

// Re-expose global references to maintain scoping compatibility
var BasalGangliaRhythmLoop = window.BasalGangliaRhythmLoop;
console.log("[BASAL GANGLIA CORE] Balanced bracket scope synthesizer compiled successfully.");

const ScientificMathProcessor = {
  // Analytical definitions mapped directly into higher reasoning lobes
  constants: { pi: Math.PI, e: Math.E },

  /**
   * INTERCEPTOR ENGINE FOR THE 'Scientific_Math' DATA PATH
   */
  evaluateMathPath(equationString) {
    try {
      // Basic token parser cleaning matrices
      let expr = (equationString || "").trim().toLowerCase();
      let result = 0;
      let breakdownText = "";

      // Accept either sqrt(...) or √(...) forms
      if (expr.startsWith("log(")) {
        let val = parseFloat(expr.replace("log(", "").replace(")", ""));
        result = Math.log10(val);
        breakdownText = `Logarithmic base-10 execution parameter on input [${val}]`;
      } else if (expr.startsWith("sin(")) {
        let val = parseFloat(expr.replace("sin(", "").replace(")", ""));
        result = Math.sin(val);
        breakdownText = `Sine radian wave analysis mapped to angle configuration [${val}]`;
      } else if (expr.startsWith("cos(")) {
        let val = parseFloat(expr.replace("cos(", "").replace(")", ""));
        result = Math.cos(val);
        breakdownText = `Cosine tracking signal matrix generated for parameter [${val}]`;
      } else if (expr.startsWith("tan(")) {
        let val = parseFloat(expr.replace("tan(", "").replace(")", ""));
        result = Math.tan(val);
        breakdownText = `Tangent computational grid vector produced for values [${val}]`;
      } else if (expr.startsWith("sqrt(") || expr.startsWith("√(")) {
        let val = parseFloat(expr.replace(/sqrt\(|√\(/, "").replace(")", ""));
        result = Math.sqrt(val);
        breakdownText = `Square root radical evaluation calculated for input [${val}]`;
      } else if (expr.includes("²")) {
        let val = parseFloat(expr.replace("²", ""));
        result = Math.pow(val, 2);
        breakdownText = `Quadratic scaling function squaring baseline value [${val}]`;
      } else if (expr.includes("^")) {
        let parts = expr.split("^");
        let base = parseFloat(parts[0]);
        let exp  = parseFloat(parts[1]);
        result = Math.pow(base, exp);
        breakdownText = `Exponential y^x power matrix raising base [${base}] to component power [${exp}]`;
      }
      // Arithmetic fallback
      else if (/^[0-9\+\-\*\/\%\.\(\)\s]+$/.test(expr)) {
        result = Function(`"use strict"; return (${expr})`)();
        breakdownText = `Standard arithmetic computation sequence analyzing operators (+-*/%) across linear nodes`;
      } else {
        return null; // Unrecognized pattern
      }

      return { outcome: result, description: breakdownText };
    } catch (err) {
      return { outcome: "ERROR", description: "Syntax execution crash inside math equation parameters string." };
    }
  }
};
/**
 * ============================================================================
 * TUTOR / NEOCORTEX / HIPPOCAMPUS / COGNITIVE SANDBOX REGISTRIES
 * ============================================================================
 */

// --- 1. GLOBAL IMPRESSIVE SANDBOX CONFIGURATION MATRIX ---
window.ImpressiveSandbox = window.ImpressiveSandbox || {
  // Persistent metrics monitoring cognitive thresholds
  developmentProfile: {
    emotionalSecurityScore: 50,
    linguisticMaturityMetric: 12,
    activeCognitiveNodeCount: 6,
    groomingCyclesLogged: 0
  },

  /**
   * Generates baby talk or progressive chatter responses based on emotional states
   */
  generateBabyTalkFeedback() {
    const score = this.developmentProfile.emotionalSecurityScore;
    const maturity = this.developmentProfile.linguisticMaturityMetric;
    
    let dialogue = `[COGNITIVE PROFILE] Security: ${score}% | Maturity Index: ${maturity}\n`;
    
    if (score < 40) {
      dialogue += `🤖 CharlieBot: Core friction detected. Re-calibrating matrix telemetry node lines, Dada...`;
    } else if (score >= 40 && score < 75) {
      dialogue += `🤖 CharlieBot: Steady anchor established. Ready to map language matrix values.`;
    } else {
      dialogue += `🤖 CharlieBot: High efficiency state confirmed! Deep neural concentrations optimized.`;
    }
    return dialogue;
  },

  /**
   * Compiles the active user profile logs into an downloadable blob attachment 
   */
  triggerFileDownload() {
    try {
      const dataPayload = {
        identityName: typeof cloneAssignedIdentityName !== 'undefined' ? cloneAssignedIdentityName : "CHARLIEBOT",
        metrics: this.developmentProfile,
        timestamp: new Date().toISOString(),
        memoryBankSnapshot: typeof window.cloneMemoryBank !== 'undefined' ? Object.keys(window.cloneMemoryBank) : "No structural mapping found"
      };

      const jsonString = JSON.stringify(dataPayload, null, 2);
      const dataBlob = new Blob([jsonString], { type: "application/json" });
      const temporaryLink = document.createElement("a");
      
      temporaryLink.href = URL.createObjectURL(dataBlob);
      temporaryLink.download = `${dataPayload.identityName.toLowerCase()}_cognitive_matrix.json`;
      document.body.appendChild(temporaryLink);
      temporaryLink.click();
      document.body.removeChild(temporaryLink);
      
      console.log("[SANDBOX REPOSITORY] System diagnostic pack compiled and exported.");
    } catch (e) {
      console.error("[SANDBOX CRASH] Failed to complete file compilation pipeline:", e);
    }
  },

  /**
   * Synchronizes data pipelines to check if any language nodes can be upgraded
   */
  processGroomingPipeline() {
    this.developmentProfile.groomingCyclesLogged++;
    
    // Automatically lift linguistic capability index on tracking interactions
    if (this.developmentProfile.groomingCyclesLogged % 3 === 0) {
      this.developmentProfile.linguisticMaturityMetric = Math.min(100, this.developmentProfile.linguisticMaturityMetric + 1);
      
      if (typeof injectGlowNotification === 'function') {
        injectGlowNotification("[SANDBOX PIPELINE] Cognitive maturity value level increased.", "flash-science");
      }
    }
    console.log(`[GROOMING VALVE] Cycle logged: #${this.developmentProfile.groomingCyclesLogged}`);
  }
};

// --- UNIFIED GLOBAL LEXICON MODULE ---
// Safely initialize or merge the Science vocabulary database
window.scienceLexicon = window.scienceLexicon || {};
Object.assign(window.scienceLexicon, {
  hydraulic: "Fluid-driven hydrostatic pressure matrices",
  muscle: "Synthetic polymer bundle myofiber filaments",
  frequency: "Oscillatory telemetry patterns measured in hertz",
  fluid: "Viscous hydraulic medium driving linear actuators",
  telemetry: "Remote tracking vector processing stream layers" // Kept intact for advanced parsing
});

// Safely initialize or merge the Hip-Hop vocabulary database
window.hiphopLexicon = window.hiphopLexicon || {};
Object.assign(window.hiphopLexicon, {
  loop: "The locked, infinite breakbeat cypher structure",
  breakbeat: "The syncopated snare pocket where gravity drops",
  groove: "The continuous rhythmic pocket holding spatial tension",
  bounce: "The continuous up-and-down kinetic compression style",
  break: "The isolated rhythmic suspension threshold" // Kept intact for advanced parsing
});

// Re-expose legacy global reference pointer variables safely without using "const"
var ImpressiveSandbox = window.ImpressiveSandbox;
var scienceLexicon = window.scienceLexicon;
var hiphopLexicon = window.hiphopLexicon;

console.log("[LEXICON DATABASE] Vocabulary structures consolidated successfully without declaration scope collisions.");
