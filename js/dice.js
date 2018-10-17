const dice = {
    elements: document.getElementsByClassName('dice'),
    getDiceImage: function(dice) {
        return 'assets/dice-' + dice + '.png';
    },
    hideAll: function() {
        this.eachDice(function(dice) {
            dice.style.display = 'none';
        });

        return this;
    },
    show: function(dice) {
        dice.style.display = 'block';
        return dice;
    },
    rollAll: function() {
        const self = this;
        const rolls = [];

        this.eachDice(function(dice) {
            const roll = Math.floor(Math.random() * 6) + 1;
            self.show(dice).src = self.getDiceImage(roll);
            rolls.push(roll);
        });

        return rolls;
    },
    didRoll: function(match, rolls) {
        return rolls.some(function(roll) {
            return match === roll;
        });
    },
    didRollAll: function(match, rolls) {
        return rolls.every(function(roll) {
            return match === roll;
        });
    },
    totalRolls: function(rolls) {
        return rolls.reduce(function(sum, roll) {
            return sum + roll;
        }, 0);
    },
    eachDice: function(cb) {
        Array.prototype.forEach.call(this.elements, cb);
    }
};