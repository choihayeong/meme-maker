const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");

canvasEl.width = 800;
canvasEl.height = 800;

ctx.strokeRect(30, 30, 100, 200);
// ctx.fillRect(30, 30, 100, 200);
