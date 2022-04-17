let drawingColor = "red";
let pencilWidth = 1;
window.addEventListener("load", () => {
    loadCanvasApp();
})

let ctx;

function loadCanvasApp() {
    const canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();

    // Draw rectangle outlined
    // ctx.strokeStyle = "red";
    // ctx.lineWidth = 5;
    // ctx.strokeRect(xOffset, yOffset, squareWidth, squareHeight);

    // Draw a rectable
    // ctx.fillStyle = "#FF0000";
    // ctx.fillRect(0, 10, 200, 300);


    // Draw a line
    // ctx.beginPath();
    // ctx.strokeStyle = "red";
    // ctx.moveTo(100, 100); //Starting position of the drawing
    // ctx.lineTo(200, 100);
    // ctx.lineTo(200, 150);
    // ctx.closePath();
    // ctx.stroke()

    // Variables
    let painting = false;

    function startpainting() {
        getLinepencilWidth();
        painting = true;
    }

    function endPainting() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.strokeStyle = drawingColor;
        ctx.lineWidth = pencilWidth;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }

    // Events
    canvas.addEventListener("mousedown", startpainting);
    canvas.addEventListener("mouseup", endPainting);
    canvas.addEventListener("mousemove", draw);
}

function resizeCanvas() {
    const canvas = document.querySelector("#canvas");
    canvas.height = 500;
    canvas.width = 500;
    // canvas.height = window.innerHeight;
    // canvas.width = window.innerWidth;
}


function getMeTheDamnColor(color) {
    console.log(color);
}
let colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
    drawingColor = event.target.value;
}

function getLinepencilWidth() {
    pencilWidth = parseInt($("#pencilWidth").value);
}

function addImageProxy(imageInput) {
    let image = imageInput.files[0];
    let reader = new FileReader();
    reader.onload = function(evt) {
        addImage(evt.target.result);
    };
    reader.readAsDataURL(image);
}

function addImage(imageTempPath) {
    let img = new Image();
    img.src = imageTempPath;
    img.onload = function() {
        // (image,sx,sy,sWidth,sHeight,dx,dy,dWith,dHeight)
        ctx.drawImage(img, 0, 0, img.width * 0.15, img.height * 0.15);
        // clip - image : https://www.w3schools.com/tags/canvas_drawimage.asp
    }
}