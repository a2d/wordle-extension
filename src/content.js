const debug = true;
if(debug) console.info('content.js');

const APP = 'game-app';
const app = document.querySelector(APP).shadowRoot;

const KEYBOARD = 'game-keyboard';
const keyboard = app.querySelector(KEYBOARD).shadowRoot;

const KBD_KEYS = 'button[data-key]';
const kbd_keys = keyboard.querySelectorAll(KBD_KEYS);

if(debug) console.info(`content.js->keys:${kbd_keys.length}`);

/* REMAP KEYBOARD */
const newKeys =   'eariotnslcudpmhgbfywkvxzjq'; /* Letters ordered by frequency. See https://www3.nd.edu/~busiforc/handouts/cryptography/letterfrequencies.html */
const keyValues = '11111111131233423444548A8A'; /* Hex representation of scrabble letter values */

let j = 0;
for (let i = 0, k = kbd_keys.length; i < k; i++) {
  /* check key is a letter, not enter/backspace */
  let pos = newKeys.indexOf(kbd_keys[i].dataset['key']);
  if ( pos >= 0 ) {
    if (debug) console.info(`content.js->${kbd_keys[i].dataset['key']}->${newKeys.charAt(j)}`);
    let oldKey = kbd_keys[i];
    let newKey = newKeys.charAt(j);
    oldKey.dataset['key'] = newKey;
    oldKey.dataset['scrabble'] = parseInt(keyValues.charAt(j), 16); /* Convert hex to decimal */
    oldKey.innerHTML = newKey;
    j++;
  } 
}

/* ADD CSS */
keyboard.styleSheets[0].insertRule(`
[data-scrabble] {
  position: relative;
  font: 2rem/1 monospace;
}`);
keyboard.styleSheets[0].insertRule(`
[data-scrabble]::after { 
  content: attr(data-scrabble);
  position: absolute;
  inset: auto 2px 2px auto;
  font-size: .4em;
}`);
