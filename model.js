class StateModel {
    constructor() {

    }
}

class GameModel {
    constructor(playerColor) {
        this.board = GameModel.generateBoard();
        this.playerColor = playerColor;
    }

    static generateBoard() {
        const board = [];
        for (let col = 0; col < BOARD_WIDTH; col++) {
            board[col] = Array(BOARD_HEIGHT).fill('white');
        }
        return board;
    }
}
