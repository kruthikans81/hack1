/**
 * CivicVote 360 - Interactive Civic Education & Election Awareness Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize EVM Controller UI
  if (window.evmController) {
    window.evmController.initUI();
  }

  // Bind Global EVM Actions
  window.evmApp = {
    castVote: (candId) => {
      if (window.evmController) window.evmController.castVote(candId);
    },
    releaseBallot: () => {
      if (window.evmController) window.evmController.releaseBallot();
    },
    toggleMute: () => {
      if (window.evmAudio) {
        const isMuted = window.evmAudio.toggleMute();
        const btn = document.getElementById('sound-toggle-btn');
        if (btn) {
          btn.innerHTML = isMuted 
            ? `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg> Muted`
            : `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg> Audio ON`;
        }
      }
    }
  };

  // Nav Tab Switcher
  const navButtons = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.app-section');

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');

      navButtons.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active-section'));

      btn.classList.add('active');
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.classList.add('active-section');
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Election Process Timeline Modal / Expanders
  const stageCards = document.querySelectorAll('.timeline-card');
  stageCards.forEach(card => {
    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      stageCards.forEach(c => c.classList.remove('expanded'));
      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });

  // Interactive Quiz Engine
  initCivicQuiz();

  // Audit Slip Box Modal logic
  const openAuditBtn = document.getElementById('open-audit-btn');
  const closeAuditBtn = document.getElementById('close-audit-btn');
  const auditModal = document.getElementById('audit-modal');

  if (openAuditBtn && auditModal) {
    openAuditBtn.addEventListener('click', () => {
      if (window.evmController) window.evmController.renderAuditTrail();
      auditModal.classList.add('active');
    });
  }

  if (closeAuditBtn && auditModal) {
    closeAuditBtn.addEventListener('click', () => {
      auditModal.classList.remove('active');
    });
  }
});

// Civic Quiz Questions Data
const quizQuestions = [
  {
    q: "How long does a VVPAT paper slip remain visible behind the glass window before falling into the sealed drop box?",
    options: ["3 Seconds", "5 Seconds", "7 Seconds", "10 Seconds"],
    correct: 2,
    explanation: "Under Election Commission regulations, the VVPAT paper slip displays the candidate's serial number, name, and symbol for EXACTLY 7 SECONDS so voters can visually verify their vote before it drops into the drop box."
  },
  {
    q: "What audio signal indicates that your vote has been successfully registered in the EVM?",
    options: ["Two short beeps", "A loud continuous 2-second BEEP sound", "A high-pitched melody", "No sound plays"],
    correct: 1,
    explanation: "A loud, continuous 2-second BEEP sound plays as the VVPAT slip falls into the drop box, confirming the vote has been electronically and physically recorded."
  },
  {
    q: "Can a voter press a second button on the Ballot Unit to change their vote?",
    options: [
      "Yes, within 30 seconds",
      "No, the machine locks automatically until the Polling Officer releases a new ballot",
      "Yes, if they hold the button down",
      "No, but they can ask for a paper ballot"
    ],
    correct: 1,
    explanation: "Once a vote button is pressed, the EVM immediately locks ('BUSY' state). No second vote can be cast until the Polling Officer activates the Control Unit for the next voter."
  },
  {
    q: "What is the primary purpose of the VVPAT system?",
    options: [
      "To print a souvenir receipt for the voter to take home",
      "To allow independent physical audit counting of paper slips to verify EVM electronic counts",
      "To calculate candidate funding",
      "To speed up the voting process"
    ],
    correct: 1,
    explanation: "VVPAT (Voter Verifiable Paper Audit Trail) provides a physical paper record of every vote cast, allowing paper slip counting to audit and verify electronic EVM results."
  },
  {
    q: "What does NOTA stand for on the Ballot Unit?",
    options: ["National Official Trade Authority", "None of the Above", "Notice of Technical Accuracy", "Name of The Agent"],
    correct: 1,
    explanation: "NOTA (None of the Above) gives voters the right to register a vote of rejection if they do not wish to vote for any of the listed candidates."
  }
];

let currentQuizIdx = 0;
let quizScore = 0;

function initCivicQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  if (currentQuizIdx >= quizQuestions.length) {
    container.innerHTML = `
      <div class="quiz-result-card">
        <div class="score-badge">${quizScore} / ${quizQuestions.length}</div>
        <h3>Quiz Completed!</h3>
        <p>You have demonstrated great awareness of the voting process and VVPAT audit verification standards.</p>
        <button type="button" class="btn primary-btn" onclick="resetQuiz()">Retake Civic Quiz</button>
      </div>
    `;
    return;
  }

  const qData = quizQuestions[currentQuizIdx];
  container.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-header">
        <span class="q-num">Question ${currentQuizIdx + 1} of ${quizQuestions.length}</span>
        <span class="q-score">Score: ${quizScore}</span>
      </div>
      <h3 class="q-title">${qData.q}</h3>
      <div class="quiz-options">
        ${qData.options.map((opt, idx) => `
          <button type="button" class="quiz-opt-btn" onclick="submitQuizAnswer(${idx})">${opt}</button>
        `).join('')}
      </div>
      <div id="quiz-feedback" class="quiz-feedback"></div>
    </div>
  `;
}

function submitQuizAnswer(selectedIdx) {
  const qData = quizQuestions[currentQuizIdx];
  const feedbackEl = document.getElementById('quiz-feedback');
  const optionBtns = document.querySelectorAll('.quiz-opt-btn');

  optionBtns.forEach(btn => btn.disabled = true);

  if (selectedIdx === qData.correct) {
    quizScore++;
    optionBtns[selectedIdx].classList.add('correct');
    feedbackEl.className = 'quiz-feedback correct-msg';
    feedbackEl.innerHTML = `<strong>Correct!</strong> ${qData.explanation}`;
  } else {
    optionBtns[selectedIdx].classList.add('wrong');
    optionBtns[qData.correct].classList.add('correct');
    feedbackEl.className = 'quiz-feedback wrong-msg';
    feedbackEl.innerHTML = `<strong>Incorrect.</strong> ${qData.explanation}`;
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn primary-btn mt-3';
  nextBtn.textContent = currentQuizIdx + 1 < quizQuestions.length ? 'Next Question ➔' : 'View Final Score 🏆';
  nextBtn.onclick = () => {
    currentQuizIdx++;
    renderQuizQuestion();
  };
  feedbackEl.appendChild(nextBtn);
}

function resetQuiz() {
  currentQuizIdx = 0;
  quizScore = 0;
  renderQuizQuestion();
}

window.submitQuizAnswer = submitQuizAnswer;
window.resetQuiz = resetQuiz;
