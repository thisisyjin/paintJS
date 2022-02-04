const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// Default
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle  = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let filling = false;
let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath(); 
        ctx.moveTo(x, y);
        // console.log('creating path in', x, y);/
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        // console.log('creating line in', x, y);
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    if(filling) {
        ctx.fillStyle = color;
    } else {
        ctx.strokeStyle = color;
    }
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function fillColor(event) {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleModeClick(event) { 
    if(filling === true) {        // filling 모드이면
        filling = false;           
        mode.innerText = "fill"
    } else {
        filling = true;
        mode.innerText = "paint"    // paint 모드이면 ㅡ 맨처음
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[🎨]";
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove',onMouseMove);   
    canvas.addEventListener('mousedown', startPainting); 
    canvas.addEventListener('mouseup', stopPainting);  
    canvas.addEventListener('mouseleave', stopPainting); 
    canvas.addEventListener('click', fillColor);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (save) {
    save.addEventListener('click', handleSaveClick);
}