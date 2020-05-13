const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;

const TOKEN_WIDTH_PX = 100;
const RADIUS_RATIO = 0.9;
const RADIUS = RADIUS_RATIO * TOKEN_WIDTH_PX / 2;

function convertCoords(row, col) {
    return [TOKEN_WIDTH_PX * (col + 0.5), TOKEN_WIDTH_PX * (row + 0.5)];
}

function drawBoard(board) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    for (let col = 0; col < BOARD_WIDTH; col++) {
        for (let row = 0; row < BOARD_HEIGHT; row++) {
            const center = convertCoords(row, col);
            ctx.beginPath();
            ctx.arc(center[0], center[1], RADIUS, 0, 2 * Math.PI, false);
            ctx.fillStyle = board[col][row];
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#000000';
            ctx.stroke();
        }
    }
}

function connect() {
    let socket = new WebSocket("wss://javascript.info");

    socket.onopen = function(e) {
        alert("[open] Connection established");
        alert("Sending to server");
        socket.send(JSON.stringify({"hello": "world"}));
    };

    socket.onmessage = function(event) {
        alert(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            alert('[close] Connection died');
        }
    };

    socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
    };
}

function main() {
    const board = GameModel.generateBoard();
    board[0][5] = 'red';
    drawBoard(board);
}

