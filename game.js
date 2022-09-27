let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0]
        console.log(card)

        if (card.flipped || this.lockMode) {
            return false
        }

        if (!this.firstCard) {
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        } else {
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon == this.secondCard.icon
    },

    clearCard: function () {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards: function () {
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCard()
    },

    checkGameOver: function () {
        return this.cards.filter(card => !card.flipped).length == 0
    },

    characters: [
        'luffy',
        'zoro',
        'nami',
        'usopp',
        'sanji',
        'chopper',
        'robin',
        'franky',
        'brook'
    ],

    cards: null,

    createCardsFromCharacters: function (characters) {
        this.cards = []

        for (let charac of characters) {
            this.cards.push(this.createPairFromCharac(charac))
        }

        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()
        return this.cards
    },

    createPairFromCharac: function (charac) {
        return [{
            id: this.createId(charac),
            icon: charac,
            flipped: false
        }, {
            id: this.createId(charac),
            icon: charac,
            flipped: false
        }]
    },

    createId: function (charac) {
        return charac + parseInt(Math.random() * 1000)
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length
        let randomIndex = 0

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}

