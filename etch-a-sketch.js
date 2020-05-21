const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;
let hue = 0;

const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'rect';
ctx.lineCap = 're';
ctx.lineWidth = MOVE_AMOUNT;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;
ctx.beginPath(); // start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function move(e) {
  hue += 1;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  // starting path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // if holding ctrl - dont draw
  if (e.ctrlKey) {
    console.log('ctrl clicked', e.key, e.ctrlKey);
    return moveNoDraw(e.key);
  }

  // move to depending what user did
  switch (e.key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function moveNoDraw(key) {
  ctx.moveTo(x, y);
  // move to depending what user did
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      // console.log(key);
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      // console.log(key);
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  displayDot(x, y, key);
}
// handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    move(e);
    console.log(e.key);
  }
}
function handleKeyUp(e) {
  if (e.ctrlKey && e.key.includes('Arrow')) {
    console.log('ctrl clicked', e.key, e.ctrlKey);
    if (e.ctrlKey) {
      ctx.clearRect(x, y, MOVE_AMOUNT, MOVE_AMOUNT);
    }
  }
}
// displaying dot in case of ctrl clicked
function displayDot(xCoor, yCoor, key) {
  ctx.rect(xCoor, yCoor, MOVE_AMOUNT, MOVE_AMOUNT);
  ctx.rect(xCoor, yCoor, MOVE_AMOUNT, MOVE_AMOUNT);
  ctx.fillStyle = `hsl(${hue},100%,50%)`;
  ctx.fill();
  switch (key) {
    case 'ArrowUp':
      ctx.clearRect(xCoor, yCoor + MOVE_AMOUNT, MOVE_AMOUNT, MOVE_AMOUNT);
      break;
    case 'ArrowDown':
      ctx.clearRect(xCoor, yCoor - MOVE_AMOUNT, MOVE_AMOUNT, MOVE_AMOUNT);
      break;
    case 'ArrowLeft':
      ctx.clearRect(xCoor + MOVE_AMOUNT, yCoor, MOVE_AMOUNT, MOVE_AMOUNT);
      break;
    case 'ArrowRight':
      ctx.clearRect(xCoor - MOVE_AMOUNT, yCoor, MOVE_AMOUNT, MOVE_AMOUNT);
      break;
    default:
      break;
  }
}
// clear/shake function

function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    function() {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// listem for arrow keys
window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKeyUp);
shakebutton.addEventListener('click', clearCanvas);
