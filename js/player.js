function Player(opts) {
    this.name = opts.name;
    this.score = 0;
    this.active = false;
    this.currentScore = 0;

    this.$name = document.getElementById(opts.nameId);
    this.$panel = document.getElementById(opts.panelId);
    this.$score = document.getElementById(opts.scoreId);
    this.$currentScore = document.getElementById(opts.currentScoreId);
}

Player.prototype.init = function() {
    this.$currentScore.textContent = this.$score.textContent = this.score;
    return this;
}

Player.prototype.reset = function() {
    this.$panel.classList.remove('winner');
    this.$name.textContent = this.name;
    this.score = this.currentScore = 0;
    this.update();
}

Player.prototype.won = function() {
    this.$name.textContent = 'Winner!';
    this.$panel.classList.add('winner');
}

Player.prototype.rolled = function(rolls) {
    if (dice.didRoll(1, rolls)) return this.pigged();
    if (dice.didRollAll(6, rolls)) return this.rolledDoubleSix();

    this.currentScore += dice.totalRolls(rolls);
    this.update();
}

Player.prototype.held = function() {
    this.score += this.currentScore;
    this.currentScore = 0;
    this.update();
}

Player.prototype.rolledDoubleSix = function() {
    this.currentScore = this.score = 0;
    this.update();
}

Player.prototype.pigged = function() {
    this.currentScore = 0;
    this.update();
}

Player.prototype.turnOver = function() {
    this.active = false;
    this.currentScore = 0;
    this.update();
}

Player.prototype.turnStarted = function() {
    this.active = true;
    this.update();
}

Player.prototype.update = function() {
    (this.active) ?
        this.$panel.classList.add('active') :
        this.$panel.classList.remove('active');

    this.$currentScore.textContent = this.currentScore;
    this.$score.textContent = this.score;
}