function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function diceRoll() {
  return random(1, 6);
}

function greenDice (roll) {
  if (roll <= 3) { return "brain";} 
  else if ((roll > 3) && (roll < 6)) { return "run"; } 
  else { return "gun";}
}

function redDice (roll) {
  if (roll <= 3) { return "gun";} 
  else if ((roll > 3) && (roll < 6)) { return "run"; } 
  else { return "brain";}
}

function yellowDice (roll) {
  if (roll <= 2) { return "brain";} 
  else if ((roll > 2) && (roll < 5)) { return "run";} 
  else { return "gun";}
}

function setDicePool (dicePool) {
  for (let i = 0; i < 6; i++) {
    dicePool[i] = "green";
  }
  for (let i = 6; i < 10; i++) {
    dicePool[i] = "yellow";
  }
  for (let i = 10; i < 13; i++) {
    dicePool[i] = "red";
  }
}

function chooseDice (dicePool) {
  //console.log(dicePool);
  let diceNr = random(0, dicePool.length);
  //let diceColor = dicePool[diceNr];
  return dicePool.splice(diceNr, 1);
}


function playGame () {
  
  
  function playerTurn () {
    
    function playRound () {
      let diceResult = new Array;
      console.log("");
      for (let i = 0; i < diceNum; i++) {
        if (!actualDice[i]) {
          actualDice[i] = chooseDice(dicePool);
        } 
      }
      console.log(`The dice(s) u picked: ${actualDice}`);
      for (let i = 0; i < diceNum; i++) {
        if (actualDice[i] == "green") {
          diceResult.push(greenDice(diceRoll()));
          console.log(`On GREEN dice u rolled: ${diceResult[i]}`);
        } else if (actualDice[i] == "yellow" ) {
          diceResult.push(yellowDice(diceRoll()));
          console.log(`On YELLOW dice u rolled: ${diceResult[i]}`);
        } else if (actualDice[i] == "red" ) {
          diceResult.push(redDice(diceRoll()));
          console.log(`On RED dice u rolled: ${diceResult[i]}`);
        }
      }
      console.log(diceResult);
      
      //--dobás eredményének kiértékelése
      function brain (i) {
        actualBrain += 1;
        actualDice.splice(i, 1);
        lolz ++;
      }
      
      function gun (i) {
        actualGun += 1;
        actualDice.splice(i, 1);
        lolz ++;
      }
      
      function run (i) {
        freeDice -= 1;
      }
      let lolz = 0;
      for (let i = 0; i < diceNum; i++) {
        if (diceResult[i] === "brain") {brain(i-lolz)}
        else if (diceResult[i] === "gun") {gun(i-lolz)}
        else if (diceResult[i] === "run") {run(i-lolz)}
      }
      console.log(`Number of Brains: ${actualBrain}`);
      console.log(`Number of Guns: ${actualGun}`);
      console.log(actualDice);
    }
    
    let dicePool = new Array(13);
    setDicePool(dicePool);
    const diceNum =  3; //number of playing dices
    let actualDice = new Array(3);
    
    let actualBrain = 0;
    let actualGun = 0; 
    
    let freeDice =  3; // a kivett kockák száma
    let gameGoes = true;

    let stop = 1;
    while ((actualGun < 3) && (stop < 6)) {
      playRound();
      stop ++;
    }
    console.log("End of the turn :(");
  }
  
  playerTurn();
}

  let Player = {
    name: "Béla",
    brains: 0,
    turnBrains: 0,
    guns: 0,
  }
playGame();