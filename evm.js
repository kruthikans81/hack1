/**
 * CivicVote 360 - 5-Stage Interactive EVM & Polling Station Simulator Engine
 * Supports Bilingual Rendering: English & Kannada (ಕನ್ನಡ)
 */

class EVMController {
  constructor() {
    this.currentLang = 'en'; // 'en' or 'kn'

    this.candidates = [
      {
        id: 1,
        serialNo: '01',
        nameEn: 'AARAV SHARMA',
        nameKn: 'ಆರವ್ ಶರ್ಮಾ',
        partyEn: 'Progressive Alliance',
        partyKn: 'ಪ್ರಗತಿಪರ ಒಕ್ಕೂಟ',
        symbolSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>`,
        symbolName: 'Rising Sun'
      },
      {
        id: 2,
        serialNo: '02',
        nameEn: 'PRIYA VERMA',
        nameKn: 'ಪ್ರಿಯಾ ವರ್ಮಾ',
        partyEn: 'National People Party',
        partyKn: 'ರಾಷ್ಟ್ರೀಯ ಜನ ಪಕ್ಷ',
        symbolSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.2 19.53 10.56 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>`,
        symbolName: 'Hand & Torch'
      },
      {
        id: 3,
        serialNo: '03',
        nameEn: 'RAJESH KUMAR',
        nameKn: 'ರಾಜೇಶ್ ಕುಮಾರ್',
        partyEn: 'Farmers & Workers Union',
        partyKn: 'ರೈತ ಮತ್ತು ಕಾರ್ಮಿಕ ಸಂಘ',
        symbolSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5-2h2v2h-2V4zm5 15H7V8h10v11z"/></svg>`,
        symbolName: 'Tractor Grain'
      },
      {
        id: 4,
        serialNo: '04',
        nameEn: 'ANANYA DESHMUKH',
        nameKn: 'ಅನನ್ಯ ದೇಶಮುಖ್',
        partyEn: 'Green Earth Coalition',
        partyKn: 'ಹಸಿರು ಭೂಮಿ ಮೈತ್ರಿ',
        symbolSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17 8C8 10 59 16.17 3.82 21.34l1.41 1.41L12 16c4 0 7-3 7-7 0-.68-.07-1.35-.2-2zM3 14c0 3.31 2.69 6 6 6 1.15 0 2.22-.33 3.14-.9L4.9 11.86C3.74 12.35 3 13.09 3 14z"/></svg>`,
        symbolName: 'Banyan Tree'
      },
      {
        id: 5,
        serialNo: '05',
        nameEn: 'KABIR SINGH',
        partyEn: 'Youth & Tech Front',
        partyKn: 'ಯುವ ಮತ್ತು ತಂತ್ರಜ್ಞಾನ ರಂಗ',
        symbolSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12 2.5s-4.5 4.5-4.5 9c0 2.48 2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5c0-4.5-4.5-9-4.5-9zm0 11.5c-1.38 0-2.5-1.12-2.5-2.5 0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 1.38-1.12 2.5-2.5 2.5z"/></svg>`,
        symbolName: 'Rocket Atom'
      },
      {
        id: 6,
        serialNo: '06',
        nameEn: 'NOTA',
        nameKn: 'ನೋಟಾ',
        partyEn: 'None of the Above',
        partyKn: 'ಮೇಲಿನ ಯಾರೂ ಅಲ್ಲ',
        symbolSvg: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
        symbolName: 'Rejection Cross'
      }
    ];

    // 5-Stage State
    this.currentStage = 1;
    this.form6Submitted = false;
    this.electoralRollFound = false;
    this.idVerified = false;
    this.ballotReleased = false;
    this.inkApplied = false;

    this.machineState = 'READY'; // READY, VOTING, SLIP_DISPLAY, SLIP_DROPPING, LOCKED
    this.totalVotes = 0;
    this.votesMap = {};
    this.vvpatAuditTrail = [];
    this.activeCandidate = null;
    this.timerInterval = null;
    this.countdown = 7;

    this.candidates.forEach(c => {
      this.votesMap[c.id] = 0;
    });
  }

  initUI() {
    this.renderBallotUnit();
    this.updateControlUnitDisplay();
    this.setStage(1);
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.renderBallotUnit();
    this.setStage(this.currentStage);
    this.updateStaticTranslations();
  }

  updateStaticTranslations() {
    const isKn = this.currentLang === 'kn';
    const langEnEls = document.querySelectorAll('.lang-en');
    const langKnEls = document.querySelectorAll('.lang-kn');

    langEnEls.forEach(el => el.style.display = isKn ? 'none' : 'inline');
    langKnEls.forEach(el => el.style.display = isKn ? 'inline' : 'none');
  }

  setStage(stageNum) {
    this.currentStage = stageNum;

    // Update 5-Stage Stepper UI
    for (let i = 1; i <= 5; i++) {
      const stepItem = document.getElementById(`station-step-${i}`);
      const panel = document.getElementById(`stage-panel-${i}`);

      if (stepItem) {
        stepItem.classList.toggle('active', i === stageNum);
        stepItem.classList.toggle('completed', i < stageNum);
      }
      if (panel) {
        panel.classList.toggle('active-panel', i === stageNum);
      }
    }

    const isKn = this.currentLang === 'kn';

    if (stageNum === 1) {
      this.updateStatusBanner(isKn ? 'ಹಂತ 1: ಚುನಾವಣೆ ಪೂರ್ವ ಸಿದ್ಧತೆ — ಫಾರ್ಮ್ 6 ನೋಂದಣಿ ಮತ್ತು ಮತದಾರರ ಪಟ್ಟಿ ಹುಡುಕಾಟ.' : 'STAGE 1: Pre-Election Preparation — Form 6 Registration & Electoral Roll Search.');
    } else if (stageNum === 2) {
      this.updateStatusBanner(isKn ? 'ಹಂತ 2: ಗುರುತು ಪರಿಶೀಲನೆ — ಮತಗಟ್ಟೆ ಅಧಿಕಾರಿ ಫೋಟೋ ಗುರುತಿನ ಚೀಟಿ ಪರಿಶೀಲನೆ.' : 'STAGE 2: Identity & Verification Booth — Polling Officer verifies Photo ID Card against Voter List.');
    } else if (stageNum === 3) {
      this.updateStatusBanner(isKn ? 'ಹಂತ 3: ಕಂಟ್ರೋಲ್ ಯುನಿಟ್ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ — ಅಧಿಕಾರಿ "BALLOT" ಬಟನ್ ಒತ್ತಿ EVM ಅನ್‌ಲಾಕ್ ಮಾಡುತ್ತಾರೆ.' : 'STAGE 3: Control Unit Activation — Polling Officer presses "BALLOT" button to unlock EVM.');
    } else if (stageNum === 4) {
      this.updateStatusBanner(isKn ? 'ಹಂತ 4: ಮತದಾನ ಕೊಠಡಿ — ನೀಲಿ ಬಟನ್ ಒತ್ತಿ, 7 ಸೆಕೆಂಡುಗಳ VVPAT ಸ್ಲಿಪ್ ವೀಕ್ಷಿಸಿ ಮತ್ತು 2 ಸೆಕೆಂಡ್ ಬೀಪ್ ಆಲಿಸಿ.' : 'STAGE 4: Voting Compartment — Click BLUE button, verify 7s VVPAT slip & hear 2s BEEP tone.');
    } else if (stageNum === 5) {
      this.updateStatusBanner(isKn ? 'ಹಂತ 5: ಅಳಿಸದ ಶಾಹಿ ಹಚ್ಚುವಿಕೆ — ಎಡ ತೋರುಬೆರಳಿಗೆ ನೇರಳೆ ಶಾಹಿ ಹಚ್ಚಲಾಗುತ್ತಿದೆ.' : 'STAGE 5: Indelible Ink Station — Applying indelible purple ink to left index finger.');
    }
  }

  submitForm6() {
    this.form6Submitted = true;
    if (window.evmAudio) window.evmAudio.playButtonClick();

    const isKn = this.currentLang === 'kn';
    const formResult = document.getElementById('form6-result');
    if (formResult) {
      formResult.classList.add('active');
      formResult.innerHTML = `
        <div class="form6-badge">${isKn ? '✓ ಫಾರ್ಮ್ 6 ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ' : '✓ FORM 6 SUBMITTED SUCCESSFULLY'}</div>
        <p style="margin-top:0.5rem;font-size:0.85rem;">${isKn ? 'ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ' : 'Reference ID'}: <strong>ECI-F6-2026-88492</strong>. ${isKn ? 'ಮತದಾರರ ನೋಂದಣಾಧಿಕಾರಿ ಅನುಮೋದಿಸಿದ್ದಾರೆ.' : 'ERO has approved your enrollment.'}</p>
      `;
    }

    this.showToast(isKn ? 'ಫಾರ್ಮ್ 6 ನೋಂದಣಿ ಅನುಮೋದಿಸಲಾಗಿದೆ!' : 'Form 6 Voter Registration Approved!', 'success');
  }

  searchElectoralRoll() {
    this.electoralRollFound = true;
    if (window.evmAudio) window.evmAudio.playButtonClick();

    const isKn = this.currentLang === 'kn';
    const rollResult = document.getElementById('electoral-roll-result');
    if (rollResult) {
      rollResult.classList.add('active');
      rollResult.innerHTML = `
        <div class="roll-card">
          <div class="roll-title">${isKn ? 'ಮತದಾರರ ಪಟ್ಟಿಯಲ್ಲಿ ಹೆಸರು ಕಂಡುಬಂದಿದೆ ✓' : 'ELECTORAL ROLL MATCH FOUND ✓'}</div>
          <div>${isKn ? 'ಹೆಸರು' : 'Name'}: <strong>ALEX MORGAN</strong></div>
          <div>${isKn ? 'ಗುರುತಿನ ಸಂಖ್ಯೆ' : 'EPIC No'}: <strong>ECI-98765432</strong></div>
          <div>${isKn ? 'ಕ್ಷೇತ್ರ' : 'Constituency'}: <strong>045-METROPOLITAN SOUTH</strong></div>
          <div>${isKn ? 'ಮತಗಟ್ಟೆ #14' : 'Polling Station #14'}: <strong>GOVT CIVIC HIGH SCHOOL, BOOTH A</strong></div>
          <div>${isKn ? 'ಕ್ರಮ ಸಂಖ್ಯೆ' : 'Serial No in Roll'}: <strong>482</strong></div>
        </div>
      `;
    }

    const gotoStage2Btn = document.getElementById('goto-stage2-btn');
    if (gotoStage2Btn) {
      gotoStage2Btn.disabled = false;
      gotoStage2Btn.classList.remove('disabled');
    }

    this.showToast(isKn ? 'ಮತದಾರರ ಪಟ್ಟಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ!' : 'Electoral Roll Entry Verified!', 'success');
  }

  verifyPhotoId() {
    this.idVerified = true;
    if (window.evmAudio) window.evmAudio.playButtonClick();

    const isKn = this.currentLang === 'kn';
    this.showToast(isKn ? 'ಫೋಟೋ ಗುರುತಿನ ಚೀಟಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ!' : 'Voter Photo ID Verified on Electoral Roll!', 'success');

    setTimeout(() => {
      this.setStage(3);
    }, 500);
  }

  activateControlUnitBallot() {
    this.ballotReleased = true;
    if (window.evmAudio) window.evmAudio.playButtonClick();

    const cuLed = document.getElementById('cu-ready-led-stage3');
    if (cuLed) cuLed.classList.add('active');

    const isKn = this.currentLang === 'kn';
    this.showToast(isKn ? 'ಬ್ಯಾಲಟ್ ಬಿಡುಗಡೆಯಾಗಿದೆ! EVM ಅನ್‌ಲಾಕ್ ಆಗಿದೆ.' : 'BALLOT RELEASED! Voting Compartment Unlocked.', 'success');

    setTimeout(() => {
      this.setStage(4);
      this.setMachineState('READY', isKn ? 'ಬ್ಯಾಲಟ್ ಬಿಡುಗಡೆಯಾಗಿದೆ: ಮತ ಚಲಾಯಿಸಲು ನೀಲಿ ಬಟನ್ ಒತ್ತಿ.' : 'BALLOT RELEASED: Click any BLUE button to cast vote.');
    }, 600);
  }

  renderBallotUnit() {
    const container = document.getElementById('bu-candidate-rows');
    if (!container) return;

    const isKn = this.currentLang === 'kn';

    container.innerHTML = this.candidates.map(candidate => `
      <div class="candidate-row" id="cand-row-${candidate.id}">
        <div class="cand-serial">${candidate.serialNo}</div>
        <div class="cand-info">
          <span class="cand-name">${isKn ? candidate.nameKn : candidate.nameEn}</span>
          <span class="cand-party">${isKn ? candidate.partyKn : candidate.partyEn}</span>
        </div>
        <div class="cand-symbol" title="${candidate.symbolName}">
          ${candidate.symbolSvg}
        </div>
        <div class="cand-led-col">
          <div class="led-light red-led" id="led-${candidate.id}" title="Candidate Red LED"></div>
        </div>
        <div class="cand-btn-col">
          <button 
            type="button" 
            class="vote-btn blue-btn" 
            id="vote-btn-${candidate.id}"
            onclick="window.evmApp.castVote(${candidate.id})"
            aria-label="Vote for ${candidate.nameEn}"
          >
            <span class="btn-inner"></span>
            <span class="btn-arrow">➔</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  updateStatusBanner(message) {
    const statusBanner = document.getElementById('evm-status-banner');
    if (statusBanner) {
      statusBanner.textContent = message;
    }
  }

  setMachineState(state, message) {
    this.machineState = state;
    this.updateStatusBanner(message);

    const cuReadyLed = document.getElementById('cu-ready-led');
    const cuBusyLed = document.getElementById('cu-busy-led');
    const buReadyLed = document.getElementById('bu-ready-led');
    const buLockOverlay = document.getElementById('bu-lock-overlay');

    if (state === 'READY') {
      if (cuReadyLed) cuReadyLed.classList.add('active');
      if (cuBusyLed) cuBusyLed.classList.remove('active');
      if (buReadyLed) buReadyLed.classList.add('active');
      if (buLockOverlay) buLockOverlay.classList.remove('active');

      this.toggleVoteButtons(true);
    } else {
      if (cuReadyLed) cuReadyLed.classList.remove('active');
      if (cuBusyLed) cuBusyLed.classList.add('active');
      if (buReadyLed) buReadyLed.classList.remove('active');
      if (buLockOverlay && state === 'LOCKED') buLockOverlay.classList.add('active');

      this.toggleVoteButtons(false);
    }
  }

  toggleVoteButtons(enable) {
    this.candidates.forEach(c => {
      const btn = document.getElementById(`vote-btn-${c.id}`);
      if (btn) {
        btn.disabled = !enable;
        btn.classList.toggle('disabled', !enable);
      }
    });
  }

  castVote(candidateId) {
    if (this.machineState !== 'READY') {
      const isKn = this.currentLang === 'kn';
      this.showToast(isKn ? 'ಯಂತ್ರ ಲಾಕ್ ಆಗಿದೆ! ಬ್ಯಾಲಟ್ ಬಿಡುಗಡೆ ಮಾಡಲು ಹಂತ 3 ಕ್ಕೆ ಹೋಗಿ.' : 'Machine is LOCKED! Go to Stage 3 to Release Ballot.', 'warning');
      return;
    }

    const candidate = this.candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    this.activeCandidate = candidate;
    const isKn = this.currentLang === 'kn';
    this.setMachineState('VOTING', isKn ? `ಅಭ್ಯರ್ಥಿ #${candidate.serialNo} ಗೆ ಮತ ದಾಖಲಾಗುತ್ತಿದೆ...` : `Processing Vote for Candidate #${candidate.serialNo}...`);

    // 1. Red LED lights up
    const redLed = document.getElementById(`led-${candidate.id}`);
    if (redLed) redLed.classList.add('active');

    if (window.evmAudio) window.evmAudio.playButtonClick();

    // 2. VVPAT Thermal Slip Print
    setTimeout(() => {
      this.printVvpatSlip(candidate);
    }, 200);
  }

  printVvpatSlip(candidate) {
    const isKn = this.currentLang === 'kn';
    this.setMachineState('SLIP_DISPLAY', isKn ? 'VVPAT ಪರಿಶೀಲನೆ: ಸ್ಲಿಪ್ 7 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಗಾಜಿನ ಹಿಂದೆ ಗೋಚರಿಸುತ್ತದೆ' : 'VVPAT Verification: Paper slip visible behind glass for 7 Seconds');

    const vvpatLamp = document.getElementById('vvpat-lamp');
    const vvpatWindow = document.getElementById('vvpat-window-content');
    const timerProgress = document.getElementById('vvpat-timer-bar');
    const timerBadge = document.getElementById('vvpat-countdown-badge');

    if (vvpatLamp) vvpatLamp.classList.add('active');
    if (window.evmAudio) window.evmAudio.playPrintSound();

    const slipId = `SLIP-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toLocaleTimeString();

    if (vvpatWindow) {
      vvpatWindow.innerHTML = `
        <div class="vvpat-slip slip-printing" id="current-slip">
          <div class="slip-header">ECI VVPAT VERIFICATION SLIP</div>
          <div class="slip-body">
            <div class="slip-ser">${candidate.serialNo}</div>
            <div class="slip-cand-name">${isKn ? candidate.nameKn : candidate.nameEn}</div>
            <div class="slip-symbol">${candidate.symbolSvg}</div>
          </div>
          <div class="slip-footer">
            <span>SEALED AUDIT SLIP</span>
            <span>${slipId}</span>
          </div>
        </div>
      `;
    }

    // 3. Exactly 7 Seconds Display Rule
    this.countdown = 7;
    if (timerBadge) timerBadge.textContent = '07s';
    if (timerProgress) {
      timerProgress.style.transition = 'none';
      timerProgress.style.width = '100%';
      void timerProgress.offsetWidth;
      timerProgress.style.transition = 'width 7s linear';
      timerProgress.style.width = '0%';
    }

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.countdown--;
      if (timerBadge) timerBadge.textContent = `0${Math.max(0, this.countdown)}s`;

      if (this.countdown <= 0) {
        clearInterval(this.timerInterval);
        this.dropVvpatSlipAndBeep(candidate, slipId, timestamp);
      }
    }, 1000);
  }

  dropVvpatSlipAndBeep(candidate, slipId, timestamp) {
    const isKn = this.currentLang === 'kn';
    this.setMachineState('SLIP_DROPPING', isKn ? 'ಕಾಗದದ ಸ್ಲಿಪ್ ಕತ್ತರಿಸಿ ಪೆಟ್ಟಿಗೆಗೆ ಬೀಳುತ್ತಿದೆ...' : 'Paper slip cutting & falling into sealed box...');

    const currentSlip = document.getElementById('current-slip');
    if (currentSlip) {
      currentSlip.classList.remove('slip-printing');
      currentSlip.classList.add('slip-dropping');
    }

    if (window.evmAudio) window.evmAudio.playPaperDropSound();

    // Sound: PLAY LOUD CONTINUOUS 2-SECOND BEEP (850Hz)
    setTimeout(() => {
      if (window.evmAudio) window.evmAudio.playEvmBeep();
    }, 100);

    // Record vote
    this.totalVotes++;
    this.votesMap[candidate.id]++;
    this.vvpatAuditTrail.push({
      slipId,
      serialNo: candidate.serialNo,
      candidateName: isKn ? candidate.nameKn : candidate.nameEn,
      party: isKn ? candidate.partyKn : candidate.partyEn,
      timestamp
    });

    this.updateControlUnitDisplay();

    // Lock Machine & Proceed to Stage 5 (Indelible Ink)
    setTimeout(() => {
      if (candidate) {
        const redLed = document.getElementById(`led-${candidate.id}`);
        if (redLed) redLed.classList.remove('active');
      }

      const vvpatLamp = document.getElementById('vvpat-lamp');
      if (vvpatLamp) vvpatLamp.classList.remove('active');

      const vvpatWindow = document.getElementById('vvpat-window-content');
      if (vvpatWindow) {
        vvpatWindow.innerHTML = `<div class="vvpat-empty">SLIP STORED IN SEALED DROP BOX</div>`;
      }

      this.setMachineState('LOCKED', isKn ? 'ಮತ ದಾಖಲಾಗಿದೆ! ಶಾಹಿ ಹಚ್ಚಲು ಹಂತ 5 ಕ್ಕೆ ಸಾಗುತ್ತಿದೆ...' : 'VOTE REGISTERED & LOCKED. Proceeding to Stage 5 for Indelible Ink marking...');
      this.showToast(isKn ? 'ಮತ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ!' : 'Vote successfully registered! Proceeding to Stage 5.', 'success');
      this.renderAuditTrail();

      setTimeout(() => {
        this.setStage(5);
      }, 1000);
    }, 2000);
  }

  applyIndelibleInkStage5() {
    const inkMark = document.getElementById('ink-mark-stage5');
    const inkBtn = document.getElementById('apply-ink-btn-stage5');

    if (window.evmAudio) window.evmAudio.playButtonClick();

    if (inkMark) inkMark.classList.add('applied');
    this.inkApplied = true;

    const isKn = this.currentLang === 'kn';
    this.showToast(isKn ? 'ನೇರಳೆ ಶಾಹಿ ಹಚ್ಚಲಾಗಿದೆ! ಮತದಾನ ಪೂರ್ಣಗೊಂಡಿದೆ 🎉' : 'Indelible ink applied to left index finger! Voting Complete 🎉', 'success');

    if (inkBtn) {
      inkBtn.disabled = true;
      inkBtn.textContent = isKn ? '✓ ಶಾಹಿ ಹಚ್ಚಲಾಗಿದೆ' : '✓ Indelible Ink Applied';
    }
  }

  releaseBallot() {
    if (window.evmAudio) window.evmAudio.playButtonClick();

    this.candidates.forEach(c => {
      const redLed = document.getElementById(`led-${c.id}`);
      if (redLed) redLed.classList.remove('active');
    });

    const isKn = this.currentLang === 'kn';
    this.setMachineState('READY', isKn ? `ಬ್ಯಾಲಟ್ ಬಿಡುಗಡೆಯಾಗಿದೆ: ಮತದಾರ #${this.totalVotes + 1} ಗೆ ಸಿದ್ಧ.` : `BALLOT RELEASED: Ready for Voter #${this.totalVotes + 1}.`);
    this.showToast(isKn ? `ಮತದಾರ #${this.totalVotes + 1} ಗೆ ಬ್ಯಾಲಟ್ ಬಿಡುಗಡೆಯಾಗಿದೆ!` : `Ballot released for Voter #${this.totalVotes + 1}!`, 'success');
  }

  updateControlUnitDisplay() {
    const voteCounter = document.getElementById('cu-vote-counter');
    if (voteCounter) {
      voteCounter.textContent = String(this.totalVotes).padStart(3, '0');
    }

    const auditCountBadge = document.getElementById('audit-count-badge');
    if (auditCountBadge) {
      auditCountBadge.textContent = `${this.totalVotes} Slips`;
    }
  }

  renderAuditTrail() {
    const list = document.getElementById('audit-slip-list');
    if (!list) return;

    if (this.vvpatAuditTrail.length === 0) {
      list.innerHTML = `<div class="empty-audit">No VVPAT paper slips cast yet. Vote in Stage 4 to generate slips.</div>`;
      return;
    }

    list.innerHTML = this.vvpatAuditTrail.slice().reverse().map(slip => `
      <div class="audit-item">
        <div class="audit-badge">SLIP #${slip.serialNo}</div>
        <div class="audit-details">
          <strong>${slip.candidateName}</strong> (${slip.party})
          <span class="audit-time">${slip.timestamp} - ID: ${slip.slipId}</span>
        </div>
      </div>
    `).join('');
  }

  showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `evm-toast toast-${type}`;
    toast.innerHTML = `<span>${msg}</span>`;

    const container = document.getElementById('toast-container') || document.body;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

window.evmController = new EVMController();
