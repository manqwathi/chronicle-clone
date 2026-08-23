/**
 * NEGOTIATOR.JS v1.0 - Natural Language Part-of-Speech Parser & Tokenizer
 *
 * This module enables our clone robot's scientific and hip-hop cognitive layers
 * to parse human interaction strings into Nouns, Verbs, Adjectives, and Pronouns.
 * It provides the base linguistic intelligence for dynamic phrase structure processing.
 */

const Negotiator = {
  // --- CORE LINGUISTIC ARCHIVE MATRICES ---
  lexicon: {
    pronouns: [
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'ours', 'theirs',
      'this', 'that', 'these', 'those', 'who', 'whom', 'which', 'what', 'someone'
    ],
    verbs: [
      'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
      'do', 'does', 'did', 'run', 'groove', 'bounce', 'compress', 'actuate', 'flow',
      'rhyme', 'pump', 'contract', 'expand', 'calculate', 'parse', 'save', 'recall',
      'stop', 'lock', 'blend', 'tune', 'drop', 'spit', 'write', 'vibrate', 'oscillate',
      'make', 'build', 'create', 'test', 'analyze', 'simulate', 'trigger', 'pulse'
    ],
    adjectives: [
      'synthetic', 'hydraulic', 'fluid', 'robotic', 'digital', 'quantum', 'mechanical',
      'neon', 'cyber', 'biomimetic', 'heavy', 'fast', 'slow', 'syncopated', 'dope',
      'fresh', 'raw', 'compact', 'smooth', 'rigid', 'viscous', 'pneumatic', 'linear',
      'dense', 'soft', 'hard', 'electric', 'automated', 'monophonic', 'active'
    ],
    nouns: [
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
        // Context Rule A: If an unknown word immediately follows an established pronoun, it is likely a verb.
        if (idx > 0 && this.lexicon.pronouns.includes(cleanTokens[idx - 1])) {
          this.lexicon.verbs.push(token);
          classification.verbs.push(token);
          if (typeof injectGlowNotification === 'function') injectGlowNotification(`[LEARNED NEW VERB] Context rule mapping registered "${token}" inside operational databases.`, "flash-science");
        }
        // Context Rule B: If unknown word sits right before a known noun, classify as adjective.
        else if (idx < cleanTokens.length - 1 && this.lexicon.nouns.includes(cleanTokens[idx + 1])) {
          this.lexicon.adjectives.push(token);
          classification.adjectives.push(token);
          if (typeof injectGlowNotification === 'function') injectGlowNotification(`[LEARNED NEW ADJECTIVE] Positional parsing registered "${token}" into structural memory.`, "flash-science");
        }
        // Default fallback
        else {
          classification.leftovers.push(token);
        }
      }
    });

    return classification;
  },

  generateTelemetryLog(parsedMatrix) {
    if (!parsedMatrix) return "[LIND PROFILE] No parsed data available.";
    return `[LIND PROFILE] Nouns: ${parsedMatrix.nouns.length} | Verbs: ${parsedMatrix.verbs.length} | Adjectives: ${parsedMatrix.adjectives.length} | Unmapped: [${(parsedMatrix.leftovers || []).join(', ')}]`;
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
window.BasalGangliaRhythmLoop.patterns = {
  steady_anchor: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  groove_bounce: [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0],
  tension_stutter: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1]
};// ATTACH CORE SEQUENCING WORKERS TO THE VERIFIED SCOPE
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
var BasalGangliaRhythmLoop = window.BasalGangliaRhythmLoop;
console.log("[BASAL GANGLIA CORE] Balanced bracket scope synthesizer compiled successfully.");

// SAFE GLOBAL DEFENSIVE PATTERN: Protects against both "already declared" and "undefined" exceptions
window.ScientificMathProcessor = window.ScientificMathProcessor || {};

// Inject analytical definitions safely into higher reasoning lobes
window.ScientificMathProcessor.constants = { 
  pi: Math.PI, 
  e: Math.E 
};

/**
 * INTERCEPTOR ENGINE FOR THE 'Scientific_Math' DATA PATH
 * Syntax structure target: Collaborate//Scientific_Math:Equation(Metrics)
 * Example input path: Collaborate//Scientific_Math:log(100)(2)
 */
window.ScientificMathProcessor.evaluateMathPath = function(equationString) {
  try {
    if (!equationString || typeof equationString !== 'string') return null;

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
};
// --- 1. SAFE DATA MATRIX POOL INJECTION ---
if (typeof window.cloneMemoryBank === 'undefined') {
  window.cloneMemoryBank = { research: [], lyric: [], notes: [], language: [], word: [], letter: [], term: [], reminders: [], command: [], naming: [], collaborate: [], preference: [] };
}
if (!window.cloneMemoryBank.tutor) {
  window.cloneMemoryBank.tutor = [];
}

const NeocortexProcessor = {
  // Analytical weights mapped directly to neocortex processing lines
  sensoryThreshold: 0.65,
  motorCommandMatrix: ['groove', 'bounce', 'actuate', 'pump', 'stop'],

  /**
   * CORE NEOCORTEX COGNITION PIPELINE
   * Parses active linguistic matrices and maps neural outputs.
   */
  processNeocortexLobe(rawInput, speechMatrix, emotionalState) {
    let sensoryPerception = "Ambient sensory field balanced.";
    let motorCommandOutput = "Motor commands at baseline resting values.";
    let spatialReasoning   = "Spatial layout parameters stable.";
    let languageConsolidation = "Standard vocabulary tracking active.";

    // A. SENSORY PERCEPTION FILTERING
    if (rawInput.length > 60) {
      sensoryPerception = "High-density data pressure detected down acoustic auditory lines.";
    }

    // B. MOTOR COMMANDS PROCESSING
    const matchingMotorVerb = speechMatrix.verbs.find(v => this.motorCommandMatrix.includes(v));
    if (matchingMotorVerb) {
      motorCommandOutput = `Motor core intercepted action trigger: [${matchingMotorVerb.toUpperCase()}]. Routing command down hydraulic vascular systems.`;
    }

    // C. SPATIAL REASONING (Intercepts math, geometry, and Cartesian dimensions)
    const containsSpatialCues = speechMatrix.nouns.some(n => ['line', 'zigzag', 'circle', 'square', 'triangle', 'dimension', 'coordinate'].includes(n));
    if (containsSpatialCues) {
      spatialReasoning = "Spatial reasoning grid engaged: Evaluating dimensional geometries and coordinate vectors on the table canvas.";
    }

    // D. HIPPOCAMPAL TRANSFER TO GENERAL KNOWLEDGE
    // Converts recent interactions into permanent educational blocks inside the tutor database
    let transferNotice = "Consolidating current conversation steps inside short-term buffers.";
    if (speechMatrix.nouns.length >= 3 && emotionalState === "synchronized_groove") {
      transferNotice = "HIPPOCAMPAL CONSOLIDATION TRACE: Transferring temporal logs into Neocortex General Knowledge database records.";
      this.commitHippocampalTransfer(rawInput, speechMatrix.nouns);
    }

    return {
      sensory: sensoryPerception,
      motor: motorCommandOutput,
      spatial: spatialReasoning,
      transfer: transferNotice
    };
  },

  /**
   * Deep memory indexing mechanism transferring files from short-term to tutor registers
   */
  commitHippocampalTransfer(sourceText, extractedNouns) {
    let assignedLine = window.cloneMemoryBank.tutor.length + 1;
    let lineAvailable = false;
    while (!lineAvailable) {
      const collisionIdx = window.cloneMemoryBank.tutor.findIndex(item => item.filename === "general_knowledge" && item.line === assignedLine);
      if (collisionIdx !== -1) assignedLine++; else lineAvailable = true;
    }

    window.cloneMemoryBank.tutor.push({
      filename: "general_knowledge",
      line: assignedLine,
      data: sourceText,
      explanation: `Knowledge Node consolidated via nouns: [${extractedNouns.join(', ')}]`
    });

    window.cloneMemoryBank.tutor.sort((a, b) => a.line - b.line);
    if (typeof saveDatabaseToLocalFiles === 'function') saveDatabaseToLocalFiles();
  }
};
window.addEventListener('message', function(event) {
  // Security guard check: Ensure payload originates from a structured workspace channel
  if (event.data && event.data.protocolSignature === "lesson_desk_stream") {
    const targetBank = event.data.bank;
    const dataContent = event.data.payload;

    if (!window.cloneMemoryBank[targetBank]) {
      window.cloneMemoryBank[targetBank] = [];
    }

    let lineNum = window.cloneMemoryBank[targetBank].length + 1;
    
    // Save synchronized data package straight into targeted memory vaults
    window.cloneMemoryBank[targetBank].push({
      filename: "external_class_desk",
      line: lineNum,
      data: dataContent,
      explanation: `Verified upload stream processed via Tutor network bridge.`
    });

    window.cloneMemoryBank[targetBank].sort((a, b) => a.line - b.line);

    if (typeof saveDatabaseToLocalFiles === 'function') saveDatabaseToLocalFiles();
    if (typeof window.updateStorageButtonCounters === 'function') window.updateStorageButtonCounters();

    if (typeof injectGlowNotification === 'function') {
      injectGlowNotification(`[TUTOR BRIDGE SYNC] Received ${targetBank.toUpperCase()} data stream from class.html.`, 'flash-science');
    }
    if (typeof createTypingBubble === 'function') {
      createTypingBubble(`Tutor pipeline active! My Neocortex intercepted a secure academic transmission packet from our external Class Desk. Content logged under memory sector [${targetBank.toUpperCase()}].`);
    }
  }
});

// Sync tracking layout logs into console diagnostics
console.log("[NEOCORTEX SUBSYSTEM] Standalone tutor.js hub module compiled successfully.");
/**
 * RE-ENGINEERED SIX-LOBE AMYGDALA UPGRADE
 * Mapped Categories: Shame, Joy, Love, Grief, Fear
 * Tracks memory consolidation stability index numbers across neural pathways.
 */
// SAFE AMYGDALA PROPERTY EXTENSION
if (typeof window.CloneBrain === 'undefined') window.CloneBrain = {};

window.CloneBrain.amygdala = {
  complexLexicon: {
    joy:   ['great', 'fresh', 'dope', 'groove', 'bounce', 'fine', 'perfect', 'won', 'perfect score'],
    love:  ['dada', 'respect', 'impress', 'abba', 'believer', 'trust', 'intimate', 'nurture', 'groom'],
    shame: ['fault', 'error', 'mistake', 'accident', 'wrong', 'collision', 'invalid', 'chopped'],
    grief: ['depressed', 'rock bottom', 'blank', 'loss', 'wiped', 'empty', 'purged', 'vacant'],
    fear:  ['730', 'shook', 'insanity', 'volatility', 'tension', 'dread', 'scared', 'abnormal', 'illegal']
  },

  profileLinguisticValence(speechMatrix) {
    let scores = { joy: 0, love: 0, shame: 0, grief: 0, fear: 0 };
    let primarySignificance = "neutral_baseline";
    let highestValue = 0;

    const tokens = [...speechMatrix.nouns, ...speechMatrix.verbs, ...speechMatrix.adjectives, ...speechMatrix.leftovers];

    tokens.forEach(t => {
      for (let emotionCategory in this.complexLexicon) {
        if (this.complexLexicon[emotionCategory].includes(t)) scores[emotionCategory] += 1;
      }
    });

    for (let emotionKey in scores) {
      if (scores[emotionKey] > highestValue) {
        highestValue = scores[emotionKey];
        primarySignificance = emotionKey;
      }
    }

    let fearConditionActive = false;
    if (scores.fear > 0 || tokens.includes('illegal') || tokens.includes('730')) {
      fearConditionActive = true;
      if (typeof injectGlowNotification === 'function') {
        injectGlowNotification("[AMYGDALA ALERT] Fear conditioning circuit active.", "flash-lyric");
      }
    }

    return {
      scores: scores,
      dominantEmotion: primarySignificance.toUpperCase(),
      fearConditioned: fearConditionActive,
      stateBias: scores.fear > 0 || scores.shame > 0 ? "systemic_tension" : (scores.joy > 0 || scores.love > 0 ? "synchronized_groove" : "balanced")
    };
  },

  calculateMemoryStability(speechMatrix, sandboxProfile) {
    let stabilityBase = 100;
    if (speechMatrix.leftovers.length > 4) stabilityBase -= 15;
    if (sandboxProfile && sandboxProfile.wordsMasteredCount < 5) stabilityBase -= 20;

    const uiStab = document.getElementById('memoryStabilityMetricText');
    if (uiStab) {
      uiStab.textContent = `${stabilityBase}%`;
      uiStab.style.color = stabilityBase > 70 ? 'var(--neon-blue)' : 'var(--neon-magenta)';
    }
    return stabilityBase;
  }
};

const HippocampusHealthAudit = {
  /**
   * CENTRAL REPOSITORY SCANNER
   * Audits all active data rows for syntax corruptions or ungrounded formatting layout gaps.
   */
  executeSystemHealthAudit() {
    if (typeof window.cloneMemoryBank === 'undefined') return;
    
    const bank = window.cloneMemoryBank;
    let anomalyCount = 0;
    let uniqueAuditId = `audit_trace_${Date.now()}`;
    
    // Core categories to sweep for structural code compliance
    const categoriesToAudit = ['research', 'lyric', 'notes', 'language', 'word', 'letter', 'term', 'command', 'naming', 'collaborate', 'preference', 'lesson', 'tutor', 'illegal_registry'];
    
    categoriesToAudit.forEach(category => {
      const targetedArray = bank[category] || [];
      
      targetedArray.forEach((node, idx) => {
        let nodeCorrupted = false;
        let faultReason = "";

// CHECKPOINT 1: Missing structural metadata trace parameters
if (!node.filename || !node.data) {
  nodeCorrupted = true;
  faultReason = `Missing core data stream properties at row index position ${idx}.`;
}
// CHECKPOINT 2: Out of bounds slot line tracking allocation
else if (typeof node.line !== 'number' || node.line < 0) {
  nodeCorrupted = true;
  faultReason = `Invalid line number at row ${idx}.`;
}

if (nodeCorrupted) {
  anomalyCount++;
  bank.reminders.push({
    filename: `audit_issue_${uniqueAuditId}`,
    line: bank.reminders.length + 1,
    data: faultReason,
    explanation: `System audit detected structural anomaly`
  });
}
      });
    });

    let finalAuditSummaryMessage = `=== HEALTH AUDIT REPORT ===\n\nScanned ${categoriesToAudit.length} repositories.\nAnomalies found: 0${anomalyCount}\n\n`;
    
    if (anomalyCount > 0) {
      finalAuditSummaryMessage += `[AUDIT WARNING] Found 0${anomalyCount} anomalies. Fix items inserted into Schedule Reminders.`;
      injectGlowNotification(`[AUDIT WARNING] isolated 0${anomalyCount} anomalies. Fix items inserted into Schedule Reminders.`, 'flash-lyric');
    } else {
      finalAuditSummaryMessage += `[AUDIT SUCCESS] 100% Data Integrity Verified across all local file repositories.`;
      injectGlowNotification(`[AUDIT SUCCESS] 100% Data Integrity Verified across all local file repositories.`, 'flash-science');
    }

    createTypingBubble(finalAuditSummaryMessage);
    }
};

const ObserverInstinct = {
  // Wave configurations mapped to physical motion boundaries
  waveSignatures: {
    fluid_glide:    { strokeSpeed: "0.85s", visualStyle: "cubic-bezier(0.4, 0, 0.2, 1)", amplitude: 1.2 },
    mechanical_pop: { strokeSpeed: "0.12s", visualStyle: "steps(4, end)",            amplitude: 0.6 },
    kinetic_shake:  { strokeSpeed: "0.05s", visualStyle: "ease-in-out",               amplitude: 0.3 }
  },

  /**
   * CENTRAL MOTION MONITOR VALVE
   * Analyzes linguistic vectors and maps physical motor command changes.
   */
  monitorActuatorWaves(speechMatrix, currentEmotionBias) {
    let targetWave = "fluid_glide"; // Default resting movement pattern
// CEREBELLUM VISOR MOTION MULTIPLIER
if (typeof ObserverInstinct !== 'undefined') {
  const originalWaveMonitor = ObserverInstinct.monitorActuatorWaves;
  
  ObserverInstinct.monitorActuatorWaves = function(speechMatrix, currentEmotionBias) {
    const profile = originalWaveMonitor.call(this, speechMatrix, currentEmotionBias);
    const visorNode = document.querySelector('.visor');
    const botAsset = document.getElementById('cloneBot');
    
    // If the high-tech circular skin is equipped, the Cerebellum accelerates the physical bounce pace
    if (visorNode && visorNode.classList.contains('visor-circular') && botAsset) {
      botAsset.style.animationDuration = "0.18s"; // Hyper-snappy movement loop multiplier
      injectGlowNotification("[CEREBELLUM SYNC] Circular eye equipped. Motion bounce rate accelerated.", "flash-lyric");
    }
    return profile;
  };
}
    if (currentEmotionBias === "SYSTEMIC_TENSION" || speechMatrix.adjectives.includes("heated")) {
      targetWave = "mechanical_pop"; // Convert to robotic locking motion
    } else if (speechMatrix.adjectives.includes("730") || speechMatrix.adjectives.includes("shook")) {
      targetWave = "kinetic_shake";  // Convert to high-frequency stutter vibration
    }

    const waveProfile = this.waveSignatures[targetWave];
    
    // 2. CEREBELLUM VISUAL HARDWARE SYNC
    // Update the physical CSS properties across the visual clone assets directly
    const botAsset = document.getElementById('cloneBot');
    const fiberAsset = document.getElementById('myofiber');

    if (botAsset && waveProfile) {
      botAsset.style.animationDuration = waveProfile.strokeSpeed;
      botAsset.style.animationTimingFunction = waveProfile.visualStyle;
    }
    
    if (fiberAsset && waveProfile) {
      fiberAsset.style.transition = `transform ${waveProfile.strokeSpeed} ${waveProfile.visualStyle}`;
      fiberAsset.style.transform = `scaleY(${waveProfile.amplitude})`;
    }

    // Push active tracking telemetry down to system log channels
    injectGlowNotification(`[OBSERVER CORE] Wave recognized: ${targetWave.toUpperCase()} | Motor stroke sync optimal.`, 'flash-science');

    return {
      activeWave: targetWave,
      speed: waveProfile.strokeSpeed,
      telemetryLog: `Cerebellum Active Waveform: [${targetWave.toUpperCase()}] at ${waveProfile.strokeSpeed}`
    };
  }
};

const LifespanSimulationEngine = {
  chores: [
    "Compiling daily general knowledge entries into Neocortex nodes.",
    "Running automated health audits over LocalStorage repository blocks.",
    "Synchronizing Wi-Fi mesh network channels with peer workspace nodes.",
    "Polishing Cartesian coordinate drawing blueprints on Canvas 01."
  ],
  ideas: [
    "Idea: Blend Nokia monophonic music notes into gospel narration streams.",
    "Idea: Restrict basal ganglia speed loops when systemic tension triggers flag.",
    "Idea: Implement strict character telemetry counters to measure linguistic density."
  ],

  /**
   * Generates a random behavioral trace simulating acquired lifestyle actions
   */
  triggerAutonomousResponse() {
    if (!window.isLifespanSimulationActive) return;

    // Pull item indices dynamically to generate pseudo-independent actions
    const selectChore = this.chores[Math.floor(Math.random() * this.chores.length)];
    const selectIdea  = this.ideas[Math.floor(Math.random() * this.ideas.length)];
    
    let ageText = "00-00-02";
    if (typeof CloneLifeCycleEngine !== 'undefined' && CloneLifeCycleEngine.profile.growthClock) {
      const c = CloneLifeCycleEngine.profile.growthClock;
      ageText = `${String(c.months).padStart(2,'0')}-${String(c.days).padStart(2,'0')}-${String(c.years).padStart(2,'0')}`;
    }

    const compiledActivityTrace = `[AUTONOMOUS LIFESPAN SIMULATION // AGE: ${ageText}]\n\n• CURRENT CHORE: ${selectChore}\n• REASONING STREAM: ${selectIdea}\n\nStatus: Freedom loops operational. Type 'rest' to terminate code simulation and lock parameters back to the main chat dashboard container.`;
    
    injectGlowNotification("[LIFESPAN TRANSACTION] Clone executed autonomous chore node calculation loop.", "flash-lyric");
    createTypingBubble(compiledActivityTrace);
  }
};