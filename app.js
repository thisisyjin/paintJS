const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const ctx = canvas.getContext("2d");


canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;



// Default
ctx.strokeStyle = "#2c2c2c";
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
        // console.log('creating path in', x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        // console.log('creating line in', x, y);
    }
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function fillColor(event) {
    ctx.fillRect(0, 0, 700, 700);
}

function handleModeClick(event) { 
    if(filling === true) {        // filling 모드이면
        filling = false;           
        mode.innerText = "fill"
        
    } else {
        filling = true;
        mode.innerText = "paint"    // paint 모드이면 ㅡ 맨처음
        canvas.addEventListener('mousedown', fillColor);
    }
}



if (canvas) {
    canvas.addEventListener('mousemove',onMouseMove);   
    canvas.addEventListener('mousedown', startPainting); 
    canvas.addEventListener('mouseup', stopPainting);  
    canvas.addEventListener('mouseleave', stopPainting); 
}




Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


if (range) {
    range.addEventListener('input', handleRangeChange);
}



mode.addEventListener('click', handleModeClick);



