'use strict';
// Six distinct postcard compositions. Colour is an independent, optional setting.
window.DRAWRY_COLOR_THEMES = {
  linen:{name:'리넨',note:'종이 같은 회백색과 작은 테라코타 포인트',light:['#F6F6F2','#292D2A','#B84B35','#EEE2D9','#E9E7E1','#FFFFFF'],dark:['#1D201E','#F0EEE7','#E39A81','#343A34','#272C28','#282D29']},
  sage:{name:'세이지',note:'중성적인 바탕에 낮은 채도의 초록',light:['#F4F6F2','#29352E','#466852','#E2EADF','#E6EBE3','#FDFEFB'],dark:['#1D231F','#EDF0E7','#B4CBB6','#334338','#272F29','#29342C']},
  rose:{name:'로즈',note:'흰 여백과 말린 장미색 조작부',light:['#F8F5F4','#393032','#9C5065','#F0E3E6','#EDE5E5','#FFFCFB'],dark:['#252022','#F2EAEB','#DBA6B5','#46343D','#30292D','#332A2F']},
  mist:{name:'미스트',note:'차분한 종이색과 흐린 푸른빛',light:['#F3F5F6','#29333B','#49667E','#E1E8EF','#E4E9ED','#FDFEFE'],dark:['#1E2329','#E9EEF2','#ACC4DA','#34424F','#282F37','#2A333D']}
};
window.DRAWRY_REFINEMENTS = [
  {id:'linen',no:'13',name:'Dear Linen',ko:'여백을 담은 한 장',tagline:'오늘에게, 담백한 안부 한 장.',mood:'절제된 · 평평한 · 다정한',
    layout:'큰 엽서 한 장 · 앞면 그리기 / 뒷면 편지',fit:'사진 한 장과 짧은 일기를 가볍게',caution:'장식은 소인 하나로 줄이고 사진을 넓게',
    type:'단정한 산세리프 · 왼쪽 정렬 · 24px 제목',radius:'얇은 엽서 8px · 버튼 완전 둥근 형태',rhythm:'사진 → 제목 → 한 문장의 단순한 흐름',
    description:'한 장의 엽서를 가장 담백하게 다듬었습니다. 홈에서는 큰 사진 한 장을 읽고, 그리기는 앞면 전체, 작성은 여백이 넓은 뒷면으로 이어집니다. 가는 테두리와 작은 소인만 남깁니다.',
    rules:['사진을 담은 앞면과 글을 쓰는 뒷면을 분명하게 구분합니다.','장식보다 넓은 여백과 한 줄 제목으로 기록을 보여줍니다.','완성된 엽서는 사진과 편지를 한 장에 이어 보여줍니다.']},
  {id:'pocket',no:'14',name:'Pocket Days',ko:'주머니 속 작은 오늘',tagline:'좋아하는 하루를 쏙, 모아두기.',mood:'포근한 · 수집하는 · 통통한',
    layout:'겹쳐진 엽서 포켓 · 작은 카드와 메모 주머니',fit:'기록을 아끼는 물건처럼 모으는 경험',caution:'포켓 장식은 사진 아래에서만 표현',
    type:'둥근 산세리프 인상 · 두꺼운 26px 제목',radius:'포켓 28px · 탭과 버튼 pill',rhythm:'카드 묶음 · 사진과 문장을 각각 수납',
    description:'엽서들을 작은 앨범 주머니에 넣어둔 모습입니다. 홈은 포켓과 색인 탭, 그리기는 꺼낸 사진 카드, 작성은 사진 옆 짧은 메모와 넓은 기록 주머니, 상세는 꺼내 보는 완성 카드로 구성합니다.',
    rules:['포켓은 사진을 덮지 않고 아래 캡션을 감싸는 형태로 만듭니다.','날짜 탭과 둥근 모서리를 네 화면에 이어 갑니다.','그림과 글의 영역을 포근한 독립 면으로 구분합니다.']},
  {id:'margin',no:'15',name:'Little Aside',ko:'사진 곁에 작은 말',tagline:'장면은 크게, 마음은 곁에.',mood:'가벼운 · 편집된 · 섬세한',
    layout:'비대칭 엽서 · 세로 사진과 좁은 편지 열',fit:'사진을 보며 짧은 글을 쓰는 방향',caution:'좁은 글 열에는 짧은 문장만 배치',
    type:'가느다란 세리프 제목 · 조작은 산세리프',radius:'평평한 엽서 · 둥근 도구 알약',rhythm:'넓은 사진 열 + 작은 날짜·메모 열',
    description:'사진과 마음의 메모를 옆으로 나란히 놓은 엽서입니다. 홈과 상세는 세로 사진 옆에 작은 글 열, 그리기는 옆으로 분리한 도구, 작성은 사진을 계속 보면서 적는 두 단으로 만듭니다.',
    rules:['사진과 글을 가로로 나누는 비대칭 비율을 유지합니다.','장문의 본문은 아래쪽의 넓은 영역으로 이어집니다.','사진 위에는 직접 그린 선만 남기고 제목은 바깥에 둡니다.']},
  {id:'fold',no:'16',name:'A Fold for You',ko:'살짝 접어둔 마음',tagline:'사진을 열면, 오늘의 이야기가.',mood:'서정적인 · 부드러운 · 편지 같은',
    layout:'접힌 사진 편지 · 세리프 인사와 넓은 편지지',fit:'사진에 얽힌 이야기를 조금 길게 쓰기',caution:'접힘 표현이 사진이나 본문을 가리지 않기',
    type:'큰 세리프 인사 · 넉넉한 본문 행간',radius:'접힌 종이 여백 · 부드러운 24px 버튼',rhythm:'접힌 앞면 → 펼친 편지 → 서명',
    description:'엽서를 반으로 접어 간직하는 편지입니다. 홈은 접힌 사진 편지, 그리기는 접힘 위쪽의 사진 면, 작성은 인사와 넓은 편지지, 상세는 사진과 글을 위아래로 펼친 형태입니다.',
    rules:['접힌 선은 사진 바깥의 종이 여백에만 표현합니다.','작성 화면은 사진보다 편지의 인사·본문·서명을 중심에 둡니다.','우편 발송 대신 개인 기록의 보관과 감상을 표현합니다.']},
  {id:'daymark',no:'17',name:'Postmarked Days',ko:'날짜마다 찍힌 마음',tagline:'열아홉 번째 칸, 오늘의 그림.',mood:'정갈한 · 리듬 있는 · 찾아보는',
    layout:'주간 날짜 띠 · 소인 인덱스 · 기록 타임라인',fit:'날짜를 고르고 그날의 엽서를 찾기',caution:'달력과 소인 장식이 사진보다 강해지지 않게',
    type:'큰 날짜 숫자 · 간결한 산세리프',radius:'둥근 날짜 선택 · 작은 엽서 모서리',rhythm:'날짜 선택 → 그날의 엽서 → 이전 기록',
    description:'날짜를 중심으로 쌓이는 엽서함입니다. 홈은 주간 날짜 띠와 오늘의 엽서, 그리기는 날짜 소인이 있는 작업면, 작성은 시간별 사진과 글, 상세는 날짜 축을 따라 읽는 기록으로 구성합니다.',
    rules:['날짜 소인과 작은 시간 축을 네 화면에 반복합니다.','기록이 없는 날짜도 실패나 압박으로 표현하지 않습니다.','주간 날짜 띠 아래에 사진과 글을 차례로 보여줍니다.']},
  {id:'duet',no:'18',name:'Two Little Things',ko:'두 장으로 남긴 하루',tagline:'한 장의 사진, 또 한 장의 마음.',mood:'이야기하는 · 펼쳐보는 · 여유로운',
    layout:'두 장의 연결 엽서 · 장면별 한 줄과 접지 상세',fit:'두 사진의 분위기를 함께 기록하기',caution:'한 장만 있어도 완성 가능한 구조 유지',
    type:'가벼운 산세리프 · 큰 장면 번호',radius:'둥근 연결부 · 부드러운 사진 카드',rhythm:'장면 01 → 장면 02 → 하나의 제목',
    description:'두 장의 엽서를 얇게 연결한 작은 펼침책입니다. 홈은 두 장면을 나란히, 그리기는 장면을 고른 뒤 한 장에 집중, 작성은 사진마다 한 줄, 상세는 두 엽서를 위아래로 펼쳐 봅니다.',
    rules:['사진마다 그린 선과 한 줄을 독립적으로 유지합니다.','그리기 화면에서는 선택한 사진 한 장만 편집합니다.','사진이 한 장일 때도 빈 두 번째 장을 강요하지 않습니다.']}
].map(c=>({...c,round:3,inkId:'postcard',bg:'#F6F6F2',ink:'#292D2A',accent:'#B84B35',soft:'#EEE2D9',stage:'#E9E7E1',
  flow:'사진 선택 → 사진 위에 그리기 → 이야기 → 보관',
  modeNotes:{light:'회백색 바탕과 흰 종이, 작은 테라코타 포인트로 형태를 비교합니다.',dark:'먹빛 바탕·한 단계 밝은 종이·부드러운 강조색을 구분하고 사진은 그대로 둡니다.'}
}));

window.createDrawryRefinements = helpers => {
  const {icon,paintedPhoto,penPalette,drawingTools,top,navigation,fab,chip,title,body}=helpers;
  const photo=(c,h,name='coffee')=>`<div class="shot" style="--shot-height:${h}px">${paintedPhoto(c,name)}</div>`;
  const mini=(text)=>`<span class="ref-mini">${text}</span>`;
  const mark=()=>'<span class="ref-postmark">19<small>OCT · MON</small></span>';
  const date=()=>'<div class="ref-meta"><span>2026.10.19 월요일</span><span>나에게 남기는 기록</span></div>';
  const text=(small=false)=>`<div class="ref-copy"><h3>${title}</h3><p>${small?'따뜻한 커피, 나를 위한 느린 시간.':body}</p></div>`;
  const caption=(label='오늘의 작은 쉼')=>`<div class="ref-caption"><b>${label}</b><span>19 OCTOBER</span></div>`;
  const signature=()=>'<div class="ref-signature"><span>To. 오늘의 나</span><span>From. 나 :)</span></div>';
  const brand=()=>top('drawry <em class="ref-smile">:)</em>');
  const heading=(small,big)=>`<header class="ref-heading">${mini(small)}<h3>${big}</h3></header>`;
  const compose=()=>`<div class="home-compose"><span>오늘도, 나에게 한 장.</span>${fab()}</div>`;
  const gesture=()=>'<div class="gesture"><i></i></div>';
  const bar=(name,action='저장')=>`<div class="editor-top"><span class="top-icon">${icon('arrow')}</span><b>${name}</b><span class="${action?'save-label':'top-icon'}">${action||icon('more')}</span></div>`;
  const tools=()=>`<div class="ref-toolbox">${mini('나의 작은 도구함')}${penPalette()}${drawingTools()}</div>`;
  const help=()=>`<div class="ref-meta"><span>${icon('lock')} 원본 보존</span><span>100% · 전체 사진</span></div>`;
  const writeTools=()=>`<div class="editor-tools"><span>${icon('image')}사진</span><span>${icon('pen')}그리기</span><span>${icon('sun')}기분</span><span>${icon('more')}더보기</span></div>${gesture()}`;
  const actions=()=>`<div class="detail-actions"><span>${icon('pen')}수정하기</span><span>${icon('share')}공유하기</span></div>${gesture()}`;
  const edit=()=>`<span class="inline-edit">${icon('pen')}그림 수정</span>`;
  const draft=()=>`<div class="draft-status">${icon('lock')} 초안이 저장되었어요</div>`;
  const tags=()=>`<div class="entry-tags">${chip()}<span># 나의시간</span></div>`;
  const tab=(a,b,front=true)=>`<div class="ref-side-tabs"><span class="${front?'selected':''}">${a}</span><span class="${front?'':'selected'}">${b}</span></div>`;
  const foldLine=()=>'<div class="ref-fold-line"><span>오늘의 마음을 접어두기</span></div>';
  const week=()=>`<div class="ref-week">${['월','화','수','목','금','토','일'].map((d,i)=>`<span class="${i===0?'selected':''}"><small>${d}</small><b>${19+i}</b><i></i></span>`).join('')}</div>`;
  const scene=(no,label)=>`<div class="ref-scene"><b>${no}</b><span>${label}</span></div>`;
  const home={
    linen:c=>`${brand()}${heading('A NOTE TO MYSELF','오늘에게, 안녕.')}<article class="ref-card linen-front"><div class="ref-address">${mini('DEAR TODAY')}${mark()}</div>${photo(c,248)}${caption()}<p class="ref-note">사진 위에 살짝 남긴, 나의 오후.</p></article>${compose()}`,
    pocket:c=>`${brand()}${heading('MY LITTLE COLLECTION','작은 오늘을 모아요.')}<div class="pocket-tabs"><b>10월의 주머니</b><span>일상</span><span>여행</span></div><article class="ref-pocket"><div class="pocket-back" aria-hidden="true"></div><div class="pocket-photo">${photo(c,214)}${caption()}</div><div class="pocket-lip"><span>12장의 소중한 하루</span><b>:)</b></div></article>${compose()}`,
    margin:c=>`${brand()}${heading('A LITTLE WORD BESIDE A PHOTO','사진 곁에,<br><i>나의 마음.</i>')}<article class="ref-card margin-front"><div class="margin-picture">${photo(c,224)}${mini('MY EVERYDAY, 01')}</div><aside>${mark()}<span>따뜻한<br>한 잔.<br><br>천천히<br>흘러간<br>오후.</span><b>:)</b></aside></article><div class="margin-bottom">${mini('19 OCTOBER')}${chip()}</div>${compose()}`,
    fold:c=>`${brand()}${heading('SOMETHING TO KEEP','오늘도 좋은<br><i>하루였기를.</i>')}<article class="ref-fold-card"><div class="fold-photo">${photo(c,198)}</div>${foldLine()}<div class="fold-cover"><span>Dear, today</span><b>나에게 남기는 작은 편지</b><i>:)</i></div></article>${compose()}`,
    daymark:c=>`${brand()}<div class="daymark-title"><h3>10월의 안부</h3><span>2026 · OCT</span></div>${week()}<div class="daymark-feature"><aside><b>19</b><span>MON</span><i></i></aside><article class="ref-card">${photo(c,199)}${caption()}<p class="ref-note">14:30 · 카페에서, 잠깐의 여유.</p></article></div><div class="daymark-previous"><span>18 · SUN</span><b>푸른 풍경 속으로</b><span>↗</span></div>${compose()}`,
    duet:c=>`${brand()}${heading('TWO LITTLE THINGS','오늘의 두 장면.')}<div class="duet-home"><article>${scene('01','느린 오후')}${photo(c,145)}<p>커피 위에 그린 마음.</p></article><article>${scene('02','푸른 쉼')}${photo(c,75,'forest')}<span class="duet-address">To. 오늘의 나<br><br>두 장으로<br>기억하는 하루.<br><b>:)</b></span></article></div><div class="duet-home-caption"><h4>${title}</h4><p>나의 일상 · 사진 2장 · 그림 2개</p></div>${compose()}`
  };
  const drawing={
    linen:c=>`${tab('01 사진 앞면','02 편지 뒷면')}<div class="ref-card linen-canvas"><div class="ref-address">${mini('DEAR TODAY')}${mini('19 OCT')}</div>${photo(c,263)}</div>${help()}${tools()}`,
    pocket:c=>`<div class="pocket-tabs"><b>주머니에서 꺼낸 한 장</b><span>1 / 3</span></div><div class="ref-pocket pocket-canvas"><div class="pocket-photo">${photo(c,245)}</div><div class="pocket-lip"><span>사진 위에 쓱, 나의 한 획</span><b>:)</b></div></div>${tools()}${help()}`,
    margin:c=>`<div class="margin-draw"><div class="margin-rail"><span class="chosen">${icon('pen')}<small>펜</small></span><span>${icon('eraser')}<small>지우개</small></span><span>${icon('move')}<small>이동</small></span><span>${icon('undo')}<small>되돌림</small></span></div><div class="ref-card"><div class="ref-address">${mini('PHOTO / 01')}${mini(':)')}</div>${photo(c,246)}<p class="ref-note">장면 위에 마음 한 획.</p></div></div><div class="margin-palette">${mini('선의 색과 굵기')}${penPalette()}</div>${help()}`,
    fold:c=>`<div class="ref-fold-card fold-canvas"><div class="fold-intro"><span>Dear, today</span><b>사진 면에 그리기</b></div>${photo(c,252)}${foldLine()}<div class="fold-canvas-tail">${mini('사진을 그린 뒤 편지지를 펼쳐요.')}</div></div>${tools()}`,
    daymark:c=>`<div class="daymark-draw-date">${mark()}<div><b>10월 19일의 한 장</b><span>14:30 · 오늘의 사진</span></div></div><div class="ref-card daymark-canvas">${photo(c,280)}<div class="ref-meta"><span>오늘의 첫 번째 사진</span><span>01 / 03</span></div></div>${tools()}`,
    duet:c=>`${tab('01 느린 오후','02 푸른 쉼')}<div class="duet-canvas ref-card">${scene('01','선택한 장면에 그리기')}${photo(c,254)}<div class="ref-meta"><span>사진별로 그림을 보관해요</span><span>1 / 2</span></div></div>${tools()}`
  };
  const writing={
    linen:c=>`${tab('01 사진 앞면','02 편지 뒷면',false)}<article class="ref-card linen-back"><div class="ref-address"><h3>To. 오늘의 나</h3>${mark()}</div><div class="linen-attachment">${photo(c,80)}<div>${mini('앞면에 담은 장면')}${edit()}</div></div>${text()}<span class="text-cursor"></span>${signature()}</article>${tags()}${draft()}`,
    pocket:c=>`<div class="pocket-tabs"><b>오늘의 기록 주머니</b><span>19 OCT</span></div><div class="pocket-attachment"><div class="ref-card">${photo(c,154)}</div><aside><span class="pocket-sticker">good<br>little day :)</span><p>따뜻한 오후를<br>사진에 담았어요.</p>${edit()}</aside></div><article class="pocket-writing"><div class="pocket-writing-label">나의 작은 메모</div>${text()}<span class="text-cursor"></span>${signature()}</article>${tags()}${draft()}`,
    margin:c=>`${date()}<article class="ref-card margin-writing"><div>${photo(c,167)}${edit()}</div><aside><span class="margin-to">To.<br>오늘의 나</span><p>커피 한 잔,<br>아무 약속 없는<br>오후.<br><br>이런 날이<br>참 좋아.</p><span class="text-cursor"></span></aside></article><section class="margin-manuscript">${mini('사진 곁의 이야기')}${text()}${signature()}</section>${tags()}${draft()}`,
    fold:c=>`<div class="fold-letter"><div class="fold-letter-head"><h3>Dear, today</h3>${photo(c,66)}</div><div class="fold-greeting">오늘도 잘 지냈나요?</div>${text()}<p class="fold-extra">서두르지 않아도 괜찮았던 하루.<br>오늘의 나에게 이 장면을 남겨요.</p><span class="text-cursor"></span>${foldLine()}${signature()}</div><div class="ref-meta"><span>그림이 있는 앞면</span>${edit()}</div>${tags()}${draft()}`,
    daymark:c=>`<div class="daymark-write-date"><b>19</b><span>2026년 10월<br>월요일의 안부</span>${chip()}</div><div class="daymark-timeline"><article><time>14:30</time><div class="ref-card">${photo(c,151)}${edit()}</div></article><article><time>오늘의<br>이야기</time><div>${text()}<span class="text-cursor"></span></div></article></div>${signature()}${draft()}`,
    duet:c=>`${date()}<div class="duet-entry"><div>${scene('01','느린 오후')}${photo(c,107)}</div><div><h4>커피 한 잔의 쉼</h4><p>사진 위에 마음을 그렸다.<br>나를 위한 작은 시간.</p>${edit()}</div></div><div class="duet-entry"><div>${scene('02','푸른 쉼')}${photo(c,65,'forest')}</div><div><h4>초록을 조금 담아</h4><p>풍경을 보니 마음도 느긋해졌다.</p>${edit()}</div></div><div class="duet-title-input">${mini('두 장을 잇는 오늘의 제목')}<h3>${title}</h3><span class="text-cursor"></span></div>${tags()}${draft()}`
  };
  const detail={
    linen:c=>`<article class="ref-card linen-finished"><div class="ref-address">${mini('DEAR TODAY')}${mark()}</div>${photo(c,242)}${text()}${signature()}</article>${tags()}`,
    pocket:c=>`<div class="pocket-tabs"><b>10월의 주머니</b><span>12번째 엽서</span></div><article class="ref-pocket pocket-finished"><div class="pocket-photo">${photo(c,208)}${caption()}</div><div class="pocket-lip"><span>오늘도, 나에게 한 장</span><b>:)</b></div></article><div class="pocket-memory"><p>${body}</p>${signature()}</div>${tags()}`,
    margin:c=>`${heading('POSTCARD / OCTOBER 19','조금 느리게<br><i>보낸 오후.</i>')}<article class="ref-card margin-finished"><div>${photo(c,224)}${mini('A LITTLE SLOW AFTERNOON')}</div><aside>${mark()}<p>창가에<br>앉아<br>따뜻한<br>커피를.<br><br>오늘의<br>작은 쉼.</p><b>:)</b></aside></article><p class="margin-ending">아무것도 서두르지 않아도 괜찮았던, 그런 오후.</p>${signature()}`,
    fold:c=>`<article class="ref-fold-card fold-finished"><div class="fold-photo">${photo(c,214)}</div>${foldLine()}<div class="fold-reading"><span>Dear, today</span>${text()}${signature()}</div></article>${tags()}`,
    daymark:c=>`<div class="daymark-write-date"><b>19</b><span>2026년 10월<br>월요일의 안부</span>${chip()}</div><div class="daymark-timeline"><article><time>14:30</time><div class="ref-card">${photo(c,228)}${mini('나에게 남긴 한 장')}</div></article><article><time>오늘의<br>기억</time><div>${text()}</div></article></div>${signature()}`,
    duet:c=>`<div class="duet-detail-title">${mini('19 OCTOBER · TWO LITTLE THINGS')}<h3>${title}</h3></div><div class="duet-open"><article>${photo(c,174)}<div>${scene('01','느린 오후')}<p>커피 위에 그린 마음.<br>나를 위한 작은 쉼.</p></div></article><div class="duet-hinge" aria-hidden="true"><i></i><i></i></div><article>${photo(c,85,'forest')}<div>${scene('02','푸른 쉼')}<p>초록을 바라보니<br>마음도 느긋해졌다.</p></div></article></div>${signature()}${tags()}`
  };
  return {
    home:c=>`<div class="app-content home-content ref-home identity-${c.id}">${home[c.id](c)}</div>${navigation(c)}`,
    drawing:c=>`${bar('사진에 그리기','적용')}<div class="app-content drawing-content ref-drawing identity-${c.id}">${drawing[c.id](c)}</div>${gesture()}`,
    editor:c=>`${bar('오늘의 이야기')}<div class="app-content writing-content ref-writing identity-${c.id}">${writing[c.id](c)}</div>${writeTools()}`,
    detail:c=>`${bar('나의 그림엽서','')}<div class="app-content reading-content ref-reading identity-${c.id}">${detail[c.id](c)}</div>${actions()}`
  };
};
