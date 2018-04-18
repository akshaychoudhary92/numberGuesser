//Game Values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// ui elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


      //Assign Ui min and max

      minNum.textContent = min;
      maxNum.textContent = max;

      //play again event listner
      game.addEventListener('mousedown', function(e){
          if(e.target.className === 'play-again'){
              window.location.reload();
          }
      });


      //listen for guess

      guessBtn.addEventListener('click', function(){
        let guess =  parseInt(guessInput.value);

        // validate input
if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please Enter A Number Between ${min} and ${max}`, 'red');
}


//Check if won
if(guess === winningNum){
    // gameover - won
   gameOver(true, `${winningNum} is correct, YOU WIN!`)
}else {
    //wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0){
        //game over lost
   gameOver(false, `Game Over, You lost. The correct Number was ${winningNum}`)
    // clear input
    guessInput.value = '';

    }else {
        // game continues - answer wrong
        //change border color
        guessInput.style.borderColor = 'red';
        // clear input
        guessInput.value = '';
        //tell user its the wrong number
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left!`, 'red');
    }
}
});

//game over
function gameOver(won, msg) {
let color;
won === true ? color = 'green' : color = 'red';

//disable input
guessInput.disabled = true;
//change border color
guessInput.style.borderColor = color;

//set text color
message.style.color = color;
//Set message
setMessage(msg);
//play again
guessBtn.value = 'play Again';
guessBtn.className += 'play-again';
}

// get wiingin num
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min + 1)+min);
}


//set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
