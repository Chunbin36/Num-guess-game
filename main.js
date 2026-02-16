let computerNum =0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history=[];

playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus", function(){
    userInput.value = "";
});


function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum);
}

function play(){
   let userValue = Number(userInput.value);

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요."
        return;
    }
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요."
        return;
    }
    history.push(userValue);
   console.log(history);
   
   chances --;
   chanceArea.textContent=`남은 찬스: ${chances}번`
   console.log("chance",chances);

    resultArea.className = "result-box";

   if(userValue < computerNum){
    resultArea.textContent = "🔼 UP! 더 큰 숫자!"
    resultArea.classList.add("result-up");
   } else if(userValue > computerNum){
    resultArea.textContent = "🔽 DOWN! 더 작은 숫자!"
    resultArea.classList.add("result-down");
   }else{
    resultArea.textContent = "🎉 정답입니다!"
    resultArea.classList.add("result-correct");
    document.getElementById("firework").classList.remove("hidden");
    gameOver = true;
    playButton.disabled = true;
    return;
   }


    if(chances < 1){
        gameOver=true;
    }
   
    if (gameOver == true) {
    resultArea.textContent = "💀 게임 오버! 다시 시작하세요!";
    resultArea.classList.add("result-gameover");
    playButton.disabled = true;
  }
    
}

function reset(){
  chances = 5;
  gameOver = false;
  history = [];

  playButton.disabled = false;

  resultArea.textContent = "결과가 여기 나옵니다!";
  resultArea.className = "result-box";
  chanceArea.textContent = "남은 찬스: 5번";

  document.getElementById("firework").classList.add("hidden");
  pickRandomNum();
}

pickRandomNum();