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
    dice: dice,
    currentPlayer: 0,
    playing: true,
    players: [
        new Player({ 
            name: 'Player 1', 
            nameId: 'name-0', 
            scoreId: 'score-0', 
            currentScoreId: 'current-0', 
            panelId: 'player-0-panel' 
        }).init(),
        new Player({ 
            name: 'Player 2',
            nameId: 'name-1', 
            scoreId: 'score-1', 
            currentScoreId: 'current-1', 
            panelId: 'player-1-panel' 
        }).init()
    ],
    $btnNew: document.getElementsByClassName('btn-new').item(0),
    $btnRoll: document.getElementsByClassName('btn-roll').item(0),
    $btnHold: document.getElementsByClassName('btn-hold').item(0),
    $gameGoal: document.getElementById('game-goal'),
    $rolls: document.getElementById('rolls'),
    playerRolled: function() {
        if (!this.playing) return;

        const currentPlayer = this.players[this.currentPlayer];
        const rolls = dice.rollAll();

        this.displayRolls(rolls);
        currentPlayer.rolled(rolls);

        if (dice.didRoll(1, rolls) || dice.didRollAll(6, rolls)) {
            this.switchPlayers();
            this.dice.hideAll();
        }
    },
    playerHeld: function() {
        if (!this.playing) return;

        const currentPlayer = this.players[this.currentPlayer]
        
        currentPlayer.held();
        
        this.hideRolls();

        if (currentPlayer.score >= this.GOAL) {
            currentPlayer.won();
            this.gameOver();
        } else {
            this.switchPlayers();
            this.dice.hideAll();
        }
    },
    switchPlayers: function() {
        this.players[this.currentPlayer].turnOver();
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
        this.players[this.currentPlayer].turnStarted();
    },
    displayGameGoal: function() {
        this.$gameGoal.textContent = 'Playing to: ' + this.GOAL;
    },
    displayRolls: function(rolls) {
        this.$rolls.textContent = 'Rolled - ' + rolls.join(', ');
    },
    hideRolls: function() {
        this.$rolls.textContent = '';
    },
    gameOver: function() {
        this.playing = false;
    },
    newGame: function() {
        this.reset();
        this.dice.hideAll();
    },
    reset() {
        const currentPlayer = this.currentPlayer = 0;

        this.GOAL = prompt('What score would you like to play to?') || this.GOAL;

        this.displayGameGoal();
        this.hideRolls();

        this.players.forEach(function(player, i) {
            player.reset();
            (currentPlayer === i) ? player.turnStarted() : player.turnOver();
        });

        this.dice.hideAll();
        this.playing = true;
    },
    init: function() {
        this.playerRolled = this.playerRolled.bind(this);
        this.playerHeld = this.playerHeld.bind(this);
        this.newGame = this.newGame.bind(this);

        this.$btnNew.addEventListener('click', this.newGame);
        this.$btnRoll.addEventListener('click', this.playerRolled);
        this.$btnHold.addEventListener('click', this.playerHeld);

        this.reset();
    }
};

Game.init();