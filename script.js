const canvas = document.getElementById("drawing-area");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let isErasing = false;
let lastX = 0;
let lastY = 0;

ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

function startDrawing(e) {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
}

function stopDrawing() {
  isDrawing = false;
}

function draw(e) {
  if (!isDrawing) return;

  if (isErasing) {
    ctx.clearRect(e.offsetX -10, e.offsetY  -10, 20, 20); 
  } else {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
}

function selectPen() {
  isErasing = false;
  ctx.strokeStyle = "black"; 
}

function toggleEraser() {
  isErasing = !isErasing;
  ctx.strokeStyle = "white"; 
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("mousemove", draw);
