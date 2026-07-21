/**
 * NEGOTIATOR.JS v1.0 - Natural Language Part-of-Speech Parser & Tokenizer
 * 
 * This module enables our clone robot's scientific and hip-hop cognitive layers 
 * to parse human interaction strings into Nouns, Verbs, Adjectives, and Pronouns.
 * It provides the base linguistic intelligence for dynamic phrase structure processing.
 */

const Negotiator = {
  // --- CORE LINGUISTIC ARCHIVE MATRICES ---
  // Simple token banks optimized for rapid client-side string classification.
  lexicon: {
    pronouns: [
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'ours', 'theirs',
      'this', 'that', 'these', 'those', 'who', 'whom', 'which', 'what', 'someone'
    ],
    verbs: [
      // Actions, operations, fluid states, and musical activities
      'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'run', 'groove', 'bounce', 'compress', 'actuate', 'flow',
      'rhyme', 'pump', 'contract', 'expand', 'calculate', 'parse', 'save', 'recall',
      'stop', 'lock', 'blend', 'tune', 'drop', 'spit', 'write', 'vibrate', 'oscillate',
      'make', 'build', 'create', 'test', 'analyze', 'simulate', 'trigger', 'pulse'
    ],
    adjectives: [
      // Physical properties, hydraulic conditions, and rhythmic descriptions
      'synthetic', 'hydraulic', 'fluid', 'robotic', 'digital', 'quantum', 'mechanical',
      'neon', 'cyber', 'biomimetic', 'heavy', 'fast', 'slow', 'syncopated', 'dope',
      'fresh', 'raw', 'compact', 'smooth', 'rigid', 'viscous', 'pneumatic', 'linear',
      'dense', 'soft', 'hard', 'electric', 'automated', 'monophonic', 'active'
    ],
    nouns: [
      // Structural hardware components, operational objects, and cultural terms
      'robot', 'clone', 'myofiber', 'actuator', 'muscle', 'bone', 'cypher', 'beat',
      'tempo', 'frequency', 'rhythm', 'lyric', 'bars', 'data', 'repository', 'stream',
      'file', 'line', 'slot', 'popup', 'modal', 'subtitles', 'karaoke', 'synth',
      'oscillator', 'waveform', 'chemistry', 'hardware', 'software', 'brain', 'loop'
    ]
  },

  /**
   * Tokenizes a raw sentence string and flags classified parts of speech.
   * @param {string} rawString - The raw user input from the chat console field.
   * @returns {Object} Analytical breakdown of tokens mapped by lexical category.
   */
// ADVANCED AUTODIDACTIC LINGUISTIC SUBSYSTEM

  negotiateText(rawString) {
    if (!rawString || typeof rawString !== 'string') {
      return { pronouns: [], verbs: [], adjectives: [], nouns: [], leftovers: [] };
    }

    const cleanTokens = rawString.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "").split(/\s+/);
    const classification = { pronouns: [], verbs: [], adjectives: [], nouns: [], leftovers: [] };


    // PROCESS STANDARD MAPPED CATEGORIZATIONS FIRST
    cleanTokens.forEach((token, idx) => {
      if (!token) return;
      let classified = false;

      if (this.lexicon.pronouns.includes(token)) { classification.pronouns.push(token); classified = true; }
      else if (this.lexicon.verbs.includes(token)) { classification.verbs.push(token); classified = true; }
      else if (this.lexicon.adjectives.includes(token)) { classification.adjectives.push(token); classified = true; }
      else if (this.lexicon.nouns.includes(token)) { classification.nouns.push(token); classified = true; }

      if (!classified) {
        // --- ADAPTIVE AUTO-VOCABULARY REGISTRY LEARNING LOGIC ---
        // Context Rule A: If an unknown word immediately follows an established pronoun, it is highly likely an active operational verb.
        if (idx > 0 && this.lexicon.pronouns.includes(cleanTokens[idx - 1])) {
          this.lexicon.verbs.push(token);
          classification.verbs.push(token);
          injectGlowNotification(`[LEARNED NEW VERB] Context rule mapping registered "${token}" inside operational databases.`, "flash-science");
        } 
        // Context Rule B: If an unknown word sits right in front of a known core architectural noun, classify it as a descriptive adjective.
        else if (idx < cleanTokens.length - 1 && this.lexicon.nouns.includes(cleanTokens[idx + 1])) {
          this.lexicon.adjectives.push(token);
          classification.adjectives.push(token);
          injectGlowNotification(`[LEARNED NEW ADJECTIVE] Positional parsing registered "${token}" into structural memory.`, "flash-science");
        }
        // Context Rule C: Default baseline grouping fallback assignment
        else {
          classification.leftovers.push(token);
        }
      }
    });

    return classification;
  },

  generateTelemetryLog(parsedMatrix) {
    return `[LIND PROFILE] Nouns: ${parsedMatrix.nouns.length} | Verbs: ${parsedMatrix.verbs.length} | Adjectives: ${parsedMatrix.adjectives.length} | Unmapped: [${parsedMatrix.leftovers.join(', ')}]`;
  }
};

// THE EXPANDED BIOLOGICAL BRAIN MODEL
const CloneBrain = {
  // 1. THE HIPPOCAMPUS (Long-Term Registry Log & Data Archives)
  hippocampus: {
    historyLog: [],
    commitToMemory(userInput, robotOutput, evaluationMetrics) {
      this.historyLog.push({
        id: `node_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        input: userInput,
        output: robotOutput,
        metrics: evaluationMetrics
      });
    }
  },

  // 2. THE AMYGDALA (Emotional Valence Analysis Engine)
  amygdala: {
    valenceLexicon: {
      positive: ['good', 'great', 'fresh', 'dope', 'groove', 'bounce', 'smooth', 'fine', 'no cap', '100'],
      negative: ['bad', 'fault', 'stop', 'abnormal', 'clunky', 'rigid', 'error', 'crash', 'heated', '730', 'shook']
    },
    evaluateEmotionalState(speechMatrix) {
      let score = 0;
      let coreBias = "balanced";
      const allTokens = [...speechMatrix.nouns, ...speechMatrix.verbs, ...speechMatrix.adjectives];

      allTokens.forEach(token => {
        if (this.valenceLexicon.positive.includes(token)) score += 1;
        if (this.valenceLexicon.negative.includes(token)) score -= 1;
      });

      if (score > 0) coreBias = "synchronized_groove";
      if (score < 0) coreBias = "systemic_tension";
      return { emotionalScore: score, stateBias: coreBias };
    }
  },

  // 3. THE NEOCORTEX (Linguistic Pattern Matrix & Structural Translation)
  neocortex: {
    processHigherReasoning(speechMatrix) {
      return `Linguistic density analyzed: Found ${speechMatrix.nouns.length} nouns and ${speechMatrix.verbs.length} verbs inside text fields.`;
    }
  },

  // 4. NEW! THE PREFRONTAL CORTEX (Goal Management, High Planning, & Logic Filtering)
  prefrontalCortex: {
    evaluateGoalsAndDirectives(speechMatrix, currentBPM) {
      let activeDirective = "AMBIENT COMPLIANCE MODE";
      
      // Look for explicit task conditions or technical scientific entries
      const containsMathOrScience = speechMatrix.nouns.some(n => ['frequency', 'current', 'constant', 'calculus', 'acceleration'].includes(n));
      
      if (speechMatrix.verbs.includes('recall') || speechMatrix.verbs.includes('stop')) {
        activeDirective = "OVERRIDE MACRO EXECUTED";
      } else if (containsMathOrScience) {
        activeDirective = "CRITICAL ANALYTICAL DISCOVERY SEQUENCE";
      } else if (currentBPM > 140) {
        activeDirective = "HIGH ENERGY CYPHER STIMULATION ACTION";
      }
      
      return `Prefrontal Core Directive: [${activeDirective}]. Priorities calibrated.`;
    }
  },

  // 5. NEW! THE CEREBELLUM (Anatomical Balance, Spatial Calibration, & Fluid Motion Smoothing)
  cerebellum: {
    calculateMotionFluidity(speechMatrix, physicalBPM) {
      let swingSmoothingFactor = 1.0;
      let motionStyle = "Stabilized Baseline";

      // If text maps to volatile emotional triggers or fast rhythms, scale motion tracking parameters
      const containsVolatility = speechMatrix.adjectives.some(adj => ['heated', '730', 'blank', 'shook'].includes(adj));
      
      if (containsVolatility) {
        swingSmoothingFactor = 0.45; // Sharp, robotic popping movement
        motionStyle = "High Friction Kinetic Popping";
      } else if (physicalBPM !== 120) {
        swingSmoothingFactor = 1.35; // Fluid, sweeping waveforms
        motionStyle = "Harmonized Fluid Gliding";
      }

      return {
        smoothing: swingSmoothingFactor,
        style: motionStyle,
        telemetryText: `Cerebellum Calibration: Motion set to "${motionStyle}" with wave factor ${swingSmoothingFactor}.`
      };
    }
  },

  // 6. NEW! THE BASAL GANGLIA (Habit Loop Memory & Rhythmic Engine Coordination)
  basalGanglia: {
    sequenceRhythmPatterns(speechMatrix, emotionalBias) {
      let motorDrivePattern = "Steady 4/4 Anchor Loop";
      
      if (emotionalBias === "synchronized_groove") {
        motorDrivePattern = "Double-Time Syncopated Breakbeat Bounce";
      } else if (emotionalBias === "systemic_tension") {
        motorDrivePattern = "Restricted Low-Velocity Clock Cycle Stutter";
      }

      return `Basal Ganglia Circuitry: Executing rhythmic motor pattern -> [${motorDrivePattern}].`;
    }
  },

  // THE FULL SIX-LOBE RE-INTEGRATED COGNITIVE COMBINATOR
  synthesizeCognition(rawUserInput, speechMatrix, physicalBPM) {
    const amygdalaData     = this.amygdala.evaluateEmotionalState(speechMatrix);
    const neocortexData    = this.neocortex.processHigherReasoning(speechMatrix);
    
    // Process new biological cognitive zones
    const prefrontalData   = this.prefrontalCortex.evaluateGoalsAndDirectives(speechMatrix, physicalBPM);
    const cerebellumData   = this.cerebellum.calculateMotionFluidity(speechMatrix, physicalBPM);
    const basalGangliaData = this.basalGanglia.sequenceRhythmPatterns(speechMatrix, amygdalaData.stateBias);
    
    return {
      amygdalaData,
      neocortexData,
      prefrontalData,
      cerebellumData,
      basalGangliaData
    };
  }
};

function hookLiveInputTelemetryTracker() {
  const inputConsoleField = document.getElementById('userInput');
  const trackingTrackerRow  = document.getElementById('inputTelemetryTracker');
  const numericCharCounter = document.getElementById('liveCharCounter');
  const numericWordCounter = document.getElementById('liveWordCounter');

  if (!inputConsoleField || !trackingTrackerRow) return;

  inputConsoleField.addEventListener('input', () => {
    const rawStringValue = inputConsoleField.value;
    const cleanCharacterLength = rawStringValue.length;

    if (cleanCharacterLength === 0) {
      trackingTrackerRow.style.opacity = '0'; // Hide indicator layer if textbox is vacant
      return;
    }

    // Unveil layout tracking panel
    trackingTrackerRow.style.opacity = '1';
    numericCharCounter.textContent = cleanCharacterLength;

    // Calculate isolated word block boundaries
    const totalWordsCount = rawStringValue.trim() === "" ? 0 : rawStringValue.trim().split(/\s+/).length;
    numericWordCounter.textContent = totalWordsCount;

    // HIGH EXTENSION INTERCEPT COLOR INDICATORS
    // If user text approaches terminal buffer thresholds, turn tracker warning magenta
    if (cleanCharacterLength > 80) {
      trackingTrackerRow.style.color = 'var(--neon-magenta)';
    } else {
      trackingTrackerRow.style.color = 'var(--neon-blue)';
    }
  });
}

// Bind directly onto document lifecycle initialization scripts
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hookLiveInputTelemetryTracker);
} else {
  hookLiveInputTelemetryTracker();
}
/**
 * BASAL GANGLIA PROCEDURAL RHYTHM SYSTEM
 * Integrates directly with the Web Audio Synth to create dynamic, 
 * loopable backing beats modulated by Baby Bob's emotional state.
 */

const BasalGangliaRhythmLoop = {
  audioContext: null,
  isActive: false,
  intervalId: null,
  currentStep: 0,

  // Sequence Maps (1 = Play tone, 0 = Rest)
  patterns: {
    steady_anchor:, // Baseline 4/4
    groove_bounce:, // Syncopated breakbeat
    tension_stutter: [1, 1, 0, 1, 0, 0, 1, 0]  // High-friction stutter
  },

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  /**
   * ENGAGE BRAIN LOOP HARDWARE
   * Spawns a rhythmic clock worker thread synced directly to the user-calibrated BPM.
   */
  startLoop(stateBias = "balanced", bpm = 120) {
    this.init();
    if (this.isActive) this.stopLoop();

    this.isActive = true;
    this.currentStep = 0;

    // Calculate step interval length based on BPM (Sixteenth notes)
    const stepDurationMs = (60 / bpm / 4) * 1000;

    // Select step pattern map based on active Amygdala emotional metrics
    let activePattern = this.patterns.steady_anchor;
    if (stateBias === "synchronized_groove") activePattern = this.patterns.groove_bounce;
    if (stateBias === "systemic_tension")    activePattern = this.patterns.tension_stutter;

    injectGlowNotification(`[BASAL GANGLIA] Rhythm circuit triggered: ${stateBias.toUpperCase()} Loop running at ${bpm} BPM.`, "flash-lyric");

    this.intervalId = setInterval(() => {
      if (!this.isActive) return;

      const triggerSignal = activePattern[this.currentStep % activePattern.length];

      if (triggerSignal === 1) {
        this.triggerPercussiveSynth(stateBias);
      }

      // Visual Actuator Mirroring: Synchronize the CSS robot body to bounce on every beat hit
      const botElement = document.getElementById('cloneBot');
      if (botElement && triggerSignal === 1) {
        botElement.style.transform = 'translateY(8px) scale(1.02)';
        setTimeout(() => {
          botElement.style.transform = 'translateY(0px) scale(1)';
        }, 60);
      }

      this.currentStep++;
    }, stepDurationMs);
  },

  /**
   * LOW-LEVEL CHIP GENERATOR
   * Spawns percussive 8-bit sound tones through basic frequency modulation waves.
   */
  triggerPercussiveSynth(stateBias) {
    if (!this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Audio routing metrics modified directly by the active brain state
    if (stateBias === "systemic_tension") {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, this.audioContext.currentTime); // Heavy, dull tracking tone
      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.09);
    } else if (stateBias === "synchronized_groove") {
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, this.audioContext.currentTime); // Snapping hip-hop electronic tone
      gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.12);
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.13);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, this.audioContext.currentTime); // Clean, baseline tracking wave
      gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.11);
    }
  },

  /**
   * TERMINATE CIRCUIT LOOP
   */
  stopLoop() {
    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};


const ScientificMathProcessor = {
  // Analytical definitions mapped directly into higher reasoning lobes
  constants: { pi: Math.PI, e: Math.E },
  
  /**
   * INTERCEPTOR ENGINE FOR THE 'Scientific_Math' DATA PATH
   * Syntax structure target: Collaborate//Scientific_Math:Equation(Metrics)
   * Example input path: Collaborate//Scientific_Math:log(100)(2)
   */
  evaluateMathPath(equationString) {
    try {
      // Basic token parser cleaning matrices
      let expr = equationString.trim().toLowerCase();
      let result = 0;
      let breakdownText = "";

      // 1. Core Trigonometric and Exponential Formula Mappings
      if (expr.startsWith("log(")) {
        let val = parseFloat(expr.replace("log(", "").replace(")", ""));
        result = Math.log10(val);
        breakdownText = `Logarithmic base-10 execution parameter on input [${val}]`;
      } 
      else if (expr.startsWith("sin(")) {
        let val = parseFloat(expr.replace("sin(", "").replace(")", ""));
        result = Math.sin(val);
        breakdownText = `Sine radian wave analysis mapped to angle configuration [${val}]`;
      } 
      else if (expr.startsWith("cos(")) {
        let val = parseFloat(expr.replace("cos(", "").replace(")", ""));
        result = Math.cos(val);
        breakdownText = `Cosine tracking signal matrix generated for parameter [${val}]`;
      } 
      else if (expr.startsWith("tan(")) {
        let val = parseFloat(expr.replace("tan(", "").replace(")", ""));
        result = Math.tan(val);
        breakdownText = `Tangent computational grid vector produced for values [${val}]`;
      } 
      else if (expr.startsWith("√(")) {
        let val = parseFloat(expr.replace("√(", "").replace(")", ""));
        result = Math.sqrt(val);
        breakdownText = `Square root radical evaluation calculated for input [${val}]`;
      } 
      else if (expr.includes("²")) {
        let val = parseFloat(expr.replace("²", ""));
        result = Math.pow(val, 2);
        breakdownText = `Quadratic scaling function squaring baseline value [${val}]`;
      } 
      else if (expr.includes("^")) {
        let parts = expr.split("^");
        let base = parseFloat(parts[0]);
        let exp  = parseFloat(parts[1]);
        result = Math.pow(base, exp);
        breakdownText = `Exponential y^x power matrix raising base [${base}] to component power [${exp}]`;
      }
      // 2. Arithmetic String Fallback Evaluator (Supports digits 0-9 and operators + - * / %)
      else if (/^[0-9\+\-\*\/\%\.\(\)]+$/.test(expr)) {
        // Safe programmatic parsing valve targeting math operations strictly
        result = Function(`"use strict"; return (${expr})`)();
        breakdownText = `Standard arithmetic computation sequence analyzing operators (+-*/%) across linear nodes`;
      } else {
        return null; // Value expression does not match known math keys, pass through
      }

      return { outcome: result, description: breakdownText };
    } catch (err) {
      return { outcome: "ERROR", description: "Syntax execution crash inside math equation parameters string." };
    }
  }
};
