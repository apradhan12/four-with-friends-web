const HOST = "localhost:8080";
const ENDPOINT = "/ws";
const COLORS = ["red", "blue"];

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
        $("#stopWaiting").on("click", this.generateEventHandler(this.stopWaiting));
        $("#sendMove").on("click", this.generateEventHandler(this.move));
        $("#rematch").on("click", this.generateEventHandler(this.rematch));

        this.socket.onmessage = (function(event) {
            console.log(`here is the event: ${JSON.stringify(event)}`);
            window.mostRecentReceived = event;
            const data = JSON.parse(event.data);
            console.log(`[message] Data from server: ${JSON.stringify(data)}`);
            const command = data.cmd;
            switch (command) {
                case "invalid":
                    this.generateEventHandler(this.invalid)();
                    break;
                case "error":
                    this.generateEventHandler(this.error)();
                    break;
                case "no_such_game":
                    this.generateEventHandler(this.noSuchGame)();
                    break;
                case "start":
                    this.generateEventHandler(this.gameStarted)(data);
                    break;
                case "private_code":
                    this.generateEventHandler(this.gameCode)(data);
                    break;
                case "o_move":
                    this.generateEventHandler(this.opponentMoved)(data);
                    break;
                case "game_over":
                    this.generateEventHandler(this.gameOver)(data);
                    break;
                case "o_rematch":
                    this.generateEventHandler(this.opponentRequestedRematch)(data);
                    break;
                case "game_closed":
                    this.generateEventHandler(this.opponentDisconnected)();
                    break;
            }
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
                $(id).removeClass("hidden");
            } else {
                $(id).addClass("hidden");
            }
        }
        $("#status").text(this.model.state.status);
    }

    generateEventHandler(handler) {
        return (function(...args) {
            handler.bind(this)(...args);
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
        this.model.gameModel = null;
        this.socket.send(JSON.stringify({
            "cmd": "quit"
        }));
    }

    stopWaiting() {
        this.model.state = new Selecting();
        this.socket.send(JSON.stringify({
            "cmd": "stop_waiting"
        }));
    }

    move() {
        const column = $("#moveColumn").val();
        console.log(`you tried to move in column ${column}`);
        const isLegal = this.model.gameModel.addPlayerToken(column, this.model.gameModel.playerColor);
        if (isLegal) {
            console.log(`it's legal`);
            this.socket.send(JSON.stringify({
                "cmd": "move",
                "col": parseInt(column)
            }));
            this.view.updateGameState();
            this.model.state = new OpponentMove();
        }
    }

    rematch() {
        this.socket.send(JSON.stringify({
            "cmd": "rematch"
        }));
        this.model.state = this.model.state.rematch();
    }

    // Server messages
    invalid(data) {
        // description, state
        console.log(`Invalid command: ${JSON.stringify(data)}`);
    }

    error(data) {
        // description, state
        console.log(`Internal server error: ${JSON.stringify(data)}`);
    }

    noSuchGame() {
        this.model.state = new JoiningPrivate();
        this.model.state.status = "Invalid game code";
    }

    gameStarted(data) {
        console.log(`here is the data I got: ${JSON.stringify(data)}`);
        console.log(`is it your move? ${data.your_move}`);
        this.model.state = data.your_move ? new YourMove() : new OpponentMove();
        this.model.opponentUsername = data.o_name;
        let color;
        if (data.your_move) {
            color = COLORS[0];
        } else {
            color = COLORS[1];
        }
        this.model.gameModel = new GameModel(color, data.your_move);
        this.view.updateGameState();
    }

    gameCode(data) {
        // state will already be set
        $("#gameCodeDisplay").text(data.code);
    }

    opponentMoved(data) {
        this.model.state = new YourMove();
        this.model.gameModel.isPlayerTurn = true;
        this.model.gameModel.addPlayerToken(data.column, this.model.gameModel.opponentColor);
        this.view.updateGameState();
    }

    opponentDisconnected() {
        this.model.state = new OpponentDisconnected();
        this.model.gameModel = null;
    }

    gameOver(data) {
        switch (data.result) {
            case "win":
                this.model.state = new Win();
                break;
            case "loss":
                this.model.state = new Loss();
                break;
            case "draw":
                this.model.state = new Draw();
                break;
        }
    }

    opponentRequestedRematch() {
        this.model.state = new OpponentRequestedRematch();
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

