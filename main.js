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

class Controller {

    constructor() {
        this.model = new StateModel();
        this.view = new View(this.model);
    }

    // Server messages

    handleGameStarted(data) {
        this.model.state = STATES.inGame;
        this.model.opponentUsername = data.o_name;
        this.model.gameModel = new GameModel(data.color, data.your_move);
        this.view.updateGameState();
    }

}

