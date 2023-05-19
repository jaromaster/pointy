
// constants
const canvasId = "myCanvas";
const divId = "canvasDiv";
const rows = 20;
const cols = 50;
const offset = 10; //px
const rectSide = 15; //px
const circleRadius = 15; //px
let vecLen; //px


// point rows * cols arrows pointing at (mouseX, mouseY)
function draw_vectors(mouseX, mouseY) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const div = document.getElementById(divId);
    canvas.width = div.offsetWidth;
    canvas.height = div.offsetHeight;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 5;
    
    const stepX = Math.floor((canvas.width-2*offset) / cols);
    const stepY = Math.floor((canvas.height-2*offset) / rows);
    vecLen = Math.min(stepX,stepY)-2;

    // drawing
    ctx.fillStyle = "red";
    ctx.moveTo(mouseX,mouseY);
    ctx.arc(mouseX,mouseY,circleRadius,0,2*Math.PI,false);
    ctx.fill();

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    for (let x = offset; x <= canvas.width-offset; x+=stepX) {
        for (let y = offset; y <= canvas.height-offset; y+=stepY) {
            // draw vec
            draw_vec(ctx,x,y,mouseX,mouseY);
        }
    }
    ctx.stroke();
    ctx.closePath();
}

// draw arrows in default position (pointing downwards)
function draw_vectors_default() {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    const div = document.getElementById(divId);
    canvas.width = div.offsetWidth;
    canvas.height = div.offsetHeight;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,0,255)";
    ctx.lineWidth = 5;
    
    const stepX = Math.floor((canvas.width-2*offset) / cols);
    const stepY = Math.floor((canvas.height-2*offset) / rows);
    vecLen = Math.min(stepX,stepY)-2;

    // drawing
    for (let x = offset; x <= canvas.width-offset; x+=stepX) {
        for (let y = offset; y <= canvas.height-offset; y+=stepY) {
            // draw vec
            draw_vec(ctx,x,y,x,y);
        }
    }
    ctx.stroke();
    ctx.closePath();
}


// draw vector with position and direction (deg)
function draw_vec(ctx,x,y,mouseX,mouseY) {
    const k = (mouseY-y)/(mouseX-x);
    const n = vecLen/2 / Math.sqrt(1+Math.pow(k,2));

    if (n==0 || mouseX-x == 0) {
        ctx.moveTo(x, y-vecLen/2);
        ctx.lineTo(x, y+vecLen/2);
    }
    else {
        ctx.moveTo(x-n, y-k*n);
        ctx.lineTo(x+n, y+k*n);
    }
}


// called when mouse moves in canvas
function moved(e) {
    // mouse pos
    const x = e.offsetX;
    const y = e.offsetY;

    // draw all vectors pointing to mouse position
    draw_vectors(x,y);
}