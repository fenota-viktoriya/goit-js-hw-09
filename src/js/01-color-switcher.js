const startBtnRef = document.querySelector("[data-start]");
const stopBtnRef = document.querySelector("[data-stop]");
const bodyRef = document.querySelector('body');
const PROMPT_DELAY = 1000;
startBtnRef.addEventListener('click', onChangeColor);
stopBtnRef.addEventListener('click', onChangeColorStop);

let timeId = null;

function onChangeColor(){
   onChangeColorBody();
     timeId = setInterval (()=>{
onChangeColorBody();

},PROMPT_DELAY);

startBtnRef.setAttribute('disabled',true );
stopBtnRef.removeAttribute('disabled')
};

function onChangeColorStop(){
    clearInterval(timeId);
    stopBtnRef.setAttribute('disabled', true);
startBtnRef.removeAttribute('disabled')
};


function onChangeColorBody(){
    const randomColor = getRandomHexColor();
    bodyRef.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }