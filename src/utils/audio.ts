// Web Audio API Synthesizer for retro RPG sound effects without external audio files

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('habitica_sfx_enabled');
      this.soundEnabled = stored !== null ? stored === 'true' : true;
    }
  }

  private initCtx() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('habitica_sfx_enabled', String(this.soundEnabled));
    }
    if (this.soundEnabled) {
      this.playCheckSound();
    }
    return this.soundEnabled;
  }

  // Task check chime (uplifting ascending arpeggio)
  public playCheckSound() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);
      
      gain.gain.setValueAtTime(0, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.05 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.15);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.16);
    });
  }

  // Gold collection sound (crisp high coin jingle)
  public playGoldSound() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Boss hit / spell impact sound
  public playBossHitSound() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.23);
  }

  // Gear equip sound
  public playEquipSound() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(880, now + 0.04);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Level up fanfare
  public playLevelUpSound() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { f: 523.25, d: 0.1 },  // C5
      { f: 659.25, d: 0.1 },  // E5
      { f: 783.99, d: 0.1 },  // G5
      { f: 1046.50, d: 0.2 }, // C6
      { f: 880.00, d: 0.1 },  // A5
      { f: 1046.50, d: 0.4 }  // C6
    ];

    let t = now;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d + 0.02);
      t += note.d * 0.9;
    });
  }

  // Konami Easter egg 8-bit fanfare
  public playEasterEggSound() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [330, 392, 659, 523, 587, 784, 1046];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.12, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.13);
    });
  }
}

export const soundManager = new SoundSynthesizer();
