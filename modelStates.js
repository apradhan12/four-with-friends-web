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
        this.visible = this.visible.concat([]);
        this.status = "Click one of the buttons to start playing.";
    }
}

class CreatingPrivate extends InLobby {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.username, DOM_ID_MAP.submitLobby]);
        this.status = "Create a username.";
    }
}

class JoiningPrivate extends InLobby {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.username, DOM_ID_MAP.gameCode, DOM_ID_MAP.submitLobby]);
        this.status = "Create a username and input the code of the game you wish to join.";
    }
}

class JoiningOpen extends InLobby {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.username, DOM_ID_MAP.submitLobby]);
        this.status = "Create a username.";
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
        this.visible = this.visible.concat([]);
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
        this.visible = this.visible.concat([]);
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
        this.visible = this.visible.concat([]);
        this.status = "The opponent has disconnected.";
    }
}

class Win extends PostGame {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.rematch]);
        this.status = "You won!";
    }
}

class Loss extends PostGame {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.rematch]);
        this.status = "You lost.";
    }
}

class Draw extends PostGame {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.rematch]);
        this.status = "It's a draw.";
    }
}

class OpponentRequestedRematch extends PostGame {
    constructor() {
        super();
        this.visible = this.visible.concat([DOM_ID_MAP.rematch]);
        this.status = "The opponent has requested a rematch.";
    }
}

class PlayerRequestedRematch extends PostGame {
    constructor() {
        super();
        this.visible = this.visible.concat([]);
        this.status = "Waiting for the opponent's response...";
    }
}
