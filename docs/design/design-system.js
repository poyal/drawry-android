'use strict';
(() => {
  const ds = window.DRAWRY_DESIGN_SYSTEM;
  const names = {
    background:'바탕',surface:'엽서·입력 면',surfaceSoft:'보조 조작부',text:'본문·로고',
    textSecondary:'보조 글',accent:'강조',selectedText:'선택 도구 글자',actionBackground:'주 버튼 배경',actionText:'주 버튼 글자',
    outline:'장식 구분선',controlOutline:'입력 경계',focus:'포커스',error:'오류',
    errorSurface:'오류 안내 면',success:'성공'
  };
  const applyMode = mode => {
    Object.entries(ds.palette[mode]).forEach(([key,value]) => document.documentElement.style.setProperty(`--${key}`,value));
    document.documentElement.dataset.mode = mode;
    document.documentElement.style.colorScheme = mode;
    document.querySelectorAll('.mode-control button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
  };
  document.querySelectorAll('.mode-control button').forEach(b=>b.addEventListener('click',()=>applyMode(b.dataset.mode)));
  applyMode('light');
  const iconNames={backdrop:'바탕',cover:'스케치북 표지',sky:'사진 하늘',landscape:'사진 풍경',stroke:'붓선',paper:'링·종이'};
  document.getElementById('icon-palette').innerHTML=Object.entries(ds.brand.icon.palette).map(([key,value])=>`<div class="icon-colour"><i style="background:${value}"></i><b>${iconNames[key]}</b><code>${value}</code></div>`).join('');
  document.getElementById('palette-pair').innerHTML=Object.entries(ds.palette).map(([mode,p])=>`<article class="palette-panel" style="--p-background:${p.background};--p-text:${p.text};--p-outline:${p.outline};--p-muted:${p.textSecondary};--p-action:${p.actionBackground};--p-action-text:${p.actionText}"><h3>${mode==='light'?'라이트':'다크'}</h3><div class="colour-grid">${Object.entries(names).map(([key,label])=>`<div class="colour"><i style="--swatch:${p[key]}"></i><b>${label}</b><code>${p[key]}</code></div>`).join('')}</div><span class="palette-button">저장</span><p>${mode==='light'?'회백색 바탕, 흰 종이, 테라코타 버튼.':'먹빛 바탕, 한 단계 밝은 종이, 부드러운 강조색.'}</p></article>`).join('');
  document.getElementById('type-rows').innerHTML=Object.entries(ds.typography).map(([key,t])=>`<tr><td>${t.label}</td><td>${t.size} / ${t.lineHeight}sp / ${t.weight}</td><td style="font-size:${t.size}px;line-height:${t.lineHeight}px;font-weight:${t.weight}">${key==='wordmark'?'drawry :)':key==='body'?'사진 위에 남긴 나의 이야기.':'조금 느리게 보낸 오후'}</td></tr>`).join('');
  document.getElementById('spacing-scale').innerHTML=ds.spacing.map(n=>`<span><i style="--space:${n}px"></i>${n}</span>`).join('');
  const date = document.getElementById('entry-date');
  const title = document.getElementById('entry-title');
  const caption = document.getElementById('entry-caption');
  function renderEntry() {
    const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.value);
    const fallback=parts?`${Number(parts[2])}월 ${Number(parts[3])}일의 기록`:'날짜를 선택하세요';
    document.getElementById('preview-date').textContent=parts?`${parts[1]}년 ${Number(parts[2])}월 ${Number(parts[3])}일`:'기록 날짜를 선택하세요';
    document.getElementById('preview-title').textContent=title.value.trim()||fallback;
    const text=caption.value.trim(),p=document.getElementById('preview-caption');
    p.textContent=text;p.hidden=!text;
    document.querySelector('.photo-copy').hidden=!text;
    document.querySelector('.photo-row').style.gridTemplateColumns=text?'':'1fr';
    document.getElementById('preview-rule').textContent=!title.value.trim()&&!text?'제목은 기록 날짜로 표시하고, 빈 사진 이야기는 숨깁니다.':!title.value.trim()?'제목은 기록 날짜에서 계산합니다. 직접 쓴 사진 이야기는 유지합니다.':!text?'직접 쓴 제목을 표시하고, 빈 사진 이야기는 숨깁니다.':'작성한 제목과 사진 이야기를 그대로 표시합니다.';
  }
  [date,title,caption].forEach(el=>el.addEventListener('input',renderEntry));
  document.getElementById('fill-example').addEventListener('click',()=>{date.value='2026-10-19';title.value='조금 느리게 보낸 오후';caption.value='창가에서 마신 따뜻한 커피.';renderEntry();});
  document.getElementById('clear-example').addEventListener('click',()=>{title.value='';caption.value='';renderEntry();});
  renderEntry();
  const tools={pen:'펜',eraser:'지우개',move:'이동'};
  document.querySelectorAll('[data-tool]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.getElementById('tool-status').textContent=`${tools[button.dataset.tool]} 선택됨. 배경·윤곽·도구 이름으로 선택을 알립니다.`;
  }));
  const stateField=document.getElementById('state-field'),stateInput=document.getElementById('state-input'),message=document.getElementById('field-message');
  document.querySelectorAll('[data-field-state]').forEach(button=>button.addEventListener('click',()=>{
    const state=button.dataset.fieldState;
    stateField.dataset.state=state;
    stateInput.setAttribute('aria-invalid',String(state==='error'));
    document.querySelectorAll('[data-field-state]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    message.classList.toggle('error-message',state==='error');
    stateInput.value=state==='error'?'2026.13.40':'2026.10.19';
    message.textContent={default:'날짜 입력의 상태 예시입니다. 라벨은 입력 후에도 남습니다.',focus:'2dp 윤곽으로 포커스를 표시합니다. 입력한 값은 계속 보입니다.',error:'날짜를 확인해 주세요. 존재하는 날짜를 입력해 주세요. 잘못 입력한 값도 지우지 않습니다.'}[state];
    if(state==='focus')stateInput.focus({preventScroll:true});
  }));
  document.querySelectorAll('.sample-only').forEach(button=>button.addEventListener('click',()=>{
    button.closest('.component').querySelector('.helper').textContent='버튼의 외형 예시입니다. 실제 앱 저장 기능은 연결되어 있지 않습니다.';
  }));
})();
