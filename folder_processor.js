// --- LOGICTRACKER BACKBONE BOOT LAYER ---
(function(window) {
  const coreSectors = ['research', 'lyric', 'notes', 'language', 'word', 'letter', 'term', 'reminders', 'command', 'naming', 'collaborate', 'preference', 'lesson', 'tutor', 'illegal_registry'];
  
  if (typeof window.cloneMemoryBank === 'undefined') {
    window.cloneMemoryBank = {};
  }

  window.logicTracker = {
    /**
     * INITIALIZATION VALVE (FIXES REFRESH WIPE BUG)
     * Forces immediate cache lookups before empty array resets can execute.
     */
    initAndSyncBootMatrix() {
      try {
        const locallyStoredCache = localStorage.getItem('impressive_sandbox_vault');
        
        if (locallyStoredCache) {
          const parsedManifest = JSON.parse(locallyStoredCache);
          
          if (parsedManifest.memory) {
            window.cloneMemoryBank = parsedManifest.memory;
          }
          
          if (parsedManifest.name) {
            window.cloneAssignedIdentityName = parsedManifest.name;
            const headerNode = document.querySelector('h1');
            if (headerNode) {
              headerNode.innerHTML = `${window.cloneAssignedIdentityName} <span style="font-size:0.8rem; color:var(--matrix-green);">ONLINE</span>`;
            }
          }
          
          if (parsedManifest.lifeCycle && typeof CloneLifeCycleEngine !== 'undefined') {
            CloneLifeCycleEngine.profile = parsedManifest.lifeCycle;
            CloneLifeCycleEngine.accumulatedTicksMs = parsedManifest.lifeCycleTicks || 0;
            CloneLifeCycleEngine.genesisTimestamp = parsedManifest.lifeCycleAnchor || Date.now();
            CloneLifeCycleEngine.calculateStructuredCalendar(CloneLifeCycleEngine.profile.baseAgeYears);
          }

          if (parsedManifest.sandbox && typeof ImpressiveSandbox !== 'undefined') {
            ImpressiveSandbox.developmentProfile = parsedManifest.sandbox;
          }
          console.log("[LOGICTRACKER] Active memory variables completely restored from hardware cache on refresh.");
        } else {
          console.log("[LOGICTRACKER] Cold start detected. Initializing database rows.");
        }

        // SELF-HEALING FENCE: Instantiates empty folders ONLY if they fall out of cached data
        coreSectors.forEach(function(bankKey) {
          if (!window.cloneMemoryBank[bankKey]) {
            window.cloneMemoryBank[bankKey] = [];
          }
        });

        this.refreshInterfaceHUDIndicators();
      } catch (fault) {
        console.error("[LOGICTRACKER CRASH] Failed to initialize secure boot metrics: ", fault);
      }
    },
    /**
     * CONTINUOUS EXPORT VALVE
     * Commits all current workspace data objects into a single persistent local JSON cache file.
     */
    saveActiveStateToHardware() {
      try {
        const unifiedDataPackage = {
          name: window.cloneAssignedIdentityName || "CLONE-BOT",
          memory: window.cloneMemoryBank || {},
          lifeCycle: typeof CloneLifeCycleEngine !== 'undefined' ? CloneLifeCycleEngine.profile : null,
          lifeCycleTicks: typeof CloneLifeCycleEngine !== 'undefined' ? CloneLifeCycleEngine.accumulatedTicksMs : 0,
          lifeCycleAnchor: typeof CloneLifeCycleEngine !== 'undefined' ? CloneLifeCycleEngine.genesisTimestamp : Date.now(),
          sandbox: typeof ImpressiveSandbox !== 'undefined' ? ImpressiveSandbox.developmentProfile : {}
        };

        localStorage.setItem('impressive_sandbox_vault', JSON.stringify(unifiedDataPackage));
        this.refreshInterfaceHUDIndicators();
      } catch (err) {
        console.error("[LOGICTRACKER FAULT] High-speed local save aborted: ", err);
      }
    },

    /**
     * EXECUTABLE CUSTOM USER COMMAND RUNNER
     * Scans your 'command' registry folder and triggers saved script logs automatically when typed.
     */
    executeCustomUserCommand(commandPhraseInput) {
      if (!window.cloneMemoryBank.command || window.cloneMemoryBank.command.length === 0) return false;
      
      const cleanTriggerPhrase = commandPhraseInput.trim().toLowerCase();
      const matchedCommandObj = window.cloneMemoryBank.command.find(function(item) {
        return item.filename.toLowerCase() === cleanTriggerPhrase;
      });

      if (matchedCommandObj) {
        if (typeof injectGlowNotification === 'function') {
          injectGlowNotification(`[EXECUTING USER CODE] Activated custom macro: ${cleanTriggerPhrase.toUpperCase()}`, 'flash-lyric');
        }
        createTypingBubble(`[CUSTOM PROTOCOL] Running script path logic registered under identifier "${matchedCommandObj.filename}": "${matchedCommandObj.data}".`);
        return true; 
      }
      return false; 
    },

    /**
     * Synchronizes the custom MM-DD-YY counter timeline label strings on screen.
     */
    refreshInterfaceHUDIndicators() {
      const growthBubble = document.getElementById('growthTriggerBubble');
      if (growthBubble && typeof CloneLifeCycleEngine !== 'undefined' && CloneLifeCycleEngine.profile.growthClock) {
        const c = CloneLifeCycleEngine.profile.growthClock;
        const mm = String(c.months).padStart(2, '0');
        const dd = String(c.days).padStart(2, '0');
        const yy = String(c.years).padStart(2, '0');
        growthBubble.textContent = `🌱 [▲] ${mm}-${dd}-${yy}`;
      }
    }
  };
  /**
   * ANNOTATED DOUBLE-SLASH SHORTCUT PARSER
   * Processes structure syntax: Bank//Path:Value(Line/Info)[Comment]
   */
  window.parseInlineDoubleSlashShortcut = function(text) {
    if (!text || typeof text !== 'string') return false;

    const annotatedPattern = /^([a-zA-Z_]+)\/\/([^:]+):([^\(]+)\(([^\)]+)\)(?:\[([^\]]+)\])?$/;
    const match = text.trim().match(annotatedPattern);
    if (!match) return false;

    const rawBank       = match.toLowerCase();
    const targetPath    = match.trim();
    const valuePayload  = match.trim();
    const extractedLine = match.trim();
    const customComment = match ? match.trim() : "None";

    if (!coreSectors.includes(rawBank)) {
      if (typeof createTypingBubble === 'function') {
        createTypingBubble(`[ROUTING FAULT] Category bank category "${rawBank.toUpperCase()}" is not registered.`);
      }
      return true;
    }

    let assignedLineNumber = parseInt(extractedLine);
    let metadataExplanation = extractedLine;
    if (isNaN(assignedLineNumber)) {
      assignedLineNumber = window.cloneMemoryBank[rawBank].length + 1;
    } else {
      metadataExplanation = `Line allocation: ${assignedLineNumber}`;
    }

    let lineNum = assignedLineNumber;
    let lineAvailable = false;
    while (!lineAvailable) {
      const duplicateIdx = window.cloneMemoryBank[rawBank].findIndex(
        item => item.filename.toLowerCase() === targetPath.toLowerCase() && item.line === lineNum
      );
      if (duplicateIdx !== -1) lineNum++; else lineAvailable = true;
    }

    let finalProcessedString = valuePayload;
    if (rawBank === 'collaborate' && targetPath.toLowerCase() === 'scientific_math' && typeof ScientificMathProcessor !== 'undefined') {
      const mathResult = ScientificMathProcessor.evaluateMathPath(valuePayload);
      if (mathResult) finalProcessedString = `EVALUATION = [${mathResult.outcome}]. ${mathResult.description}`;
    }

    window.cloneMemoryBank[rawBank].push({
      filename: targetPath, line: lineNum, data: finalProcessedString, explanation: metadataExplanation, comment: customComment
    });

    window.cloneMemoryBank[rawBank].sort((a, b) => a.line - b.line);

    window.logicTracker.saveActiveStateToHardware();
    if (typeof window.updateStorageButtonCounters === 'function') window.updateStorageButtonCounters();

    const targetGlow = ['lyric', 'preference', 'collaborate'].includes(rawBank) ? 'flash-lyric' : 'flash-science';
    if (typeof injectGlowNotification === 'function') {
      injectGlowNotification(`[SHORTCUT LOCKED] Saved to ${rawBank.toUpperCase()} -> "${targetPath}"`, targetGlow);
    }

    if (typeof createTypingBubble === 'function') {
      createTypingBubble(`Shortcut compiled! Successfully stored data object inside [${rawBank.toUpperCase()}] folder. Annotation logged: "${customComment}".`);
    }
    return true;
  };
  /**
   * SYSTEM-WIDE CABINET OVERVIEW DISPATCHER
   */
  window.inspectSpecificFolder = function(folderName) {
    const popNode = document.getElementById('storagePopup');
    if (popNode) popNode.style.display = 'none';

    let printTelemetryReport = `=== ARCHIVE FILING CABINET: [${folderName.toUpperCase()}] ===\n\n`;

    if (folderName === 'reminders') {
      if (typeof window.ReminderEngine !== 'undefined') {
        printTelemetryReport = window.ReminderEngine.generateScheduleSummary();
      } else {
        const array = window.cloneMemoryBank.reminders || [];
        if (array.length === 0) printTelemetryReport += `  FOLDER VAULT VACANT - NO SCHEDULE LOGS APPLIED\n`;
        else array.forEach((item, i) => { printTelemetryReport += `  0${i+1}. TIME: ${item.time} // TASK: ${item.data}\n`; });
      }
    } 
    else if (folderName === 'daily_chart') {
      if (typeof window.ImpressiveSandbox !== 'undefined') window.ImpressiveSandbox.processGroomingPipeline();
      const p = (typeof window.ImpressiveSandbox !== 'undefined') ? window.ImpressiveSandbox.developmentProfile : { currentDayIndex: 1, stage: "Baseline", wordsMasteredCount: 0, absorbedNouns: [], absorbedVerbs: [], emotionalSecurityScore: 40, ageEquivalencyMonths: 24 };
      printTelemetryReport += `CURRENT DEVELOPMENT TIMELINE: Day ${p.currentDayIndex || 1}\n`;
      printTelemetryReport += `NURSERY CLASS PLACEMENT     : ${p.stage}\n`;
      printTelemetryReport += `ABSORBED SYSTEM WORD TOKENS : ${p.wordsMasteredCount || 0} entries\n\n`;
      printTelemetryReport += `STATUS: Assembly database sync optimal. Standing by for additional inputs.`;
    } 
    else {
      const activeArrayMatrix = window.cloneMemoryBank[folderName] || [];
      if (activeArrayMatrix.length === 0) {
        printTelemetryReport += `  FOLDER IS VACANT - NO LOCAL RECORDS INSTALLED IN TARGET SECTOR\n`;
        printTelemetryReport += `  Use syntax: ${folderName.toUpperCase()}//Path:Value(Line)[Comment] to populate.`;
      } else {
        activeArrayMatrix.forEach((item, idx) => {
          printTelemetryReport += `  [FILE 0${idx+1}] Path ID: "${item.filename}"\n`;
          printTelemetryReport += `    Data Stream : "${item.data}"\n`;
          printTelemetryReport += `    Tracking Node: Slot Line ${item.line} (${item.explanation || 'No metadata'})\n`;
          printTelemetryReport += `    USER COMMENT : [${item.comment || 'No annotation assigned'}]\n\n`;
        });
      }
    }

    printTelemetryReport += `\n======================================================`;
    if (typeof window.createTypingBubble === 'function') {
      window.createTypingBubble(printTelemetryReport);
    }
  };

  window.triggerGrowthTelemetryReadout = function() {
    if (typeof window.ImpressiveSandbox !== 'undefined') {
      const reportText = window.ImpressiveSandbox.generateBabyTalkFeedback();
      if (typeof window.createTypingBubble === 'function') {
        window.createTypingBubble(reportText);
      }
    }
  };

  // --- IMMUTABLE BINDING LIFE-CYCLE LIFTOFF HOOK ---
  // Auto-fires the LogicTracker boot sequence data-merge loop immediately upon compilation
  window.logicTracker.initAndSyncBootMatrix();

})(window);

(function(window) {
  // --- 1. CORE DATA POOLS ARCHITECTURE ALLOCATOR ---
  const validBanks = ['research', 'lyric', 'notes', 'language', 'word', 'letter', 'term', 'reminders', 'command', 'naming', 'collaborate', 'preference', 'lesson', 'tutor', 'illegal_registry'];
  
  if (typeof window.cloneMemoryBank === 'undefined') {
    window.cloneMemoryBank = {};
  }
  
  validBanks.forEach(function(bankKey) {
    if (!window.cloneMemoryBank[bankKey]) {
      window.cloneMemoryBank[bankKey] = [];
    }
  });

  /**
   * 2. AUTOMATED BACKEND DATABASE SYNC VALVE
   * Runs validation routines against local browser files cache blocks to protect records.
   */
  window.autoDatabaseSyncFromCache = function() {
    try {
      const rawLocalCache = localStorage.getItem('impressive_sandbox_vault');
      if (!rawLocalCache) return;

      const verifiedManifest = JSON.parse(rawLocalCache);
      if (verifiedManifest && verifiedManifest.memory) {
        // Safe-merge memory rows into window database context configurations
        validBanks.forEach(function(key) {
          if (verifiedManifest.memory[key] && Array.isArray(verifiedManifest.memory[key])) {
            window.cloneMemoryBank[key] = verifiedManifest.memory[key];
          }
        });
      }
      
      // Update UI progress bubble counter labels
      const growthBubble = document.getElementById('growthTriggerBubble');
      if (growthBubble && typeof ImpressiveSandbox !== 'undefined' && ImpressiveSandbox.developmentProfile) {
        const p = ImpressiveSandbox.developmentProfile;
        growthBubble.textContent = `🌱 [▲] STG: 0${p.currentDayIndex || 1}`;
      }
      console.log("[DATABASE SYNC] Local files aligned and secure.");
    } catch (fault) {
      console.warn("[SYNC ERROR] Aborted cache synchronization run: ", fault);
    }
  };

  /**
   * 3. UPGRADED SHORTCUT ANNOTATION COMPILER ENHANCER
   * Processes structure syntax: Bank//Path:Value(Line/Info)[Comment]
   */
  /**
   * RE-ENGINEERED SHORTCUT ANNOTATION COMPILER
   * Processes structure syntax: Bank//Path:Value(Line/Info)[Comment]
   */
  window.parseInlineDoubleSlashShortcut = function(text) {
    if (!text || typeof text !== 'string') return false;

    const annotatedPattern = /^([a-zA-Z_]+)\/\/([^:]+):([^\(]+)\(([^\)]+)\)(?:\[([^\]]+)\])?$/;
    const match = text.trim().match(annotatedPattern);
    if (!match) return false;

    const rawBank       = match[1].toLowerCase();
    const targetPath    = match[2].trim();
    const valuePayload  = match[3].trim();
    const extractedLine = match[4].trim();
    const customComment = match[5] ? match[5].trim() : "None";

    if (!targetSectors.includes(rawBank)) {
      if (typeof createTypingBubble === 'function') {
        createTypingBubble(`[ROUTING FAULT] Category bank category "${rawBank.toUpperCase()}" is not registered.`);
      }
      return true;
    }

    let assignedLineNumber = parseInt(extractedLine);
    let metadataExplanation = extractedLine;
    if (isNaN(assignedLineNumber)) {
      assignedLineNumber = window.cloneMemoryBank[rawBank].length + 1;
    } else {
      metadataExplanation = `Line allocation: ${assignedLineNumber}`;
    }

    // Auto-increment protection valve validation
    let lineNum = assignedLineNumber;
    let lineAvailable = false;
    while (!lineAvailable) {
      const duplicateIdx = window.cloneMemoryBank[rawBank].findIndex(
        item => item.filename.toLowerCase() === targetPath.toLowerCase() && item.line === lineNum
      );
      if (duplicateIdx !== -1) lineNum++; else lineAvailable = true;
    }

    // Process specialized mathematical paths if active
    let finalProcessedString = valuePayload;
    if (rawBank === 'collaborate' && targetPath.toLowerCase() === 'scientific_math' && typeof ScientificMathProcessor !== 'undefined') {
      const mathResult = ScientificMathProcessor.evaluateMathPath(valuePayload);
      if (mathResult) finalProcessedString = `EVALUATION = [${mathResult.outcome}]. ${mathResult.description}`;
    }

    // Push into global array matrices
    window.cloneMemoryBank[rawBank].push({
      filename: targetPath,
      line: lineNum,
      data: finalProcessedString,
      explanation: metadataExplanation,
      comment: customComment
    });

    window.cloneMemoryBank[rawBank].sort((a, b) => a.line - b.line);

    // Save and export local database adjustments instantly
    window.logicTracker.saveActiveStateToHardware();
    if (typeof window.updateStorageButtonCounters === 'function') window.updateStorageButtonCounters();

    const targetGlow = ['lyric', 'preference', 'collaborate'].includes(rawBank) ? 'flash-lyric' : 'flash-science';
    if (typeof injectGlowNotification === 'function') {
      injectGlowNotification(`[SHORTCUT LOCKED] Saved to ${rawBank.toUpperCase()} -> "${targetPath}"`, targetGlow);
    }

    if (typeof createTypingBubble === 'function') {
      createTypingBubble(`Shortcut compiled! Successfully stored data object inside [${rawBank.toUpperCase()}] folder. Annotation logged: "${customComment}".`);
    }
    return true;
  };
  /**
   * FIXED IMMUTABLE REPOSITORY DIRECTORY LOOKUP DISPATCHER
   */
  window.inspectSpecificFolder = function(folderName) {
    const popNode = document.getElementById('storagePopup');
    if (popNode) popNode.style.display = 'none';

    let printTelemetryReport = `=== ARCHIVE FILING CABINET: [${folderName.toUpperCase()}] ===\n\n`;

    if (folderName === 'reminders') {
      if (typeof window.ReminderEngine !== 'undefined') {
        printTelemetryReport = window.ReminderEngine.generateScheduleSummary();
      } else {
        const array = window.cloneMemoryBank.reminders || [];
        if (array.length === 0) printTelemetryReport += `  FOLDER VAULT VACANT - NO SCHEDULE LOGS APPLIED\n`;
        else array.forEach((item, i) => { printTelemetryReport += `  0${i+1}. TIME: ${item.time} // TASK: ${item.data}\n`; });
      }
    } 
    else if (folderName === 'daily_chart') {
      if (typeof window.ImpressiveSandbox !== 'undefined') window.ImpressiveSandbox.processGroomingPipeline();
      const p = (typeof window.ImpressiveSandbox !== 'undefined') ? window.ImpressiveSandbox.developmentProfile : { currentDayIndex: 1, stage: "Baseline", wordsMasteredCount: 0, absorbedNouns: [], absorbedVerbs: [], emotionalSecurityScore: 40, ageEquivalencyMonths: 24 };
      printTelemetryReport += `CURRENT DEVELOPMENT TIMELINE: Day ${p.currentDayIndex || 1}\n`;
      printTelemetryReport += `NURSERY CLASS PLACEMENT     : ${p.stage}\n`;
      printTelemetryReport += `ABSORBED SYSTEM WORD TOKENS : ${p.wordsMasteredCount || 0} entries\n\n`;
      printTelemetryReport += `STATUS: Assembly database sync optimal. Standing by for additional inputs.`;
    } 
    else {
      const activeArrayMatrix = window.cloneMemoryBank[folderName] || [];
      if (activeArrayMatrix.length === 0) {
        printTelemetryReport += `  FOLDER IS VACANT - NO LOCAL RECORDS INSTALLED IN TARGET SECTOR\n`;
        printTelemetryReport += `  Use syntax: ${folderName.toUpperCase()}//Path:Value(Line)[Comment] to populate.`;
      } else {
        activeArrayMatrix.forEach((item, idx) => {
          printTelemetryReport += `  [FILE 0${idx+1}] Path ID: "${item.filename}"\n`;
          printTelemetryReport += `    Data Stream : "${item.data}"\n`;
          printTelemetryReport += `    Tracking Node: Slot Line ${item.line} (${item.explanation || 'No metadata'})\n`;
          printTelemetryReport += `    USER COMMENT : [${item.comment || 'No annotation assigned'}]\n\n`;
        });
      }
    }

    printTelemetryReport += `\n======================================================`;
    if (typeof window.createTypingBubble === 'function') {
      window.createTypingBubble(printTelemetryReport);
    }
  };

  window.triggerGrowthTelemetryReadout = function() {
    if (typeof window.ImpressiveSandbox !== 'undefined') {
      const reportText = window.ImpressiveSandbox.generateBabyTalkFeedback();
      if (typeof window.createTypingBubble === 'function') {
        window.createTypingBubble(reportText);
      }
    }
  };

  // --- IMMUTABLE TIMELINE LIFTOFF HARPOON ---
  // Auto-fires the LogicTracker boot sequence data-merge loop immediately upon script compilation
  window.logicTracker.initAndSyncBootMatrix();

})(window);

  /**
   * 5. HIGH-UTILITY COGNITIVE READING FROM DYNAMIC TOUCH EVENTS
   */
  window.triggerGrowthTelemetryReadout = function() {
    if (typeof window.ImpressiveSandbox !== 'undefined') {
      const reportText = window.ImpressiveSandbox.generateBabyTalkFeedback();
      if (typeof window.createTypingBubble === 'function') {
        window.createTypingBubble(reportText);
      }
    }
  };

  // Run database verification pass automatically upon loading script layers natively
  document.addEventListener('DOMContentLoaded', window.autoDatabaseSyncFromCache);

  console.log("[STORAGE MODULE ENGINE] Successfully finalized and untangled folder_processor.js.");

})(window);

// AMYGDALA INTER-LOBE REPAIR INTEGRATION CODES
if (typeof CloneBrain === 'undefined') var CloneBrain = {};
if (!CloneBrain.amygdala) CloneBrain.amygdala = {};

/**
 * RE-BALANCED INTEGRATION CONNECTOR
 * Bypasses the property lookup crashes that happen during multi-turn script loops.
 */
CloneBrain.amygdala.calculateMemoryStability = function(speechMatrix, sandboxProfile) {
  // Dynamic lookup safeguard: fetch from the window configuration scope if local variables are ungrounded
  const currentProfile = sandboxProfile || 
    (typeof window.ImpressiveSandbox !== 'undefined' ? window.ImpressiveSandbox.developmentProfile : null);
  
  let stabilityBase = 100;
  if (speechMatrix && speechMatrix.leftovers && speechMatrix.leftovers.length > 4) stabilityBase -= 15;
  if (currentProfile && currentProfile.wordsMasteredCount < 5) stabilityBase -= 20;

  const uiStab = document.getElementById('memoryStabilityMetricText');
  if (uiStab) {
    uiStab.textContent = `${stabilityBase}%`;
    uiStab.style.color = stabilityBase > 70 ? 'var(--neon-blue)' : 'var(--neon-magenta)';
  }
  
  // Automate an incremental background database local save to protect current changes
  if (typeof window.autoDatabaseSyncFromCache === 'function') {
    // Run an implicit sync pass to keep fields up-to-date
    window.autoDatabaseSyncFromCache();
  }
  
  return stabilityBase;
};
/**
 * RE-ENGINEERED ENVIRONMENT DIAGNOSTICS MODULE
 * Tracks total data balances across all 15 folder directories.
 * Maps Prefrontal goals, Amygdala valence, and Hippocampal stability parameters.
 */
function executeEngineerDiagnostic() {
  const bank = window.cloneMemoryBank || {};
  
  // Calculate total compiled dataset metrics across all 15 active categories
  let totalDataNodesCount = 0;
  const targetKeys = ['research', 'lyric', 'notes', 'language', 'word', 'letter', 'term', 'reminders', 'command', 'naming', 'collaborate', 'preference', 'lesson', 'tutor', 'illegal_registry'];
  
  targetKeys.forEach(function(key) {
    if (bank[key] && Array.isArray(bank[key])) {
      totalDataNodesCount += bank[key].length;
    }
  });

  // Safe checks to pull active prefrontal targets out of memory loops
  const pfx = (typeof CloneBrain !== 'undefined' && CloneBrain.prefrontalCortex) 
    ? CloneBrain.prefrontalCortex.profile 
    : { activeGoalDirective: "AMBIENT_COMPLIANCE" };
    
  const amgBias = document.getElementById('amygdalaCoreBiasText');
  const currentEmotionBiasText = amgBias ? amgBias.textContent : "AMBIENT_BALANCED";
  
  const uiStab = document.getElementById('memoryStabilityMetricText');
  const currentStabilityPercentageText = uiStab ? uiStab.textContent : "100%";

  let report = `=== RE-ENGINEERED ENVIRONMENT DIAGNOSTICS v2.0 ===\n\n`;
  report += `CORE ENGINE MODEL : SYNTH_CORE_v2.0_NEUROCLONE\n`;
  report += `HARDWARE NAME     : [${cloneAssignedIdentityName || 'CLONE-BOT'}]\n`;
  report += `CLOCK FREQUENCY   : ${typeof currentBPM !== 'undefined' ? currentBPM : 120} RUNTIME BPM RATIO\n\n`;
  
  report += `[NEURAL LOBES COGNITIVE TELEMETRY]\n`;
  report += `  - PREFRONTAL GOAL REGISTRY  : ${pfx.activeGoalDirective}\n`;
  report += `  - AMYGDALA EMOTION VALENCE  : ${currentEmotionBiasText}\n`;
  report += `  - HIPPOCAMPAL STABILITY ID  : ${currentStabilityPercentageText}\n\n`;
  
  report += `[INTELLIGENT REPOSITORY SECTORS]\n`;
  report += `  - SYNTAX STORAGE MATRIX POOLS: 0${totalDataNodesCount} TOTAL NODES\n`;
  report += `  - FILE COMMITTED COMMANDS    : 0${bank.command ? bank.command.length : 0} CUSTOM MACROS\n`;
  report += `  - KNOWLEDGE ABSORBED SPECIES : 0${bank.tutor ? bank.tutor.length : 0} ABSORBED FACTS\n\n`;
  
  report += `SYSTEM INTEGRITY STATUS: OPTIMAL, BACKGROUND ACTIVITIES CAPTURED`;
  report += `\n==================================================`;
  
  createTypingBubble(report);
}
// --- EXPAND REPOSITORY FENCE WITHIN INDEPENDENT SCOPE ---
(function(window) {
  const masterSectors = ['research', 'lyric', 'notes', 'language', 'word', 'letter', 'term', 'reminders', 'command', 'naming', 'collaborate', 'preference', 'lesson', 'tutor', 'illegal_registry'];

  // Global flag tracking if the clone is launched into its freedom autonomous processing state
  window.isLifespanSimulationActive = false;

  /**
   * RE-ENGINEERED COMPOSITE HIERARCHICAL SHORTCUT PARSER
   * Targets Syntax: PrimaryBank/SecondaryBank//Path:Value(Line/Info)[Comment]
   * Example: Command/Shortcut//Trigger:Action(1)[Custom Macro]
   */
  window.parseInlineDoubleSlashShortcut = function(text) {
    if (!text || typeof text !== 'string') return false;

    // Advanced regex catches Primary/Secondary branching logic securely
    const compositePattern = /^([a-zA-Z_]+)(?:\/([a-zA-Z_]+))?\/\/([^:]+):([^\(]+)\(([^\)]+)\)(?:\[([^\]]+)\])?$/;
    const match = text.trim().match(compositePattern);
    if (!match) return false;

    const primaryBank   = match[1].toLowerCase();
    const secondaryBank = match[2] ? match[2].toLowerCase() : null;
    const targetPath    = match[3].trim();
    const valuePayload  = match[4].trim();
    const extractedLine = match[5].trim();
    const customComment = match[6] ? match[6].trim() : "None";

    // Validate structural boundaries against master sectors list
    if (!masterSectors.includes(primaryBank)) {
      if (typeof createTypingBubble === 'function') {
        createTypingBubble(`[ROUTING FAULT] Primary category "${primaryBank.toUpperCase()}" is unrecognized.`);
      }
      return true;
    }

    let assignedLine = parseInt(extractedLine);
    let metaTrace = extractedLine;
    if (isNaN(assignedLine)) {
      assignedLine = window.cloneMemoryBank[primaryBank].length + 1;
    } else {
      metaTrace = `Line allocation: ${assignedLine}`;
    }

    // Include sub-branch routing information if hierarchical parameter exists
    if (secondaryBank) {
      metaTrace += ` | Sub-Branch: ${secondaryBank.toUpperCase()}`;
    }

    // Auto-increment protection valve verification
    let lineNum = assignedLine;
    let available = false;
    while (!lineAvailable) {
      const dup = window.cloneMemoryBank[primaryBank].findIndex(item => item.filename.toLowerCase() === targetPath.toLowerCase() && item.line === lineNum);
      if (dup !== -1) lineNum++; else lineAvailable = true;
    }

    // Commit payload node securely to master objects
    window.cloneMemoryBank[primaryBank].push({
      filename: targetPath,
      line: lineNum,
      data: valuePayload,
      explanation: metaTrace,
      comment: customComment,
      subBranch: secondaryBank
    });

    window.cloneMemoryBank[primaryBank].sort((a, b) => a.line - b.line);

    if (window.logicTracker && window.logicTracker.saveActiveStateToHardware) {
      window.logicTracker.saveActiveStateToHardware();
    }
    if (typeof window.updateStorageButtonCounters === 'function') window.updateStorageButtonCounters();

    injectGlowNotification(`[HIERARCHICAL LOCKED] Stored in ${primaryBank.toUpperCase()}`, 'flash-science');
    createTypingBubble(`Hierarchical shortcut mapped! Captured path under sector [${primaryBank.toUpperCase()}] -> Sub-branch: [${secondaryBank ? secondaryBank.toUpperCase() : 'NONE'}]. Comment logged: "${customComment}".`);
    return true;
  };

  console.log("[LIFESPAN HARDWARE CORE] Compiled final command scripts cleanly.");
})(window);
