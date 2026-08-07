// --- INITIALIZE SECURITY ACCESS LOGIC PARAMETERS ---
const SecurityGate = {
  registry: {
    masterHash: null,
    guestRegistry: {} // Stores token nodes: { "guest_name": "password" }
  },
  
  // Terminal Lock States: 'unlocked', 'locked_out'
  sessionStatus: 'unlocked',
  activeUserRole: 'none',

  /**
   * INLINE SHORTCUT COMPILER INTERCEPT VALVE
   * Patterns Handled:
   *   security//master:password(****)[hint]
   *   security//master:login(****)
   *   security//guest:password(****)[guest_name]
   */
  parseSecurityVaultShortcut(text) {
    const cleanText = text.trim();
    
    // Check A: Master Setup Node -> security//master:password(value)[hint]
    let match = cleanText.match(/^security\/\/master:password\(([^\]]+)\)\[([^\]]+)\]$/i);
    if (match) {
      this.registry.masterHash = match[1];
      injectGlowNotification("[SECURITY CORE] Master cryptographic credential key sealed.", "flash-science");
      createTypingBubble("Security configuration accepted. Master access credential lock is successfully initialized.");
      return true;
    }

    // Check B: Master Login Node -> security//master:login(value)
    match = cleanText.match(/^security\/\/master:login\(([^\]]+)\)$/i);
    if (match) {
      if (!this.registry.masterHash) {
        createTypingBubble("[ACCESS FAULT] No Master credential pattern logged in memory banks yet.");
        return true;
      }
      if (match[1] === this.registry.masterHash) {
        this.sessionStatus = 'unlocked';
        this.activeUserRole = 'master';
        injectGlowNotification("[ACCESS GRANTED] Terminal unlocked: Master Session initialized.", "flash-science");
        createTypingBubble("Identity authorized. Central processing channels completely unlocked under Master privilege parameters.");
      } else {
        this.executeTerminalLockdown();
      }
      return true;
    }

    // Check C: Guest Registration Node -> security//guest:password(value)[guest_name]
    match = cleanText.match(/^security\/\/guest:password\(([^\]]+)\)\[([^\]]+)\]$/i);
    if (match) {
      const guestName = match[2].trim().toLowerCase();
      const guestPass = match[1];
      this.registry.guestRegistry[guestName] = guestPass;
      
      injectGlowNotification(`[SECURITY CORE] Guest token configured: ${guestName.toUpperCase()}`, "flash-lyric");
      createTypingBubble(`Filing entry complete! Guest access portal generated under identifier node "${guestName.toUpperCase()}".`);
      return true;
    }

    return false;
  },

  executeTerminalLockdown() {
    this.sessionStatus = 'locked_out';
    this.activeUserRole = 'none';
    injectGlowNotification("[CRITICAL WARNING] Unauthorized login signature. Terminal lockdown engaged.", "flash-lyric");
    createTypingBubble("🚨 [ACCESS DENIED] Cryptographic signature mismatch. Core operations restricted. Type 'security//master:login(****)' with correct credentials to restore console functions.");
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
