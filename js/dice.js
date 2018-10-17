const dice = {
    element: document.getElementsByClassName('dice').item(0),
    getDiceImage: function(dice) {
        return 'assets/dice-' + dice + '.png';
    },
    hide: function() {
        this.element.style.display = 'none';
        return this;
    },
    show: function() {
        this.element.style.display = 'block';
        return this;
    },
    roll: function() {
        const roll = Math.floor(Math.random() * 6) + 1;
        this.show().element.src = this.getDiceImage(roll);
        return roll;
    },
    init: function() {
        this.getDiceImage = this.getDiceImage.bind(this);
        this.roll = this.roll.bind(this);
    }
};

dice.init();