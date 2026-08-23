/**
 * RE-ENGINEERED MULTI-USER SECURITY PRIVILEGE TUNNEL
 * Solves the duplicate variable declaration crashes by decoupling token identifiers.
 */
const SecurityGate = {
  registry: {
    masterHash: null,
    guestRegistry: {}
  },
  sessionStatus: 'unlocked',
  activeUserRole: 'none',

  parseSecurityVaultShortcut(text) {
    if (!text || typeof text !== 'string') return false;
    const cleanText = text.trim();

    // VERIFICATION CHANNEL A: MASTER CREDENTIAL LOCK INITIALIZATION
    const masterSetupPatternMatch = cleanText.match(/^security\/\/master:password\(([^\]]+)\)\[([^\]]+)\]$/i);
    if (masterSetupPatternMatch) {
      this.registry.masterHash = masterSetupPatternMatch[1];
      injectGlowNotification("[SECURITY CORE] Master cryptographic key sealed.", "flash-science");
      createTypingBubble("Security configuration accepted. Master access credential lock initialized.");
      return true;
    }

    // VERIFICATION CHANNEL B: PRIVILEGE ACCESS LOGIN CHECK
    const masterLoginPatternMatch = cleanText.match(/^security\/\/master:login\(([^\]]+)\)$/i);
    if (masterLoginPatternMatch) {
      if (!this.registry.masterHash) {
        createTypingBubble("[ACCESS FAULT] No Master credential pattern logged in memory banks yet.");
        return true;
      }
      if (masterLoginPatternMatch[1] === this.registry.masterHash) {
        this.sessionStatus = 'unlocked';
        this.activeUserRole = 'master';
        injectGlowNotification("[ACCESS GRANTED] Terminal unlocked: Master Session active.", "flash-science");
        createTypingBubble("Identity authorized. Central processing channels completely unlocked under Master privilege parameters.");
      } else {
        this.executeTerminalLockdown();
      }
      return true;
    }

    // VERIFICATION CHANNEL C: GUEST SUB-ACCOUNT PROFILER REGISTRATION
    const guestSetupPatternMatch = cleanText.match(/^security\/\/guest:password\(([^\]]+)\)\[([^\]]+)\]$/i);
    if (guestSetupPatternMatch) {
      const guestNameKey = guestSetupPatternMatch[2].trim().toLowerCase();
      const guestPassVal = guestSetupPatternMatch[1];
      this.registry.guestRegistry[guestNameKey] = guestPassVal;

      injectGlowNotification(`[SECURITY CORE] Guest token configured: ${guestNameKey.toUpperCase()}`, "flash-lyric");
      createTypingBubble(`Filing entry complete! Guest access portal generated under identifier node "${guestNameKey.toUpperCase()}".`);
      return true;
    }

    return false;
  },

  executeTerminalLockdown() {
    this.sessionStatus = 'locked_out';
    this.activeUserRole = 'none';
    if (typeof triggerConsoleScreenShake === 'function') triggerConsoleScreenShake();
    injectGlowNotification("[CRITICAL WARNING] Unauthorized login signature. Terminal lockdown engaged.", "flash-lyric");
    createTypingBubble("🚨 [ACCESS DENIED] Cryptographic signature mismatch. Core operations restricted. Type 'security//master:login(****)' to unlock.");
  }
};
/**
 * HARDWARE IMPACT FRICTION SIMULATOR
 * Vibrates the main workspace panel when a security breach occurs.
 */
function triggerConsoleScreenShake() {
  const targetWorkspacePanel = document.querySelector('.boot-form-panel') || document.querySelector('.study-desk-canvas');
  if (!targetWorkspacePanel) return;

  targetWorkspacePanel.classList.add('security-shake-active');
  setTimeout(() => {
    targetWorkspacePanel.classList.remove('security-shake-active');
  }, 400); // Shakes the interface window for exactly 400ms
}

// INTEGRATION HOOK FOR THE SECURITY CORES LOCKDOWN SWITCH
if (typeof SecurityGate !== 'undefined') {
  const originalLockdown = SecurityGate.executeTerminalLockdown;
  SecurityGate.executeTerminalLockdown = function() {
    originalLockdown.call(this);
    triggerConsoleScreenShake(); // Fire the camera vibration instantly on a rejected login check
  };
}