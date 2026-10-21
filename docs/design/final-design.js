'use strict';
(() => {

const modeNames = {light:'라이트',dark:'다크'};
function appearance(c, mode='light') {
  const p=window.DRAWRY_DESIGN_SYSTEM.palette[mode];
  return {...c,bg:p.background,ink:p.text,accent:p.accent,soft:p.surfaceSoft,
    stage:p.stage,surface:p.surface,mode,onAccent:p.actionText,line:p.outline,muted:p.textSecondary};
}
const design = appearance({id:'duet',no:'18',name:'Two Little Things',ko:'두 장으로 남긴 하루',tagline:'한 장의 사진, 또 한 장의 마음.',mood:'이야기하는 · 펼쳐보는 · 여유로운',
    layout:'두 장의 연결 엽서 · 장면별 한 줄과 접지 상세',caution:'한 장만 있어도 완성 가능한 구조 유지',
    type:'산세리프 · 하나의 일기 제목',radius:'둥근 연결부 · 부드러운 사진 카드',rhythm:'사진 위 그리기 → 일기 제목 → 선택 메모',
    description:'연결된 엽서에 사진과 직접 그린 선을 담습니다. 화면 이름은 고정하고, 일기 제목 하나와 사진별 선택 메모를 작성합니다. 홈과 완성 화면에는 같은 기록을 표시합니다.',
    rules:['일기 제목은 하나이며, 사진별 이야기는 선택 입력입니다.','화면 이름은 고정하고 날짜·사진 번호는 자동으로 표시합니다.','사진이 한 장일 때도 빈 두 번째 장을 강요하지 않습니다.']});

const paths = {
  book: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 3v18M12 8h4M12 12h4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-14 4h2m4 0h2"/>',
  settings: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="15" cy="17" r="3"/>',
  pen: '<path d="m15 4 5 5M4 20l5-1L20 8a2 2 0 0 0-5-5L4 14z"/>',
  arrow: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><path d="m3 17 6-6 4 4 3-3 5 5"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  undo: '<path d="M8 5 3 10l5 5M3 10h11a6 6 0 0 1 0 12"/>',
  redo: '<path d="m16 5 5 5-5 5m5-5H10a6 6 0 0 0 0 12"/>',
  eraser: '<path d="m4 14 9-10a2 2 0 0 1 3 0l5 5a2 2 0 0 1 0 3l-8 9H9l-5-4a2 2 0 0 1 0-3Zm4-4 9 8M12 21h10"/>',
  share: '<path d="M12 16V3m-4 4 4-4 4 4M6 11H4v10h16V11h-2"/>',
  move: '<path d="M12 3v18M3 12h18M9 6l3-3 3 3m-6 12 3 3 3-3M6 9l-3 3 3 3m12-6 3 3-3 3"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.pen}</svg>`;
const photo = name => `<img src="assets/${name}.jpg" alt="" draggable="false">`;
const title = '조금 느리게 보낸 오후';
const style = c => `--app-bg:${c.bg};--app-ink:${c.ink};--app-accent:${c.accent};--app-soft:${c.soft};--stage:${c.stage};--app-surface:${c.surface};--on-accent:${c.onAccent};--app-line:${c.line};--app-muted:${c.muted}`;
const status = () => `<div class="status-bar"><span>9:41</span><i></i><span class="status-icons">▴ 5G <svg viewBox="0 0 24 12" aria-hidden="true"><rect x="1" y="1" width="19" height="10" rx="2" fill="none" stroke="currentColor"/><rect x="3" y="3" width="15" height="6" rx="1" fill="currentColor"/><path d="M22 4v4" stroke="currentColor" stroke-width="2"/></svg></span></div>`;
const navigation = () => `<div class="app-nav"><span class="active">${icon('book')}<b>기록</b></span><span>${icon('calendar')}<b>캘린더</b></span><span>${icon('settings')}<b>설정</b></span></div><div class="gesture"><i></i></div>`;
const fab = () => `<span class="app-fab">${icon('pen')}<b>기록하기</b></span>`;
const chip = (text = '평온한') => `<span class="mood-chip">${icon('sun')}${text}</span>`;
const top = (name = 'drawry', right = 'more') => `<div class="app-top"><span class="app-logo">${name}</span><span>${icon(right)}</span></div>`;

// Photo and ink keep the original aspect ratio at every step; neither is cropped.
// These are illustrative design samples, not persisted ink.
function paintedPhoto(name='coffee') {
  const height = name === 'forest' ? 240 : 375;
  const ink = name === 'forest'
    ? '<text x="20" y="55">scene 02</text><path d="M27 70q43-8 87-2M164 156q19-25 41-4m-28 13q15 10 28-5m27-27 5-13 5 14 14 3-13 5-5 14-4-14-14-5Z"/>'
    : '<text x="23" y="125" transform="rotate(-5 23 125)">dear today,</text><path d="M32 140q65 12 127-5M167 205c-16-26-47-11-34 11l34 29 31-29c14-24-16-38-31-11Z"/><path d="M50 178q49 3 77 31m-13-5 13 5-1-14"/><text x="27" y="306" transform="rotate(-3 27 306)">you were lovely.</text>';
  const image = document.getElementById('print-book') ? `<img src="assets/print-${name}-ink.png" alt="" draggable="false">` : photo(name);
  return `<div class="painted-photo" data-photo="${name}" style="--photo-ratio:300 / ${height}">${image}<svg class="ink-overlay" viewBox="0 0 300 ${height}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${ink}</svg></div>`;
}
function penPalette() {
  return `<div class="pen-palette"><div class="pen-colors">${['#FFEDB8','#ECA4A5','#9DBCB0','#AEC7EC','#FFFFFF','#343732'].map((color,i)=>`<span class="color-target ${i===0?'selected':''}"><i style="background:${color}"></i></span>`).join('')}</div></div><div class="pen-widths"><span>선 굵기</span><div><i></i><i class="selected"></i><i></i></div><b>보통</b></div>`;
}
function drawingTools() {
  return `<div class="drawing-tools"><span class="chosen">${icon('pen')}<b>펜</b></span><span>${icon('eraser')}<b>지우개</b></span><span>${icon('move')}<b>이동</b></span><i></i><span>${icon('undo')}<b>되돌리기</b></span><span class="tool-muted">${icon('redo')}<b>다시 실행</b></span></div>`;
}
// Four approved screens share one sample entry and the design-system copy.
function createScreens() {
  const photo=(h,name='coffee')=>`<div class="shot" style="--shot-height:${h}px">${paintedPhoto(name)}</div>`;
  const mini=(text)=>`<span class="ref-mini">${text}</span>`;
  const brand=()=>top('drawry <em class="ref-smile">:)</em>');
  const gesture=()=>'<div class="gesture"><i></i></div>';
  const bar=(name,action='저장')=>`<div class="editor-top"><span class="top-icon">${icon('arrow')}</span><b>${name}</b><span class="${action?'save-label':'top-icon'}">${action||icon('more')}</span></div>`;
  const tools=()=>`<div class="ref-toolbox">${mini('나의 작은 도구함')}${penPalette()}${drawingTools()}</div>`;
  const writeTools=()=>`<div class="editor-tools"><span>${icon('image')}사진</span><span>${icon('pen')}그리기</span><span>${icon('sun')}기분</span><span>${icon('more')}더보기</span></div>${gesture()}`;
  const actions=()=>`<div class="detail-actions"><span>${icon('pen')}수정하기</span><span>${icon('share')}공유하기</span></div>${gesture()}`;
  const edit=()=>`<span class="inline-edit">${icon('pen')}그림 수정</span>`;
  const draft=()=>`<div class="draft-status">${icon('lock')} 초안이 저장되었어요</div>`;
  const tags=()=>`<div class="entry-tags">${chip()}<span># 나의시간</span></div>`;
  const tab=(a,b,front=true)=>`<div class="ref-side-tabs"><span class="${front?'selected':''}">${a}</span><span class="${front?'':'selected'}">${b}</span></div>`;
  const scene=(no,label)=>`<div class="ref-scene"><b>${no}</b><span>${label}</span></div>`;
  const copy=window.DRAWRY_DESIGN_SYSTEM.copy;
  const sample={title, date:'2026년 10월 19일 월요일', shortDate:'2026.10.19 월요일', captions:['창가에서 마신 따뜻한 커피.','산책길의 초록이 참 좋았다.']};
  const photoNumber=i=>scene(String(i+1).padStart(2,'0'),`사진 ${i+1}`);
  const fieldLabel=label=>`<span class="duet-field-label">${label}<small>${copy.optional}</small></span>`;
  const entryTitle=()=>`<div class="duet-title-input">${fieldLabel(copy.titleLabel)}<h3>${sample.title}</h3></div>`;
  const photoStory=(i,h,name)=>`<div class="duet-entry"><div>${photoNumber(i)}${photo(h,name)}</div><div>${fieldLabel(copy.captionLabel)}<p class="duet-caption-input">${sample.captions[i]}</p>${edit()}</div></div>`;
  const home = () => `${brand()}<header class="ref-heading"><h3>${copy.home}</h3></header><div class="duet-record-date">${sample.date}</div><div class="duet-home"><article>${photoNumber(0)}${photo(145)}<p>${sample.captions[0]}</p></article><article>${photoNumber(1)}${photo(75,'forest')}<span class="duet-address">${sample.captions[1]}</span></article></div><div class="duet-home-caption"><h4>${sample.title}</h4><p>사진 2장</p></div><div class="home-compose"><span>사진에 오늘을 남겨요.</span>${fab()}</div>`;
  const drawing = () => `${tab('사진 1','사진 2')}<div class="duet-canvas ref-card">${scene('01','선택한 사진에 그리기')}${photo(254)}<div class="ref-meta"><span>사진별로 그림을 보관해요</span><span>1 / 2</span></div></div>${tools()}`;
  const writing = () => `<div class="ref-meta"><span>${sample.shortDate}</span><span>날짜 변경⌄</span></div>${entryTitle()}${photoStory(0,107,'coffee')}${photoStory(1,65,'forest')}${tags()}${draft()}`;
  const detail = () => `<div class="duet-detail-title">${mini(sample.date)}<h3>${sample.title}</h3></div><div class="duet-open"><article>${photo(174)}<div>${photoNumber(0)}<p>${sample.captions[0]}</p></div></article><div class="duet-hinge" aria-hidden="true"><i></i><i></i></div><article>${photo(85,'forest')}<div>${photoNumber(1)}<p>${sample.captions[1]}</p></div></article></div>${tags()}`;
  return {
    home:()=>`<div class="app-content home-content ref-home identity-duet">${home()}</div>${navigation()}`,
    drawing:()=>`${bar(copy.drawing,'적용')}<div class="app-content drawing-content ref-drawing identity-duet">${drawing()}</div>${gesture()}`,
    editor:()=>`${bar(copy.editor)}<div class="app-content writing-content ref-writing identity-duet">${writing()}</div>${writeTools()}`,
    detail:()=>`${bar(copy.detail,'')}<div class="app-content reading-content ref-reading identity-duet">${detail()}</div>${actions()}`
  };
}
const screens = createScreens();
const viewNames = { home: '기록 홈', drawing: '사진에 그리기', editor: '일기 작성', detail: '완성된 일기' };
function phone(c, view, mode='light') {
  c = appearance(c,mode);
  const content = screens[view]();
  return `<div class="phone view-${view} theme-${c.id} final-phone" data-mode="${mode}" style="${style(c)}" role="img" aria-label="${c.name} ${modeNames[mode]} ${viewNames[view]} 디자인 시안. ${title}. ${c.tagline}">${status()}${content}</div>`;
}
function modeNote(mode){
  return mode==='light'
    ? '리넨 · 종이 같은 회백색과 작은 테라코타 포인트. 로고와 표정은 같은 검정 계열로 표시합니다.'
    : '리넨 · 먹빛 바탕과 한 단계 밝은 종이, 부드러운 강조색. 로고와 표정은 같은 밝은 글자색으로 표시합니다.';
}
function screenSet(c, view='all', selectedMode='both') {
  const views=view==='all'?Object.entries(viewNames):[[view,viewNames[view]]];
  const modes=selectedMode==='both'?Object.keys(modeNames):[selectedMode];
  return `<div class="mode-pair">${modes.map(mode=>`<section class="mode-group" data-mode="${mode}" style="${style(appearance(c,mode))}" aria-label="${c.name} ${modeNames[mode]} 시안"><header class="mode-heading"><h4><span class="mode-dot"></span>${modeNames[mode]} <small>${mode.toUpperCase()}</small></h4><span>${views.length} SCREENS</span></header><p class="mode-treatment">${modeNote(mode)}</p><div class="screen-set ${view==='all'?'all-screens':'single-screen'}">${views.map(([key,label])=>`<figure class="screen-study"><figcaption><span>0${Object.keys(viewNames).indexOf(key)+1}</span>${label}</figcaption><div class="screen-preview">${phone(c,key,mode)}</div></figure>`).join('')}</div></section>`).join('')}</div>`;
}
const swatches = c => `<div class="swatches" aria-label="색상 구성">${[c.bg, c.ink, c.accent, c.soft].map(color => `<span style="background:${color}" title="${color}"></span>`).join('')}</div>`;
const tokens = c => `<div class="token-list">${[['Background', c.bg], ['Text', c.ink], ['Accent', c.accent], ['Soft', c.soft]].map(([name, color]) => `<div><span style="background:${color}"></span><b>${name}</b><code>${color}</code></div>`).join('')}</div>`;

function renderPrintBook() {
  const masthead = label => `<div class="print-masthead"><b>drawry :)</b><span>${label}</span></div>`;
  const pages = [];
  const add = (cls, html, c) => pages.push({cls,html,c});
  add('print-cover print-final-cover', `${masthead('ANDROID / DESIGN BASELINE 1.2 / 2026.10.21')}<div class="print-cover-layout"><div><span class="eyebrow">TWO LITTLE THINGS / FINAL DESIGN</span><h1>두 장으로 남긴,<br>나의 하루.</h1><p>사진 위에 직접 그리는 나만의 그림일기.<br>연결 엽서의 화면과 리넨 스케치북 아이콘.<br>최종 화면 1종 · 라이트 4개 + 다크 4개 · 아이콘 1종</p><div class="print-final-wordmark">drawry <span>:)</span></div></div><figure class="print-cover-icon"><img class="approved-icon" src="assets/app-icon.png" width="1254" height="1254" alt="확정된 리넨 스케치북 아이콘"><figcaption>리넨 스케치북 · 2026.10.21 확정</figcaption></figure></div><div class="print-final-guide"><section><h3>아이콘 · 리넨 스케치북</h3><p>리넨 표지, 흰 링, 자연색 사진과 검정 붓선.<br>라이트·다크에서도 같은 원본을 사용합니다.<br>원본: assets/app-icon.png · 1254 × 1254</p></section><section><h3>화면 · 차분한 리넨과 둥근 버튼</h3><p>연결 엽서, 종이색 바탕, 작은 테라코타 포인트.<br>화면 이름은 고정, 일기 제목과 사진 메모는 입력값.<br>작은 표정은 로고에만 같은 글자색으로 표시합니다.</p></section><section><h3>기준 · 디자인 가이드 v1.2</h3><p>design-system.html · DESIGN_SYSTEM.md<br>아이콘 사용 규칙과 라이트·다크 공통 토큰.<br>Android 화면·런처 리소스 적용은 다음 단계입니다.</p></section></div>`);
  const c=design;
  Object.entries(modeNames).forEach(([mode,label]) => {
    const palette=appearance(c,mode);
    add('print-concept', `<header><div><span class="eyebrow">FINAL ${c.no} / ${c.ko} / ${mode.toUpperCase()}</span><h2>${c.name}<span>${c.tagline}</span></h2><p class="concept-origin"><span class="print-mode-label ${mode}">${label} · ${mode.toUpperCase()}</span> ${c.mood} · 4 SCREENS</p></div>${swatches(palette)}</header><div class="print-screens">${Object.entries(viewNames).map(([view,viewLabel],i)=>`<div><span class="print-screen-label">0${i+1} / ${viewLabel}</span><div class="print-phone-wrap">${phone(c,view,mode)}</div></div>`).join('')}</div><div class="print-design-note"><p><b>${label} 팔레트</b>배경 ${palette.bg} · 본문 ${palette.ink}<br>강조 ${palette.accent} · 보조 ${palette.soft}</p><p><b>서체·형태</b>${c.type}<br>${c.radius}</p><p><b>${label} 표현</b>${modeNote(mode)}</p></div>`,palette);
  });
  document.getElementById('print-book').innerHTML=pages.map((p,i)=>`<section class="print-page ${p.cls}"${p.c?` style="${style(p.c)}"`:''}>${p.html}<div class="print-foot">DRAWRY / PHOTO + DRAWING<span>디자인 시안 · 실제 앱 기능 미연결</span><span>${i+1} / ${pages.length}</span></div></section>`).join('');
}

if (document.getElementById('print-book')) {
  renderPrintBook();
} else {
  let currentView = 'all';
  let currentMode = 'both';
  const grid = document.getElementById('concept-grid');
  const dialog = document.getElementById('concept-dialog');
  let dialogView = 'home';
  let dialogMode = 'light';
  const c=design;
  grid.innerHTML = `<article class="concept-card" id="concept-${c.id}" style="${style(c)}"><div class="card-heading"><div><span class="concept-number">${c.no}</span><h3>${c.name}<small>${c.ko}</small></h3></div><span class="screen-count">LIGHT 4 + DARK 4</span></div><div class="concept-stage"><span class="stage-caption">${c.mood}</span><div class="preview">${screenSet(c, currentView, currentMode)}</div></div><div class="card-copy"><h4>${c.tagline}</h4><p>${c.layout}</p><div class="card-footer">${swatches(c)}<button type="button" data-detail="${c.id}" class="detail-button" aria-label="${c.name} 자세히 보기">자세히 보기 <span>↗</span></button></div></div></article>`;
  function sizePreviews() {
    grid.querySelectorAll('.screen-preview').forEach(el => { if(el.clientWidth) el.style.setProperty('--preview-scale', el.clientWidth / 320); });
    const enlarged=document.getElementById('dialog-phone');
    if(enlarged?.clientWidth) enlarged.style.setProperty('--dialog-scale',enlarged.clientWidth / 320);
  }
  const previewObserver = new ResizeObserver(sizePreviews);
  previewObserver.observe(grid);
  previewObserver.observe(dialog);
  window.addEventListener('resize', () => requestAnimationFrame(sizePreviews));
  function setView(view) {
    currentView = view;
    document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
    grid.querySelector('.preview').innerHTML = screenSet(design, view, currentMode);
    requestAnimationFrame(sizePreviews);
  }
  function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('[data-mode-filter]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.modeFilter===mode)));
    setView(currentView);
  }
  function renderDialog(c) {
    const palette=appearance(c,dialogMode);
    document.getElementById('dialog-content').innerHTML = `<div class="dialog-heading"><span class="concept-number">${c.no}</span><div><h2 id="dialog-title">${c.name}</h2><p>${c.ko} — ${c.tagline}</p></div></div><div class="dialog-layout" style="${style(palette)}"><div class="dialog-preview" data-mode="${dialogMode}"><div class="segmented mode-tabs" role="group" aria-label="상세 시안 모드 선택">${Object.entries(modeNames).map(([mode,label])=>`<button type="button" data-dialog-mode="${mode}" aria-pressed="${mode===dialogMode}">${label}</button>`).join('')}</div><div class="segmented" role="group" aria-label="상세 시안 화면 선택">${Object.entries(viewNames).map(([view, label])=>`<button type="button" data-dialog-view="${view}" aria-pressed="${view===dialogView}">${label}</button>`).join('')}</div><div id="dialog-phone">${phone(c,dialogView,dialogMode)}</div><span class="preview-label">화면 디자인 시안 · 기능 미연결</span></div><div class="dialog-spec"><span class="eyebrow">THE IDEA</span><h3>${c.tagline}</h3><p>${c.description}</p><h4>${modeNames[dialogMode].toUpperCase()} COLOR PALETTE</h4>${tokens(palette)}<div class="spec-pair"><div><h4>TYPOGRAPHY</h4><p>${c.type}</p></div><div><h4>SHAPE & SPACING</h4><p>${c.radius}<br>${c.rhythm}</p></div></div><h4>${modeNames[dialogMode]} 표현</h4><p>${modeNote(dialogMode)}</p><h4>DESIGN RULES</h4><ol>${c.rules.map(rule=>`<li>${rule}</li>`).join('')}</ol><div class="tradeoff"><b>고려할 점</b><span>${c.caution}</span></div></div></div>`;
    sizePreviews();
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.view) setView(button.dataset.view);
    if (button.dataset.modeFilter) setMode(button.dataset.modeFilter);
    if (button.dataset.detail) {
      dialogView = currentView === 'all' ? 'home' : currentView;
      dialogMode = currentMode === 'both' ? 'light' : currentMode;
      renderDialog(design);
      dialog.showModal();
      sizePreviews();
      document.body.classList.add('modal-open');
    }
    if (button.dataset.dialogView) {
      dialogView = button.dataset.dialogView;
      document.getElementById('dialog-phone').innerHTML = phone(design,dialogView,dialogMode);
      document.querySelectorAll('[data-dialog-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.dialogView===dialogView)));
    }
    if (button.dataset.dialogMode) {
      dialogMode=button.dataset.dialogMode;
      renderDialog(design);
      document.querySelector(`[data-dialog-mode="${dialogMode}"]`).focus({preventScroll:true});
    }
    if (button.id === 'close-dialog') dialog.close();
  });
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',event=>{ if(event.target===dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); }});
  requestAnimationFrame(sizePreviews);
}
})();
