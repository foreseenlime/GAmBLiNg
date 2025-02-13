alert("How to play: Get a Card by selecting start, make your bet by selecting a betting option, make your guess using the higher or lower buttons")
let dealerCard = "Blank";
let playerCard = "Blank";
let dealerCardValue = 0;
let playerCardValue = 0;
let points = 100;
let bet = 0;
const Ranks = [
  "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2"
];
const Suits = [
  "D", "H", "C", "S"
];
function updateScore() {
document.querySelector('.scoreBoard-js').innerHTML = `$${points}`
};
function guess(guess) {
  pickCard("dealer");
  
  if (dealerCardValue === playerCardValue) {
    console.log("It's a tie! No points won or lost.");
    return;
  }

  if (guess === "higher" && dealerCardValue > playerCardValue || 
      guess === "lower" && dealerCardValue < playerCardValue) {
    correctGuess();
  } else {
    incorrectGuess();
  }
}
function pickCardSuit() {
  const Suit = Math.random();
  let cardSuit = "none";
  if (Suit <= 0.25) {
    cardSuit = Suits[1];
  } else if (Suit <= 0.5) {
    cardSuit = Suits[2];
  } else if (Suit <= 0.75) {
    cardSuit = Suits[3];
  } else {
    cardSuit = Suits[0];
  }
  return cardSuit;
};
function pickCardRank() {
  let index = Math.floor(Math.random() * Ranks.length); 
  return Ranks[index];
}
function pickCard(player) {
  let rank = pickCardRank();
  let suit = pickCardSuit();
  if (player === "player1") {
    playerCard = rank.concat(suit);
    playerCardValue = parseInt(rank);
    document.querySelector(".playerCard-js").innerHTML = `<img class="Card" src="${suit}/${playerCard}.png">`;
  } else if (player === "dealer") {
    dealerCard = rank.concat(suit);
    dealerCardValue = parseInt(rank);
    document.querySelector(".dealerCard-js").innerHTML = `<img class="Card" src="${suit}/${dealerCard}.png">`;
  }
  

};
function hideElement(element1) {
  const elementsToHide = document.getElementsByClassName(element1);
  for (let element of elementsToHide) {
    element.classList.add("hide");
  }
};
function showElement(element) {
  const elementsToShow = document.getElementsByClassName(element);
  for (let element of elementsToHide) {
    element.classList.remove("hide");
  }
}
function reset() {
  const elementsToHide = document.getElementsByClassName("buttonStart");
  for (let element of elementsToHide) {
    element.classList.remove("hide");
  }
  
  document.querySelector(".playerCard-js").innerHTML = `<img class="Card" src="blankCard.png">`;
  document.querySelector(".dealerCard-js").innerHTML = `<img class="Card" src="blankCard.png">`;
  bet = 0;

};
function incorrectGuess() {
 points = points - bet;
 updateScore();
}
function correctGuess() {
  points = points + bet;
  updateScore();
}
function gamble(amount) {
  if (amount > 0 && amount <= points) {
    bet = amount;
  } else {
    console.log("Invalid bet amount");
  }
}