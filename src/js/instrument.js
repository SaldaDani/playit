const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const noteFrequencies = {
    'Do': 261.63,  // C4
    'Do#': 277.18,
    'Re': 293.66,
    'Re#': 311.13,
    'Mi': 329.63,
    'Fa': 349.23,
    'Fa#': 369.99,
    'Sol': 392.00,
    'Sol#': 415.30,
    'La': 440.00,
    'La#': 466.16,
    'Si': 493.88,
    // Segunda octava
    'Do2': 523.25, // C5
    'Do#2': 554.37,
    'Re2': 587.33,
    'Re#2': 622.25,
    'Mi2': 659.26,
    'Fa2': 698.46,
    'Fa#2': 739.99,
    'Sol2': 783.99,
    'Sol#2': 830.61,
    'La2': 880.00,
    'La#2': 932.33,
    'Si2': 987.77
};

function createPianoSound(frequency) {
    const masterGain = audioContext.createGain();
    const compressor = audioContext.createDynamicsCompressor();
    const filter = audioContext.createBiquadFilter();

    // Configuración del filtro
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    filter.Q.value = 1;

    // Configuración del compresor
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 12;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;

    // Configuración de la cadena de audio
    masterGain.connect(filter);
    filter.connect(compressor);
    compressor.connect(audioContext.destination);

    // Crear varios osciladores con diferentes tipos y detune
    const oscillators = [
        { type: 'sine', gain: 0.5, detune: 0 },
        { type: 'triangle', gain: 0.2, detune: 3 },
        { type: 'sine', gain: 0.15, detune: -3 },
        { type: 'square', gain: 0.05, detune: 7 }
    ].map(settings => {
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();

        osc.type = settings.type;
        osc.frequency.value = frequency;
        osc.detune.value = settings.detune;

        oscGain.gain.value = settings.gain;

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        return { oscillator: osc, gain: oscGain };
    });

    // Envolvente ADSR
    const now = audioContext.currentTime;
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.7, now + 0.02);  // Attack
    masterGain.gain.linearRampToValueAtTime(0.3, now + 0.08);  // Decay
    masterGain.gain.linearRampToValueAtTime(0.2, now + 0.1);   // Sustain
    masterGain.gain.linearRampToValueAtTime(0, now + 0.8);     // Release reducido de 2 a 0.8

    // Iniciar y detener osciladores
    oscillators.forEach(({ oscillator }) => {
        oscillator.start(now);
        oscillator.stop(now + 0.8);  // Reducido de 2 a 0.8 para coincidir con el release
    });

}

document.addEventListener('DOMContentLoaded', () => { // Esperar a que el DOM esté cargado completamente 
    const keys = document.querySelectorAll('.white-key, .black-key');
    let activeKeys = new Set(); //Evita que se reproduzcan muchas veces al mantener 

    // Manejar clics del ratón
    keys.forEach(key => {
        key.addEventListener('mousedown', () => {
            const note = key.getAttribute('data-note');
            createPianoSound(noteFrequencies[note]);
            key.classList.add('active');
        });

        key.addEventListener('mouseup', () => {
            key.classList.remove('active');
        });
    });

    // Manejar pulsaciones de teclado
    document.addEventListener('keydown', (e) => {
        const keycode = e.keyCode;
        if (!activeKeys.has(keycode)) {
            const key = document.querySelector(`[data-keycode="${keycode}"]`);
            if (key) {
                const note = key.getAttribute('data-note');
                createPianoSound(noteFrequencies[note]);
                key.classList.add('active');
                activeKeys.add(keycode);
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        const keycode = e.keyCode;
        const key = document.querySelector(`[data-keycode="${keycode}"]`);
        if (key) {
            key.classList.remove('active');
            activeKeys.delete(keycode);
        }
    });
});