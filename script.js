let dealerCardHL = "Blank";
let playerCardHL= "Blank";
let dealerCardValue = 0;
let playerCardValue = 0;
let slotsPot =  localStorage.getItem('PotSlot') ? parseInt(localStorage.getItem('PotSlot')) : 100; ;
let renderedCards = {player:2 , dealer:2 };
let playerCardsBJ = [{card:"Blank", value: 1, suit: ""}, {card:"Blank", value: 1, suit: ""}];
let playerStatsBJ = {total: 0, notBust: true, myTurn: true, cardsDealt: 1, betOptsShown: false};
let dealerCardsBJ = [{card:"Blank", value: 1, suit: ""}, {card:"Blank", value: 1, suit: ""}];
let dealerStatsBJ = {total: 0, notBust: true, myTurn: false, cardsDealt: 1};
let points = localStorage.getItem('PointseFjsr') ? parseInt(localStorage.getItem('PointseFjsr')) : 10000; 
let bet = 0;
const htmlPlayer = document.querySelector(".playerCards-js");
const htmlDealer = document.querySelector(".dealerCards-js");
let cardsHTML = {player: ``, dealer: ``}
const Ranks = [
  "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2"
];
const RanksBJ = [
  {face: "14" , value: 1},{face: "2" , value: 2},{face: "3", value: 3},{face: "4", value: 4},{face: "5", value: 5},{face: "6", value: 6},{face: "7", value: 7},{face: "8", value: 8},{face: "9", value: 9},{face: "10", value: 10},{face:"11" , value: 10},{face: "12", value: 10},{face: "13", value: 10}
];
const Suits = [
  "D", "H", "C", "S"
];
updateScore();
document.querySelector(".Pot-js").innerHTML = `Pot: $${slotsPot}`;
function updateScore() {
  document.querySelector('.scoreBoard-js').innerHTML = `$${points}`;
  localStorage.setItem('PointseFjsr', points); 
}

function guess(guess) {
  pickCard("dealer");
  if (dealerCardValue === playerCardValue) {
    console.log("It's a tie! No points won or lost.");
    bet = 0;  // Reset bet in case of a tie
    return;
  }
  if ((guess === "higher" && dealerCardValue > playerCardValue) || 
      (guess === "lower" && dealerCardValue < playerCardValue)) {
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
function pickCardRankBJ() {
  let index = Math.floor(Math.random() * RanksBJ.length); 
  return RanksBJ[index];
}
function pickCard(player) {
  let rank = pickCardRank();
  let suit = pickCardSuit();
  if (player === "player1") {
    playerCardHL = rank.concat(suit);
    playerCardValue = parseInt(rank);
    htmlPlayer.innerHTML = `<img class="Card" src="${suit}/${playerCardHL}.png">`;
  } else if (player === "dealer") {
    dealerCardHL = rank.concat(suit);
    dealerCardValue = parseInt(rank);
    htmlDealer.innerHTML = `<img class="Card" src="${suit}/${dealerCardHL}.png">`;
  }
  console.log(rank, suit);
};
function pickCardsBJ(player) {
    let rank1 = pickCardRankBJ();
    let suit1 = pickCardSuit();
    let rank2 = pickCardRankBJ();
    let suit2 = pickCardSuit();
    if (player === "player1") {
      playerCardsBJ[0].card = rank1.face.concat(suit1);
      playerCardsBJ[1].card = rank2.face.concat(suit2);
      playerCardsBJ[0].value = rank1.value;
      playerCardsBJ[1].value = rank2.value;
      playerCardsBJ[0].suit = suit1;
      playerCardsBJ[1].suit = suit2;
      cardsHTML.player = `<img class="Card" src="${suit1}/${playerCardsBJ[0].card}.png"><img class="Card" src="${suit2}/${playerCardsBJ[1].card}.png">`

    } else if (player === "dealer") {
      dealerCardsBJ[0].card = rank1.face.concat(suit1);
      dealerCardsBJ[0].value = rank1.value;
      dealerCardsBJ[0].suit = suit1;
      dealerCardsBJ[1].card = rank2.face.concat(suit2);
      dealerCardsBJ[1].value = rank2.value;
      dealerCardsBJ[1].suit = suit2;
      cardsHTML.dealer = `<img class="Card" src="${suit1}/${dealerCardsBJ[0].card}.png"><img class="Card" src="blankCard.png">`
    }
  

};
function renderCards(player, firstTime) {
  if (player === "player1"){
    if (firstTime) {
      document.querySelector(".playerCards-js").innerHTML = cardsHTML.player;
    } else {
      for(let i = renderedCards.player; i < playerCardsBJ.length; i++) {
        cardsHTML.player = cardsHTML.player.concat(`<img class="Card" src="${playerCardsBJ[i].suit}/${playerCardsBJ[i].card}.png">`);
        renderedCards.player ++;
        console.log("This Part Worked")
      };
      document.querySelector(".playerCards-js").innerHTML = cardsHTML.player;
    } 
  } else {
    if (firstTime) {
      document.querySelector(".dealerCards-js").innerHTML = cardsHTML.dealer;
    } else {
      for(let i = renderedCards.dealer; i < dealerCardsBJ.length; i++) {
        cardsHTML.dealer = cardsHTML.dealer.concat(`<img class="Card" src="${dealerCardsBJ[i].suit}/${dealerCardsBJ[i].card}.png">`);
        renderedCards.dealer ++;
      };
    document.querySelector(".dealerCards-js").innerHTML = cardsHTML.dealer;
    };
  };
};
function hideElement(element1) {
  const elementsToHide = document.getElementsByClassName(element1);
  for (let element of elementsToHide) {
    element.classList.add("hide");
  }
};
function showElement(element) {
  const elementsToShow = document.getElementsByClassName(element);
  for (let element of elementsToShow) {
    element.classList.remove("hide");
  }
}
function reset() {
  const elementsToHide = document.getElementsByClassName("buttonStart");
  for (let element of elementsToHide) {
    element.classList.remove("hide");
  }
  
  htmlPlayer.innerHTML = `<img class="Card" src="blankCard.png">`;
  htmlDealer.innerHTML = `<img class="Card" src="blankCard.png">`;
  bet = 0;

};
function resetBJ() {
  console.log("Ran")
  console.log(htmlPlayer);
  htmlPlayer.innerHTML = `<img class="Card" src="blankCard.png">
  <img class="Card" src="blankCard.png">`;
  htmlDealer.innerHTML = `<img class="Card" src="blankCard.png">
  <img class="Card" src="blankCard.png">`;
  bet = 0;
  playerCardsBJ = 
  hideElement("winopt");
  hideElement("resetBJ")
  showElement("dealBJButton-js");
  renderedCards = {player:2 , dealer:2 };
  playerCardsBJ = [{card:"Blank", value: 1, suit: ""}, {card:"Blank", value: 1, suit: ""}];
  playerStatsBJ = {total: 0, notBust: true, myTurn: true, cardsDealt: 1, betOptsShown: false};
  dealerCardsBJ = [{card:"Blank", value: 1, suit: ""}, {card:"Blank", value: 1, suit: ""}];
  dealerStatsBJ = {total: 0, notBust: true, myTurn: false, cardsDealt: 1};
};
function correctGuess() {
  points += bet * 2; 
  bet = 0; 
  updateScore();
};
function incorrectGuess() {
  bet = 0; // Ensure bet resets so it doesn't get re-used incorrectly
  updateScore();
};
function gamble(amount) {
  if (amount > 0 && amount <= points) {
    bet += amount;
    points -= amount; // Deduct immediately when placing the bet
    updateScore();
  } else {
    console.log("Invalid bet amount");
  }
}
function checkCards(player) {
  if (player === "player1") {
      playerStatsBJ.total = 0; 
      for (let i = 0; i < playerCardsBJ.length; i++) {
          playerStatsBJ.total += playerCardsBJ[i].value;
      }
      if (playerStatsBJ.total >= 22) {
          playerStatsBJ.notBust = false;
          if (playerStatsBJ.betOptsShown === true) {
            hideElement("playOpts");
            playerStatsBJ.betOptsShown = false;
            dealersTurn();
          }
      }
  } else {
      dealerStatsBJ.total = 0;
      for (let i=0; i <dealerCardsBJ.length; i++) {
        dealerStatsBJ.total += dealerCardsBJ[i].value;
      }
      if (dealerStatsBJ.total >= 22) {
        dealerStatsBJ.notBust = false;
      }
  }
}

function dealBJ() {
  pickCardsBJ("player1");
  pickCardsBJ("dealer");
  renderCards("player1", true);
  renderCards("dealer", true)
  hideElement("dealBJButton-js");
  showElement("betOpts");
  checkCards("player1")
  checkCards("dealer")
}
function playBJ() {
  hideElement("betOpts");
  if (playerStatsBJ.notBust === true) {
    showElement("playOpts");
    playerStatsBJ.betOptsShown = true;

  } else {
    
  }
}
function dealersTurn() {
  checkCards("dealer");
  while (dealerStatsBJ.total <= 16) {
    hit("dealer");
    checkCards("dealer");
    
  }
  stand("dealer");
}
function hit(player) {
  let rank = pickCardRankBJ();
  let suit = pickCardSuit();
  let card = rank.face.concat(suit);
  let value = rank.value;
  if (player === "player1") {
    let cards = playerStatsBJ.cardsDealt + 1;
    playerCardsBJ.push({card, value, suit});
  
    playerStatsBJ.cardsDealt ++;
    checkCards("player1");
    console.log(playerCardsBJ, playerStatsBJ);
  } else {
    let cards = dealerStatsBJ.cardsDealt + 1;
    dealerCardsBJ.push({card, value, suit});
    
    dealerStatsBJ.cardsDealt ++;
    checkCards("dealer");
  };
  renderCards(player, false);
}
function stand(player) {
  if (player === "player1") {
    if (playerStatsBJ.betOptsShown === true) {
      hideElement("playOpts");
    };
    dealersTurn();
    console.log("Made it here")
  } else {
    endGame();
  }

}
function endGame() {
  console.log("Game Over")
  checkCards("player1");
  checkCards("dealer");
  if (playerStatsBJ.notBust) {
    if (!dealerStatsBJ.notBust) {
      showElement("win-js");
      correctGuess();
    } else if (playerStatsBJ.total > dealerStatsBJ.total) {
      showElement("win-js");
      correctGuess();
    } else if (playerStatsBJ.total < dealerStatsBJ.total) {
      showElement("lose-js");
      incorrectGuess();
    }

  } else if (!playerStatsBJ.notBust) {
    showElement("lose-js");
    incorrectGuess();
  }
  showElement("resetBJ");
};


function spinSlots() {
  const icons = ["&#8486;", "&#9730;", "&#9752;", "&#9762;"]; 
  gamble(20);

  const slotElements = [
    document.querySelector(".slot1-js"),
    document.querySelector(".slot2-js"),
    document.querySelector(".slot3-js"),
  ];

  let intervals = [];
  let results = [];

  function shuffleSlot(slotElement, index) {
    intervals[index] = setInterval(() => {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      slotElement.innerHTML = randomIcon;
    }, 100); 
  }

  slotElements.forEach((slot, index) => shuffleSlot(slot, index));

  setTimeout(() => {
    slotElements.forEach((slot, index) => {
      clearInterval(intervals[index]); 
      const finalIcon = icons[Math.floor(Math.random() * icons.length)];
      slot.innerHTML = finalIcon; 
      results[index] = finalIcon;
    });

    // Check if all slots match
    if (results[0] === results[1] && results[1] === results[2]) {
      console.log("Win!");
      points += slotsPot + bet;
      bet = 0;
      slotsPot = 100
      localStorage.setItem('PotSlot', 100);
      document.querySelector(".Pot-js").innerHTML = `Pot: $${100}`;
      updateScore();
    } else {
      console.log("Try again!");
      slotsPot += bet; // Update the slotsPot variable
      localStorage.setItem('PotSlot', slotsPot); // Save the updated value to local storage
      document.querySelector(".Pot-js").innerHTML = `Pot: $${slotsPot}`; // Update the display
      bet = 0;
    }
  }, 3000);
}
function WinSlots(Passcode) {
  if (Passcode == "Test") {const icons = ["&#8486;", "&#9730;", "&#9752;", "&#9762;"]; 
  gamble(20);

  const slotElements = [
    document.querySelector(".slot1-js"),
    document.querySelector(".slot2-js"),
    document.querySelector(".slot3-js"),
  ];

  let intervals = [];
  let results = [];

  function shuffleSlot(slotElement, index) {
    intervals[index] = setInterval(() => {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      slotElement.innerHTML = randomIcon;
    }, 100); 
  }

  slotElements.forEach((slot, index) => shuffleSlot(slot, index));

  setTimeout(() => {
    slotElements.forEach((slot, index) => {
      clearInterval(intervals[index]); 
      const finalIcon = icons[1];
      slot.innerHTML = finalIcon; 
      results[index] = finalIcon;
    });

    // Check if all slots match
    if (results[0] === results[1] && results[1] === results[2]) {
      console.log("Win!");
      points += slotsPot + bet;
      bet = 0;
      slotsPot = 100
      localStorage.setItem('PotSlot', 100);
      document.querySelector(".Pot-js").innerHTML = `Pot: $${100}`;
      updateScore();
    } else {
      console.log("Try again!");
      slotsPot += bet; // Update the slotsPot variable
      localStorage.setItem('PotSlot', slotsPot); // Save the updated value to local storage
      document.querySelector(".Pot-js").innerHTML = `Pot: $${slotsPot}`; // Update the display
      bet = 0;
    }
  }, 3000);}
}