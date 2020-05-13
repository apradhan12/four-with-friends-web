const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;

const TOKEN_WIDTH_PX = 50;
const RADIUS_RATIO = 0.95;
const RADIUS = RADIUS_RATIO * TOKEN_WIDTH_PX / 2;

function convertCoords(row, col) {
    return [TOKEN_WIDTH_PX * (col + 0.5), TOKEN_WIDTH_PX * (row + 0.5)];
}

function main() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    for (let row = 0; row < BOARD_HEIGHT; row++) {
        for (let col = 0; col < BOARD_WIDTH; col++) {
            const center = convertCoords(row, col);
            ctx.beginPath();
            ctx.arc(center[0], center[1], RADIUS, 0, 2 * Math.PI, false);
            ctx.stroke();
        }
    }
}
