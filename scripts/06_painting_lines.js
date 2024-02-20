const canvasEl = document.querySelector("#canvas");
const ctx = canvasEl.getContext("2d");

canvasEl.width = 800;
canvasEl.height = 800;

ctx.lineWidth = 2;
// ctx.moveTo(0,0);

// random color chip generator
/**
 * new RegExp(/^\#(([0-9a-f]){3}|([0-9a-f]){6}|([0-9a-f]){8})$/i);
 * https://www.geeksforgeeks.org/javascript-generate-random-hex-codes-color/
 */
const generateRandomColorChip = () => {
  let letters = "0123456789abcdef";
  let hexCode = "#";

  for (let i = 0; i < 6; i++) {
    hexCode += letters[Math.floor(Math.random() * letters.length)];
  }

  return hexCode;
};

/**
 * @param {Number} count
 * @returns {String | String[]}
 * reference : https://coolors.co/
 */
const generateColorPalette = (count = 1) => {
  let array = [];

  if (count > 1) {
    for (let i = 0; i < count; i++) {
      array.push(generateRandomColorChip());
    }

    return array;
  } else {
    return generateRandomColorChip();
  }
};

// https://flatuicolors.com/
const colors = generateColorPalette(10);

const onClick = (event) => {
  ctx.beginPath();
  ctx.moveTo(400, 400);

  const color = colors[Math.floor(Math.random() * colors.length)];

  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
};

// canvasEl.addEventListener("click", onClick);
canvasEl.addEventListener("mousemove", onClick);
