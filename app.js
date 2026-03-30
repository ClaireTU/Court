/* ═══════════════════════════════════════════════════
   JUDGE'S GAVEL APP — app.js
   Features: language select, gavel strike, guilty verdict
   with custom voice recording, silence, recess,
   irrelevant, not-guilty, multi-language support.
═══════════════════════════════════════════════════ */

/* ── TRANSLATIONS ── */
const T = {
  zh: {
    court:         '最高法院',
    tapHint:       '點擊敲槌',
    lblGuilty:     '有罪',
    subGuilty:     '終身監禁不得假釋',
    lblSilence:    '肅靜',
    lblRecess:     '休庭',
    lblIrrelevant: '與本案無關',
    lblNotGuilty:  '當庭無罪釋放',
    lblRecord:     '錄音設定',
    switchBtn:     '🌐 English',
    verdictMain:   '有罪',
    verdictSub:    '終身監禁不得假釋',
    silenceMain:   '肅靜！',
    silenceSub:    'SILENCE IN COURT',
    closeSilence:  '解除',
    recessMain:    '休庭',
    recessSub:     'COURT IS IN RECESS',
    closeRecess:   '恢復',
    irrelMain:     '該陳述與本案無關',
    irrelSub:      'IRRELEVANT TO THIS CASE',
    closeIrrel:    '確定',
    ngMain:        '無罪',
    ngSub:         'NOT GUILTY — ACQUITTED',
    closeNg:       '確定',
    modalTitle:    '🎙 錄音設定',
    modalDesc:     '錄製你的「有罪」宣判聲音',
    recReady:      '準備就緒，可以錄音',
    recHasCustom:  '已有自訂錄音',
    recRecording:  '錄音中…',
    recDone:       '錄音完成！',
    recDeleted:    '已刪除，請重新錄音',
    btnStartRec:   '⏺ 開始錄音',
    btnStopRec:    '⏹ 停止錄音',
    btnPlayRec:    '▶ 試聽',
    btnDelRec:     '🗑 刪除重錄',
    toggleLabel:   '使用自訂錄音',
    closeModal:    '關閉',
  },
  en: {
    court:         'Supreme Court of Justice',
    tapHint:       'Tap to Strike',
    lblGuilty:     'Guilty',
    subGuilty:     'Life imprisonment without parole',
    lblSilence:    'Silence',
    lblRecess:     'Recess',
    lblIrrelevant: 'Irrelevant',
    lblNotGuilty:  'Not Guilty',
    lblRecord:     'Record Voice',
    switchBtn:     '🌐 中文',
    verdictMain:   'GUILTY',
    verdictSub:    "I'm going to sentence you to life in prison without the possibility of parole.",
    silenceMain:   'SILENCE!',
    silenceSub:    'SILENCE IN COURT',
    closeSilence:  'Dismiss',
    recessMain:    'RECESS',
    recessSub:     'COURT IS IN RECESS',
    closeRecess:   'Resume',
    irrelMain:     'IRRELEVANT',
    irrelSub:      'THIS STATEMENT IS IRRELEVANT TO THIS CASE',
    closeIrrel:    'OK',
    ngMain:        'NOT GUILTY',
    ngSub:         'THE DEFENDANT IS HEREBY ACQUITTED',
    closeNg:       'OK',
    modalTitle:    '🎙 Voice Recording',
    modalDesc:     'Record your own guilty verdict voice',
    recReady:      'Ready to record',
    recHasCustom:  'Custom recording saved',
    recRecording:  'Recording…',
    recDone:       'Recording complete!',
    recDeleted:    'Deleted — ready to re-record',
    btnStartRec:   '⏺ Start Recording',
    btnStopRec:    '⏹ Stop Recording',
    btnPlayRec:    '▶ Play Back',
    btnDelRec:     '🗑 Delete & Re-record',
    toggleLabel:   'Use custom recording',
    closeModal:    'Close',
  }
};

/* ── STATE ── */
let lang           = 'zh';
let busy           = false;
let mediaRecorder  = null;
let recChunks      = [];
let customAudioURL = null;
let customAudioEl  = null;
let useCustomAudio = false;
let recTimerID     = null;
let recSeconds     = 0;

/* ── AUDIO CONTEXT ── */
const ACtx = window.AudioContext || window.webkitAudioContext;
let _actx = null;
function getAC() {
  if (!_actx) _actx = new ACtx();
  if (_actx.state === 'suspended') _actx.resume();
  return _actx;
}

/* ── AUDIO SYNTHESIS ── */
function playThud(delay = 0, vol = 1.7) {
  try {
    const c = getAC();
    const t = c.currentTime + delay;
    const sr = c.sampleRate;
    const len = Math.floor(sr * 1.1);
    const buf = c.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const s = i / sr;
      d[i] =
        Math.exp(-s * 16) * Math.sin(2 * Math.PI * 68  * s) * 1.2 +
        Math.exp(-s * 58) * (Math.random() * 2 - 1)           * 0.5 +
        Math.exp(-s *  7) * Math.sin(2 * Math.PI * 180 * s) * 0.28 +
        Math.exp(-s * 12) * Math.sin(2 * Math.PI * 105 * s) * 0.44;
    }
    const src  = c.createBufferSource(); src.buffer = buf;
    const cmp  = c.createDynamicsCompressor();
    cmp.threshold.value = -4; cmp.ratio.value = 9;
    cmp.attack.value = 0.001; cmp.release.value = 0.28;
    const bass = c.createBiquadFilter();
    bass.type = 'lowshelf'; bass.frequency.value = 130; bass.gain.value = 10;
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    src.connect(bass); bass.connect(cmp); cmp.connect(g); g.connect(c.destination);
    src.start(t);
  } catch(e) { console.warn('Audio error', e); }
}

function playSilenceThree() {
  playThud(0,    1.45);
  playThud(0.22, 1.32);
  playThud(0.44, 1.18);
}

/* ── LANGUAGE ── */
function setLang(l) {
  lang = l;
  applyTranslations();
  document.getElementById('langScreen').classList.add('hidden');
  document.getElementById('appScreen').classList.remove('hidden');
}

function switchLang() {
  lang = lang === 'zh' ? 'en' : 'zh';
  applyTranslations();
}

function applyTranslations() {
  const t = T[lang];
  document.getElementById('courtLabel').textContent    = t.court;
  document.getElementById('tapHint').textContent       = t.tapHint;
  document.getElementById('lblGuilty').textContent     = t.lblGuilty;
  document.getElementById('subGuilty').textContent     = t.subGuilty;
  document.getElementById('lblSilence').textContent    = t.lblSilence;
  document.getElementById('lblRecess').textContent     = t.lblRecess;
  document.getElementById('lblIrrelevant').textContent = t.lblIrrelevant;
  document.getElementById('lblNotGuilty').textContent  = t.lblNotGuilty;
  document.getElementById('lblRecord').textContent     = t.lblRecord;
  document.getElementById('switchLangBtn').textContent = t.switchBtn;
  // overlays
  document.getElementById('verdictStamp').textContent  = t.verdictMain;
  document.getElementById('verdictSub').textContent    = t.verdictSub;
  document.getElementById('txtSilence').textContent    = t.silenceMain;
  document.getElementById('txtSilenceSub').textContent = t.silenceSub;
  document.getElementById('btnCloseSilence').textContent = t.closeSilence;
  document.getElementById('txtRecess').textContent     = t.recessMain;
  document.getElementById('txtRecessSub').textContent  = t.recessSub;
  document.getElementById('btnCloseRecess').textContent = t.closeRecess;
  document.getElementById('txtIrrelevant').textContent = t.irrelMain;
  document.getElementById('txtIrrelevantSub').textContent = t.irrelSub;
  document.getElementById('btnCloseIrrelevant').textContent = t.closeIrrel;
  document.getElementById('txtNotGuilty').textContent  = t.ngMain;
  document.getElementById('txtNotGuiltySub').textContent = t.ngSub;
  document.getElementById('btnCloseNotGuilty').textContent = t.closeNg;
  // modal
  document.getElementById('modalTitle').textContent   = t.modalTitle;
  document.getElementById('modalDesc').textContent    = t.modalDesc;
  document.getElementById('btnStartRec').textContent  = t.btnStartRec;
  document.getElementById('btnStopRec').textContent   = t.btnStopRec;
  document.getElementById('btnPlayRec').textContent   = t.btnPlayRec;
  document.getElementById('btnDelRec').textContent    = t.btnDelRec;
  document.querySelector('.toggle-label').lastChild.textContent = ' ' + t.toggleLabel;
  document.querySelector('.modal-close-btn').textContent = t.closeModal;

  updateRecStatus();
}

/* ── GAVEL STRIKE ── */
function strikeGavel() {
  if (busy) return;
  busy = true;

  // Sound
  playThud();
  // Vibrate
  if (navigator.vibrate) navigator.vibrate([80]);

  // Gavel animation
  const arm = document.getElementById('armWrap');
  arm.classList.remove('strike');
  void arm.offsetWidth;
  arm.classList.add('strike');
  arm.addEventListener('animationend', () => arm.classList.remove('strike'), { once: true });

  // Ripples
  triggerRipples();

  // Screen flash
  const fl = document.getElementById('flash');
  fl.classList.remove('go'); void fl.offsetWidth; fl.classList.add('go');

  busy = false; // allow re-tap immediately for gavel
}

function triggerRipples() {
  ['ring1','ring2'].forEach(id => {
    const r = document.getElementById(id);
    r.classList.remove('pop'); void r.offsetWidth; r.classList.add('pop');
  });
}

/* ── GUILTY ── */
function triggerGuilty() {
  if (busy) return;
  busy = true;

  // Strike gavel first
  playThud();
  if (navigator.vibrate) navigator.vibrate([100, 40, 80]);
  const arm = document.getElementById('armWrap');
  arm.classList.remove('strike'); void arm.offsetWidth; arm.classList.add('strike');
  arm.addEventListener('animationend', () => arm.classList.remove('strike'), { once: true });
  triggerRipples();

  const fl = document.getElementById('flash');
  fl.classList.remove('go'); void fl.offsetWidth; fl.classList.add('go');

  // Play custom audio HERE (must be in direct user gesture context for iOS)
  if (useCustomAudio && customAudioURL) {
    const a = new Audio(customAudioURL);
    a.play().catch(() => {});
  }

  setTimeout(() => {
    const ov = document.getElementById('verdictOv');
    ov.classList.add('show');
    setTimeout(() => {
      ov.classList.remove('show');
      busy = false;
    }, 1850);
  }, 160);
}

/* ── SILENCE ── */
function triggerSilence() {
  playSilenceThree();
  if (navigator.vibrate) navigator.vibrate([80, 50, 80, 50, 80]);
  const arm = document.getElementById('armWrap');
  arm.classList.remove('strike'); void arm.offsetWidth; arm.classList.add('strike');
  arm.addEventListener('animationend', () => arm.classList.remove('strike'), { once: true });
  triggerRipples();
  document.getElementById('silenceOv').classList.add('show');
}

/* ── RECESS ── */
function triggerRecess() {
  playThud(0, 1.5);
  playThud(0.28, 1.3);
  if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
  const arm = document.getElementById('armWrap');
  arm.classList.remove('strike'); void arm.offsetWidth; arm.classList.add('strike');
  arm.addEventListener('animationend', () => arm.classList.remove('strike'), { once: true });
  triggerRipples();
  document.getElementById('recessOv').classList.add('show');
}

/* ── IRRELEVANT ── */
function triggerIrrelevant() {
  playThud();
  if (navigator.vibrate) navigator.vibrate([60]);
  const arm = document.getElementById('armWrap');
  arm.classList.remove('strike'); void arm.offsetWidth; arm.classList.add('strike');
  arm.addEventListener('animationend', () => arm.classList.remove('strike'), { once: true });
  triggerRipples();
  document.getElementById('irrelevantOv').classList.add('show');
}

/* ── NOT GUILTY ── */
function triggerNotGuilty() {
  // gentle double tap
  playThud(0, 1.2);
  playThud(0.22, 1.0);
  if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
  const arm = document.getElementById('armWrap');
  arm.classList.remove('strike'); void arm.offsetWidth; arm.classList.add('strike');
  arm.addEventListener('animationend', () => arm.classList.remove('strike'), { once: true });
  triggerRipples();
  document.getElementById('notguiltyOv').classList.add('show');
}

/* ── CLOSE OVERLAY ── */
function closeOverlay(id) {
  document.getElementById(id).classList.remove('show');
  if (id === 'verdictOv') busy = false;
}

/* ── RECORDING ── */
function openRecord() {
  document.getElementById('recordModal').classList.add('show');
  updateRecStatus();
}
function closeRecord() {
  document.getElementById('recordModal').classList.remove('show');
}
function closeRecordOutside(e) {
  if (e.target === document.getElementById('recordModal')) closeRecord();
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) recChunks.push(e.data); };
    mediaRecorder.onstop = finishRecording;
    mediaRecorder.start();

    // UI
    document.getElementById('btnStartRec').classList.add('hidden');
    document.getElementById('btnStopRec').classList.remove('hidden');
    document.getElementById('btnPlayRec').classList.add('hidden');
    document.getElementById('btnDelRec').classList.add('hidden');
    document.getElementById('recStatus').textContent = T[lang].recRecording;
    document.getElementById('recTimer').style.display = 'block';

    // Timer
    recSeconds = 0;
    updateTimer();
    recTimerID = setInterval(updateTimer, 1000);

  } catch(err) {
    alert(lang === 'zh'
      ? '無法存取麥克風，請確認瀏覽器權限設定。'
      : 'Microphone access denied. Please check your browser permissions.');
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(t => t.stop());
  }
  clearInterval(recTimerID);
  document.getElementById('recTimer').style.display = 'none';
}

function finishRecording() {
  const blob = new Blob(recChunks, { type: 'audio/webm' });
  if (customAudioURL) URL.revokeObjectURL(customAudioURL);
  customAudioURL = URL.createObjectURL(blob);
  customAudioEl  = new Audio(customAudioURL);

  document.getElementById('btnStartRec').classList.add('hidden');
  document.getElementById('btnStopRec').classList.add('hidden');
  document.getElementById('btnPlayRec').classList.remove('hidden');
  document.getElementById('btnDelRec').classList.remove('hidden');
  document.getElementById('recStatus').textContent = T[lang].recDone;

  // Auto-enable custom audio
  document.getElementById('useCustom').checked = true;
  useCustomAudio = true;
}

function playRecording() {
  if (!customAudioURL) return;
  // Create fresh Audio instance each time — required by iOS Safari
  const a = new Audio(customAudioURL);
  a.play().catch(() => {
    alert(lang === 'zh'
      ? '播放失敗，請確認瀏覽器允許音訊播放。'
      : 'Playback failed. Please allow audio in your browser.');
  });
}

function deleteRecording() {
  if (customAudioURL) URL.revokeObjectURL(customAudioURL);
  customAudioURL = null;
  customAudioEl  = null;
  useCustomAudio = false;
  document.getElementById('useCustom').checked = false;
  document.getElementById('btnStartRec').classList.remove('hidden');
  document.getElementById('btnStopRec').classList.add('hidden');
  document.getElementById('btnPlayRec').classList.add('hidden');
  document.getElementById('btnDelRec').classList.add('hidden');
  document.getElementById('recStatus').textContent = T[lang].recDeleted;
}

function toggleCustom() {
  useCustomAudio = document.getElementById('useCustom').checked;
}

function updateRecStatus() {
  const el = document.getElementById('recStatus');
  if (!el) return;
  if (customAudioEl) {
    el.textContent = T[lang].recHasCustom;
    document.getElementById('btnStartRec').classList.add('hidden');
    document.getElementById('btnPlayRec').classList.remove('hidden');
    document.getElementById('btnDelRec').classList.remove('hidden');
  } else {
    el.textContent = T[lang].recReady;
    document.getElementById('btnStartRec').classList.remove('hidden');
    document.getElementById('btnPlayRec').classList.add('hidden');
    document.getElementById('btnDelRec').classList.add('hidden');
  }
}

function updateTimer() {
  recSeconds++;
  const m = String(Math.floor(recSeconds / 60)).padStart(2, '0');
  const s = String(recSeconds % 60).padStart(2, '0');
  document.getElementById('recTimer').textContent = `⏺ ${m}:${s}`;
}

/* ── PREVENT iOS DOUBLE-TAP ZOOM ── */
let _lt = 0;
document.addEventListener('touchend', e => {
  const n = Date.now();
  if (n - _lt < 300) e.preventDefault();
  _lt = n;
}, { passive: false });

/* ── CLOSE OVERLAYS ON BUTTON CLICK (stop propagation) ── */
['btnCloseSilence','btnCloseRecess','btnCloseIrrelevant','btnCloseNotGuilty'].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', e => {
    e.stopPropagation();
    const map = {
      btnCloseSilence:    'silenceOv',
      btnCloseRecess:     'recessOv',
      btnCloseIrrelevant: 'irrelevantOv',
      btnCloseNotGuilty:  'notguiltyOv',
    };
    closeOverlay(map[id]);
  });
});
