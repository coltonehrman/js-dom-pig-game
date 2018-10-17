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
    this.$name.textContent = this.name;
    this.score = this.currentScore = 0;
    this.update();
}

Player.prototype.won = function() {
    this.$name.textContent = 'Winner!';
}

Player.prototype.rolled = function(roll) {
    if (roll === 1) return this.pigged();
    this.currentScore += roll;
    this.update();
}

Player.prototype.held = function() {
    this.score += this.currentScore;
    this.currentScore = 0;
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