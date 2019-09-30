//  A class for a playing card, e.g. Ace of clubs
class Card {
    constructor(numValue, suit) {

        if (numValue == 0)
            numValue = 13;

        this.numValue = numValue;
        this.suit = suit;

        switch (numValue) {
            case 1:
                this.strValue = "Ace";
                break;
            case 2:
                this.strValue = "Two";
                break;
            case 3:
                this.strValue = "Three";
                break;
            case 4:
                this.strValue = "Four";
                break;
            case 5:
                this.strValue = "Five";
                break;
            case 6:
                this.strValue = "Six";
                break;
            case 7:
                this.strValue = "Seven";
                break;
            case 8:
                this.strValue = "Eight";
                break;
            case 9:
                this.strValue = "Nine";
                break;
            case 10:
                this.strValue = "Ten";
                break;
            case 11:
                this.strValue = "Jack";
                break;
            case 12:
                this.strValue = "Queen";
                break;
            case 13:
                this.strValue = "King";
                break;
            default:
                this.strValue = "ERROR";
        }
    }

    show() {
        console.log(`Numerical value: ${this.numValue} \nString value: ${this.strValue} \nSuit: ${this.suit}`);
    }
}


// A class for a deck of cards
class Deck {
    constructor() {
        this._cards = [];

        for (var i = 1; i < 53; i++) {
            if (i <= 13)
                this._cards.push(new Card(i, "Spades"));
            else if (i <= 26)
                this._cards.push(new Card(i % 13, "Hearts"));
            else if (i <= 39)
                this._cards.push(new Card(i % 13, "Diamonds"));
            else if (i <= 52)
                this._cards.push(new Card(i % 13, "Clubs"));
        }
    }

    get cards() {
        return this._cards;
    }

    reset() {
        this._cards = [];
    }

    // This function was taken from https://bost.ocks.org/mike/shuffle/
    shuffle() {
        var m = this._cards.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = this._cards[m];
            this._cards[m] = this.cards[i];
            this._cards[i] = t;
        }
        return this;
    }
    
    deal(){
        var randNum = Math.floor(Math.random() * this._cards.length);
        var randCard = this._cards[randNum];
        this.cards.splice(randNum, 1);

        return randCard;
    }
}


class Player {
    /* 
    * Takes the name of the player, and a Deck object to draw the
    * player's hand from it
    */
    constructor(name, deck){

        if(!(deck instanceof Deck)){
            return false;
        }

        this._name = name;
        this._hand = [];

        for(var i = 0; i < 5; i++){
            this.hand.push(deck.deal());
        }
    }

    get hand () {
        return this._hand;
    }

    get name () {
        return this._name;
    }

    /* 
    * Takes a Deck object to take a card from it
    */
    take(deck) {
        if(!(deck instanceof Deck)){
            return false;
        }

        this.hand.push(this.hand.push(deck.deal()));
    }

    /* 
    * Takes a Card object to dicard it from the player hand
    */
    discard(card){
        var index = this.hand.indexOf(card);
        this.hand.splice(index, 1);
    }
}


deck = new Deck();
player = new Player("Abdullah", deck);

deck.shuffle(); // shuffles the card

console.log("************ Player's hand *************\n");
console.log(player.hand);   // prints the player's hand

console.log("\n************ The remaining cards in the deck *************\n");
console.log(deck.cards);    // prints the remaining cards in the deck

console.log("************ Player's hand after taking an extra card *************\n");
player.take(deck);
console.log(player.hand);

console.log("************ Player's hand after discarding the second card *************\n");
player.discard(player.hand[1]);
console.log(player.hand);
