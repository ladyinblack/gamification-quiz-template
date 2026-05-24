import './style.css';
import { data } from './gamidata.js';

let dataq = data['quiz1'];

const appDiv = document.getElementById('app');
// console.log(dataq.length);

let divcontainer = document.createElement('div');
divcontainer.className = 'quiz-container';
appDiv.appendChild(divcontainer);

for (let q = 0; q < dataq.length; q++) {
  let divparent = document.createElement('div');
  divparent.className = 'question';
  divcontainer.appendChild(divparent);

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
    });
  });
}
