const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;

const GAME_STATES = {
    playerTurn: "playerTurn",
    opponentTurn: "opponentTurn"
};

const GAME_RESULTS = {
    win: "win",
    loss: "loss",
    draw: "draw",
    opponentDisconnected: "opponentDisconnected",
    opponentRequestedRematch: "opponentRequestedRematch",
    playerRequestedRematch: "playerRequestedRematch"
}

class StateModel {
    constructor() {
        this.state = new Selecting();
        this.username = null;
        this.opponentUsername = null;
        this.gameModel = null;
    }
}

class GameModel {
    constructor(playerColor, isPlayerTurn) {
        this.board = GameModel.generateBoard();
        this.playerColor = playerColor;
        this.opponentColor = this.playerColor === "red" ? "blue" : "red";
        this.gameState = isPlayerTurn ? GAME_STATES.playerTurn : GAME_STATES.opponentTurn;
    }

    static generateBoard() {
        const board = [];
        for (let col = 0; col < BOARD_WIDTH; col++) {
            board[col] = Array(BOARD_HEIGHT).fill("white");
        }
        return board;
    }

    /**
     * Returns whether adding the player token was successful.
     */
    addPlayerToken(column, playerColor) {
        column = parseInt(column);
        if (isNaN(column)) {
            return false;
        }
        if (column < 0 || column >= BOARD_WIDTH) {
            return false;
        }
        console.log(`Current board: ${this.board}`);
        const firstOccupiedRowEntry = Array.from(this.board[column].entries()).find(cellEntry => cellEntry[1] !== "white");
        // console.log(`first empty row is '${firstEmptyRow}'`);
        // console.log(`I just changed the board at ${column} ${firstEmptyRow} to ${playerColor}`);
        if (firstOccupiedRowEntry === undefined) { // the column is empty
            this.board[column][BOARD_HEIGHT - 1] = playerColor;
            return true;
        }
        if (firstOccupiedRowEntry[0] === 0) { // the column is full
            return false;
        }
        // the token landed somewhere in the middle of the column
        this.board[column][firstOccupiedRowEntry[0] - 1] = playerColor;
        return true;
    }
}
