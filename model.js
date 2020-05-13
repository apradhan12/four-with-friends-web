const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;

const STATES = {
    inLobby: "inLobby",
    waitingJoin: "waitingJoin",
    waitingOpponent: "waitingOpponent",
    inGame: "inGame",
    opponentDisconnected: "opponentDisconnected"
};

const GAME_STATES = {
    playerTurn: "playerTurn",
    opponentTurn: "opponentTurn",
    win: "win",
    loss: "loss",
    draw: "draw"
};

class StateModel {
    constructor() {
        this.state = STATES.inLobby;
        this.username = null;
        this.opponentUsername = null;
        this.gameModel = null;
    }
}

class GameModel {
    constructor(playerColor, isPlayerTurn) {
        this.board = GameModel.generateBoard();
        this.playerColor = playerColor;
        this.gameState = isPlayerTurn ? GAME_STATES.playerTurn : GAME_STATES.opponentTurn;
    }

    static generateBoard() {
        const board = [];
        for (let col = 0; col < BOARD_WIDTH; col++) {
            board[col] = Array(BOARD_HEIGHT).fill('white');
        }
        return board;
    }
}
