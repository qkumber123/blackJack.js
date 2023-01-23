// deck builder
function buildDeck() {
    let deck = [];
    let suits = ['♠', '♥', '♣', '♦'];
    for(let i=0; i<suits.length;i++ ) {
        deck.push(suits[i] + "A");
        for (let j=2; j<11; j++) {
            deck.push(suits[i] + j);
        }
        deck.push(suits[i] + "J");
        deck.push(suits[i] + "K");
        deck.push(suits[i] + "Q");
    }
    shuffleDeck(deck);
    return deck;
}

// shuffle function
function shuffleDeck(arr) {
    let newPos,
        temp;

    for (let i = arr.length -1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[newPos];
        arr[newPos] = temp;
    }
    return arr;
}

//scorehand
function scoreHand(hand) {
    let score = 0;
    let aces = 0;
    for (i=0; i<hand.length; i++){
        switch (hand[i][1]) {
            case "J":
            case 'Q':
            case 'K':
                score += 10;
                break;

            case 'A':
                aces++;
                score++;
                break;

            default:
                score += parseInt(hand[i].slice(1,hand[i].length));
        }
    }

    if (aces > 0 && score + 10 <= 21) {
        score += 10;
    }

    return score;
}

//drawFunction 
function draw(deck, numCards, pos) {
    let hand = [];
    for (i=0; i<numCards; i++) {
        hand.push(deck[pos]); 
        pos++;
    }
    return [hand, pos];
}

//playerDraw
function playerDraw() {

    let potOfGreed=draw(deck, 1, pos);
    pos = potOfGreed[1];
    playerHand = playerHand.concat(potOfGreed[0]);
    // update playerhand
    document.getElementById("playerHand").innerHTML = playerHand;
    //check if busted
    if (scoreHand(playerHand) > 21) {
        document.getElementById("dealerHand").innerHTML = dealerHand;
        document.getElementById("playerBusted").innerHTML = 'BUSTED';
        document.getElementById("results").innerHTML = 'You Lose >:(';
        document.getElementById("drawButton").setAttribute("disabled", "");
        document.getElementById("holdButton").setAttribute("disabled", "");
        losses++;
        document.getElementById('newGame').disabled = false;
        trapCard();
    }
}

function dealerDraw() {
    document.getElementById("drawButton").setAttribute("disabled", "");
    document.getElementById("holdButton").setAttribute("disabled", "");
    while (scoreHand(dealerHand) < 16){ 
        let potOfGreed=draw(deck, 1, pos);
        pos = potOfGreed[1];
        dealerHand = dealerHand.concat(potOfGreed[0]);
    }

    let dealerScore = scoreHand(dealerHand);
    let playerScore = scoreHand(playerHand);

    // update dealerhand
    document.getElementById("dealerHand").innerHTML = dealerHand;
    if (dealerScore > 21) {
        document.getElementById("dealerBusted").innerHTML = 'BUSTED';
        document.getElementById("results").innerHTML = 'You Win!!!';
        wins++;
        trapCard();
        document.getElementById('newGame').disabled = false;
        return;        
    }
    

    if (playerScore > dealerScore) {
        document.getElementById("results").innerHTML = 'You Win!!!'; 
        wins++;
    } else if (playerScore < dealerScore) {
        document.getElementById("results").innerHTML = 'You Lose >:(';
        losses++;
    } else {
        document.getElementById("results").innerHTML = 'D R A W';
        draws++;
    }
    document.getElementById('newGame').disabled = false;
    trapCard();
}

//activate
function trapCard() {
    document.getElementById("score").innerHTML = `Wins ${wins} Losses ${losses} Draws ${draws}`;
}

//definitions
var deck,
    pos,
    dealerHand,
    playerHand,
    wins = 0,
    losses = 0,
    draws = 0;

// start game
function startGame() {
    //reset ui
    document.getElementById('drawButton').disabled = false;
    document.getElementById('holdButton').disabled = false;
    document.getElementById('newGame').disabled = true;
    document.getElementById("results").innerHTML = '';
    document.getElementById("dealerBusted").innerHTML = '';
    document.getElementById("playerBusted").innerHTML = '';

    //build deck
    deck = buildDeck();
    pos = 0;

    //draw for dealer
    let potOfGreed = draw(deck, 2, pos);
    pos = potOfGreed[1];
    dealerHand = potOfGreed[0];
    
    // player draws here
    potOfGreed = draw(deck, 2, pos);
    pos = potOfGreed[1];
    playerHand = potOfGreed[0];
    document.getElementById("dealerHand").innerHTML = '?, ' + dealerHand[1];
    document.getElementById("playerHand").innerHTML = playerHand;    
    trapCard();
}
startGame();
