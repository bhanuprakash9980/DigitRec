const BACKGROUND_COLOR = '#000000';
const LINE_COLOR = '#ffffff';
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;
var canvas;
var context;

const prepareCanvas = () => {
  canvas = document.getElementById('my-canvas');
  context = canvas.getContext('2d');

  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = LINE_COLOR;
  context.lineWidth = LINE_WIDTH;
  context.lineJoin = 'round';
  var isPainting = false;

  document.addEventListener('mousedown', (e) => {
    currentX = e.clientX - canvas.offsetLeft;
    currentY = e.clientY - canvas.offsetTop;
    isPainting = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isPainting) {
      previousX = currentX;
      currentX = e.clientX - canvas.offsetLeft;

      previousY = currentY;
      currentY = e.clientY - canvas.offsetTop;

      draw();
    }
  });

  document.addEventListener('mouseup', (e) => {
    isPainting = false;
  });

  canvas.addEventListener('mouseleave', (e) => {
    isPainting = false;
  });

  canvas.addEventListener('touchstart', (e) => {
    currentX = e.touches[0].clientX - canvas.offsetLeft;
    currentY = e.touches[0].clientY - canvas.offsetTop;
    isPainting = true;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (isPainting) {
      previousX = currentX;
      currentX = e.touches[0].clientX - canvas.offsetLeft;

      previousY = currentY;
      currentY = e.touches[0].clientY - canvas.offsetTop;

      draw();
    }
  });

  canvas.addEventListener('touchend', (e) => {
    isPainting = false;
  });
  canvas.addEventListener('touchcancel', (e) => {
    isPainting = false;
  });
};

const draw = () => {
  context.beginPath();
  context.moveTo(previousX, previousY);
  context.lineTo(currentX, currentY);
  context.closePath();
  context.stroke();
};

const clearCanvas = () => {
  currentX = 0;
  currentY = 0;
  previousX = 0;
  previousY = 0;
  context.fillRect(0, 0, canvas.width, canvas.height);
};
