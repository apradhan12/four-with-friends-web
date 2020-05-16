const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;

const DOM_ID_MAP = {
    canvas: "#canvasDiv",
    status: "#statusDiv",
    gameCodeDisplay: "#gameCodeDisplayDiv",
    gameInfo: "#gameInfoDiv",
    lobbyButtons: "#lobbyDiv",
    username: "#usernameDiv",
    gameCode: "#gameCodeDiv",
    submitLobby: "#submitUserInfoDiv",
    moveColumn: "#moveColumnDiv",
    rematch: "#rematchDiv",
    exitToLobby: "#exitLobbyDiv"
};

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
