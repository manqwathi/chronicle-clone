/**
 * ENVIRONMENT AUDIO MATRIX CONTROLLER
 * Synthesizes dynamic friction waves matching world terrain conditions.
 */
if (typeof BasalGangliaRhythmLoop === 'undefined') var BasalGangliaRhythmLoop = {};

BasalGangliaRhythmLoop.triggerTerrainAudioEffect = function(landKey) {
  if (!this.audioContext) return;
  
  try {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    const key = landKey.toLowerCase();
    
    if (key === 'kimwalhoek') {
      // DESERT BARRIER EFFECT: Low, whistling electronic sand wave hum
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(65, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.25, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);
      osc.start(); osc.stop(this.audioContext.currentTime + 0.42);
    } 
    else if (key === 'tweesutford') {
      // JAGGED CLIFF SURROUNDINGS EFFECT: High-frequency resonant friction pop
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);
      osc.start(); osc.stop(this.audioContext.currentTime + 0.16);
    }
  } catch (ex) {
    console.log("Audio routing stream bypassed.");
  }
};
