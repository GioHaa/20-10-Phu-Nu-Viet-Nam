class RomanticAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.volume = 0.4;
    this.timerId = null;
    this.customAudio = null;
    this.isCustom = false;
    this.onStateChange = null;

    this.notes = {
      C3: 130.81, E3: 164.81, G3: 196.00, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
      G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46,
      G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50
    };

    this.arpeggioSequence = [

      ['C4', 0.5], ['G4', 0.5], ['C5', 0.5], ['E5', 0.5], ['G5', 1.0], ['E5', 1.0],

      ['B3', 0.5], ['G4', 0.5], ['D5', 0.5], ['G5', 0.5], ['B4', 1.0], ['D5', 1.0],

      ['A3', 0.5], ['E4', 0.5], ['A4', 0.5], ['C5', 0.5], ['E5', 1.0], ['C5', 1.0],

      ['E3', 0.5], ['B3', 0.5], ['E4', 0.5], ['G4', 0.5], ['B4', 1.0], ['G4', 1.0],

      ['F3', 0.5], ['C4', 0.5], ['F4', 0.5], ['A4', 0.5], ['C5', 1.0], ['A4', 1.0],

      ['C3', 0.5], ['G3', 0.5], ['E4', 0.5], ['G4', 0.5], ['C5', 1.0], ['G4', 1.0],

      ['D3', 0.5], ['A3', 0.5], ['F4', 0.5], ['A4', 0.5], ['D5', 1.0], ['F4', 1.0],

      ['G3', 0.5], ['D4', 0.5], ['F4', 0.5], ['B4', 0.5], ['D5', 1.0], ['G4', 1.0]
    ];
    this.currentStep = 0;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playNote(frequency, duration = 1.0, type = 'sine') {
    if (!this.audioCtx || this.audioCtx.state === 'suspended') return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(frequency, now);
    osc2.frequency.setValueAtTime(frequency * 2, now);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume, now);

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.12, now + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.8);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 1.0);
    osc2.stop(now + duration + 1.0);
  }

  playNextNote() {
    if (!this.isPlaying || this.isCustom) return;

    const item = this.arpeggioSequence[this.currentStep];
    const noteName = item[0];
    const duration = item[1];
    const freq = this.notes[noteName];

    if (freq) {
      this.playNote(freq, duration * 1.4);
    }

    this.currentStep = (this.currentStep + 1) % this.arpeggioSequence.length;

    const delay = duration * 560;
    this.timerId = setTimeout(() => this.playNextNote(), delay);
  }

  playChime(high = false) {
    this.initContext();
    if (!this.audioCtx) return;
    const notes = high ? [this.notes.E5, this.notes.G5, this.notes.C6] : [this.notes.C5, this.notes.E5, this.notes.G5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.9, 'sine');
      }, idx * 110);
    });
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.initContext();
    this.isPlaying = true;

    if (this.isCustom && this.customAudio) {
      this.customAudio.play().catch(e => console.log('Audio autoplay prevented:', e));
    } else {
      this.playNextNote();
    }

    if (this.onStateChange) this.onStateChange(true);
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.onStateChange) this.onStateChange(false);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  loadCustomUrl(url) {
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (!url || url.trim() === '') {
      this.isCustom = false;
      this.customAudio = null;
      return;
    }
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.isCustom = true;
    if (this.isPlaying) {
      this.customAudio.play().catch(e => console.log('Custom audio error:', e));
    }
  }
}

window.romanticAudio = new RomanticAudioEngine();
