import './style.css';
import { data } from './gamidata.js';

let dataq = data['quiz1'];
let currentQuestion = 0;

const appDiv = document.getElementById('app');
// console.log(dataq.length);

let divcontainer = document.createElement('div');
divcontainer.className = 'quiz-container';
appDiv.appendChild(divcontainer);

const progressWrapper = document.createElement('div');
progressWrapper.className = 'progress-wrapper';

const progressText = document.createElement('div');
progressText.className = 'progress-text';

const progressTrack = document.createElement('div');
progressTrack.className = 'progress-track';

const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';

progressTrack.appendChild(progressBar);
progressWrapper.appendChild(progressText);
progressWrapper.appendChild(progressTrack);

appDiv.insertBefore(progressWrapper, divcontainer);

function updateProgress() {
  const percentage = ((currentQuestion + 1) / dataq.length) * 100;

  progressBar.style.width = `${percentage}%`;

  progressText.textContent = `Question ${currentQuestion + 1} of ${
    dataq.length
  }`;
}

for (let q = 0; q < dataq.length; q++) {
  let divparent = document.createElement('div');
  divparent.className = 'question';
  divcontainer.appendChild(divparent);

  if (q === 0) {
    divparent.classList.add('active');
  }

  let divheader = document.createElement('h4');
  divheader.innerHTML = `Question ${q + 1}`;
  divparent.appendChild(divheader);

  let divquestion = document.createElement('div');
  divquestion.innerHTML = `<h5>${dataq[q].question}</h5>`;
  divparent.appendChild(divquestion);

  let correctIndex = -1;

  for (let i = 0; i < dataq[q].options.length; i++) {
    // console.log(i, dataq[q].options[i]);
    let btnOptions = document.createElement('button');
    btnOptions.className = 'option';
    btnOptions.innerHTML = dataq[q].options[i];

    let spanIcon = document.createElement('span');
    spanIcon.className = 'icon';

    btnOptions.appendChild(spanIcon);
    divparent.appendChild(btnOptions);

    // Detect correct answer
    if (dataq[q].answer === dataq[q].options[i]) {
      correctIndex = i;
      // console.log('answer:', dataq[q].options[i], answerIndex);
      // divparent.setAttribute('data-correct', answerIndex);
    }
  }

  let divexplanation = document.createElement('div');
  divexplanation.className = 'explanation';
  divexplanation.style.display = 'none';

  divparent.appendChild(divexplanation);

  let nextButton = document.createElement('button');
  nextButton.className = 'next-btn';
  nextButton.innerHTML = 'Next &raquo;';
  nextButton.style.display = 'none';

  divparent.appendChild(nextButton);

  // Store correct index on question container
  divparent.dataset.correct = correctIndex;

  // Add event listeners to buttons
  let buttons = divparent.querySelectorAll('.option');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => (btn.disabled = true));

      const icon = button.querySelector('.icon');
      const correctBtn = buttons[correctIndex];

      if (index == correctIndex) {
        icon.textContent = '✔️';
        button.classList.add('correct-answer');
      } else {
        icon.textContent = '❌';
        button.classList.add('wrong-answer');

        const correctIcon = correctBtn.querySelector('.icon');
        correctIcon.textContent = '✔️';
        correctBtn.classList.add('correct-answer');
      }

      // Show explanation for the selected option
      divexplanation.innerHTML = `
        <p style="color:purple; font-style:italic">
          ${dataq[q].explanation[index]}
        </p>
      `;

      divexplanation.classList.add('show');
      divexplanation.style.display = 'block';

      nextButton.style.display = 'block';
    });
  });

  nextButton.addEventListener('click', () => {
    let questions = document.querySelectorAll('.question');
    questions[currentQuestion].classList.remove('active');

    currentQuestion++;

    updateProgress();

    if (currentQuestion < questions.length) {
      questions[currentQuestion].classList.add('active');
    } else {
      progressWrapper.style.display = 'none';

      divcontainer.innerHTML = `
        <h2>🎉 Quiz Complete</h2>
        <p>Thank you for participating.</p>
      `;
    }
  });
}
