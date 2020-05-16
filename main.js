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

function createPrivateGame(model, view, controller) {
    model.state = new CreatingPrivate();
}

function joinPrivateGame(model, view, controller) {
    model.state = new JoiningPrivate();
}

function joinOpenGame(model, view, controller) {
    model.state = new JoiningOpen();
}

class Controller {

    constructor() {
        this.model = new StateModel();
        this.view = new View(this.model);
        this.socket = new WebSocket("wss://javascript.info");
    }

    bindHandlers() {
        $("#createPrivate").on("click", this.generateEventHandler(createPrivateGame));
        $("#joinPrivate").on("click", this.generateEventHandler(joinPrivateGame));
        $("#joinOpen").on("click", this.generateEventHandler(joinOpenGame));
        $("#submitUserInfo").on("click", $.proxy(this.handleSubmitUserInfo, this));
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
            handler(this.model, this.view, this);
            this.updateVisible();
        }).bind(this);
    }

    handleSubmitUserInfo() {
        // TODO: implement actual method
        const data = {
            "o_name": "rickastley",
            "your_move": false,
        };
        this.handleGameStarted(data);
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

