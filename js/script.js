const KEYS = ['KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyW','KeyE','KeyT','KeyY','KeyU'];
const pianoKeys = document.querySelectorAll('.piano-key');

pianoKeys.forEach(key => {
    key.addEventListener('mousedown', e => {
        key.classList.add('active-key');
        playNote(key);
    });
    key.addEventListener('mouseup', e => {
        key.classList.remove('active-key');
    });
});

document.addEventListener('keydown', e => {
    if (e.repeat) return;
    const key = e.code;
    const keyIndex = KEYS.indexOf(key);
    if(keyIndex > -1){
        playNote(pianoKeys[keyIndex]);
        pianoKeys[keyIndex].classList.add('active-key');
    }

});

document.addEventListener('keyup', e =>{
    if (e.repeat) return;
    const key = e.code;
    const keyIndex = KEYS.indexOf(key);
    if(keyIndex > -1){
        pianoKeys[keyIndex].classList.remove('active-key');
    }
});

function playNote(key){
    const path = `../assets/sounds/${key.dataset.note}.wav`;
    const noteSound = new Audio(path);
    noteSound.play();
}