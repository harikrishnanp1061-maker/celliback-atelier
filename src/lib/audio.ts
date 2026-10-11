// Web Audio API based cute sound engine for Celliback

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmInterval: any = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a bouncy bubble pop sound on click
  playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startTime = this.ctx.currentTime;
      osc.type = 'sine';
      // Pitch sweeps up quickly like a bubble popping
      osc.frequency.setValueAtTime(400, startTime);
      osc.frequency.exponentialRampToValueAtTime(880, startTime + 0.08);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(startTime);
      osc.stop(startTime + 0.09);
    } catch {
      // AudioContext might be blocked before first interaction
    }
  }

  // Play a magical chime when adding to cart
  playChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.12, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.36);
      });
    } catch {}
  }

  // Lo-Fi Cute Pentatonic Background Melody
  toggleBgm(onStateChange?: (playing: boolean) => void): boolean {
    this.initContext();
    if (this.isBgmPlaying) {
      this.stopBgm();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startBgm(onStateChange);
      return true;
    }
  }

  startBgm(onStateChange?: (playing: boolean) => void) {
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.initContext();
    if (onStateChange) onStateChange(true);

    // Cute pentatonic scale notes (G Major Pentatonic / C Major Pentatonic)
    const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 659.25, 783.99, 587.33];
    let step = 0;

    const playNextNote = () => {
      if (!this.isBgmPlaying || !this.ctx) return;

      const freq = melody[step % melody.length];
      step++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime); // gentle background volume
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.6);
    };

    // Play notes rhythmically
    playNextNote();
    this.bgmInterval = setInterval(playNextNote, 600);
  }

  // Automatically start BGM on page load or on first user gesture if restricted by browser policy
  enableAudioAutoStart(onStateChange?: (playing: boolean) => void) {
    const attempt = () => {
      this.initContext();
      if (!this.isBgmPlaying) {
        this.startBgm(onStateChange);
      }
    };

    // Attempt immediately
    attempt();

    // Browser audio policy fallback: unlock on first interaction
    const unlock = () => {
      attempt();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('scroll', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
    window.addEventListener('scroll', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  getBgmStatus(): boolean {
    return this.isBgmPlaying;
  }
}

export const sounds = new SoundEngine();
