const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

// default
canvasEl.width = CANVAS_WIDTH;
canvasEl.height = CANVAS_HEIGHT;

let isPainting = false;

// user가 마우스를 움직일때마다 moveTo() 메서드 호출
const onMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    return;
  }

  // ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
};

canvasEl.addEventListener("mousemove", onMove);

// user가 마우스를 눌렀는지 확인(mousedown)
const startPainting = () => {
  isPainting = true;
};
const cancelPainting = () => {
  isPainting = false;
  ctx.beginPath();
};

canvasEl.addEventListener("mousedown", startPainting);
canvasEl.addEventListener("mouseup", cancelPainting);
canvasEl.addEventListener("mouseleave", cancelPainting);


// draw line and change color
const lineWidthEl = document.querySelector("#lineWidth");
const paintColorEl = document.querySelector("#paintColor");
ctx.strokeStyle = paintColorEl.value;
ctx.fillStyle = paintColorEl.value;
ctx.lineWidth = lineWidthEl.value;

const onLineWidthChange = (event) => {
  ctx.lineWidth = event.target.value;
};
const onPaintColorChange = (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
};

lineWidthEl.addEventListener("change", onLineWidthChange);
paintColorEl.addEventListener("change", onPaintColorChange);


// select color chips
/**
 * same as expression : const colorChipsEl = Array.from(document.getElementsByClassName("color-chip"));
 */
const colorChipsEl = document.querySelectorAll(".color-chip");

const onColorChipClick = (index) => {
  const { color } = event.target.dataset;

  colorChipsEl.forEach((chip, index) => {
    chip.classList.remove("active");
  });
  colorChipsEl[index].classList.add("active");

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  paintColorEl.value = color;
};

colorChipsEl.forEach((chip, index) => {
  chip.addEventListener("click", () => {
    onColorChipClick(index);
  });
});


// handling mode button
const modeButtonEl = document.querySelector("#modeButton");

let isFilling = false;

const onModeClick = () => {
  if (isFilling) {
    isFilling = false;
    modeButtonEl.textContent = "Fill";
  } else {
    isFilling = true;
    modeButtonEl.textContent = "Draw";
  }
};

modeButtonEl.addEventListener("click", onModeClick);

/** 
 * fill the canvas all the way event
 */ 
const onCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fill();
  }
};

canvasEl.addEventListener("click", onCanvasClick);


// handling destroy(reset) button
const destoryButtonEl = document.querySelector("#destroyButton");

const onDestroyClick = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fill();
};

destoryButtonEl.addEventListener("click", onDestroyClick);
