const TOKEN_WIDTH_PX = 100;
const RADIUS_RATIO = 0.9;
const RADIUS = RADIUS_RATIO * TOKEN_WIDTH_PX / 2;

const GAME_STATUS_TEXT = {
    [GAME_STATES.playerTurn]: "It's your turn",
    [GAME_STATES.opponentTurn]: "It's the other player's turn"
}

const GAME_RESULT_TEXT = {
    [GAME_RESULTS.win]: "You won!",
    [GAME_RESULTS.draw]: "It's a tie.",
    [GAME_RESULTS.loss]: "You lost.",
    [GAME_RESULTS.opponentDisconnected]: "The opponent has disconnected.",
    [GAME_RESULTS.opponentRequestedRematch]: "The opponent has requested a rematch.",
    [GAME_RESULTS.playerRequestedRematch]: "You have requested a rematch."
}


class View {

    constructor(model) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.model = model;
        this.domElements = this.getDOMElementsMap();
    }

    getDOMElementsMap() {
        const domElements = {};
        for (const [key, value] of Object.entries(DOM_ID_MAP)) {
            domElements[key] = $(value);
        }
        return domElements;
    }

    updateGameState() {
        $("#status").text(GAME_STATUS_TEXT[this.model.gameModel.gameState]);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const board = this.model.gameModel.board;
        for (let col = 0; col < BOARD_WIDTH; col++) {
            for (let row = 0; row < BOARD_HEIGHT; row++) {
                const center = convertCoords(row, col);
                this.ctx.beginPath();
                this.ctx.arc(center[0], center[1], RADIUS, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = board[col][row];
                this.ctx.fill();
                this.ctx.lineWidth = 1;
                this.ctx.strokeStyle = '#000000';
                this.ctx.stroke();
            }
        }
    }

    showUsernameInput() {
        $("#usernameDiv").show();
    }

    showSubmitUserInfo() {
        $("#submitUserInfoDiv").show();
    }
}

function convertCoords(row, col) {
    return [TOKEN_WIDTH_PX * (col + 0.5), TOKEN_WIDTH_PX * (row + 0.5)];
}
