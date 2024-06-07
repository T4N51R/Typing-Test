const darkBtn = document.getElementById('btnNo1');
const brightBtn = document.getElementById('btnNo2');
const uglyBtton = document.getElementById('btnNo3');
const theme = document.getElementById('colorChanging');

// Typing Test
const showQuote = document.getElementById('typingQuot');
const typedText = document.getElementById('typingInpute');
const startType = document.getElementById('startButton');
const timer = document.getElementById('timer')
startType.addEventListener('click', startEvent);
// Checking the input
typedText.addEventListener('input', () => {
    const showText = showQuote.querySelectorAll('span');
    const textValue = typedText.value.split('');
    let correct = true;

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
        }
    })
    if (correct) {
        getNextQuote();
    }
})

function startEvent() {
    document.getElementById('starttt').style.display = 'block';
    document.getElementById('startType').style.display = 'none';
    startTimer(10);
}


function startTimer(sec) {
    let remainingTIme = sec;
    timer.textContent = `${remainingTIme}`;
    typedText.disabled = false;
    intervelId = setInterval(() => {
        remainingTIme--;
        timer.textContent = `${remainingTIme}`;

        if (remainingTIme <= 0) {
            clearInterval(intervelId);
            typedText.disabled = true;
        }
    }, 1000);
}

// get a random quote
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