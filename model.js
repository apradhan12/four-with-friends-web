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

const STATES = {
    inLobby: {
        visible: [
            DOM_ID_MAP.status,
            DOM_ID_MAP.lobbyButtons
        ],
        states: {
            selecting: {
                visible: [],
                status: "Click one of the buttons to start playing."
            },
            creatingPrivate: {
                visible: [
                    DOM_ID_MAP.username
                ],
                status: "Create a username."
            },
            joiningPrivate: {
                visible: [
                    DOM_ID_MAP.username,
                    DOM_ID_MAP.gameCode
                ],
                status: "Create a username and input the code of the game you wish to join."
            },
            joiningOpen: {
                visible: [
                    DOM_ID_MAP.username
                ],
                status: "Create a username."
            }
        }
    },
    waiting: {
        visible: [
            DOM_ID_MAP.status,
            DOM_ID_MAP.exitToLobby
        ],
        states: {
            waitingOpponentOpen: {
                visible: [],
                status: "Waiting for an opponent..."
            },
            waitingOpponentPrivate: {
                visible: [
                    DOM_ID_MAP.gameCodeDisplay
                ],
                status: "Waiting for an opponent..."
            }
        }
    },
    inGame: {
        visible: [
            DOM_ID_MAP.canvas,
            DOM_ID_MAP.status,
            DOM_ID_MAP.gameInfo,
            DOM_ID_MAP.moveColumn,
            DOM_ID_MAP.exitToLobby
        ],
        states: {
            yourMove: {
                visible: [
                    DOM_ID_MAP.moveColumn
                ],
                status: "It's your turn."
            },
            opponentMove: {
                visible: [],
                status: "It's the other player's turn."
            }
        }
    },
    postGame: {
        visible: [
            DOM_ID_MAP.canvas,
            DOM_ID_MAP.status,
            DOM_ID_MAP.gameInfo,
            DOM_ID_MAP.exitToLobby
        ],
        states: {
            opponentDisconnected: {
                visible: [],
                status: "The opponent has disconnected."
            },
            win: {
                visible: [
                    DOM_ID_MAP.rematch
                ],
                status: "You won!"
            },
            loss: {
                visible: [
                    DOM_ID_MAP.rematch
                ],
                status: "You lost."
            },
            draw: {
                visible: [
                    DOM_ID_MAP.rematch
                ],
                status: "It's a draw."
            },
            opponentRequestedRematch: {
                visible: [
                    DOM_ID_MAP.rematch
                ],
                status: "The opponent has requested a rematch."
            },
            playerRequestedRematch: {
                visible: [],
                status: "Waiting for the opponent's response..."
            }
        }
    }
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
