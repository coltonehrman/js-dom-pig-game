/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const Game = {
    GOAL: 100,
    $btnNew: document.getElementsByClassName('btn-new').item(0),
    $btnRoll: document.getElementsByClassName('btn-roll').item(0),
    $btnHold: document.getElementsByClassName('btn-hold').item(0),
    dice: dice,
    currentPlayer: 0,
    players: [ 
        new Player({ scoreId: 'score-0', currentScoreId: 'current-0', panelId: 'player-0-panel' }).init(),
        new Player({ scoreId: 'score-1', currentScoreId: 'current-1', panelId: 'player-1-panel' }).init()
    ],
    playerRolled: function() {
        const roll = dice.roll();

        this.players[this.currentPlayer].rolled(roll);

        if (roll === 1) {
            this.switchPlayers();
            this.dice.hide();
        }
    },
    playerHeld: function() {
        const currentPlayer = this.players[this.currentPlayer]
        
        currentPlayer.held();

        if (currentPlayer.score >= this.GOAL) {
            this.gameOver();
        } else {
            this.switchPlayers();
            this.dice.hide();
        }
    },
    switchPlayers: function() {
        this.players[this.currentPlayer].turnOver();
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
        this.players[this.currentPlayer].turnStarted();
    },
    gameOver: function() {
        this.$btnRoll.removeEventListener('click', this.playerRolled);
        this.$btnHold.removeEventListener('click', this.playerHeld);
    },
    newGame: function() {
        this.reset();
        this.setupButtons();
        this.dice.hide();
    },
    setupButtons: function() {
        this.$btnRoll.addEventListener('click', this.playerRolled);
        this.$btnHold.addEventListener('click', this.playerHeld);
    },
    reset() {
        const currentPlayer = this.currentPlayer = 0;

        this.players.forEach(function(player, i) {
            player.reset();
            (currentPlayer === i) ? player.turnStarted() : player.turnOver();
        });

        this.dice.hide();
    },
    init: function() {
        this.playerRolled = this.playerRolled.bind(this);
        this.playerHeld = this.playerHeld.bind(this);
        this.newGame = this.newGame.bind(this);

        this.$btnNew.addEventListener('click', this.newGame);
        
        this.reset();
        this.setupButtons();
    }
};

Game.init();