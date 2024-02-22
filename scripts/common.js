(() => {
  const canvasEl = document.querySelector("#canvas");
  const ctx = canvasEl.getContext("2d");
  
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;
  
  // default
  canvasEl.width = CANVAS_WIDTH;
  canvasEl.height = CANVAS_HEIGHT;
  
  const onLoadResetStatus = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fill();

    document.querySelector(".filename")?.remove();
  };
  
  onLoadResetStatus();
  
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
  
  // draw with colors
  const lineWidthEl = document.querySelector("#lineWidth");
  const paintColorEl = document.querySelector("#paintColor");
  ctx.strokeStyle = paintColorEl.value;
  ctx.fillStyle = paintColorEl.value;
  ctx.lineWidth = lineWidthEl.value;
  ctx.lineCap = "round";
  
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
  
  const onColorChipClick = (index) => {
    const { ariaLabel } = event.target;
  
    colorChipsEl.forEach((chip, index) => {
      chip.classList.remove("active");
    });
    colorChipsEl[index].classList.add("active");
  
    ctx.strokeStyle = ariaLabel;
    ctx.fillStyle = ariaLabel;
    paintColorEl.value = ariaLabel;
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
  
  // fill
  const onCanvasClick = () => {
    if (isFilling) {
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fill();
    }
  };
  
  canvasEl.addEventListener("click", onCanvasClick);
  
  // destroy(reset)
  const destoryButtonEl = document.querySelector("#destroyButton");
  destoryButtonEl.addEventListener("click", onLoadResetStatus);
  
  // eraser button
  const eraserButtonEl = document.querySelector("#eraserButton");
  
  const onEraserClick = () => {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeButtonEl.textContent = "Fill";
  };
  
  eraserButtonEl.addEventListener("click", onEraserClick);
  
  
  // meme-making...
  // add Image on Canvas
  const memeFileEl = document.querySelector("#memeFile");
  
  const onchangeMemeFile = (event) => {
    const { files } = event.target;
    const url = URL.createObjectURL(files[0]);
    const { name } = files[0];
  
    const fileNameEl = document.createElement("span");
    fileNameEl.classList.add("filename");
    fileNameEl.textContent = name;

    memeFileEl.parentElement.after(fileNameEl);

    const image = new Image();
    image.src = url;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      memeFileEl.value = "";
    }
  };
  
  memeFileEl.addEventListener("change", onchangeMemeFile);
  
  // add Test on Canvas
  const addTextEl = document.querySelector("#addText");
  
  const onDblClickCanvas = (event) => {
    ctx.save();
  
    const text = addTextEl.value;
  
    ctx.lineWidth = 1;
    ctx.font = "5rem san-serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    // ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();
  };
  
  canvasEl.addEventListener("dblclick", onDblClickCanvas);
  
  // save current Image
  const saveButtonEl = document.querySelector("#saveButton");
  
  const onSaveCurrentImage = () => {
    const url = canvasEl.toDataURL();
  
    const anchorEl = document.createElement("a");
    anchorEl.href = url;
    anchorEl.download = "my_drawing.jpg";
    anchorEl.click();
  };
  
  saveButtonEl.addEventListener("click", onSaveCurrentImage);
  
})();