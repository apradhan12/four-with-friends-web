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

class Controller {

    constructor() {
        this.model = new StateModel();
        this.view = new View(this.model);
        this.socket = new WebSocket("wss://javascript.info");
    }

    bindHandlers() {
        $("#createPrivate").on("click", this.generateEventHandler(this.createPrivateGame));
        $("#joinPrivate").on("click", this.generateEventHandler(this.joinPrivateGame));
        $("#joinOpen").on("click", this.generateEventHandler(this.joinOpenGame));
        $("#submitUserInfo").on("click", this.generateEventHandler(this.submitLobby));
        $("#exitLobby").on("click", this.generateEventHandler(this.exitToLobby));
    }

    updateVisible() {
        for (const [, id] of Object.entries(DOM_ID_MAP)) {
            if (this.model.state.visible.includes(id)) {
                $(id).show();
            } else {
                $(id).hide();
            }
        }
        $("#status").text(this.model.state.status);
    }

    generateEventHandler(handler) {
        return (function() {
            handler.bind(this)();
            this.updateVisible();
        }).bind(this);
    }

    // UI events
    createPrivateGame() {
        this.model.state = new CreatingPrivate();
    }

    joinPrivateGame() {
        this.model.state = new JoiningPrivate();
    }

    joinOpenGame() {
        this.model.state = new JoiningOpen();
    }

    submitLobby() {
        this.model.state = this.model.state.submitLobby();
    }

    exitToLobby() {
        this.model.state = new Selecting();
    }

    // Server messages
    handleGameStarted(data) {
        this.model.state = new InGame();
        this.model.opponentUsername = data.o_name;
        this.model.gameModel = new GameModel(data.color, data.your_move);
        this.view.updateGameState();
    }

}

function main() {
    const controller = new Controller();
    controller.updateVisible();
    controller.bindHandlers();

    // const board = GameModel.generateBoard();
    // board[0][5] = 'red';
    // drawBoard(board);
}

