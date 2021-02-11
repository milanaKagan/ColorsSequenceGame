const $playBtn = document.getElementById('play');
const $level = document.getElementById('level');
const $board = document.getElementById('board');
const $audio = document.getElementById('audio');

const soundsUrls = {
    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    correct: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3',
    yellow: './src/Yellow.mp3',
    red: './src/Red.mp3',
    green: './src/Green.mp3',
    blue: './src/Blue.mp3'
    };
const colorArray = ["yellow", "green", "red", "blue"];

let level = 0;
let levelArray = [];
let counter = -1;

const playSound = (sound) => {
        $audio.src = soundsUrls[sound];
        $audio.play();
};

const playSounds = (sounds) => {
    let index = 0;
    $audio.src = soundsUrls[sounds[index]];
    $audio.play();

    $audio.onended = function(){
        if (index < sounds.length){
            index++;
            $audio.src = soundsUrls[sounds[index]];
            $audio.play();

        }
    }
     
};

const shuffle = (colorArray) => {
    let counter = colorArray.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = colorArray[counter];
        colorArray[counter] = colorArray[index];
        colorArray[index] = temp;
    }
    return colorArray;
}

const chooseLevelColors = () => {
    for (let i=0; i < level; i++) {
        let index = Math.floor(Math.random() * colorArray.length);
        levelArray[i] = colorArray[index];
    }
}
const init = () => {

    levelArray = [];
    counter = 0;
    $playBtn.style.display = "block";
    $board.style.display = "none";

}
const play = () => {
   
   level++;

   $playBtn.style.display = "none";
   $board.style.display = "flex";

    $level.innerText = "Level:" + level;

    let randomColors = shuffle(colorArray);

    randomColors.forEach((color) => {
        const btnElement = document.createElement('button');
        btnElement.style.backgroundColor = color;
        btnElement.dataset.id = color;
        $board.appendChild(btnElement);
    });    

    chooseLevelColors();
    playSounds(levelArray);
}

const selectedAnswers = ($event) => {
 
    const currentSelectedAnswer = $event.target.dataset.id;
   
    if(levelArray[counter] !=  currentSelectedAnswer){
       
        $board.innerHTML = '';
        $board.classList.add('wrong');

        $audio.src = soundsUrls.wrong;
        $audio.play();

        setTimeout(() => {
            $board.classList.remove('wrong');
            level = 0;
            $level.innerHTML = '';
            init();
        }, 3000);
    }
    else if(levelArray[counter] == currentSelectedAnswer && counter == (level-1)){
        $board.innerHTML = '';
        $board.classList.add('correct');

        $audio.src = soundsUrls.correct;
        $audio.play();

        setTimeout(() => {
            $board.classList.remove('correct');
            init();
        }, 4000);
    }
    counter++;
}
init();

$playBtn.addEventListener('click',play);
$board.addEventListener('click',selectedAnswers);

