//Board
let tileSize = 80;
let rows = 13;
let columns = 13;

let board;
let boardWidth = tileSize * columns;
let boardHeight = tileSize * rows;
let context;

//Ship
let shipWidth = tileSize;
let shipHeight = tileSize;
let shipX = tileSize * columns / 2 - tileSize / 2;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
    x : shipX,
    y : shipY,
    width : shipWidth,
    height : shipHeight
}

let shipImage;

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    shipImage = new Image();
    shipImage.src = "/Images/Space-Invaders-Ship.png";
    shipImage.onload = function() {
        context.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
    }
}

