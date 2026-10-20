'use strict';
(() => {

const concepts = window.DRAWRY_REFINEMENTS;
const displayConcepts = concepts;
let colorTheme = 'linen';

const modeNames = {light:'라이트',dark:'다크'};
function luminance(hex) {
  const rgb=hex.slice(1).match(/.{2}/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
}
function appearance(c, mode='light') {
  const theme=c.colorTheme||colorTheme;
  const [bg,ink,accent,soft,stage,surface]=window.DRAWRY_COLOR_THEMES[theme][mode];
  const l=luminance(accent), dark=luminance('#18201C');
  const onAccent=(l+.05)/(dark+.05)>=1.05/(l+.05)?'#18201C':'#FFFFFF';
  return {...c,bg,ink,accent,soft,stage,surface,mode,onAccent,colorTheme:theme};
}

const paths = {
  book: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 3v18M12 8h4M12 12h4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-14 4h2m4 0h2"/>',
  settings: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="15" cy="17" r="3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  pen: '<path d="m15 4 5 5M4 20l5-1L20 8a2 2 0 0 0-5-5L4 14z"/>',
  arrow: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><path d="m3 17 6-6 4 4 3-3 5 5"/>',
  heart: '<path d="M20 5c-3-3-7-1-8 1-1-2-5-4-8-1s-1 7 8 14c9-7 11-11 8-14Z"/>',
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
const photo = (name, cls = '') => `<img class="${cls}" src="assets/${name}.jpg" alt="" draggable="false">`;
const title = '조금 느리게 보낸 오후';
const body = '창가에 앉아 따뜻한 커피를 마셨다. 아무것도 서두르지 않아도 괜찮았던, 그런 오후.';
const style = c => `--app-bg:${c.bg};--app-ink:${c.ink};--app-accent:${c.accent};--app-soft:${c.soft};--stage:${c.stage};--app-surface:${c.surface||c.bg};--on-accent:${c.onAccent||'#FFFFFF'};--app-line:color-mix(in srgb,${c.ink} ${c.mode==='dark'?18:16}%,${c.surface||c.bg});--app-muted:color-mix(in srgb,${c.ink} ${c.mode==='dark'?75:78}%,${c.bg})`;
const status = () => `<div class="status-bar"><span>9:41</span><i></i><span class="status-icons">▴ 5G <svg viewBox="0 0 24 12" aria-hidden="true"><rect x="1" y="1" width="19" height="10" rx="2" fill="none" stroke="currentColor"/><rect x="3" y="3" width="15" height="6" rx="1" fill="currentColor"/><path d="M22 4v4" stroke="currentColor" stroke-width="2"/></svg></span></div>`;
const navigation = c => `<div class="app-nav"><span class="active">${icon('book')}<b>기록</b></span><span>${icon('calendar')}<b>캘린더</b></span><span>${icon('settings')}<b>설정</b></span></div><div class="gesture"><i></i></div>`;
const fab = () => `<span class="app-fab">${icon('pen')}<b>기록하기</b></span>`;
const chip = (text = '평온한') => `<span class="mood-chip">${icon('sun')}${text}</span>`;
const top = (name = 'drawry', right = 'more') => `<div class="app-top"><span class="app-logo">${name}</span><span>${icon(right)}</span></div>`;

// Photo and ink keep the original aspect ratio at every step; neither is cropped.
// These are illustrative design samples, not persisted ink.
function paintedPhoto(c, name='coffee', extra='') {
  const marks = {
    atelier:'<path d="M159 179c-26-29-55-3-33 20l33 28 32-29c20-23-10-41-32-19Z M29 135q44-15 91-6m-82 11q34-11 65-6"/><path d="m258 228 12-8m-18-9 3-12m17 47 13 1"/><text x="26" y="117" transform="rotate(-5 26 117)">a little pause.</text>',
    picnic:'<path d="M213 264v4m21-6v4m-22 12q12 13 23-1M53 169c17-21 43-10 39 8s-25 27-40 33c-21-15-37-40-18-49 10-7 18 1 19 8Z"/><text x="23" y="127" transform="rotate(-7 23 127)">so good!</text><path d="m244 183 6-14 5 14 15 3-13 8 1 15-12-10-14 5 7-13-9-10Z"/>',
    storybook:'<path d="M202 248q1 44 20 44 21 1 30-45m-49 1q24-15 49-1m0 5c25-3 17 29-5 25M211 237c-11-12 13-15 3-27m18 25c-8-11 14-14 4-26"/><path d="M42 126c4-13 16-11 16 0 9-10 18-1 7 8 13 4 7 16-5 11 4 13-10 16-15 3-9 9-19 0-9-10-13-3-9-16 6-12Z"/><text x="23" y="178" transform="rotate(-5 23 178)">my kind of day</text>',
    studio:'<path d="M185 277c-5-51 89-65 94-8 6 52-96 66-94 8Z M191 272c-5-41 81-52 82-11"/><path d="M73 169q55 17 99 63m-16-1 16 1-3-15"/><text x="27" y="144">remember this.</text>',
    postcard:'<text x="23" y="125" transform="rotate(-5 23 125)">dear today,</text><path d="M32 140q65 12 127-5M167 205c-16-26-47-11-34 11l34 29 31-29c14-24-16-38-31-11Z"/><path d="M50 178q49 3 77 31m-13-5 13 5-1-14"/><text x="27" y="306" transform="rotate(-3 27 306)">you were lovely.</text>',
    frames:'<text x="23" y="132">scene 01</text><path d="m242 203 6-16 6 15 16 6-16 5-6 16-5-16-16-6Z M213 265v4m21-6v4m-22 11q12 12 23-1"/><path d="M30 152q50-12 91-5m-84 10q39-9 72-5"/>',
  };
  const originalInk={archive:'atelier',sunday:'postcard',pop:'picnic',night:'studio',garden:'storybook',index:'frames'};
  let ink=marks[c.inkId||c.id] || marks[originalInk[c.id]], height=375;
  if(name==='forest') {
    height=240;
    ink='<text x="20" y="55">scene 02</text><path d="M27 70q43-8 87-2M164 156q19-25 41-4m-28 13q15 10 28-5m27-27 5-13 5 14 14 3-13 5-5 14-4-14-14-5Z"/>';
  } else if(name==='coast') {
    height=225;
    ink='<text x="20" y="50">scene 03</text><path d="M28 63q45-9 89-1M171 138q16-16 34 0m8 6q16-16 34 0M202 94l5-13 6 13 14 4-14 5-6 13-5-14-14-5Z"/>';
  }
  return `<div class="painted-photo ${extra}" data-photo="${name}" style="--photo-ratio:300 / ${height}">${photo(name)}<svg class="ink-overlay" viewBox="0 0 300 ${height}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${ink}</svg></div>`;
}
function penPalette() {
  return `<div class="pen-palette"><div class="pen-colors">${['#FFEDB8','#ECA4A5','#9DBCB0','#AEC7EC','#FFFFFF','#343732'].map((color,i)=>`<span class="color-target ${i===0?'selected':''}"><i style="background:${color}"></i></span>`).join('')}</div></div><div class="pen-widths"><span>선 굵기</span><div><i></i><i class="selected"></i><i></i></div><b>보통</b></div>`;
}
function drawingTools() {
  return `<div class="drawing-tools"><span class="chosen">${icon('pen')}<b>펜</b></span><span>${icon('eraser')}<b>지우개</b></span><span>${icon('move')}<b>이동</b></span><i></i><span>${icon('undo')}<b>되돌리기</b></span><span class="tool-muted">${icon('redo')}<b>다시 실행</b></span></div>`;
}
const screenHelpers={icon,paintedPhoto,penPalette,drawingTools,top,navigation,fab,chip,title,body};
const refinements=window.createDrawryRefinements(screenHelpers);
const viewNames = { home: '기록 홈', drawing: '사진에 그리기', editor: '일기 작성', detail: '완성된 일기' };
function phone(c, view, mode='light') {
  c = appearance(c,mode);
  const content = refinements[view](c);
  return `<div class="phone view-${view} theme-${c.id} round-three" data-mode="${mode}" style="${style(c)}" role="img" aria-label="${c.name} ${modeNames[mode]} ${viewNames[view]} 디자인 시안. ${title}. ${c.tagline}">${status()}${content}</div>`;
}
function modeNote(c,mode){
  const theme=window.DRAWRY_COLOR_THEMES[c.colorTheme||colorTheme];
  return `${theme.name} · ${mode==='light'?theme.note:'먹빛 바탕과 한 단계 밝은 종이, 부드러운 강조색'}. ${mode==='light'?'사진과 글의 배치로 형태를 비교합니다.':'사진·그림의 색과 엽서 형태를 유지합니다.'}`;
}
function screenSet(c, view='all', selectedMode='both') {
  const views=view==='all'?Object.entries(viewNames):[[view,viewNames[view]]];
  const modes=selectedMode==='both'?Object.keys(modeNames):[selectedMode];
  return `<div class="mode-pair">${modes.map(mode=>`<section class="mode-group" data-mode="${mode}" style="${style(appearance(c,mode))}" aria-label="${c.name} ${modeNames[mode]} 시안"><header class="mode-heading"><h4><span class="mode-dot"></span>${modeNames[mode]} <small>${mode.toUpperCase()}</small></h4><span>${views.length} SCREENS</span></header><p class="mode-treatment">${modeNote(c,mode)}</p><div class="screen-set ${view==='all'?'all-screens':'single-screen'}">${views.map(([key,label])=>`<figure class="screen-study"><figcaption><span>0${Object.keys(viewNames).indexOf(key)+1}</span>${label}</figcaption><div class="screen-preview">${phone(c,key,mode)}</div></figure>`).join('')}</div></section>`).join('')}</div>`;
}
const swatches = c => `<div class="swatches" aria-label="색상 구성">${[c.bg, c.ink, c.accent, c.soft].map(color => `<span style="background:${color}" title="${color}"></span>`).join('')}</div>`;
const tokens = c => `<div class="token-list">${[['Background', c.bg], ['Text', c.ink], ['Accent', c.accent], ['Soft', c.soft]].map(([name, color]) => `<div><span style="background:${color}"></span><b>${name}</b><code>${color}</code></div>`).join('')}</div>`;

function renderPrintBook() {
  const masthead = label => `<div class="print-masthead"><b>drawry.</b><span>${label}</span></div>`;
  const pages = [];
  const add = (cls, html, c) => pages.push({cls,html,c});
  add('print-cover', `${masthead('ANDROID / PHOTO + DRAWING DIARY / 2026.10')}<span class="eyebrow">YOUR PHOTO. YOUR DRAWING. SIX DIRECTIONS.</span><h1>사진으로 건네는,<br>여섯 가지 안부 :)</h1><p>사진 자체에 선·그림·글씨를 더하는 Android 그림일기.<br>시안 13–18 · 6개 콘셉트 × 라이트·다크 × 4개 화면 = 48개 시안<br>기록 홈 → 사진에 그리기 → 일기 작성 → 완성된 일기</p><div class="print-cover-palette">${displayConcepts.map(c=>`<div style="background:${c.accent};color:${['pop','night'].includes(c.id)?'#252525':'white'}"><b>${c.no}</b><span>${c.name}</span></div>`).join('')}</div>`);
  displayConcepts.forEach(c => Object.entries(modeNames).forEach(([mode,label]) => {
    const palette=appearance(c,mode);
    add('print-concept', `<header><div><span class="eyebrow">CONCEPT ${c.no} / ${c.ko} / ${mode.toUpperCase()}</span><h2>${c.name}<span>${c.tagline}</span></h2><p class="concept-origin"><span class="print-mode-label ${mode}">${label} · ${mode.toUpperCase()}</span> ${c.mood} · 4 SCREENS</p></div>${swatches(palette)}</header><div class="print-screens">${Object.entries(viewNames).map(([view,viewLabel],i)=>`<div><span class="print-screen-label">0${i+1} / ${viewLabel}</span><div class="print-phone-wrap">${phone(c,view,mode)}</div></div>`).join('')}</div><div class="print-design-note"><p><b>${label} 팔레트</b>배경 ${palette.bg} · 본문 ${palette.ink}<br>강조 ${palette.accent} · 보조 ${palette.soft}</p><p><b>서체·형태</b>${c.type}<br>${c.radius}</p><p><b>${label} 표현</b>${modeNote(c,mode)}</p></div>`,palette);
  }));
  {
    const subset=concepts;
    add('print-comparison', `${masthead('COMPARE — 13–18')}<h2 class="print-section-title">엽서에서 시작한, 여섯 가지 다른 모습.</h2><p class="print-lead">모든 디자인에 라이트 4개·다크 4개, 총 8개 화면을 제공합니다. 기록 홈 · 사진에 그리기 · 일기 작성 · 완성된 일기.</p><table><thead><tr><th>콘셉트</th><th>첫인상</th><th>화면의 중심</th><th>설계 시 고려할 점</th></tr></thead><tbody>${subset.map(c=>`<tr><th>${c.no} ${c.name}</th><td>${c.mood}</td><td>${c.layout}</td><td>${c.caution}</td></tr>`).join('')}</tbody></table><div class="comparison-callout"><h3>사진 위의 한 획이, 나의 하루가 됩니다.</h3><p>원본 사진을 보존하며 그 위에 선·그림·글씨를 더합니다. 그림을 적용한 뒤 짧은 이야기를 적고, 저장한 일기는 도구 없이 감상합니다.</p></div><p class="print-photo-credit">샘플 사진: Lorem Picsum / Unsplash — Luke Chesser, Paul Jarvis, Oleg Chursin. 상세 출처: assets/credits.txt.</p>`);
  }
  add('print-themes', `${masthead('COLOUR THEMES / SAME POSTCARD')}<h2 class="print-section-title">모습은 그대로, 색은 나답게.</h2><p class="print-lead">13번의 같은 기록 홈을 네 가지 색상 테마로 비교합니다. 각 테마는 새로운 여섯 시안 모두에 적용할 수 있습니다.</p><div class="print-color-grid">${Object.entries(window.DRAWRY_COLOR_THEMES).map(([key,t])=>`<section class="print-color-group"><h3>${t.name}</h3><p>${t.note}</p><div class="print-color-pair">${Object.entries(modeNames).map(([mode,label])=>`<div><span>${label}</span><div class="print-color-phone">${phone({...concepts.find(c=>c.id==='linen'),colorTheme:key},'home',mode)}</div></div>`).join('')}</div>${swatches(appearance({...concepts.find(c=>c.id==='linen'),colorTheme:key}))}</section>`).join('')}</div><div class="print-theme-notes"><div><h3>구조와 색상을 따로 고릅니다.</h3><p>13–18번은 서로 다른 배치와 기록 흐름을 가진 여섯 시안입니다. 리넨·세이지·로즈·미스트는 같은 화면에 적용하는 색상 옵션입니다.</p></div><div><h3>사진은 사진 그대로.</h3><p>라이트·다크는 바탕, 종이, 조작부의 밝기를 각각 설계합니다. 사진과 직접 그린 선에는 색상 변경이나 반전 효과를 적용하지 않습니다.</p></div></div>`);
  document.getElementById('print-book').innerHTML=pages.map((p,i)=>`<section class="print-page ${p.cls}"${p.c?` style="${style(p.c)}"`:''}>${p.html}<div class="print-foot">DRAWRY / PHOTO + DRAWING<span>디자인 시안 · 실제 앱 기능 미연결</span><span>${i+1} / ${pages.length}</span></div></section>`).join('');
}

if (document.getElementById('print-book')) {
  renderPrintBook();
} else {
  let currentView = 'all';
  let currentMode = 'both';
  const grid = document.getElementById('concept-grid');
  const dialog = document.getElementById('concept-dialog');
  let activeConcept = null;
  let dialogView = 'home';
  let dialogMode = 'light';
  grid.innerHTML = displayConcepts.map(c => `<article class="concept-card" data-round="${c.round||1}" id="concept-${c.id}" style="${style(c)}"><div class="card-heading"><div><span class="concept-number">${c.no}</span><h3>${c.name}<small>${c.ko}</small></h3></div><span class="screen-count">LIGHT 4 + DARK 4</span></div><div class="concept-stage"><span class="stage-caption">${c.mood}</span><div class="preview">${screenSet(c, currentView, currentMode)}</div></div><div class="card-copy"><h4>${c.tagline}</h4><p>${c.layout}</p><div class="card-footer">${swatches(c)}<button type="button" data-detail="${c.id}" class="detail-button" aria-label="${c.name} 자세히 보기">자세히 보기 <span>↗</span></button></div></div></article>`).join('');
  document.getElementById('comparison-body').innerHTML = displayConcepts.map(c => `<tr><th scope="row"><span class="table-dot" style="background:${c.accent}"></span><button type="button" data-detail="${c.id}">${c.no} ${c.name}</button></th><td>${c.mood}</td><td>${c.layout}</td><td>${c.fit}</td><td>${c.caution}</td></tr>`).join('');
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
    concepts.forEach(c => { document.querySelector(`#concept-${c.id} .preview`).innerHTML = screenSet(c, view, currentMode); });
    requestAnimationFrame(sizePreviews);
  }
  function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('[data-mode-filter]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.modeFilter===mode)));
    setView(currentView);
  }
  function renderDialog(c) {
    const palette=appearance(c,dialogMode);
    document.getElementById('dialog-content').innerHTML = `<div class="dialog-heading"><span class="concept-number">${c.no}</span><div><h2 id="dialog-title">${c.name}</h2><p>${c.ko} — ${c.tagline}</p></div></div><div class="dialog-layout" style="${style(palette)}"><div class="dialog-preview" data-mode="${dialogMode}"><div class="segmented mode-tabs" role="group" aria-label="상세 시안 모드 선택">${Object.entries(modeNames).map(([mode,label])=>`<button type="button" data-dialog-mode="${mode}" aria-pressed="${mode===dialogMode}">${label}</button>`).join('')}</div><div class="segmented" role="group" aria-label="상세 시안 화면 선택">${Object.entries(viewNames).map(([view, label])=>`<button type="button" data-dialog-view="${view}" aria-pressed="${view===dialogView}">${label}</button>`).join('')}</div><div id="dialog-phone">${phone(c,dialogView,dialogMode)}</div><span class="preview-label">화면 디자인 시안 · 기능 미연결</span></div><div class="dialog-spec"><span class="eyebrow">THE IDEA</span><h3>${c.tagline}</h3><p>${c.description}</p><h4>${modeNames[dialogMode].toUpperCase()} COLOR PALETTE</h4>${tokens(palette)}<div class="spec-pair"><div><h4>TYPOGRAPHY</h4><p>${c.type}</p></div><div><h4>SHAPE & SPACING</h4><p>${c.radius}<br>${c.rhythm}</p></div></div><h4>${modeNames[dialogMode]} 표현</h4><p>${modeNote(c,dialogMode)}</p><h4>DESIGN RULES</h4><ol>${c.rules.map(rule=>`<li>${rule}</li>`).join('')}</ol><div class="tradeoff"><b>고려할 점</b><span>${c.caution}</span></div></div></div>`;
    sizePreviews();
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if(button.dataset.colorTheme){
      colorTheme=button.dataset.colorTheme;
      document.querySelectorAll('[data-color-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.colorTheme===colorTheme)));
      document.getElementById('color-theme-label').textContent=window.DRAWRY_COLOR_THEMES[colorTheme].name;
      setView(currentView);
      concepts.filter(c=>c.round===3).forEach(c=>{
        const card=document.getElementById(`concept-${c.id}`);
        card.querySelector('.card-footer .swatches').outerHTML=swatches(appearance(c));
      });
      if(activeConcept?.round===3 && dialog.open) renderDialog(activeConcept);
    }
    if (button.dataset.view) setView(button.dataset.view);
    if (button.dataset.modeFilter) setMode(button.dataset.modeFilter);
    if (button.dataset.detail) {
      activeConcept = concepts.find(c=>c.id===button.dataset.detail);
      dialogView = currentView === 'all' ? 'home' : currentView;
      dialogMode = currentMode === 'both' ? 'light' : currentMode;
      renderDialog(activeConcept);
      dialog.showModal();
      sizePreviews();
      document.body.classList.add('modal-open');
    }
    if (button.dataset.dialogView) {
      dialogView = button.dataset.dialogView;
      document.getElementById('dialog-phone').innerHTML = phone(activeConcept,dialogView,dialogMode);
      document.querySelectorAll('[data-dialog-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.dialogView===dialogView)));
    }
    if (button.dataset.dialogMode) {
      dialogMode=button.dataset.dialogMode;
      renderDialog(activeConcept);
      document.querySelector(`[data-dialog-mode="${dialogMode}"]`).focus({preventScroll:true});
    }
    if (button.hasAttribute('data-monochrome')) {
      const enabled=grid.classList.toggle('monochrome');
      button.setAttribute('aria-pressed',String(enabled));
      button.textContent=enabled?'컬러로 보기':'흑백으로 비교';
    }
    if (button.id === 'close-dialog') dialog.close();
  });
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',event=>{ if(event.target===dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); }});
  requestAnimationFrame(sizePreviews);
}
})();
