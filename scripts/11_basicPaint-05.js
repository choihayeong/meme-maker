const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");

const lineWidthEl = document.querySelector("#lineWidth");
const paintColorEl = document.querySelector("#paintColor");

const onLineWidthChange = (event) => {
  ctx.lineWidth = event.target.value;
};
const onPaintColorChange = (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
};

lineWidthEl.addEventListener("change", onLineWidthChange);
paintColorEl.addEventListener("change", onPaintColorChange);

// color chips
const colorChipsEl = document.querySelectorAll(".color-chip");
// const colorChipsEl = Array.from(document.getElementsByClassName("color-chip"));

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

// fill the canvas all the way event
const onCanvasClick = () => {
  if (isFilling) {
    // canvasEl.
    ctx.fillRect(0, 0 , 800, 800);
    ctx.fill();
  }
}

canvasEl.addEventListener("click", onCanvasClick);


// 
canvasEl.width = 800;
canvasEl.height = 800;
ctx.strokeStyle = paintColorEl.value;
ctx.fillStyle = paintColorEl.value;
ctx.lineWidth = lineWidthEl.value;

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
}

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
