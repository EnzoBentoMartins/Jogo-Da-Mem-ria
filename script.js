const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'
const ICONB = 'iconB'

startGame()

function startGame() {

    initializeCards(game.createCardsFromCharacters(game.characters))
}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = ''
    console.log(gameBoard)

    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', cardFlip)
        gameBoard.appendChild(cardElement)

    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)

    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = './images/' + card.icon + '.png'
        cardElementFace.appendChild(iconElement)
    } else {
        let iconBElement = document.createElement('img')
        iconBElement.classList.add(ICONB)
        iconBElement.src = './images/one.png'
        cardElementFace.appendChild(iconBElement)
    }
    element.appendChild(cardElementFace)
}

function cardFlip() {

    if (game.setCard(this.id)) {
        this.classList.add('flip')
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCard()
                if (game.checkGameOver()) {
                    let modal = document.getElementById('modal')
                    modal.style.display = 'flex'
                }
            } else {
                setTimeout(() => {
                    let fisrtCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    fisrtCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)
            }
        }

    }
}

function restartGame() {
    game.clearCard()
    startGame()
    let modal = document.getElementById('modal')
    modal.style.display = 'none'
}

