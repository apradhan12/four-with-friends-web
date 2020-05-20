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

class State {}

class InLobby extends State {
    constructor() {
        super();
        this.visible = [DOM_ID_MAP.status, DOM_ID_MAP.lobbyButtons];
    }
}

class Selecting extends InLobby {
    constructor() {
        super();
        this.status = "Click one of the buttons to start playing.";
    }
}

class CreatingPrivate extends InLobby {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.username, DOM_ID_MAP.submitLobby]);
        this.status = "Create a username.";
    }

    submitLobby() {
        return [new WaitingOpponentPrivate(), {
            "cmd": "create_private",
            "username": $("#username").val()
        }];
    }
}

class JoiningPrivate extends InLobby {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.username, DOM_ID_MAP.gameCode, DOM_ID_MAP.submitLobby]);
        this.status = "Create a username and input the code of the game you wish to join.";
    }

    submitLobby() {
        return [new WaitingJoinPrivate(), {
            "cmd": "join_private",
            "username": $("#username").val(),
            "code": $("#gameCode").val()
        }];
    }
}

class JoiningOpen extends InLobby {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.username, DOM_ID_MAP.submitLobby]);
        this.status = "Create a username.";
    }

    submitLobby() {
        return [new WaitingOpponentOpen(), {
            "cmd": "join_open",
            "username": $("#username").val()
        }];
    }
}

class Waiting extends State {
    constructor() {
        super();
        this.visible = [DOM_ID_MAP.status, DOM_ID_MAP.exitToLobby];
    }
}

class WaitingOpponentOpen extends Waiting {
    constructor() {
        super();
        this.status = "Waiting for an opponent...";
    }
}

class WaitingOpponentPrivate extends Waiting {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.gameCodeDisplay]);
        this.status = "Waiting for an opponent...";
    }
}

class WaitingJoinPrivate extends Waiting {
    constructor() {
        super();
        this.status = "Joining...";
    }
}

class InGame extends State {
    constructor() {
        super();
        this.visible = [DOM_ID_MAP.canvas, DOM_ID_MAP.status, DOM_ID_MAP.gameInfo, DOM_ID_MAP.moveColumn, DOM_ID_MAP.exitToLobby];
    }
}

class YourMove extends InGame {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.moveColumn]);
        this.status = "It's your turn.";
    }
}

class OpponentMove extends InGame {
    constructor() {
        super();
        this.status = "It's the other player's turn.";
    }
}

class PostGame extends State {
    constructor() {
        super();
        this.visible = [DOM_ID_MAP.canvas, DOM_ID_MAP.status, DOM_ID_MAP.gameInfo, DOM_ID_MAP.exitToLobby];
    }
}

class OpponentDisconnected extends PostGame {
    constructor() {
        super();
        this.status = "The opponent has disconnected.";
    }
}

class StandardGameEnd extends PostGame {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.rematch]);
    }
    rematch() {
        return new PlayerRequestedRematch();
    }
}

class Win extends StandardGameEnd {
    constructor() {
        super();
        this.status = "You won!";
    }
}

class Loss extends StandardGameEnd {
    constructor() {
        super();
        this.status = "You lost.";
    }
}

class Draw extends StandardGameEnd {
    constructor() {
        super();
        this.status = "It's a draw.";
    }
}

class OpponentRequestedRematch extends PostGame {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.rematch]);
        this.status = "The opponent has requested a rematch.";
    }
    rematch() {
        return new OpponentMove();
    }
}

class PlayerRequestedRematch extends PostGame {
    constructor() {
        super();
        this.status = "Waiting for the opponent's response...";
    }
}
