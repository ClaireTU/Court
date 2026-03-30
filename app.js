/* ═══════════════════════════════════════
   JUDGE'S GAVEL APP — app.js
═══════════════════════════════════════ */

/* ── TRANSLATIONS ── */
const T = {
  zh: {
    court:'最高法院', tapHint:'點擊敲槌',
    lblGuilty:'有罪', subGuilty:'終身監禁不得假釋',
    lblSilence:'肅靜', lblRecess:'休庭',
    lblIrrelevant:'與本案無關', lblNotGuilty:'當庭無罪釋放',
    lblRecord:'錄音設定', lblCharge:'隨機罪名',
    lblVerdictWriter:'判決書', lblQuote:'法官語錄',
    switchBtn:'🌐 English',
    verdictMain:'有罪', verdictSub:'終身監禁不得假釋',
    silenceMain:'肅靜！', silenceSub:'SILENCE IN COURT', closeSilence:'解除',
    recessMain:'休庭', recessSub:'COURT IS IN RECESS', closeRecess:'恢復',
    irrelMain:'該陳述與本案無關', irrelSub:'IRRELEVANT TO THIS CASE', closeIrrel:'確定',
    ngMain:'無罪', ngSub:'NOT GUILTY — ACQUITTED', closeNg:'確定',
    counterLbl:'次定罪',
    modalTitle:'🎙 錄音設定', modalDesc:'錄製你的「有罪」宣判聲音',
    recReady:'準備就緒，可以錄音', recHasCustom:'已有自訂錄音',
    recRecording:'錄音中…', recDone:'錄音完成！', recDeleted:'已刪除',
    btnStartRec:'⏺ 開始錄音', btnStopRec:'⏹ 停止錄音',
    btnPlayRec:'▶ 試聽', btnDelRec:'🗑 刪除重錄',
    toggleLabel:'使用自訂錄音', closeModal:'關閉',
    chargeTitleLbl:'罪名產生器',
    verdictWriterTitleLbl:'判決書產生器',
    verdictWriterDescLbl:'輸入被告資訊，本院即刻製發判決書',
    vdHeader:'最高法院刑事判決書',
    vdFooter:'本判決書經本院院長用印，即日起生效，永久存入司法檔案。',
    quoteAttr:'— 法官 大人',
  },
  en: {
    court:'Supreme Court of Justice', tapHint:'Tap to Strike',
    lblGuilty:'Guilty', subGuilty:'Life without parole',
    lblSilence:'Silence', lblRecess:'Recess',
    lblIrrelevant:'Irrelevant', lblNotGuilty:'Not Guilty',
    lblRecord:'Record Voice', lblCharge:'Random Charge',
    lblVerdictWriter:'Verdict', lblQuote:'Judge\'s Words',
    switchBtn:'🌐 中文',
    verdictMain:'GUILTY', verdictSub:"Life in prison without the possibility of parole.",
    silenceMain:'SILENCE!', silenceSub:'SILENCE IN COURT', closeSilence:'Dismiss',
    recessMain:'RECESS', recessSub:'COURT IS IN RECESS', closeRecess:'Resume',
    irrelMain:'IRRELEVANT', irrelSub:'IRRELEVANT TO THIS CASE', closeIrrel:'OK',
    ngMain:'NOT GUILTY', ngSub:'THE DEFENDANT IS HEREBY ACQUITTED', closeNg:'OK',
    counterLbl:'convictions',
    modalTitle:'🎙 Voice Recording', modalDesc:'Record your guilty verdict voice',
    recReady:'Ready to record', recHasCustom:'Custom recording saved',
    recRecording:'Recording…', recDone:'Recording complete!', recDeleted:'Deleted',
    btnStartRec:'⏺ Start Recording', btnStopRec:'⏹ Stop',
    btnPlayRec:'▶ Play Back', btnDelRec:'🗑 Delete',
    toggleLabel:'Use custom recording', closeModal:'Close',
    chargeTitleLbl:'Charge Generator',
    verdictWriterTitleLbl:'Verdict Writer',
    verdictWriterDescLbl:'Enter defendant info to generate a verdict',
    vdHeader:'SUPREME COURT CRIMINAL VERDICT',
    vdFooter:'This verdict is hereby sealed by the Chief Justice and takes immediate effect.',
    quoteAttr:'— The Honorable Judge',
  }
};

/* ── ZH CHARGES ── */
const CHARGES_ZH = [
  '已讀不回罪（加重）','搶最後一顆蛋炒飯罪','開會遲到累犯','在電影院嗑瓜子罪',
  '傳假新聞給家族群組罪','Netflix密碼分享罪','半夜煮泡麵罪（鄰居檢舉）',
  '叫外送不給小費罪','搭電梯不讓人先出罪','路邊停車擋到消防栓罪',
  '朋友聚會滑手機罪','自助餐多夾不付錢罪','唱KTV搶麥罪','借書不還罪（超過十年）',
  '在圖書館講電話罪','炎炎夏日不開冷氣罪','超商結帳找零太慢罪',
  '群組已讀不回覆罪（集體犯罪）','路上邊走邊滑手機罪','免費試吃超過三次罪',
  '在捷運上吃臭豆腐罪','對號入座坐錯位罪','超速25公里加重罪',
  '洗碗不洗鍋蓋罪','宵夜引誘他人節食失敗罪',
];

/* ── EN CHARGES ── */
const CHARGES_EN = [
  'Leaving chat on read (aggravated)','Eating the last slice of pizza','Chronic lateness to meetings',
  'Talking in a movie theater','Spreading fake news in family group chats',
  'Netflix password sharing','Cooking instant noodles at 2AM',
  'Ordering delivery without tipping','Blocking elevator exit',
  'Parking in front of a fire hydrant','Scrolling your phone during dinner',
  'Hogging the karaoke mic','Borrowing a book and never returning it (10+ years)',
  'Talking on the phone in a library','Using speakerphone in public',
  'Eating smelly food on public transit','Sitting in the wrong assigned seat',
  'Excessive free sample consumption','Walking while staring at your phone',
  'Forgetting to wash the pot lid','Luring dieters with late-night snacks',
];

/* ── ZH QUOTES ── */
const QUOTES_ZH = [
  { q:'本院今日心情不佳，全部有罪。', a:'法官 大人（睡前）' },
  { q:'被告，你的臉就已經是鐵證了。', a:'法官 大人（法醫鑑定學）' },
  { q:'本院判決：無論如何，都是你的錯。', a:'法官 大人（家庭法庭）' },
  { q:'辯護律師請坐。其實你說什麼都沒用。', a:'法官 大人（效率至上）' },
  { q:'本院宣布：今日休庭。理由：中午吃太飽。', a:'法官 大人（生理需求）' },
  { q:'控方證人，請直接說對還是對。謝謝。', a:'法官 大人（節省時間）' },
  { q:'法律面前人人平等，但有些人比較不平等。', a:'法官 大人（哲學時間）' },
  { q:'本院已決定判決結果，接下來的審訊純屬形式。', a:'法官 大人（誠實的人）' },
  { q:'你有權保持沉默，但你的表情已經出賣你了。', a:'法官 大人（讀心術）' },
  { q:'辯護詞很精彩，但本院沒在聽。', a:'法官 大人（坦白說）' },
  { q:'本庭判決：被告需每週五請全辦公室吃雞排。', a:'法官 大人（民心所向）' },
  { q:'沉默是金，但在本院，沉默就是認罪。', a:'法官 大人（邏輯學派）' },
];

/* ── EN QUOTES ── */
const QUOTES_EN = [
  { q:"The court is in a bad mood today. Everyone's guilty.", a:'The Honorable Judge (pre-lunch)' },
  { q:"Defendant, your face alone is sufficient evidence.", a:'The Honorable Judge (forensics)' },
  { q:"No matter what happened, it's your fault.", a:'The Honorable Judge (family court)' },
  { q:"Defense counsel, please sit. Nothing you say will help.", a:'The Honorable Judge (efficiency mode)' },
  { q:"Court is adjourned. Reason: ate too much lunch.", a:'The Honorable Judge (physiological needs)' },
  { q:"Witness, please just answer: guilty or guilty?", a:'The Honorable Judge (time management)' },
  { q:"All are equal before the law. Some are just more guilty.", a:'The Honorable Judge (philosophy hour)' },
  { q:"The verdict was decided before proceedings began. This is just theater.", a:'The Honorable Judge (honesty)' },
  { q:"You have the right to remain silent. Your face already confessed.", a:'The Honorable Judge (mind reader)' },
  { q:"Brilliant defense. The court wasn't listening.", a:'The Honorable Judge (frankly speaking)' },
  { q:"Sentence: defendant must buy the entire office fried chicken every Friday.", a:'The Honorable Judge (populist ruling)' },
  { q:"Silence is golden. In this court, silence is a guilty plea.", a:'The Honorable Judge (logical school)' },
];

/* ── STATE ── */
let lang           = 'zh';
let busy           = false;
let volume         = 0.8;
let convictions    = 0;
let currentCharge  = '';
let mediaRecorder  = null;
let recChunks      = [];
let customAudioURL = null;
let customAudioEl  = null;
let useCustomAudio = false;
let recTimerID     = null;
let recSeconds     = 0;

/* ── AUDIO ── */
const ACtx = window.AudioContext || window.webkitAudioContext;
let _actx = null;
function getAC() {
  if (!_actx) _actx = new ACtx();
  if (_actx.state === 'suspended') _actx.resume();
  return _actx;
}

function playThud(delay = 0, vol = 1.0) {
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
    const src = c.createBufferSource(); src.buffer = buf;
    const cmp = c.createDynamicsCompressor();
    cmp.threshold.value = -4; cmp.ratio.value = 9;
    cmp.attack.value = 0.001; cmp.release.value = 0.28;
    const bass = c.createBiquadFilter();
    bass.type = 'lowshelf'; bass.frequency.value = 130; bass.gain.value = 10;
    const g = c.createGain();
    const finalVol = vol * volume * 1.7;
    g.gain.setValueAtTime(finalVol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    src.connect(bass); bass.connect(cmp); cmp.connect(g); g.connect(c.destination);
    src.start(t);
  } catch(e) {}
}

function setVolume(v) {
  volume = v / 100;
}

function playSilenceThree() {
  playThud(0, 1.0); playThud(0.22, 0.9); playThud(0.44, 0.8);
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
  const ids = [
    ['courtLabel','court'],['tapHint','tapHint'],
    ['lblGuilty','lblGuilty'],['subGuilty','subGuilty'],
    ['lblSilence','lblSilence'],['lblRecess','lblRecess'],
    ['lblIrrelevant','lblIrrelevant'],['lblNotGuilty','lblNotGuilty'],
    ['lblRecord','lblRecord'],['lblCharge','lblCharge'],
    ['lblVerdictWriter','lblVerdictWriter'],['lblQuote','lblQuote'],
    ['switchLangBtn','switchBtn'],
    ['verdictStamp','verdictMain'],['verdictSub','verdictSub'],
    ['txtSilence','silenceMain'],['txtSilenceSub','silenceSub'],
    ['btnCloseSilence','closeSilence'],
    ['txtRecess','recessMain'],['txtRecessSub','recessSub'],
    ['btnCloseRecess','closeRecess'],
    ['txtIrrelevant','irrelMain'],['txtIrrelevantSub','irrelSub'],
    ['btnCloseIrrelevant','closeIrrel'],
    ['txtNotGuilty','ngMain'],['txtNotGuiltySub','ngSub'],
    ['btnCloseNotGuilty','closeNg'],
    ['counterLbl','counterLbl'],
    ['modalTitle','modalTitle'],['modalDesc','modalDesc'],
    ['btnStartRec','btnStartRec'],['btnStopRec','btnStopRec'],
    ['btnPlayRec','btnPlayRec'],['btnDelRec','btnDelRec'],
    ['chargeTitleLbl','chargeTitleLbl'],
    ['verdictWriterTitleLbl','verdictWriterTitleLbl'],
    ['verdictWriterDescLbl','verdictWriterDescLbl'],
  ];
  ids.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && t[key] !== undefined) el.textContent = t[key];
  });
  const tl = document.querySelector('.toggle-label');
  if (tl) tl.lastChild.textContent = ' ' + t.toggleLabel;
  document.querySelectorAll('.modal-close-btn').forEach(b => b.textContent = t.closeModal);
  updateRecStatus();
}

/* ── GAVEL ── */
function doSwing() {
  const arm = document.getElementById('armWrap');
  arm.classList.remove('strike'); void arm.offsetWidth; arm.classList.add('strike');
  arm.addEventListener('animationend', () => arm.classList.remove('strike'), { once: true });
  ['ring1','ring2'].forEach(id => {
    const r = document.getElementById(id);
    r.classList.remove('pop'); void r.offsetWidth; r.classList.add('pop');
  });
  const fl = document.getElementById('flash');
  fl.classList.remove('go'); void fl.offsetWidth; fl.classList.add('go');
  if (navigator.vibrate) navigator.vibrate([70]);
}

function strikeGavel() {
  if (busy) return;
  playThud(); doSwing();
}

/* ── GUILTY ── */
function triggerGuilty() {
  if (busy) return;
  busy = true;
  playThud(); doSwing();
  if (navigator.vibrate) navigator.vibrate([100, 40, 80]);

  if (useCustomAudio && customAudioURL) {
    const a = new Audio(customAudioURL);
    a.play().catch(() => {});
  }

  setTimeout(() => {
    const ov = document.getElementById('verdictOv');
    ov.classList.add('show');
    setTimeout(() => {
      ov.classList.remove('show');
      // +1 conviction
      convictions++;
      document.getElementById('convictionCount').textContent = convictions;
      busy = false;
    }, 1850);
  }, 160);
}

/* ── SILENCE ── */
function triggerSilence() {
  playSilenceThree();
  if (navigator.vibrate) navigator.vibrate([80,50,80,50,80]);
  doSwing();
  document.getElementById('silenceOv').classList.add('show');
}

/* ── RECESS ── */
function triggerRecess() {
  playThud(0, 1.0); playThud(0.28, 0.85);
  if (navigator.vibrate) navigator.vibrate([120,60,120]);
  doSwing();
  document.getElementById('recessOv').classList.add('show');
}

/* ── IRRELEVANT ── */
function triggerIrrelevant() {
  playThud(); if (navigator.vibrate) navigator.vibrate([60]);
  doSwing();
  document.getElementById('irrelevantOv').classList.add('show');
}

/* ── NOT GUILTY ── */
function triggerNotGuilty() {
  playThud(0, 0.8); playThud(0.22, 0.65);
  if (navigator.vibrate) navigator.vibrate([60,40,60]);
  doSwing();
  document.getElementById('notguiltyOv').classList.add('show');
}

/* ── CLOSE OVERLAY ── */
function closeOverlay(id) {
  document.getElementById(id).classList.remove('show');
  if (id === 'verdictOv') busy = false;
}

/* ── JUDGE QUOTE ── */
function triggerQuote() {
  const pool = lang === 'zh' ? QUOTES_ZH : QUOTES_EN;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('quoteText').textContent = pick.q;
  document.getElementById('quoteAttr').textContent = '— ' + pick.a;
  playThud(0, 0.5);
  document.getElementById('quoteOv').classList.add('show');
}

/* ── CHARGE ── */
function openCharge() {
  document.getElementById('chargeResult').textContent = lang === 'zh' ? '按下按鈕產生罪名' : 'Press button to generate a charge';
  document.getElementById('chargeInput').value = '';
  document.getElementById('chargeModal').classList.add('show');
}
function closeCharge() { document.getElementById('chargeModal').classList.remove('show'); }
function closeChargeOutside(e) { if (e.target === document.getElementById('chargeModal')) closeCharge(); }

function randomCharge() {
  const pool = lang === 'zh' ? CHARGES_ZH : CHARGES_EN;
  currentCharge = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('chargeResult').textContent = currentCharge;
  document.getElementById('chargeInput').value = currentCharge;
  playThud(0, 0.4);
}
function useCustomCharge() {
  const val = document.getElementById('chargeInput').value.trim();
  if (!val) return;
  currentCharge = val;
  document.getElementById('chargeResult').textContent = currentCharge;
  playThud(0, 0.4);
}
function sendToVerdictWriter() {
  const val = document.getElementById('chargeInput').value.trim() || currentCharge;
  closeCharge();
  document.getElementById('crimeInput').value = val;
  openVerdictWriter();
}

/* ── VERDICT WRITER ── */
function openVerdictWriter() {
  document.getElementById('verdictDoc').classList.add('hidden');
  document.getElementById('verdictModal').classList.add('show');
}
function closeVerdictWriter() { document.getElementById('verdictModal').classList.remove('show'); }
function closeVerdictOutside(e) { if (e.target === document.getElementById('verdictModal')) closeVerdictWriter(); }

function generateVerdict() {
  const name  = document.getElementById('defendantName').value.trim();
  const crime = document.getElementById('crimeInput').value.trim();
  if (!name || !crime) {
    alert(lang === 'zh' ? '請填入被告姓名與罪名' : 'Please enter defendant name and charge');
    return;
  }

  const now   = new Date();
  const dateStr = lang === 'zh'
    ? `中華民國${now.getFullYear()-1911}年${now.getMonth()+1}月${now.getDate()}日`
    : now.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  const caseNum = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${Math.floor(Math.random()*9000+1000)}`;

  let body = '';
  if (lang === 'zh') {
    const sentences = [
      `本院經詳細審理，認定被告${name}確已構成「${crime}」，且犯行明確，態度惡劣，毫無悔意。`,
      `經本院法官獨立判斷，不受任何外力干擾（包含被告之淚水），判決如下：`,
      `一、被告${name}判處終身監禁，不得假釋，不得上訴，不得求情。`,
      `二、被告之財產充公，用於購置本院咖啡機一台。`,
      `三、被告須公開向社會大眾道歉，道歉內容不得少於一千字。`,
      `四、本院特別附記：被告之辯護詞精彩萬分，本院已列為反面教材。`,
    ];
    body = sentences.join('\n\n');
    document.getElementById('vdHeader').textContent = T.zh.vdHeader;
    document.getElementById('vdNum').textContent = `案號：${caseNum}　日期：${dateStr}`;
    document.getElementById('vdFooter').textContent = T.zh.vdFooter;
  } else {
    const sentences = [
      `Having carefully reviewed all evidence, this Court finds defendant ${name} GUILTY of the charge of "${crime}". The conduct was egregious, the attitude unrepentant.`,
      `After independent judicial deliberation, uninfluenced by the defendant's tears, this Court rules as follows:`,
      `I. The defendant ${name} is hereby sentenced to life imprisonment without possibility of parole, appeal, or mercy.`,
      `II. All assets of the defendant are hereby confiscated for the purchase of a new coffee machine for the Court.`,
      `III. The defendant shall issue a public apology of no fewer than one thousand words.`,
      `IV. The Court notes: the defense argument was fascinating. It has been archived as a cautionary tale.`,
    ];
    body = sentences.join('\n\n');
    document.getElementById('vdHeader').textContent = T.en.vdHeader;
    document.getElementById('vdNum').textContent = `Case No: ${caseNum}  |  Date: ${dateStr}`;
    document.getElementById('vdFooter').textContent = T.en.vdFooter;
  }

  document.getElementById('vdBody').textContent = body;
  document.getElementById('verdictDoc').classList.remove('hidden');
  playThud(0, 0.8);
  setTimeout(() => {
    document.getElementById('verdictDoc').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function shareVerdict() {
  const doc = document.getElementById('verdictDoc');
  // Use html2canvas if available, otherwise guide user
  if (window.html2canvas) {
    html2canvas(doc, { backgroundColor: '#14100a', scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = 'verdict.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  } else {
    // iOS: instruct user to take screenshot
    alert(lang === 'zh'
      ? '📸 請使用手機截圖功能（側鍵+音量鍵）儲存判決書！'
      : '📸 Please use your phone\'s screenshot function to save the verdict!');
  }
}

/* ── RECORDING ── */
function openRecord() {
  document.getElementById('recordModal').classList.add('show');
  updateRecStatus();
}
function closeRecord() { document.getElementById('recordModal').classList.remove('show'); }
function closeRecordOutside(e) { if (e.target === document.getElementById('recordModal')) closeRecord(); }

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recChunks = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4'
                   : MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : '';
    mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) recChunks.push(e.data); };
    mediaRecorder.onstop = finishRecording;
    mediaRecorder.start();
    document.getElementById('btnStartRec').classList.add('hidden');
    document.getElementById('btnStopRec').classList.remove('hidden');
    document.getElementById('btnPlayRec').classList.add('hidden');
    document.getElementById('btnDelRec').classList.add('hidden');
    document.getElementById('recStatus').textContent = T[lang].recRecording;
    document.getElementById('recTimer').style.display = 'block';
    recSeconds = 0; updateTimer();
    recTimerID = setInterval(updateTimer, 1000);
  } catch(err) {
    alert(lang === 'zh' ? '無法存取麥克風，請確認瀏覽器權限。' : 'Microphone access denied.');
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
  const mimeType = MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4'
                 : MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : '';
  const blob = new Blob(recChunks, mimeType ? { type: mimeType } : {});
  const reader = new FileReader();
  reader.onloadend = () => {
    customAudioURL = reader.result;
    customAudioEl  = new Audio(customAudioURL);
    document.getElementById('btnStartRec').classList.add('hidden');
    document.getElementById('btnStopRec').classList.add('hidden');
    document.getElementById('btnPlayRec').classList.remove('hidden');
    document.getElementById('btnDelRec').classList.remove('hidden');
    document.getElementById('recStatus').textContent = T[lang].recDone;
    document.getElementById('useCustom').checked = true;
    useCustomAudio = true;
  };
  reader.readAsDataURL(blob);
}

function playRecording() {
  if (!customAudioURL) return;
  const a = new Audio(customAudioURL);
  a.play().catch(err => {
    alert(lang === 'zh' ? '播放失敗，請確認手機未靜音。' : 'Playback failed. Check device volume.');
  });
}

function deleteRecording() {
  customAudioURL = null; customAudioEl = null; useCustomAudio = false;
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
  const m = String(Math.floor(recSeconds/60)).padStart(2,'0');
  const s = String(recSeconds%60).padStart(2,'0');
  document.getElementById('recTimer').textContent = `⏺ ${m}:${s}`;
}

/* ── CLOSE OVERLAY BUTTONS ── */
['btnCloseSilence','btnCloseRecess','btnCloseIrrelevant','btnCloseNotGuilty'].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', e => {
    e.stopPropagation();
    const map = { btnCloseSilence:'silenceOv', btnCloseRecess:'recessOv',
                  btnCloseIrrelevant:'irrelevantOv', btnCloseNotGuilty:'notguiltyOv' };
    closeOverlay(map[id]);
  });
});

/* ── PREVENT iOS DOUBLE-TAP ZOOM ── */
let _lt = 0;
document.addEventListener('touchend', e => {
  const n = Date.now(); if (n - _lt < 300) e.preventDefault(); _lt = n;
}, { passive: false });
