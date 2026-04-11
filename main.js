const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 700;

const background = new Image();
background.src = "Images/Background.jpg";

function draw() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

setInterval(draw, 1000 / 60);