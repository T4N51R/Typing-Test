const darkBtn = document.getElementById('btnNo1');
const brightBtn = document.getElementById('btnNo2');
const uglyBtton = document.getElementById('btnNo3');
const theme = document.getElementById('colorChanging');

// Typing Test
const showQuote = document.getElementById('typingQuot');
const typedText = document.getElementById('typingInpute');
const timer = document.getElementById('timer');
let start, end;
let totalChar = 0;
let totalTyped = 0;
let totalError = 0;
let accurecy = 0;

typedText.addEventListener('input', () => {
    const showText = showQuote.querySelectorAll('span');
    const textValue = typedText.value.split('');
    let correct = true;
    totalTyped++;
    showText.forEach((charSpan, index) => {
        const char = textValue[index];
        if (char == null) {
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            correct = false;
        }
        else if (char === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        }
        else {
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            correct = false;
            totalError++;
        }
    })
    if (correct) {
        getNextQuote();
    }
})



const getRandomQuote = () => {
    const number = Math.floor(Math.random() * 30) + 1;
    return fetch('./quotes.json')
        .then(response => response.json())
        .then(data => data[number].quote)
}

async function getNextQuote() {
    const text = await getRandomQuote();
    showQuote.innerHTML = '';

    text.split('').forEach(charecter => {
        const charSpan = document.createElement('span');
        charSpan.innerText = charecter;
        showQuote.appendChild(charSpan);
        totalChar++;
    });

    typedText.value = null;
}
getNextQuote();


// change theme start 
const blackColor = () => {
    console.log('clicking')
    theme.style.backgroundColor = 'black';
    theme.style.color = 'white'
}
const brightColor = () => {
    console.log('clicking')
    theme.style.backgroundColor = 'white';
    theme.style.color = 'black'
}
const yellowColor = () => {
    console.log('clicking')
    theme.style.backgroundColor = 'yellow';
    theme.style.color = 'red'
}
darkBtn.addEventListener('click', blackColor);
brightBtn.addEventListener('click', brightColor);
uglyBtton.addEventListener('click', yellowColor);
// change theme end 