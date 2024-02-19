const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");

canvasEl.width = 800;
canvasEl.height = 800;

ctx.fillRect(210 - 15, 200 - 40, 15, 100);
ctx.fillRect(350 - 15, 200 - 40, 15, 100);
ctx.fillRect(260 - 15, 200 - 40, 60, 200);

// https://www.w3schools.com/tags/canvas_arc.asp (arc() Method)
ctx.arc(275, 100, 40, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(290, 85, 8, Math.PI, 2 * Math.PI);
ctx.arc(260, 85, 8, Math.PI, 2 * Math.PI);
ctx.fill();
