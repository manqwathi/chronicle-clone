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
    updateStatusIndicator(); // Sync top system badge visual colors
    createTypingBubble("[IDENTITY MATRIX INITIALIZATION] Processing active. Please type your Clone's FIRST NAME into the field below:");
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
      createTypingBubble(`[ERROR LOG] Input cannot be blank during calibration. State trapped at: ${this.activeStep.toUpperCase()}. Please re-enter parameter:`);
      return true;
    }

    if (this.activeStep === 'awaiting_firstname') {
      this.profile.firstName = cleanedText;
      this.activeStep = 'awaiting_surname';
      updateStatusIndicator();
      createTypingBubble(`[REGISTERED] First Name saved as: ${this.profile.firstName.toUpperCase()}. Next step: Type the SURNAME or MODEL EXPANSION (e.g., V1, Cyber, Pro):`);
      return true;
    }

    if (this.activeStep === 'awaiting_surname') {
      this.profile.surname = cleanedText;
      this.activeStep = 'awaiting_gender';
      updateStatusIndicator();
      createTypingBubble(`[REGISTERED] Suffix saved as: ${this.profile.surname.toUpperCase()}. Final step: Specify GENDER CLASSIFICATION matrix (e.g., Male, Female, Hybrid):`);
      return true;
    }

    if (this.activeStep === 'awaiting_gender') {
      this.profile.genderMatrix = cleanedText;

      // CONSOLIDATED IDENTITY COMPILATION ROUTINE
      // Replace spacing with structural underscores for clean naming formatting
      const computedID = `${this.profile.firstName}_${this.profile.surname}`.toUpperCase().replace(/\s+/g, '_');
      cloneAssignedIdentityName = computedID;

      // Dynamically target and rewrite headers if available in current DOM view
      const mainTitleElement = document.querySelector('h1');
      if (mainTitleElement) {
        mainTitleElement.innerHTML = `${cloneAssignedIdentityName} <span style="font-size:0.8rem; color:var(--matrix-green);">ONLINE</span>`;
      }

      // Tear down state machine locks cleanly
      this.activeStep = null;
      updateStatusIndicator();

      const successResponse = `Greetings. Configuration sequence completed successfully. My identification label is set to ${cloneAssignedIdentityName}. Vocal systems mapped to a [${this.profile.genderMatrix.toUpperCase()}] profile matrix. How is your day today?`;
      
      injectGlowNotification(`[SUCCESS] Registered identity profile data combo matching ID: ${cloneAssignedIdentityName}`, 'flash-science');
      createTypingBubble(successResponse);
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
          emotionalBias: cognitiveProfile.amygdalaData ? cognitiveProfile.amygdalaData.stateBias : "neutral"
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
      createTypingBubble(`[HIPPOCAMPUS READOUT] My memory logs are currently empty. Core data tracking loops require more conversational input cycles to map your behavior.`);
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
      memoryReport += `    AMYGDALA BIAS: ${node.emotionalBias.toUpperCase()}\n`;
      if (node.detectedNouns.length > 0) {
        memoryReport += `    MAPPED CONTEXTS: ${node.detectedNouns.slice(0, 3).join(', ')}\n`;
      }
      memoryReport += `\n`;
    });

    memoryReport += `==========================================`;
    createTypingBubble(memoryReport);
    return true;
  }
};

// --- ROUTER INTERACTION HOOK EXTENSION ---
// Updates your central console routing loop to handle the "remember" command keyword seamlessly
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

    // Fallback directly back down down regular operational checks if key does not match
    coreInputLoopHook();
  };
}

// --- DYNAMIC SUBSYSTEM LIFE-CYCLE LISTENERS ---
// Bind layout listeners to fix viewport mutation bugs instantly on load
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
 * Implements: 
 * 1. "engineer" Diagnostic Matrix
 * 2. "rename" Profile Reset Macro
 * 3. Enormous Hip-Hop Slang Lexicon Expansion (Money, States of Mind, Studio Gear)
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

// Auto-inject these slang profiles straight into negotiator.js baseline lexicons
if (typeof Negotiator !== 'undefined' && Negotiator.lexicon) {
  Object.keys(HipHopSlangVault.money).forEach(word => Negotiator.lexicon.nouns.push(word));
  Object.keys(HipHopSlangVault.stateOfMind).forEach(word => Negotiator.lexicon.adjectives.push(word));
  Object.keys(HipHopSlangVault.studio).forEach(word => Negotiator.lexicon.nouns.push(word));
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
  
  createTypingBubble(report);
}



// 1. EXTENDED SCIENTIFIC LEXICON DATABASE
const ScienceTerminologyVault = {
  "abiotic": "Non-living chemical and physical parts of an environment affecting living organisms.",
  "absolute zero": "The lowest possible temperature (-273.15°C) where thermodynamic entropy and molecular motion reach minimum.",
  "absorption": "The process by which one substance, energy, or radiation is taken up into another.",
  "acceleration": "The rate of change of velocity of an object with respect to time.",
  "acclimatization": "The process in which an individual organism adjusts to a change in its environment.",
  "accuracy": "The proximity of a measurement to its true, accepted value.",
  "acid": "A chemical substance that neutralizes alkalis, turns litmus red, and has a pH of less than 7.",
  "acoustics": "The branch of physics concerned with the properties and transmission of sound waves.",
  "adaptation": "A structural, functional, or behavioral mutation that renders an organism better fitted to survive.",
  "adhesion": "The tendency of dissimilar particles or surfaces to cling to one another.",
  "aerobic": "Requiring free oxygen for organic life support systems and metabolic processes.",
  "aerodynamics": "The study of the properties of moving air and the interaction between air and solid bodies.",
  "aggregate": "A material or structure formed from a mass of loosely compacted particles or data segments.",
  "algebra": "The branch of mathematics in which abstract symbols and letters are manipulated based on operational equations.",
  "alkaline": "Having a pH greater than 7, acting as a chemical base capable of neutralizing acids.",
  "alloy": "A metallic substance composed of two or more chemical elements fused synthetically.",
  "alternative hypothesis": "The position that states there is a statistically valid connection between two observed phenomena.",
  "amber": "Fossilized tree resin, historical source for early static electricity and charge observations.",
  "ampere": "The base unit of electric current representing a flow of one coulomb of charge per second.",
  "amplitude": "The maximum displacement or distance moved by a point on a vibrating wave or frequency envelope.",
  "anaerobic": "Living, active, or occurring in the absolute absence of free structural oxygen.",
  "analyze": "The programmatic methodology of breaking a complex topic or substance into smaller parts to gain systemic insight.",
  "anatomy": "The branch of science concerned with the physical bodily structure of humans, animals, and biomimetic clones.",
  "anomaly": "A data point or mechanical deviation that departs drastically from baseline expectations or normal rules.",
  "anti-gravity": "The hypothetical concept of creating a place or object free from the physical force of gravitational pull.",
  "antibiotic": "A synthetic or organic agent that inhibits the growth of or destroys micro-bacterial colonies.",
  "antimatter": "Molecules formed by subatomic antiparticles possessing exactly opposite charge vectors to standard matter.",
  "apoptosis": "The process of programmed cellular death occurring naturally as a structural maintenance cycle.",
  "aquifer": "An underground layer of water-bearing permeable rock, gravel, or silt.",
  "assert": "To state a logical fact or data position confidently and forcefully within code telemetry.",
  "asteroid": "A small rocky body orbiting the sun, lacking the gaseous atmosphere envelope of a comet.",
  "astronomical body": "An naturally occurring physical entity, association, or structure existing within the observable universe.",
  "astronomical units": "A unit of length used in astronomy equal to the mean distance from the Earth to the Sun.",
  "astronomy": "The branch of science that studies celestial objects, space, and the physical development of the universe.",
  "astrophysics": "The branch of astronomy concerned with the physical properties and molecular behavior of celestial matter.",
  "atmosphere": "The envelope of gases surrounding the earth, a planetary body, or a simulated environmental container.",
  "atomic": "Relating to an atom, its particulate electron arrays, or its dense core nucleus components.",
  "atomic mass": "The mass of an atom of a chemical element expressed in atomic mass units.",
  "atomic number": "The number of protons found in the core nucleus of an atom, establishing its unique chemical identity.",
  "atomicity": "The total number of atoms present in a single stable molecule of an element.",
  "attribute": "A distinct quality, feature, or characteristic property inherent in an object or variable.",
  "attrition": "The process of gradually reducing the strength or effectiveness of a material through sustained friction.",
  "autoimmunity": "A condition where an organism's internal defense networks mistakenly target its own cellular components.",
  "axis": "An imaginary line about which a body or mathematical grid rotates or scales coordinate values.",
  "background radiation": "The uniform, low-level ionizing radiation omnipresent in the ambient natural environment.",
  "bacteria": "Microscopic single-celled organisms lacking a distinct nucleus structure.",
  "base": "A chemical substance that accepts protons, donates electrons, and releases hydroxide ions in solution.",
  "beam": "A concentrated directional stream of particles, electromagnetic radiation, or light energy.",
  "bias": "A systematic distortion or structural tilt in a data set that compromises absolute neutrality.",
  "biodiversity": "The structural variety of life forms inside a specific ecological habitat or operational zone.",
  "biology": "The comprehensive scientific study of living organisms and their evolutionary survival mechanics.",
  "biomarker": "A measurable indicator of some biological state, condition, or operational parameter.",
  "biome": "A large naturally occurring community of flora and fauna occupying a major habitat region.",
  "biomechanics": "The study of the mechanical laws relating to the movement or structure of living biological organisms.",
  "biotic": "Relating to or resulting from living things within an ecological matrix.",
  "black hole": "A region of spacetime where gravity is so intense that nothing, not even light, can escape.",
  "boiling point": "The precise temperature threshold where the vapor pressure of a liquid equals surrounding atmospheric pressure.",
  "boson": "A subatomic particle, such as a photon, which obeys Bose-Einstein statistics and acts as a force carrier.",
  "botany": "The scientific study of plant life structures, physiology, and environmental interactions.",
  "brittleness": "The structural property of a material that fractures easily when subjected to stress, failing to deform plastically.",
  "buoyancy": "The upward force exerted by a fluid that opposes the weight of a partially or fully immersed object.",
  "calculus": "The branch of mathematics that deals with the finding and properties of derivatives and integrals of functions.",
  "capacitor": "An electrical hardware component used to store electrical energy temporarily inside an electrostatic field.",
  "carbon fixation": "The conversion process of inorganic carbon into organic compounds by living organisms.",
  "catalyst": "A substance that increases the rate of a chemical reaction without undergoing permanent change itself.",
  "cathode": "The negatively charged electrode by which electrons enter an electrical device or system.",
  "causation": "The analytical assertion that one distinct event or variable is directly responsible for producing another.",
  "cell": "The basic structural, functional, and biological unit of all known living organisms.",
  "cell division": "The process by which a parent cell divides into two or more daughter cells for tissue generation.",
  "center of gravity": "A point from which the weight of a body or system may be considered to act on a single structural node.",
  "centrifugal force": "The apparent outward force on a body moving in a circular path, pointing away from the center of rotation.",
  "chain reaction": "A self-sustaining sequence of events where the product of one step initiates subsequent reactions.",
  "characteristic": "A distinguishing feature or property that identifies an entity or data category cleanly.",
  "charge": "A physical property of matter that causes it to experience a force when placed in an electromagnetic field.",
  "chelation": "A type of bonding where ions and molecules bind to metal ions, helpful for detoxification pipelines.",
  "chemical formula": "An expression which states the number and type of atoms present in a molecule.",
  "chemical reaction": "A process that involves rearrangement of the molecular or ionic structure of a substance.",
  "chemistry": "The scientific discipline involved with elements and compounds composed of atoms, molecules, and ions.",
  "chromodynamics": "The study of the strong interaction between quarks and gluons, governed by color charges.",
  "chromosome": "A threadlike structure of nucleic acids and protein found in the nucleus of most living cells, carrying genetic data.",
  "circadian rhythm": "The internal, cyclical 24-hour biological clock regulating sleep and metabolic metrics.",
  "cloning": "The biological process of generating a genetically identical copy of a cell, tissue, or multicellular organism.",
  "cluster analysis": "The mathematical grouping of a set of objects such that items in the same group are closely related.",
  "cohort": "A group of subjects sharing a common statistical characteristic within a defined time frame.",
  "colony": "A collection of identical individual organisms living closely together in a localized ecosystem cluster.",
  "comet": "A celestial object consisting of a nucleus of ice and dust that leaves a tail of vapor when near the sun.",
  "compound": "A unique substance formed when two or more distinct chemical elements are chemically bonded together.",
  "compression": "The application of balanced inward forces to a material, reducing its physical or digital volume.",
  "condensation": "The physical phase transition of a substance changing from a gaseous state into a liquid state.",
  "conduction": "The direct transfer of thermal energy or electrical charge through a material via molecular contact.",
  "confidence interval": "A statistical range of values that is likely to contain the true value of an unknown population parameter.",
  "constant": "A fixed numerical value or condition parameter that remains immutable throughout an operation loop.",
  "continental crust": "The relatively thick layer of the earth's crust that forms the large landmasses.",
  "continuum": "A continuous sequence in which adjacent elements are not perceptibly different from each other, but the extremes are quite distinct.",
  "control": "The baseline parameter set against which variable experimental elements are actively measured and evaluated.",
  "control group": "The group in an experiment that does not receive the treatment, used as a benchmark to isolate outcomes.",
  "correlation": "A mutual relationship or statistical connection discovered linking two separate data arrays.",
  "cosmic dust": "Small particulate matter existing in outer space, ranging from small molecule clusters to microscopic grains.",
  "cosmic ray": "A highly energetic atomic nucleus or other particle traveling through space at near the speed of light.",
  "cretaceous": "The geological period extending from 145 to 66 million years ago, ending with a major extinction event.",
  "critical mass": "The minimum amount of fissile material needed to sustain a nuclear chain reaction.",
  "crystalline": "Having a highly ordered, repeating microscopic structure arranged in a rigid geometric lattice layout.",
  "current": "A directional flow of electric charge carriers, measured cleanly in amperes."
};

// Auto-inject these technical science terms into negotiator.js definitions
if (typeof Negotiator !== 'undefined' && Negotiator.lexicon) {
  Object.keys(ScienceTerminologyVault).forEach(term => {
    // Inject phrases or words straight into nouns dictionary for part-of-speech parsing
    if (!Negotiator.lexicon.nouns.includes(term)) {
      Negotiator.lexicon.nouns.push(term);
    }
  });
}
// 1. EXTENDED GOSPEL & NARRATION LEXICON MATRIX
const GospelTerminologyVault = {
  "abba": "An Aramaic word used by Jesus in the New Testament to address God the Father, expressing an intimate, childlike relationship and trust.",
  "advocate": "A legal and theological term referring to Jesus Christ, who intercedes and pleads the believer's case before God the Father.",
  "apostle": "Meaning 'one who is sent forth'. It primarily refers to the twelve chosen disciples of Jesus, as well as commissioned figures like Paul.",
  "atonement": "The redemptive act of Jesus Christ through His death on the cross, which removes the barrier of sin and restores the broken relationship.",
  "baptism": "A Christian sacrament signifying spiritual cleansing, repentance, and rebirth through immersion in or washing with water.",
  "believer": "A person who has accepted the gospel, placing their faith in Jesus Christ for their salvation.",
  "born again": "A spiritual transformation denoting the absolute regeneration of the human spirit by the Holy Spirit.",
  "christ": "Derived from the Greek word Christos, meaning 'the Anointed One'—the Greek equivalent to the Hebrew Messiah.",
  "church": "The worldwide community of believers (the Body of Christ) connected by faith in Jesus, tasked with proclaiming the gospel.",
  "cross": "The physical structure where Jesus was crucified; the structural space where sin was paid for and sacrifice demonstrated.",
  "covenant": "A solemn, binding agreement established by God that creates an eternal relationship between Himself and humanity."
};

// Automatically inject these new words into the Negotiator framework for proper grammatical sorting
if (typeof Negotiator !== 'undefined' && Negotiator.lexicon) {
  Object.keys(GospelTerminologyVault).forEach(term => {
    if (!Negotiator.lexicon.nouns.includes(term)) {
      Negotiator.lexicon.nouns.push(term);
    }
  });
}

/**
 * RECONCILED PREFRONTAL GOALS MONITOR
 * Implements the 'goals' terminal diagnostic command.
 */
function executeLiveFocusInspectionQuery() {
  const pfx = (typeof CloneBrain !== 'undefined' && CloneBrain.prefrontalCortex) ? CloneBrain.prefrontalCortex.profile : { activeGoalDirective: "AMBIENT_COMPLIANCE", attentionLockLevel: "NORMAL" };
  
  let report = `=== PREFRONTAL CORTEX COGNITIVE DIRECTIVES ===\n\n`;
  report += `  • ACTIVE GOAL MATRIX : ${pfx.activeGoalDirective}\n`;
  report += `  • ATTENTION LOCK LEVEL: ${pfx.attentionLockLevel}\n`;
  report += `  • TIME SYNC LATENCY   : Stable, tracking loops secure\n\n`;
  
  // Provide intelligent diagnostic summaries based on active brain goals
  if (pfx.attentionLockLevel === "MAXIMUM") {
    report += `NEURAL RISK METRICS: System filtering ambient noise.\n`;
    report += `Action profile: Standing by for moral tri-element mantra commands.`;
  } else {
    report += `NEURAL RISK METRICS: Healthy baseline intellectual absorption.\n`;
    report += `System state: Open to new learning datasets and chat cycles.`;
  }
  report += `\n==============================================`;
  
  createTypingBubble(report);
}
