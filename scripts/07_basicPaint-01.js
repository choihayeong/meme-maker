const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");

canvasEl.width = 800;
canvasEl.height = 800;

let isPainting = false;

// user가 마우스를 움직일때마다 moveTo() 메서드 호출
const onMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    return;
  }

  ctx.moveTo(event.offsetX, event.offsetY);
}

canvasEl.addEventListener("mousemove", onMove);

// user가 마우스를 눌렀는지 확인(mousedown)
const startPainting = () => {
  isPainting = true;
}
const cancelPainting = () => {
  isPainting = false;
}

canvasEl.addEventListener("mousedown", startPainting);
canvasEl.addEventListener("mouseup", cancelPainting);
canvasEl.addEventListener("mouseleave", cancelPainting);
