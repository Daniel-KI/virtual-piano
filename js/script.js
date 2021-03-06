const KEYS = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyW', 'KeyE', 'KeyT', 'KeyY', 'KeyU'];
const PATH_TO_SOUNDS = './assets/sounds/';
const pianoKeys = document.querySelectorAll('.piano-key');

const fullScreenBtn = document.querySelector('.full-screen');
const soundTypeBtn = document.querySelector('.sound-type');
const notesHintsBtn = document.querySelector('.note-hints');
const keyboardHintsBtn = document.querySelector('.keyboard-hints');

const soundBanks = new Map([
    ['Classical', 'classical/'],
    ['Electronic', 'electronic/'],
]);

let selectedSoundType = 'Classical';
let mouseButtonDown = false;

function playNote(key) {
    const path = `${PATH_TO_SOUNDS}${soundBanks.get(selectedSoundType)}${key.dataset.note}.wav`;
    const noteSound = new Audio(path);
    noteSound.play();
};

pianoKeys.forEach(key => {
    key.addEventListener('mousedown', () => {
        mouseButtonDown = true;
        key.classList.add('active-key');
        playNote(key);
    });
    key.addEventListener('mouseup', () => {
        key.classList.remove('active-key');
    });
    key.addEventListener('mouseenter', () => {
        if (mouseButtonDown === true) {
            key.classList.add('active-key');
            playNote(key);
        }
    });
    key.addEventListener('mouseleave', () => {
        key.classList.remove('active-key');
    });
});

document.addEventListener('mouseup', () => {
    mouseButtonDown = mouseButtonDown === true ? false : mouseButtonDown;
});

document.addEventListener('keydown', e => {
    if (e.repeat) return;
    const key = e.code;
    const keyIndex = KEYS.indexOf(key);
    if (keyIndex > -1) {
        playNote(pianoKeys[keyIndex]);
        pianoKeys[keyIndex].classList.add('active-key');
    }
});

document.addEventListener('keyup', e => {
    if (e.repeat) return;
    const key = e.code;
    const keyIndex = KEYS.indexOf(key);
    if (keyIndex > -1) {
        pianoKeys[keyIndex].classList.remove('active-key');
    }
});

fullScreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

document.addEventListener('fullscreenchange', () => {
    document.querySelector('.expand-icon').classList.toggle('hidden-icon');
    document.querySelector('.compress-icon').classList.toggle('hidden-icon');
    fullScreenBtn.classList.toggle('btn-selected');
});

soundTypeBtn.addEventListener('click', () => {
    soundTypeBtn.classList.toggle('btn-selected');
    if (selectedSoundType === 'Classical') {
        selectedSoundType = 'Electronic';
    }
    else {
        selectedSoundType = 'Classical';
    }
    document.querySelector('.sound-type_name').textContent = selectedSoundType;
});

notesHintsBtn.addEventListener('click', () => {
    if (keyboardHintsBtn.classList.contains('btn-selected-hint')) {
        keyboardHintsBtn.classList.remove('btn-selected-hint');
        notesHintsBtn.classList.toggle('btn-selected-hint');
        pianoKeys.forEach(key => {
            key.classList.toggle('note-hint');
            key.classList.toggle('key-hint');
        })
    }
});

keyboardHintsBtn.addEventListener('click', () => {
    if (notesHintsBtn.classList.contains('btn-selected-hint')) {
        notesHintsBtn.classList.remove('btn-selected-hint');
        keyboardHintsBtn.classList.toggle('btn-selected-hint');
        pianoKeys.forEach(key => {
            key.classList.toggle('key-hint');
            key.classList.toggle('note-hint');
        })
    }
});
