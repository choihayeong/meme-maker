const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");

canvasEl.width = 800;
canvasEl.height = 800;

ctx.moveTo(50, 50);

ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);

ctx.stroke();
ctx.fill();
