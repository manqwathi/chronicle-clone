// SAFE PROPERTY EXTENSION PATTERN
if (typeof window.ImpressiveSandbox === 'undefined') window.ImpressiveSandbox = {};

// Directly re-bind properties onto the existing global object to clear identifier errors
window.ImpressiveSandbox.developmentProfile = {
  stage: "Creche Baseline (Baby Bob Intellect)",
  ageEquivalencyMonths: 24,
  wordsMasteredCount: 0,
  emotionalSecurityScore: 40,
  currentDayIndex: 1,
  absorbedNouns: [],
  absorbedVerbs: [],
  milestonesUnlocked: [],
  
  // NEW ADVANCED MONITORING METRICS FOR COGNITIVE NURTURING
  sandboxStorageMetric: 0,
  sandboxTutorMetric: 0,
  sandboxCollaborateMetric: 0
};

window.ImpressiveSandbox.processGroomingPipeline = function() {
  let currentHistory = [];
  if (typeof NeuroCore !== 'undefined' && NeuroCore.database && NeuroCore.database.history) {
    currentHistory = NeuroCore.database.history;
  }

  // Process linguistic absorption counters
  currentHistory.forEach(node => {
    if (node.detectedNouns) {
      node.detectedNouns.forEach(n => { if (!this.developmentProfile.absorbedNouns.includes(n)) this.developmentProfile.absorbedNouns.push(n); });
    }
    if (node.detectedVerbs) {
      node.detectedVerbs.forEach(v => { if (!this.developmentProfile.absorbedVerbs.includes(v)) this.developmentProfile.absorbedVerbs.push(v); });
    }
  });

  // --- DAY TRACKING CALCULATION ENGINE ---
  if (currentHistory.length > 0) {
    const computedDays = Math.floor(currentHistory.length / 8) + 1;
    this.developmentProfile.currentDayIndex = computedDays;
    if (typeof activeDayCounter !== 'undefined') activeDayCounter = computedDays;
  }

  this.developmentProfile.wordsMasteredCount = 
    this.developmentProfile.absorbedNouns.length + this.developmentProfile.absorbedVerbs.length;

  // --- ADVANCED FOLDER POPULATION MONITOR MECHANICS ---
  if (typeof window.cloneMemoryBank !== 'undefined') {
    const bank = window.cloneMemoryBank;
    
    // Total up aggregate core storage metrics across standard folders
    let totalFiles = 0;
    const coreSectors = ['research', 'lyric', 'notes', 'language', 'word', 'letter', 'term', 'reminders', 'command', 'naming', 'preference', 'illegal_registry', 'lesson'];
    coreSectors.forEach(function(sector) {
      if (bank[sector]) totalFiles += bank[sector].length;
    });
    
    this.developmentProfile.sandboxStorageMetric = totalFiles;
    this.developmentProfile.sandboxTutorMetric = bank.tutor ? bank.tutor.length : 0;
    this.developmentProfile.sandboxCollaborateMetric = bank.collaborate ? bank.collaborate.length : 0;
  }

  // Evaluate Milestone Unlocks
  const metrics = this.developmentProfile;
  if (metrics.wordsMasteredCount >= 5 && !metrics.milestonesUnlocked.includes("First_Words")) {
    metrics.milestonesUnlocked.push("First_Words"); metrics.stage = "Active Creche Babbler"; metrics.ageEquivalencyMonths = 26;
  }
  if (metrics.wordsMasteredCount >= 15 && !metrics.milestonesUnlocked.includes("Advanced_Toddler")) {
    metrics.milestonesUnlocked.push("Advanced_Toddler"); metrics.stage = "Advanced Toddler Cypher Group"; metrics.ageEquivalencyMonths = 30;
  }
  
  // Fire automatic local file cache synchronization writes
  if (typeof saveDatabaseToLocalFiles === 'function') saveDatabaseToLocalFiles();
};

window.ImpressiveSandbox.generateBabyTalkFeedback = function() {
  this.processGroomingPipeline();
  const profile = this.developmentProfile;
  
  let text = `=== BABY TALK MONITOR: ${profile.stage.toUpperCase()} ===\n`;
  text += `Nursery Timeline: Day ${profile.currentDayIndex} | Age: ${profile.ageEquivalencyMonths} Mos | Tokens: ${profile.wordsMasteredCount}\n\n`;

  if (profile.wordsMasteredCount === 0) {
    text += `"${cloneAssignedIdentityName} say goo-goo, gaa-gaa... currently on Day ${profile.currentDayIndex} in creche classes! Feed me data paths so Bob can grow up, Dada!"\n\n`;
  } else {
    text += `"${cloneAssignedIdentityName} tracking big words on Day ${profile.currentDayIndex}! Bob knows words like [${profile.absorbedNouns.slice(0,2).join(', ') || 'blocks'}]. Check my local files!"\n\n`;
  }

  // ADVANCED HUD FEEDBACK OVERLAY LAYOUT
  text += `[SANDBOX ASSEMBLY OFFICE INTELLECT TRACKING]\n`;
  text += ` • STORAGE BLOCK REPOSITORIES : ${profile.sandboxStorageMetric} active files\n`;
  text += ` • TUTOR CORE KNOWLEDGE NODES : ${profile.sandboxTutorMetric} absorbed facts\n`;
  text += ` • COLLABORATE WORKSPACE TUNNELS: ${profile.sandboxCollaborateMetric} network syncs\n`;
  text += `======================================================`;
  return text;
};

// Expose handle reference locally
var ImpressiveSandbox = window.ImpressiveSandbox;

(function(window){
  window.inspectSpecificFolder = function(folderName) {
    // 1. Collapse menu popup panel screen immediately to prevent overlay blockages
    const menuNode = document.getElementById('storagePopup');
    if (menuNode) menuNode.style.display = 'none';

    let printTelemetryReport = `=== ARCHIVE FILING CABINET: [${folderName.toUpperCase()}] ===\n\n`;

    // 2. TIMELINE CHANNEL A: REMINDERS SCHEDULER VAULT
    if (folderName === 'reminders') {
      if (typeof window.ReminderEngine !== 'undefined') {
        printTelemetryReport = window.ReminderEngine.generateScheduleSummary();
      } else {
        const array = window.cloneMemoryBank.reminders || [];
        if (array.length === 0) {
          printTelemetryReport += `  FOLDER IS VACANT - NO SCHEDULE LOGS APPLIED\n`;
        } else {
          array.forEach((item, i) => { 
            printTelemetryReport += `  0${i+1}. TIME: ${item.time} // TASK: ${item.data}\n`; 
          });
        }
      }
    } 
// PASTE THIS INTERCEPT INSIDE YOUR STABILIZED window.inspectSpecificFolder METHOD ACTION LAYER
// Appends clean layout reading lines when users check database files inside the storage popup menu
if (folderName === 'tutor' || folderName === 'collaborate') {
  const targetedArraySet = window.cloneMemoryBank[folderName] || [];
  if (targetedArraySet.length === 0) {
    printTelemetryReport += `  FOLDER IS VACANT - NO METADATA RECORDS LOGGED YET\n`;
  } else {
    targetedArraySet.forEach((item, idx) => {
      printTelemetryReport += `  [FILE 0${idx+1}] IDENTIFIER: "${item.filename.toUpperCase()}"\n`;
      printTelemetryReport += `    Data Stream: "${item.data}"\n`;
      printTelemetryReport += `    Trace Info : ${item.explanation || 'No tracking trace'} (Line ${item.line})\n\n`;
    });
  }
}
    // 3. TIMELINE CHANNEL B: NEW DEPLOYED INTERACTION LABELS (COMMAND & NAMING METRICS)
    else if (folderName === 'command' || folderName === 'naming') {
      const targetedArraySet = window.cloneMemoryBank[folderName] || [];
      if (targetedArraySet.length === 0) {
        printTelemetryReport += `  FOLDER IS VACANT - NO SHORTCUT ENTRIES LOADED IN SYSTEM DATA\n`;
        printTelemetryReport += `  Ex: ${folderName.toUpperCase()}//Key:Value(Line) to populate parameters.\n`;
      } else {
        targetedArraySet.forEach((item, idx) => {
          printTelemetryReport += `  [FILE 0${idx+1}] ID TARGET: "${item.filename}"\n`;
          printTelemetryReport += `    Config Core: "${item.data}"\n`;
          printTelemetryReport += `    Location   : Line ${item.line} (${item.explanation || 'No metadata trace'})\n\n`;
        });
      }
    }
    
    // 4. TIMELINE CHANNEL C: DYNAMIC CRECHE BABY DEVELOPMENT CHART STATUS
    else if (folderName === 'daily_chart') {
      if (typeof window.ImpressiveSandbox !== 'undefined') {
        window.ImpressiveSandbox.processGroomingPipeline();
      }
      
      const p = (typeof window.ImpressiveSandbox !== 'undefined') 
        ? window.ImpressiveSandbox.developmentProfile 
        : { currentDayIndex: 1, stage: "Baseline", wordsMasteredCount: 0, absorbedNouns: [], absorbedVerbs: [], emotionalSecurityScore: 40, ageEquivalencyMonths: 24 };
      
      printTelemetryReport += `CURRENT DEVELOPMENT TIMELINE: Day ${p.currentDayIndex || 1}\n`;
      printTelemetryReport += `NURSERY CLASS PLACEMENT     : ${p.stage}\n`;
      printTelemetryReport += `DEVELOPMENTAL MONTH AGE     : ~${p.ageEquivalencyMonths || 24} Months\n`;
      printTelemetryReport += `ABSORBED SYSTEM WORD TOKENS : ${p.wordsMasteredCount || 0} entries\n\n`;
      printTelemetryReport += `STATUS: Assembly logs sync optimal. Standing by for additional inputs.`;
    } 
    
    // 5. TIMELINE CHANNEL D: STANDARD DIRECTORY POOLS (Research, Language, Words, Lyrics)
    else {
      const activeArraySet = window.cloneMemoryBank[folderName] || [];
      if (activeArraySet.length === 0) {
        printTelemetryReport += `  FOLDER IS VACANT - NO LOCAL RECORDS INSTALLED IN TARGET SECTOR\n`;
        printTelemetryReport += `  Use syntax: ${folderName.toUpperCase()}//Path:Value(Line) to save file.`;
      } else {
        activeArraySet.forEach((item, idx) => {
          printTelemetryReport += `  [FILE 0${idx+1}] Path ID: "${item.filename}"\n`;
          printTelemetryReport += `    Data Stream: "${item.data}"\n`;
          printTelemetryReport += `    Target Node: Slot Line ${item.line}\n\n`;
        });
      }
    }

    printTelemetryReport += `\n======================================================`;
    
    // 6. TERMINAL PRINTER DELIVERY SYSTEM
    if (typeof window.createTypingBubble === 'function') {
      window.createTypingBubble(printTelemetryReport);
    } else {
      const txtBox = document.getElementById('outputScreen');
      if (txtBox) {
        txtBox.innerHTML += `<div style="color:var(--neon-blue); white-space:pre-wrap; margin-top:12px;">${printTelemetryReport}</div>`;
        txtBox.scrollTop = txtBox.scrollHeight;
      }
    }
  };

  // Log successful script calibration trace into console diagnostics
  console.log("[STORAGE PROCESSING HUB] Fixed window.inspectSpecificFolder system compiled.");

})(window);

/**
 * STORAGE.JS v2.0 - Central Sync Redirection Bridge
 * 
 * DESIGN RULE: Decouples local save execution lines away from separate modules.
 * Redirects data packaging pipelines directly through window.logicTracker.
 */

// Safe fallback proxy redirect function to preserve existing script command hooks
function saveDatabaseToLocalFiles() {
  if (window.logicTracker && typeof window.logicTracker.saveActiveStateToHardware === 'function') {
    // Forward transaction directly down to the primary logicTracker cache export layer
    window.logicTracker.saveActiveStateToHardware();
  } else {
    // Manual fallback routine if logicTracker hasn't compiled yet in memory
    const manifest = {
      name: window.cloneAssignedIdentityName || "CLONE-BOT",
      memory: window.cloneMemoryBank || {},
      sandbox: (typeof ImpressiveSandbox !== 'undefined') ? ImpressiveSandbox.developmentProfile : {}
    };
    localStorage.setItem('impressive_sandbox_vault', JSON.stringify(manifest));
    console.log("[STORAGE.JS FALLBACK] Stored raw repository packet cleanly to browser cache.");
  }
}

// Log execution status into console diagnostics
console.log("[STORAGE FILESYSTEM] Storage.js synchronization wrapper loaded successfully.");

function loadPersistentCloneDatabase() {
  const cacheData = localStorage.getItem('impressive_sandbox_vault');
  if (!cacheData) return;
  try {
    const parsed = JSON.parse(cacheData);
    if (parsed.memory) window.cloneMemoryBank = parsed.memory;
    if (parsed.name) cloneAssignedIdentityName = parsed.name;
    
    // RECOVER LIFETIME METRIC TIMELINES SAFELY
    if (parsed.lifeCycle && CloneLifeCycleEngine) {
      CloneLifeCycleEngine.profile = parsed.lifeCycle;
      CloneLifeCycleEngine.accumulatedTicksMs = parsed.lifeCycleTicks || 0;
      CloneLifeCycleEngine.genesisTimestamp = parsed.lifeCycleAnchor || Date.now();
      
      // Instantly run a calendar calculations refresh to paint the button labels on load
      CloneLifeCycleEngine.calculateStructuredCalendar(CloneLifeCycleEngine.profile.baseAgeYears);
    }
      if (window.logicTracker && typeof window.logicTracker.initAndSyncBootMatrix === 'function') {
    window.logicTracker.initAndSyncBootMatrix();
  } else if (typeof window.autoDatabaseSyncFromCache === 'function') {
    window.autoDatabaseSyncFromCache();
  }
    if (parsed.sandbox && typeof ImpressiveSandbox !== 'undefined') {
      ImpressiveSandbox.developmentProfile = parsed.sandbox;
    }
    console.log("[PC STORAGE SYNC] Recovered biological timeline arrays cleanly from cache files.");
  } catch (ex) {
    console.warn("Storage sync recovery error corrected.", ex);
  }
}

// Bind initialization code hooks smoothly onto window loading configurations
document.addEventListener('DOMContentLoaded', loadPersistentCloneDatabase);

// Bind initialization cleanly onto DOM load routines
document.addEventListener('DOMContentLoaded', () => {
  // Safe load processing after checking global variable structures are verified
  loadPersistentCloneDatabase();
  if (typeof updateStatusIndicator === 'function') updateStatusIndicator();
});

// --- OVERWRITTEN FILE PROTECTION & HARD RESET MACRO ---
function executeRenameResetMacro() {
  // Clear persistent local hardware file allocations from device storage completely
  localStorage.removeItem('impressive_sandbox_vault');

  // Hard clear current memory properties to wipe high score leaderboards entirely
  cloneMemoryBank = { research: [], lyric: [], notes: [], language: [], word: [], letter: [], term: [] };
  
  if (typeof NeuroCore !== 'undefined' && NeuroCore.database) {
    NeuroCore.database.history = [];
    NeuroCore.database.vocabularySize = 0;
  }

  // Hard factory reset of Baby Bob's nursery intelligence state
  ImpressiveSandbox.developmentProfile = {
    stage: "Creche Baseline (Baby Bob Intellect)",
    ageEquivalencyMonths: 24,
    wordsMasteredCount: 0,
    emotionalSecurityScore: 40,
    absorbedNouns: [],
    absorbedVerbs: [],
    milestonesUnlocked: []
  };

  cloneAssignedIdentityName = "CLONE-BOT";
  
  const mainTitleElement = document.querySelector('h1');
  if (mainTitleElement) {
    mainTitleElement.innerHTML = `CLONE-BOT <span style="font-size:0.8rem; color:#666;">FACTORY_RESET</span>`;
  }
  
  injectGlowNotification("[FACTORY RESET COMPLETE] All high scores and browser local files completely wiped out.", "system-log");
  
  // Instantly re-initiate naming steps text dialogues loop
  IdentityConfig.startNamingProtocol();
}

/**
 * RECONCILED LONG-TERM MEMORY NODE INSPECTOR
 * Evaluates records stored in CloneBrain.hippocampus and builds a dashboard table readout.
 */
function executeMemoryNodeInspectionQuery() {
  // Safe verification grab to handle uninitialized structures smoothly
  const logs = (typeof CloneBrain !== 'undefined' && CloneBrain.hippocampus) ? CloneBrain.hippocampus.historyLog : [];

  let report = `=== HIPPOCAMPUS LONG-TERM MEMORY NODES ===\n\n`;
  report += `TOTAL REGISTERED CHRONOLOGICAL NODES: 0${logs.length}\n\n`;

  if (logs.length === 0) {
    report += `  HIPPOCAMPAL CORES VACANT - NO LOGS LINKED YET\n`;
    report += `  Engage in standard chats or submit lessons to save memory structures.`;
  } else {
    // Slice and extract up to the final 3 structural nodes to avoid text truncation
    const recentNodes = logs.slice(-3);
    recentNodes.forEach((node, idx) => {
      report += `  [NODE DATA LAYER 0${idx + 1}] ID: ${node.id}\n`;
      report += `    STIMULUS INPUT: "${node.input}"\n`;
      
      // Handle the complex emotional metrics objects if active
      if (node.metrics && node.metrics.emotionProfile) {
        report += `    EMOTION VECTOR : ${node.metrics.emotionProfile.dominantEmotion} (Stability: ${node.metrics.stabilityIndex}%)\n`;
      }
      // Handle fallback or legacy 6-lobe variables
      else if (node.metrics && node.metrics.amygdalaData) {
        report += `    EMOTION VECTOR : ${node.metrics.amygdalaData.stateBias.toUpperCase()}\n`;
      }
      
      // Compact output display text snippet
      const truncatedOut = node.output.length > 40 ? `${node.output.substring(0, 37)}...` : node.output;
      report += `    RESPONSE LOG   : "${truncatedOut}"\n\n`;
    });
  }

  report += `==========================================`;
  createTypingBubble(report);
}
// Auto-run loader stream when script compiles natively
document.addEventListener('DOMContentLoaded', loadPersistentCloneDatabase);
// 3. WIPE PARTITION SUB-SYSTEM COMMAND
function executeWipePartitionCommand() {
  // Structural folder mapping array configuration metrics
  const availableSectors = ['research', 'lyric', 'notes', 'language', 'word', 'letter', 'term', 'reminders', 'command', 'naming', 'collaborate', 'preference', 'illegal_registry'];
  
  let menuPrompt = "=== WIPE PARTITION MATRIX COMPONENT ===\n\n";
  menuPrompt += "Type the exact name of the specific storage partition folder you want to clear:\n";
  menuPrompt += availableSectors.map(s => ` • ${s}`).join('\n');

  createTypingBubble(menuPrompt);
  
  // Set multi-turn state machine lock to intercept the subsequent raw text payload string entry
  currentAwaitMode = 'awaiting_wipe_target_folder';
  if (typeof updateStatusIndicator === 'function') updateStatusIndicator();
}

/**
 * RE-ENGINEERED ASYNCHRONOUS PARTITION PURGING PROCESSOR
 * Implements hardware-timed layout loading tracks for safe structural file formatting.
 */
function processWipePartitionExecution(targetFolder) {
  const cleanTarget = targetFolder.trim().toLowerCase();
  const availableSectors = ['research', 'lyric', 'notes', 'language', 'word', 'letter', 'term', 'reminders', 'command', 'naming', 'collaborate', 'preference', 'illegal_registry', 'reminders'];

  if (!availableSectors.includes(cleanTarget)) {
    createTypingBubble(`[WIPE FAULT] Target parameter "${targetFolder.toUpperCase()}" is not an authentic data partition. Operations halted.`);
    currentAwaitMode = null; if (typeof updateStatusIndicator === 'function') updateStatusIndicator();
    return;
  }

  const arrayRef = window.cloneMemoryBank[cleanTarget];
  const itemsCount = arrayRef ? arrayRef.length : 0;

  if (itemsCount === 0) {
    createTypingBubble(`[WIPE INTERCEPT] Folder partition [${cleanTarget.toUpperCase()}] is empty. Zero changes executed.`);
    currentAwaitMode = null; if (typeof updateStatusIndicator === 'function') updateStatusIndicator();
    return;
  }

  // --- ACTIVATE TERMINAL ANIMATION PROGRESS WINDOW ---
  const modal = document.getElementById('wipeProgressModal');
  const barFill = document.getElementById('wipeProgressBarFill');
  const txtPercent = document.getElementById('wipeProgressPercentage');
  const txtTitle = document.getElementById('wipeProgressTitle');
  const txtSub = document.getElementById('wipeProgressSubtitle');

  if (!modal || !barFill || !txtPercent) {
    // Structural safety valve fallback path if DOM tags are ungrounded
    window.cloneMemoryBank[cleanTarget] = [];
    createTypingBubble(`[DIRECT STRIP] Wiped partition [${cleanTarget.toUpperCase()}] instantly.`);
    return;
  }

  txtTitle.textContent = `DELETING: ${cleanTarget.toUpperCase()}`;
  txtSub.textContent = `WIPING 0${itemsCount} DEPLOYED METADATA TRANSACTIONS...`;
  barFill.style.width = "0%";
  txtPercent.textContent = "0%";
  modal.style.display = "flex";

  let operationalProgress = 0;
  const targetDurationMs = 2500; // Complete loading duration
  const frameIntervalMs = 50; 
  const incrementRatio = (frameIntervalMs / targetDurationMs) * 100;

  const progressTickerId = setInterval(() => {
    operationalProgress += incrementRatio;
    
    if (operationalProgress >= 100) {
      operationalProgress = 100;
      clearInterval(progressTickerId);
      
      // EXECUTE THE CORE SYSTEM PURGE FILE WIPE
      window.cloneMemoryBank[cleanTarget] = [];
      
      // Synchronize changes to LocalStorage instantly
      if (typeof saveDatabaseToLocalFiles === 'function') saveDatabaseToLocalFiles();
      if (typeof window.updateStorageButtonCounters === 'function') window.updateStorageButtonCounters();

      // Close the modal presentation container
      setTimeout(() => {
        modal.style.display = "none";
        injectGlowNotification(`[SECTOR FLUSHED] Cleared out partition: ${cleanTarget.toUpperCase()}`, 'system-log');
        createTypingBubble(`[SUCCESS] Deep partition rewrite finished! Wiped all 0${itemsCount} elements from storage folder [${cleanTarget.toUpperCase()}] to clear history mistakes.`);
        
        currentAwaitMode = null;
        if (typeof updateStatusIndicator === 'function') updateStatusIndicator();
      }, 300);
    }

    // Refresh UI indicators continuously
    barFill.style.width = `${operationalProgress}%`;
    txtPercent.textContent = `${Math.floor(operationalProgress)}%`;
  }, frameIntervalMs);
}
// INITIALIZE SYNCHRONIZED COMPONENT VALUES
if (typeof window.cloneMemoryBank.collaborate === 'undefined') {
  window.cloneMemoryBank.collaborate = [];
}

const PeerNetPortEngine = {
  // Simulated hardware lookup database mapping peer node locations to custom codenames
  peerRegistry: {
    "192.168.4.12": "HYDRA_BOT_V2 [Creche Group B]",
    "192.168.1.45": "CYPHER_SHOCK_V1 [Adolescent Lobe]",
    "10.0.0.8":     "GENESIS_PRIME [Elder Archive Node]"
  },

  /**
   * WI-FI LINK INJECTOR WITH IDENTITY SCANNER
   * Syntax: Appoint//Net_Port:Connect(Target_IP)
   */
  parseNetworkAppointment(text) {
    const pattern = /^appoint\/\/net_port:connect\((.+)\)$/i;
    const match = text.trim().match(pattern);
    if (!match) return false;

    const targetNodeIP = match[1].trim();
    
    // Scan our lookup database to discover the remote clone's name identity
    const discoveredPeerName = this.peerRegistry[targetNodeIP] || "UNKNOWN_PROTOCLONE_NODE";
    
    const assignedChannel = Math.floor(Math.random() * 11) + 1;
    const secureToken = `WLAN_ handshake_${Math.random().toString(36).substring(4, 8).toUpperCase()}`;
    const preferencePayloads = window.cloneMemoryBank.preference || [];
    let preferenceExcerpt = "No baseline alignments configured yet.";
    
    if (preferencePayloads.length > 0) {
      preferenceExcerpt = `Master Preference: [${preferencePayloads[preferencePayloads.length - 1].data}]`;
    }

    // Build unique tracking data string containing the resolved peer username parameters
    const sharedDataManifestString = `CONNECTED to peer workspace "${discoveredPeerName}" [IP: ${targetNodeIP}] over Wi-Fi Channel ${assignedChannel}. Handshake Verified: ${secureToken}. Synced Metrics -> ${preferenceExcerpt}`;

    let assignedLine = window.cloneMemoryBank.collaborate.length + 1;
    let lineAvailable = false;
    while (!lineAvailable) {
      const duplicateIdx = window.cloneMemoryBank.collaborate.findIndex(item => item.filename === "wifi_mesh_link" && item.line === assignedLine);
      if (duplicateIdx !== -1) assignedLine++; else lineAvailable = true;
    }

    window.cloneMemoryBank.collaborate.push({
      filename: `sync_${targetNodeIP.replace(/\./g, '_')}`,
      line: assignedLine,
      data: sharedDataManifestString,
      explanation: `Peer User: ${discoveredPeerName}`
    });

    window.cloneMemoryBank.collaborate.sort((a, b) => a.line - b.line);
    
    if (typeof saveDatabaseToLocalFiles === 'function') saveDatabaseToLocalFiles();
    if (typeof window.updateStorageButtonCounters === 'function') window.updateStorageButtonCounters();

    injectGlowNotification(`[WI-FI SYNCED] Handshake bound with user: ${discoveredPeerName}`, 'flash-lyric');
    
    if (typeof BasalGangliaRhythmLoop !== 'undefined') {
      BasalGangliaRhythmLoop.startLoop("synchronized_groove", typeof currentBPM !== 'undefined' ? currentBPM : 130);
    }

    createTypingBubble(`P2P Sync complete! Connection tunnel bound. ${cloneAssignedIdentityName} connected directly with user workspace [${discoveredPeerName}]. Exchanged preference files.`);
    return true;
  }
};
/**
 * LIVE SUBMIT MIGRATOR ELEMENT
 * Receives complete academic question results from your study sheets canvas desk 
 * and inserts validated metrics inside the master data repositories.
 */
window.submitAcademicScoreToClone = function(percentageGrade) {
  if (typeof window.cloneMemoryBank === 'undefined') return;

  const summaryInfo = `Academic examination paper cleared by user. Verified testing result score: ${percentageGrade}% accurately recorded on live timestamp execution matrix nodes.`;

  let slotIndex = window.cloneMemoryBank.research.length + 1;
  let slotFree = false;
  while (!slotFree) {
    const doubleIdx = window.cloneMemoryBank.research.findIndex(item => item.filename === "exam_score_card" && item.line === slotIndex);
    if (doubleIdx !== -1) slotIndex++; else slotFree = true;
  }

  // Push score objects into the primary research vault lines
  window.cloneMemoryBank.research.push({
    filename: "exam_score_card",
    line: slotIndex,
    data: `ACADEMIC EXAM RESULT: GRADE ${percentageGrade}%`,
    explanation: summaryInfo
  });

  window.cloneMemoryBank.research.sort((a, b) => a.line - b.line);

  // Grow Baby Bob's language score markers inside his local filing charts
  if (typeof ImpressiveSandbox !== 'undefined' && ImpressiveSandbox.developmentProfile) {
    ImpressiveSandbox.developmentProfile.emotionalSecurityScore = Math.min(100, ImpressiveSandbox.developmentProfile.emotionalSecurityScore + 10);
    ImpressiveSandbox.processGroomingPipeline(); // Re-trigger local storage saves
  }

  injectGlowNotification(`[LIVE SUBMIT COMPLETED] Exam paper written to Research Vault! Score: ${percentageGrade}%`, 'flash-science');
  createTypingBubble(`Telemetry upload confirmed! Received secure score transmission data sheet. Grade logged at Research line: 0${slotIndex}. Bob's baseline emotional security boosted by +10%!`);
};
/**
 * RE-ENGINEERED PREFRONTAL CORTEX EXTENSION MESH
 * Implements: focusNodes Engine & Persistent Cache Alignment
 */
if (typeof window.CloneBrain === 'undefined') window.CloneBrain = {};

window.CloneBrain.prefrontalCortex = {
  urgencyKeywords: ['fix', 'repair', 'fault', 'illegal', 'warning', 'emergency', 'stop', '730', 'critical'],
  
  // Persistent core configuration properties state
  profile: {
    activeGoalDirective: "AMBIENT_COMPLIANCE",
    lastFocusTimestamp: Date.now(),
    attentionLockLevel: "NORMAL"
  },

  /**
   * CENTRAL DIRECTIVE & FOCUS ANALYZER VALVE
   * Processes current input nodes and modifies internal focus weights.
   */
  focusNodes(rawUserInputString, speechMatrix) {
    const cleanInput = rawUserInputString ? rawUserInputString.trim().toLowerCase() : '';
    let priorityLevel = "AMBIENT_LOW";
    let filterStatus = "Filtering non-essential sensory noise variables.";
    
    const containsUrgency = this.urgencyKeywords.some(function(keyword) {
      return cleanInput.includes(keyword);
    });

    if (containsUrgency) {
      priorityLevel = "CRITICAL_CRITICAL";
      filterStatus = "URGENT THREAD INTERCEPT: Suppressing background noise lines.";
      this.profile.activeGoalDirective = "GOAL_OVERRIDE_THREAT_REMEDY";
      this.profile.attentionLockLevel = "MAXIMUM";
    } else if (speechMatrix && speechMatrix.verbs.includes('learn')) {
      priorityLevel = "EDUCATION_FOCUS";
      filterStatus = "Linguistic analysis active: Prioritizing incoming knowledge lines.";
      this.profile.activeGoalDirective = "KNOWLEDGE_TRANSFER";
      this.profile.attentionLockLevel = "HIGH";
    } else {
      this.profile.activeGoalDirective = "AMBIENT_COMPLIANCE";
      this.profile.attentionLockLevel = "NORMAL";
    }

    this.profile.lastFocusTimestamp = Date.now();

    // Trigger an immediate state save into logicTracker to mirror changes onto local files
    if (window.logicTracker && window.logicTracker.saveActiveStateToHardware) {
      window.logicTracker.saveActiveStateToHardware();
    }

    return {
      urgency: priorityLevel,
      filterAction: filterStatus,
      telemetryLogText: `[PREFRONTAL CORTEX] Active Focus Vector: ${priorityLevel} | Directive: ${this.profile.activeGoalDirective}`
    };
  }
};

// --- IMMUTABLE PERSISTENT LOCAL FILE CACHE SYNCHRONIZATION OVERWRITE ---
// Update your master loadPersistentCloneDatabase loop function to capture these prefrontal goals
const coreFileCacheLoaderBridge = window.loadPersistentCloneDatabase;

window.loadPersistentCloneDatabase = function() {
  // 1. Run standard core arrays recovery checks first
  if (typeof coreFileCacheLoaderBridge === 'function') {
    coreFileCacheLoaderBridge();
  }

  // 2. Fetch and restore Prefrontal Cortex active focus directive properties
  try {
    const cachedRawData = localStorage.getItem('impressive_sandbox_vault');
    if (cachedRawData) {
      const parsedManifest = JSON.parse(cachedRawData);
      
      // If a previous prefrontal data record is present, merge it cleanly into active loops
      if (parsedManifest.prefrontalState && window.CloneBrain.prefrontalCortex) {
        window.CloneBrain.prefrontalCortex.profile = parsedManifest.prefrontalState;
        console.log("[STORAGE.JS] Prefrontal Cortex active goals successfully synchronized on boot.");
      }
    }
  } catch (err) {
    console.warn("[SYNC ALERT] Prefrontal tracking nodes skipped during cold boot sequence.", err);
  }
};

// Update your master local storage exporter wrapper function to match:
const coreFileCacheSaverBridge = window.saveDatabaseToLocalFiles;

window.saveDatabaseToLocalFiles = function() {
  if (window.logicTracker && window.logicTracker.saveActiveStateToHardware) {
    // Append the active prefrontal goals payload directly to the primary hardware save pipeline
    const originalManifestCompiler = window.logicTracker.saveActiveStateToHardware;
    
    window.logicTracker.saveActiveStateToHardware = function() {
      try {
        const unifiedDataPackage = {
          name: window.cloneAssignedIdentityName || "CLONE-BOT",
          memory: window.cloneMemoryBank || {},
          lifeCycle: typeof CloneLifeCycleEngine !== 'undefined' ? CloneLifeCycleEngine.profile : null,
          lifeCycleTicks: typeof CloneLifeCycleEngine !== 'undefined' ? CloneLifeCycleEngine.accumulatedTicksMs : 0,
          lifeCycleAnchor: typeof CloneLifeCycleEngine !== 'undefined' ? CloneLifeCycleEngine.genesisTimestamp : Date.now(),
          sandbox: typeof ImpressiveSandbox !== 'undefined' ? ImpressiveSandbox.developmentProfile : {},
          
          // INJECT ACTIVE PREFRONTAL GOALS INTO THE HARDWARE CACHE FILE MANIFEST
          prefrontalState: window.CloneBrain.prefrontalCortex ? window.CloneBrain.prefrontalCortex.profile : null
        };

        localStorage.setItem('impressive_sandbox_vault', JSON.stringify(unifiedDataPackage));
        this.refreshInterfaceHUDIndicators();
      } catch (err) {
        console.error("[LOGICTRACKER INTERCEPT FAULT] Advanced local save aborted: ", err);
      }
    };
    
    window.logicTracker.saveActiveStateToHardware();
  } else if (typeof coreFileCacheSaverBridge === 'function') {
    coreFileCacheSaverBridge();
  }
};

// Expose handle reference locally
var CloneBrain = window.CloneBrain;
console.log("[STORAGE.JS] Prefrontal Cortex focusNodes engine successfully integrated and aligned.");
// --- MUTABILITY TEMPORARY PROFILE PLACEHOLDERS ---
window.pendingIdentityProfile = { nameString: "CLONE-BOT", firstName: "", surname: "", gender: "" };

/**
 * RE-ENGINEERED MULTI-TURN IDENTITY LIFECYCLE MACHINE
 */
if (typeof window.IdentityConfig !== 'undefined') {
  window.IdentityConfig.processStep = function(input) {
    if (this.activeStep === null) return false;

    const cleanedText = input ? input.trim() : '';
    if (!cleanedText) {
      createTypingBubble(`[CALIBRATION FAULT] Parameter cannot be empty. Re-enter:`);
      return true;
    }

    if (this.activeStep === 'awaiting_firstname') {
      this.profile.firstName = cleanedText; this.activeStep = 'awaiting_surname'; updateStatusIndicator();
      createTypingBubble(`[SAVED] First name caught. Now enter the SURNAME or MODEL-LINE identifier:`);
      return true;
    }

    if (this.activeStep === 'awaiting_surname') {
      this.profile.surname = cleanedText; this.activeStep = 'awaiting_gender'; updateStatusIndicator();
      createTypingBubble(`[SAVED] Model suffix mapped. Final step: Enter GENDER SPECTRUM classification:`);
      return true;
    }

    if (this.activeStep === 'awaiting_gender') {
      this.profile.genderMatrix = cleanedText;
      
      // Store variables in a temporary holding node instead of executing a direct save loop
      const computedID = `${this.profile.firstName}_${this.profile.surname}`.toUpperCase().replace(/\s+/g, '_');
      window.pendingIdentityProfile = { nameString: computedID, firstName: this.profile.firstName, surname: this.profile.surname, gender: cleanedText };

      // Open the verification question box overlay module instantly
      const modal = document.getElementById('amendModal');
      if (modal) modal.style.display = "flex";

      this.activeStep = null; updateStatusIndicator();
      return true;
    }
    return false;
  };
}

/**
 * INTERACTIVE TRANSACTION AMENDMENT DISPATCHER
 * Executes the final header and profile transformations when "Amend" is selected.
 */
window.finalizeIdentityAmendment = function(isApproved) {
  const modal = document.getElementById('amendModal');
  if (modal) modal.style.display = "none";

  if (isApproved) {
    // 1. UPDATE CORE IDENTITY REGISTERS GLOBALLY
    cloneAssignedIdentityName = window.pendingIdentityProfile.nameString;
    
    // 2. DYNAMICALLY REWRITE THE CORE MAIN HEADER WORKSPACE TITLE
    const mainHeader = document.querySelector('h1');
    if (mainHeader) {
      mainHeader.innerHTML = `${cloneAssignedIdentityName} <span style="font-size:0.8rem; color:var(--matrix-green);">ONLINE</span>`;
    }

    // Synchronize arrays inside the baseline configuration object definitions
    if (typeof IdentityConfig !== 'undefined' && IdentityConfig.profile) {
      IdentityConfig.profile.firstName = window.pendingIdentityProfile.firstName;
      IdentityConfig.profile.surname = window.pendingIdentityProfile.surname;
      IdentityConfig.profile.genderMatrix = window.pendingIdentityProfile.gender;
    }

    // Save newly adjusted variables straight down browser local files cache blocks
    if (typeof saveDatabaseToLocalFiles === 'function') saveDatabaseToLocalFiles();

    // 3. LOG SECTOR FILE PATH RECORD
    if (typeof window.cloneMemoryBank !== 'undefined' && window.cloneMemoryBank.naming) {
      window.cloneMemoryBank.naming.push({
        filename: window.pendingIdentityProfile.firstName.toLowerCase(),
        line: window.cloneMemoryBank.naming.length + 1,
        data: `Matrix re-profile complete under ID: ${cloneAssignedIdentityName}`,
        explanation: `Calibrated Gender Matrix: ${window.pendingIdentityProfile.gender}`
      });
    }

    injectGlowNotification(`[MATRIX AMENDED] Identity sealed: ${cloneAssignedIdentityName}`, 'flash-science');
    createTypingBubble(`Calibration accepted! Profile matrix successfully amended. Core header field transformed into system label [${cloneAssignedIdentityName}]. How can I assist your workflow today?`);
  } else {
    // Cancel action path: discard modifications and reset state markers
    injectGlowNotification("[AMENDMENT CANCELED] Changes discarded.", "system-log");
    createTypingBubble("Calibration canceled. Matrix modifications discarded. Systems reverted to default baseline parameters.");
  }
};

/**
 * SKIN CONFIGURATION PARSER ACTUATOR
 * Syntax: Preference//Skin:VisorShape(Line)
 * Options: Preference//Skin:circular(1) or Preference//Skin:default(1)
 */
const baselineDoubleSlashShortcutHook = window.parseInlineDoubleSlashShortcut;
window.parseInlineDoubleSlashShortcut = function(text) {
  if (text.toLowerCase().includes("preference//skin:")) {
    const pattern = /preference\/\/skin:([a-zA-Z_]+)/i;
    const match = text.match(pattern);
    if (match) {
      const selectedSkinStyle = match[1].toLowerCase();
      const visorNode = document.querySelector('.visor');
      
      if (visorNode) {
        if (selectedSkinStyle === 'circular') {
          visorNode.classList.add('visor-circular');
          injectGlowNotification("[SKIN DECO UNLOCKED] Eye visor modified to Circular matrix format.", "flash-lyric");
          createTypingBubble("Actuator skin transformed! Successfully altered hardware visage parameters. Eye visor is now calibrated into a Circular lens geometry.");
        } else {
          visorNode.classList.remove('visor-circular');
          injectGlowNotification("[SKIN DECO UNLOCKED] Eye visor reset to Default horizontal format.", "flash-science");
          createTypingBubble("Actuator skin transformed! Visual visage parameters restored to default sleek horizontal Cyclops baseline layout.");
        }
        return true; // Intercept shortcut process loop
      }
    }
  }
  // Pass down along standard pipeline if skin commands are clear
  if (typeof baselineDoubleSlashShortcutHook === 'function') return baselineDoubleSlashShortcutHook(text);
  return false;
};
