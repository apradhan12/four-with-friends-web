class InLobby {
    constructor() {
        this.visible = ['#statusDiv', '#lobbyDiv'];
    }
    getVisible() {
        return this.visible;
    }
}

class Selecting extends InLobby {
    constructor() {
        super();
        this.visible = [];
        this.status = "Click one of the buttons to start playing.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class CreatingPrivate extends InLobby {
    constructor() {
        super();
        this.visible = ['#usernameDiv'];
        this.status = "Create a username.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class JoiningPrivate extends InLobby {
    constructor() {
        super();
        this.visible = ['#usernameDiv', '#gameCodeDiv'];
        this.status = "Create a username and input the code of the game you wish to join.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class JoiningOpen extends InLobby {
    constructor() {
        super();
        this.visible = ['#usernameDiv'];
        this.status = "Create a username.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class Waiting {
    constructor() {
        this.visible = ['#statusDiv', '#exitLobbyDiv'];
    }
    getVisible() {
        return this.visible;
    }
}

class WaitingOpponentOpen extends Waiting {
    constructor() {
        super();
        this.visible = [];
        this.status = "Waiting for an opponent...";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class WaitingOpponentPrivate extends Waiting {
    constructor() {
        super();
        this.visible = ['#gameCodeDisplayDiv'];
        this.status = "Waiting for an opponent...";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class InGame {
    constructor() {
        this.visible = ['#canvasDiv', '#statusDiv', '#gameInfoDiv', '#moveColumnDiv', '#exitLobbyDiv'];
    }
    getVisible() {
        return this.visible;
    }
}

class YourMove extends InGame {
    constructor() {
        super();
        this.visible = ['#moveColumnDiv'];
        this.status = "It's your turn.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class OpponentMove extends InGame {
    constructor() {
        super();
        this.visible = [];
        this.status = "It's the other player's turn.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class PostGame {
    constructor() {
        this.visible = ['#canvasDiv', '#statusDiv', '#gameInfoDiv', '#exitLobbyDiv'];
    }
    getVisible() {
        return this.visible;
    }
}

class OpponentDisconnected extends PostGame {
    constructor() {
        super();
        this.visible = [];
        this.status = "The opponent has disconnected.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class Win extends PostGame {
    constructor() {
        super();
        this.visible = ['#rematchDiv'];
        this.status = "You won!";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class Loss extends PostGame {
    constructor() {
        super();
        this.visible = ['#rematchDiv'];
        this.status = "You lost.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class Draw extends PostGame {
    constructor() {
        super();
        this.visible = ['#rematchDiv'];
        this.status = "It's a draw.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class OpponentRequestedRematch extends PostGame {
    constructor() {
        super();
        this.visible = ['#rematchDiv'];
        this.status = "The opponent has requested a rematch.";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}

class PlayerRequestedRematch extends PostGame {
    constructor() {
        super();
        this.visible = [];
        this.status = "Waiting for the opponent's response...";
    }
    getVisible() {
        return this.visible + super.getVisible();
    }
}
