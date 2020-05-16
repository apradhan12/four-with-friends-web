const HOST = "localhost:8080"
const ENDPOINT = "/ws"

class Controller {

    constructor() {
        this.model = new StateModel();
        this.view = new View(this.model);
        this.socket = new WebSocket(`ws://${HOST}${ENDPOINT}`);
    }

    bindHandlers() {
        $("#createPrivate").on("click", this.generateEventHandler(this.createPrivateGame));
        $("#joinPrivate").on("click", this.generateEventHandler(this.joinPrivateGame));
        $("#joinOpen").on("click", this.generateEventHandler(this.joinOpenGame));
        $("#submitUserInfo").on("click", this.generateEventHandler(this.submitLobby));
        $("#exitLobby").on("click", this.generateEventHandler(this.exitToLobby));

        this.socket.onmessage = (function(event) {
            const data = JSON.parse(event.data);
            const command = data.cmd;
            switch (command) {
                case "no_such_game":
                    this.generateEventHandler(this.noSuchGame);
                    break;
            }
            console.log(`[message] Data received from server: ${event.data}`);
        }).bind(this);

        this.socket.onopen = function(e) {
            console.log("[open] Connection established");
        }.bind(this);

        this.socket.onclose = function(event) {
            console.log(`Closing event: ${JSON.stringify(event)}`);
            window.myCloseEvent = event;
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log('[close] Connection died');
            }
        };

        this.socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
        };
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
        const [state, message] = this.model.state.submitLobby();
        this.model.state = state;
        this.socket.send(JSON.stringify(message));
    }

    exitToLobby() {
        this.model.state = new Selecting();
    }

    // Server messages
    noSuchGame() {
        this.model.state = new JoiningPrivate();
        this.model.state.status = "Invalid game code";
    }

    gameStarted(data) {
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

