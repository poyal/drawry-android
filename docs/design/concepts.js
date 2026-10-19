'use strict';
(() => {

const concepts = [
  { id: 'archive', no: '01', name: 'Quiet Archive', ko: '조용한 보관함', tagline: '사진과 이야기 사이, 기분 좋은 여백.', mood: '담백한 · 정돈된 · 오래 쓰는', layout: '큰 사진 + 여백이 넓은 카드', fit: '매일 부담 없이 기록하는 앱', caution: '차별화할 브랜드 디테일이 필요', bg: '#F6F6F2', ink: '#292D2A', accent: '#B84B35', soft: '#EEE2D9', stage: '#E9E7E1', type: '산세리프 · 28 / 20 / 16sp', radius: '카드 16dp · 버튼 12dp', rhythm: '화면 여백 24dp · 섹션 32dp', description: '기록을 잘 보여주는 가장 담백한 방향입니다. 큰 사진 한 장, 짧은 제목, 날짜만으로 목록을 구성합니다. 테라코타는 작성과 저장에 집중해 다음 행동을 쉽게 찾도록 합니다.', rules: ['한 화면의 주 행동은 하나만 강조합니다.', '메타 정보는 작고 차분하게, 사진과 제목은 명확하게 배치합니다.', '그림자는 최소화하고 간격으로 콘텐츠를 나눕니다.'] },
  { id: 'sunday', no: '02', name: 'Sunday Notes', ko: '느린 일요일', tagline: '하루 한 장, 나만의 작은 매거진.', mood: '서정적인 · 편집된 · 따뜻한', layout: '세리프 제목 + 날짜 중심 편집', fit: '글과 사진을 천천히 음미하는 앱', caution: '긴 제목과 큰 글씨의 줄바꿈 설계', bg: '#F4EFE5', ink: '#42382E', accent: '#77523C', soft: '#E5D9C5', stage: '#E6DDCE', type: '제목 세리프 · 본문 산세리프', radius: '사진 2dp · 버튼 4dp', rhythm: '화면 여백 24dp · 본문 행간 1.7', description: '한 편의 짧은 에세이처럼 기록을 보여줍니다. 종이 질감이나 손글씨 대신, 세리프 제목·가는 구분선·날짜 조판으로 차분한 인쇄물의 인상을 만듭니다.', rules: ['제목에만 세리프를 쓰고 입력·본문·도구는 산세리프로 유지합니다.', '사진과 본문의 시작선을 정렬해 잡지 같은 리듬을 만듭니다.', '넓은 간격과 가는 선으로 챕터를 구분합니다.'] },
  { id: 'pop', no: '03', name: 'Day Pop', ko: '오늘의 팝', tagline: '평범한 하루에도, 나다운 느낌표!', mood: '경쾌한 · 대담한 · 장난스러운', layout: '굵은 제목 + 라임 행동 + 그림 카드', fit: '낙서와 표현이 즐거운 기록 앱', caution: '장식 밀도와 시각적 피로 조절', bg: '#FFFDF5', ink: '#242622', accent: '#D9F45E', soft: '#F4BBDB', stage: '#E6EDC9', type: '굵은 산세리프 · 명확한 제목 위계', radius: '둥근 카드 · 라이트 오프셋 그림자', rhythm: '사진과 조작 분리 · 다크는 가는 경계', description: '완벽하게 쓰지 않아도 즐거운 기록을 지향합니다. 라임색, 굵은 윤곽선, 작은 배지가 사진에 에너지를 더합니다. 사진 위에 그리는 도구도 쉽게 발견하도록 배치합니다.', rules: ['라임 위에는 짙은 글자를 사용합니다.', '사진·텍스트·도구를 수평으로 정렬해 읽기 흐름을 유지합니다.', '한 화면에서 강한 장식은 두 곳 이하로 제한합니다.'] },
  { id: 'night', no: '04', name: 'After Hours', ko: '밤의 기록', tagline: '하루의 끝에서, 장면을 다시 보다.', mood: '몰입하는 · 영화 같은 · 고요한', layout: '갤러리 매트 + 원본 비율 사진 + 캡션', fit: '사진을 감상하는 경험이 중요한 앱', caution: '사진은 그대로, 주변 매트 밝기만 조절', bg: '#171B24', ink: '#F4F0E9', accent: '#E8BA77', soft: '#2D3442', stage: '#303541', type: '가는 영문 제목 · 한글 24 / 16sp', radius: '사진 20dp · 버튼 pill', rhythm: '화면 여백 20dp · 이미지 내부 20dp', description: '사진 한 장이 화면의 분위기를 결정합니다. 라이트에서는 따뜻한 아이보리, 다크에서는 딥 네이비를 사용하고 앰버 계열 강조색을 유지합니다. 캡션은 사진 밖에 두어 직접 그린 그림을 가리지 않습니다.', rules: ['사진 감상을 방해하는 테두리와 장식을 줄입니다.', '제목·날짜·버튼은 사진 밖에 두어 그림을 가리지 않습니다.', '주변 UI는 낮은 밝기로, 작성 행동은 앰버색으로 표시합니다.'] },
  { id: 'garden', no: '05', name: 'Little Garden', ko: '작은 정원', tagline: '조금씩 쌓이는, 나의 평온한 순간.', mood: '편안한 · 부드러운 · 다정한', layout: '둥근 카드 + 기분 칩 + 사진일기', fit: '기분과 일상을 함께 돌아보는 앱', caution: '파스텔 색상의 텍스트 대비 확보', bg: '#F3F6EF', ink: '#304736', accent: '#3D6647', soft: '#DDE8D5', stage: '#DBE5D7', type: '부드러운 산세리프 · 26 / 18 / 16sp', radius: '사진 32dp · 버튼 pill', rhythm: '화면 여백 20dp · 카드 간격 16dp', description: '조용히 하루를 돌보는 작은 공간입니다. 세이지와 깊은 초록, 둥근 사진 프레임, 기분을 고르는 칩을 사용합니다. 통계나 연속 기록 압박 없이 나의 속도로 기록하게 합니다.', rules: ['연한 초록 위에는 깊은 초록색 텍스트를 사용합니다.', '기분 입력은 언제든 건너뛸 수 있는 선택 항목입니다.', '동그란 요소를 쓰되 사진 면적과 읽기 공간을 충분히 남깁니다.'] },
  { id: 'index', no: '06', name: 'Blue Index', ko: '블루 인덱스', tagline: '흩어진 순간을, 선명한 나의 컬렉션으로.', mood: '선명한 · 구조적인 · 현대적인', layout: '코발트 제목 + 격자 + 날짜 인덱스', fit: '쌓인 기록을 빠르게 찾는 아카이브', caution: '차가운 인상을 사진과 문구로 완화', bg: '#F6F8FC', ink: '#163780', accent: '#2854DB', soft: '#E2E9FA', stage: '#DDE5F5', type: '산세리프 + 숫자 모노스페이스', radius: '사진 0dp · 버튼 4dp', rhythm: '화면 여백 20dp · 1dp 구분선', description: '기록을 차곡차곡 모으는 개인 컬렉션입니다. 선명한 코발트와 날짜 인덱스, 정직한 격자를 사용합니다. 장식 대신 사진의 크기와 조판으로 개성을 만듭니다.', rules: ['날짜와 사진 시작선을 같은 격자에 정렬합니다.', '숫자는 고정폭, 본문은 편안한 산세리프로 구분합니다.', '작은 모서리와 가는 선으로 목록의 질서를 유지합니다.'] },
];
concepts.push(...window.DRAWRY_DIRECTIONS);
// A direction is a composition system carried through all four views.
const identities = {
  archive:{layout:'가로 사진 목록 + 여백 중심의 한 장 상세',type:'절제한 산세리프 · 제목 21–24px',radius:'평평한 목록 · 작은 모서리',rhythm:'가로 사진·글 2열 · 가는 목록 구분선',description:'사진과 글을 나란히 읽는 조용한 보관함입니다. 홈은 가로 목록, 작성은 작은 첨부 사진과 넓은 글 공간, 완성 화면은 제목 다음에 사진을 놓는 단순한 흐름입니다.',rules:['홈은 사진과 요약을 나란히 놓아 기록을 빠르게 훑습니다.','작성은 첨부 사진보다 글 공간에 여유를 줍니다.','장식 없이 간격과 가는 선으로 정보 순서를 드러냅니다.']},
  sunday:{layout:'큰 날짜 + 잡지 조판 + 2단 글쓰기',type:'세리프 제목·날짜 · 산세리프 본문',radius:'각진 사진 · 얇은 편집선',rhythm:'날짜 여백 + 사진·글 2단',description:'개인 잡지의 한 페이지처럼 읽습니다. 홈과 상세에는 큰 날짜를, 작성에는 글과 사진이 나란한 두 단을 사용합니다. 그리기도 편집물의 도판처럼 세로 도구와 사진을 정렬합니다.',rules:['큰 날짜를 페이지의 기준점으로 삼습니다.','세리프는 제목과 날짜에 집중하고 본문은 편하게 읽히게 합니다.','사진 아래 캡션과 가는 편집선으로 한 페이지를 완성합니다.']},
  pop:{layout:'비대칭 포스터 + 굵은 윤곽 + 큰 제목',type:'굵은 산세리프 · 포스터형 큰 제목',radius:'각진 판형 · 굵은 테두리 · 오프셋',rhythm:'크기 차이가 큰 제목·사진·작은 배지',description:'하루를 짧은 포스터로 만듭니다. 큰 제목, 비대칭 사진·숫자 배치, 분홍 메모 블록과 단단한 그림자를 홈·그리기·작성·상세에 이어 갑니다. 다크에서도 포스터 형태와 굵은 선의 성격을 유지합니다.',rules:['큰 제목과 비대칭 판형을 네 화면에 유지합니다.','사진 옆 여백에 배지와 장식을 두어 그림을 가리지 않습니다.','라이트·다크 모두 윤곽과 오프셋을 유지하되 선의 밝기는 조절합니다.']},
  night:{layout:'대형 사진 감상 + 하단 캡션 + 필름 탐색',type:'가벼운 제목 · 작은 영화 캡션',radius:'넓은 사진 면 · 둥근 조작부',rhythm:'사진을 크게 · 설명과 도구는 아래',description:'사진 한 장을 오래 바라보는 개인 갤러리입니다. 홈·그리기·상세에 사진을 크게 보여주고 글과 도구는 그 아래로 모읍니다. 작성은 큰 사진 옆 세로 필름 목록과 짧은 캡션으로 구성합니다.',rules:['사진이 화면에서 가장 큰 면적을 차지합니다.','캡션과 조작부를 사진 밖에 놓습니다.','여백을 사용하되 카드와 장식의 수는 최소화합니다.']},
  garden:{layout:'기분 먼저 + 둥근 기록 + 질문형 작성',type:'부드러운 산세리프 · 짧은 질문',radius:'둥근 기분 칩 · 유기적인 사진 프레임',rhythm:'기분 선택 → 한 장면 → 짧은 이야기',description:'기분에서 시작하는 다정한 그림일기입니다. 홈은 기분 선택을 먼저 보여주고, 작성은 질문에 답한 뒤 사진을 돌아보는 흐름입니다. 완성된 기록은 기분·사진·이야기를 가운데에 모읍니다.',rules:['기분 선택과 질문으로 기록의 시작을 돕습니다.','사진과 글을 둥근 독립 영역에 놓습니다.','기분은 건너뛸 수 있으며 기록 횟수로 압박하지 않습니다.']},
  index:{layout:'월 인덱스 + 날짜 장부 + 번호 양식',type:'큰 숫자·고정폭 메타 · 산세리프',radius:'직각 · 선으로 나누는 정보 격자',rhythm:'날짜 열·사진 열·글 열의 정렬',description:'기록을 찾기 쉬운 시각 장부입니다. 홈은 월 숫자와 날짜 열, 작성은 사진·글·기분의 번호 양식, 상세는 큰 날짜와 정보표로 구성합니다. 그리기는 자와 도구표를 닮은 단정한 작업면입니다.',rules:['정보를 날짜·사진·글의 일정한 열에 정렬합니다.','구분선과 번호로 편집 순서를 드러냅니다.','곡선 장식 대신 비례와 여백으로 개성을 만듭니다.']},
  atelier:{layout:'링 제본 + 줄노트 + 연필 도구함',type:'산세리프 제목 · 고정폭 페이지 번호',radius:'제본 노트 · 연필형 색상칩',rhythm:'고정된 제본 여백 · 일정한 노트 행간',description:'네 화면 모두 한 권의 스케치북 안에 있습니다. 링 제본과 여백을 유지하면서 홈은 사진 페이지, 그리기는 캔버스와 연필함, 작성은 줄노트, 상세는 넘겨보는 완성 페이지로 이어집니다.',rules:['제본은 사진 바깥의 여백에만 둡니다.','작성과 완성 화면에서 같은 줄노트의 리듬을 이어 갑니다.','다크에서도 링·페이지·연필함의 형태를 유지합니다.']},
  picnic:{layout:'사진 인화지 + 테이프 + 메모지',type:'친근한 산세리프 · 인화지 캡션',radius:'종이 층 · 작은 테이프 · 부드러운 도구',rhythm:'사진 카드와 글 메모의 분리',description:'인화한 사진과 작은 메모를 모은 듯한 기록입니다. 홈은 날짜가 곁들여진 사진 카드, 그리기는 테이프로 붙인 사진과 색연필함, 작성·상세는 인화지와 별도의 메모지로 구성합니다.',rules:['사진 카드와 글 메모를 별개의 종이 면으로 구분합니다.','테이프·꽃 장식은 사진을 가리지 않게 배치합니다.','사진 자체에 그린 선과 UI의 종이 장식을 명확하게 구분합니다.']},
  storybook:{layout:'장 제목 + 아치 삽화 + 가운데 조판',type:'서정적인 세리프 · 가운데 정렬',radius:'아치형 삽화 여백 · 장 번호',rhythm:'제목 → 이야기 → 삽화의 책 읽기 리듬',description:'하루를 작은 그림책의 한 장으로 만듭니다. 홈은 책 표지, 작성은 제목과 글을 먼저 적는 원고, 상세는 장 번호와 삽화가 있는 책 페이지입니다. 그리기도 같은 삽화 프레임 안에서 이어집니다.',rules:['장 번호와 가운데 조판으로 책의 리듬을 만듭니다.','아치는 사진을 자르는 대신 사진 바깥의 여백으로 표현합니다.','작성은 이야기부터, 감상은 제목과 삽화를 함께 보여줍니다.']},
  studio:{layout:'작업 목록 + 세로 도구 + 레이어 패널',type:'기능 중심 산세리프 · 작은 메타',radius:'단정한 패널 · 세로 도구 막대',rhythm:'작업면·레이어·정보 패널의 분리',description:'사진 위에 그리는 일을 중심에 둔 작은 작업실입니다. 홈은 최근 작업 목록, 그리기는 세로 도구와 원본·그림 레이어, 작성은 속성 입력, 상세는 사진과 정보 패널로 구성합니다.',rules:['사진 작업면과 도구·정보 영역을 분명히 나눕니다.','원본과 그림이 분리되어 있음을 레이어로 보여줍니다.','장식보다 편집 상태와 다음 행동을 알아보기 쉽게 합니다.']},
  postcard:{layout:'엽서 앞·뒷면 + 주소 + 서명',type:'세리프 편지 제목 · 날짜 소인',radius:'엽서 종이 · 점선·인장',rhythm:'사진 앞면과 편지 뒷면의 전환',description:'오늘의 나에게 남기는 개인 그림엽서입니다. 홈은 모아 둔 엽서, 그리기는 사진 앞면, 작성은 주소와 서명이 있는 뒷면, 상세는 사진과 편지를 함께 읽는 완성 엽서입니다.',rules:['그리기와 글쓰기를 엽서 앞면·뒷면으로 구분합니다.','To.와 From.은 개인 일기의 표현이며 우편 발송 기능이 아닙니다.','사진·주소·편지의 구획을 선과 여백으로 나눕니다.']},
  frames:{layout:'3컷 보드 + 장면별 작성 + 순서형 상세',type:'산세리프 제목 · 큰 장면 번호',radius:'사진 격자 · 이어지는 장면 목록',rhythm:'01 → 02 → 03의 일관된 읽기 순서',description:'여러 사진을 한 편의 이야기로 잇습니다. 홈은 세 컷 보드, 그리기는 필름 선택과 한 장 편집, 작성은 장면별 캡션, 상세는 사진과 글이 차례로 이어지는 포토 에세이입니다.',rules:['홈·작성·상세에서 같은 장면 순서를 유지합니다.','그리기는 한 장에 집중하며 다른 장면은 필름 목록으로 선택합니다.','각 장면의 사진과 캡션을 한 묶음으로 읽게 합니다.']},
};
concepts.forEach(c=>Object.assign(c,identities[c.id]));


// Each dark palette keeps its direction's hue; photo pixels and ink stay unchanged.
const darkPalettes = {
  archive:   ['#1D201E','#F0EEE7','#E39A81','#343A34','#272C28','#282D29'],
  sunday:    ['#24201C','#F2E9DB','#D4AF8D','#3C3229','#302922','#2E2721'],
  pop:       ['#191D19','#E9EDE5','#CCE67D','#343F2D','#272E27','#252D24'],
  night:     ['#171B24','#F4F0E9','#E8BA77','#2D3442','#303541','#222834'],
  garden:    ['#19241D','#E8F0E1','#A9C99E','#304435','#24332A','#233127'],
  index:     ['#151F35','#E7EEFF','#A0BBFF','#293B62','#202E48','#1E2B46'],
  atelier:   ['#182237','#ECF1FF','#A5BFFD','#2A3B5D','#25324B','#212E49'],
  picnic:    ['#2B251B','#FFF0D6','#F2BB89','#4B3D26','#3B3222','#383022'],
  storybook: ['#2A2028','#F5E7ED','#E3A3BC','#49323F','#392B35','#382932'],
  studio:    ['#1B241F','#E6EFE7','#B0CBB4','#34483A','#29362D','#25332B'],
  postcard:  ['#2B231F','#F4E9D8','#EAB09B','#4A382E','#3B3029','#382C25'],
  frames:    ['#1B2534','#ECF0F7','#A5BFED','#31435F','#29384B','#263449'],
};
const modeNotes = {
  archive:{light:'흰 여백과 가는 선으로 가로 기록 목록을 정돈합니다.',dark:'먹빛 여백 안에서도 사진·글의 두 열과 목록 구분을 유지합니다.'},
  sunday:{light:'크림색 종이와 얇은 갈색 선으로 편집합니다.',dark:'짙은 갈색 종이에 베이지 글자와 낮은 대비의 구분선을 씁니다.'},
  pop:{light:'라임 버튼·분홍 칩·짙은 오프셋 그림자를 조합합니다.',dark:'윤곽·오프셋·큰 제목을 유지하고 선은 낮은 밝기의 세이지로 바꿉니다.'},
  night:{light:'아이보리 화면 안에 차콜 매트로 사진을 감쌉니다.',dark:'네이비 배경·더 어두운 사진 매트·앰버색 조작부를 나눕니다.'},
  garden:{light:'세이지 배경과 둥근 흰 카드로 부드럽게 구분합니다.',dark:'숲색 배경과 이끼색 카드·선택 영역으로 깊이를 나눕니다.'},
  index:{light:'코발트 제목과 선, 여백으로 날짜 격자를 만듭니다.',dark:'짙은 남색 위에 연한 블루 글자와 차분한 도구판을 둡니다.'},
  atelier:{light:'링 제본·줄노트·연필함을 밝은 종이 위에 표현합니다.',dark:'어두운 종이에서도 링과 노트 선, 연필함의 형태를 유지합니다.'},
  picnic:{light:'인화지·테이프·메모지의 종이 층과 그림자를 살립니다.',dark:'따뜻한 어두운 종이에서도 테이프와 인화지·메모 구성을 이어 갑니다.'},
  storybook:{light:'장밋빛 아치와 여백으로 한 페이지처럼 보여줍니다.',dark:'플럼색 바탕과 한 단계 밝은 아치로 사진의 윤곽을 살립니다.'},
  studio:{light:'회색 매트와 단정한 도구판으로 작업 영역을 나눕니다.',dark:'짙은 초록 작업면과 밝기가 다른 도구판으로 기능을 구분합니다.'},
  postcard:{light:'아이보리 엽서에 주소·날짜 소인·편지 구획을 드러냅니다.',dark:'갈색 종이 위에서도 앞면·뒷면, 소인과 서명을 유지합니다.'},
  frames:{light:'세 컷 보드와 장면별 캡션을 밝은 격자로 이어 갑니다.',dark:'블루그레이 작업면에서도 01→02→03의 장면 순서를 유지합니다.'},
};

const modeNames = {light:'라이트',dark:'다크'};
function luminance(hex) {
  const rgb=hex.slice(1).match(/.{2}/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
}
function appearance(c, mode='light') {
  let colors = {bg:c.bg,ink:c.ink,accent:c.accent,soft:c.soft,stage:c.stage,surface:'#FFFFFF'};
  if(mode==='dark') {
    const [bg,ink,accent,soft,stage,surface]=darkPalettes[c.id];
    colors={bg,ink,accent,soft,stage,surface};
  } else if(c.id==='night') {
    colors={bg:'#F6F2EA',ink:'#34313B',accent:'#87562A',soft:'#E7DDCF',stage:'#E9E1D7',surface:'#FFFCF7'};
  }
  const l=luminance(colors.accent), dark=luminance('#18201C');
  const onAccent=(l+.05)/(dark+.05) >= 1.05/(l+.05) ? '#18201C' : '#FFFFFF';
  const surface = mode === 'dark' ? colors.surface : {
    archive:'#FFFFFF', sunday:'#FBF7EE', pop:'#FFFEF8', night:'#FFFCF7',
    garden:'#FCFEF9', index:'#FFFFFF', atelier:'#FFFFFF', picnic:'#FFFDF5',
    storybook:'#FFFAF7', studio:'#FCFDFB', postcard:'#FFFBF1', frames:'#FCFDFF'
  }[c.id];
  return {...c,...colors,surface,mode,onAccent};
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
  let ink=marks[c.id] || marks[originalInk[c.id]], height=375;
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
const screens=window.createDrawryScreens({icon,paintedPhoto,penPalette,drawingTools,top,navigation,fab,chip,title,body});
const viewNames = { home: '기록 홈', drawing: '사진에 그리기', editor: '일기 작성', detail: '완성된 일기' };
function phone(c, view, mode='light') {
  c = appearance(c,mode);
  const content = screens[view](c);
  return `<div class="phone view-${view} theme-${c.id} ${c.round===2?'round-two':''}" data-mode="${mode}" style="${style(c)}" role="img" aria-label="${c.name} ${modeNames[mode]} ${viewNames[view]} 디자인 시안. ${title}. ${c.tagline}">${status()}${content}</div>`;
}
function screenSet(c, view='all', selectedMode='both') {
  const views=view==='all'?Object.entries(viewNames):[[view,viewNames[view]]];
  const modes=selectedMode==='both'?Object.keys(modeNames):[selectedMode];
  return `<div class="mode-pair">${modes.map(mode=>`<section class="mode-group" data-mode="${mode}" style="${style(appearance(c,mode))}" aria-label="${c.name} ${modeNames[mode]} 시안"><header class="mode-heading"><h4><span class="mode-dot"></span>${modeNames[mode]} <small>${mode.toUpperCase()}</small></h4><span>${views.length} SCREENS</span></header><p class="mode-treatment">${modeNotes[c.id][mode]}</p><div class="screen-set ${view==='all'?'all-screens':'single-screen'}">${views.map(([key,label])=>`<figure class="screen-study"><figcaption><span>0${Object.keys(viewNames).indexOf(key)+1}</span>${label}</figcaption><div class="screen-preview">${phone(c,key,mode)}</div></figure>`).join('')}</div></section>`).join('')}</div>`;
}
const swatches = c => `<div class="swatches" aria-label="색상 구성">${[c.bg, c.ink, c.accent, c.soft].map(color => `<span style="background:${color}" title="${color}"></span>`).join('')}</div>`;
const tokens = c => `<div class="token-list">${[['Background', c.bg], ['Text', c.ink], ['Accent', c.accent], ['Soft', c.soft]].map(([name, color]) => `<div><span style="background:${color}"></span><b>${name}</b><code>${color}</code></div>`).join('')}</div>`;

function renderPrintBook() {
  const masthead = label => `<div class="print-masthead"><b>drawry.</b><span>${label}</span></div>`;
  const pages = [];
  const add = (cls, html, c) => pages.push({cls,html,c});
  add('print-cover', `${masthead('ANDROID / PHOTO + DRAWING DIARY / 2026.10')}<span class="eyebrow">YOUR PHOTO. YOUR DRAWING. TWELVE DIRECTIONS.</span><h1>사진 위에 그리는,<br>열두 가지 하루.</h1><p>사진 자체에 선·그림·글씨를 더하는 Android 그림일기.<br>12개 콘셉트 × 라이트·다크 × 4개 화면 = 96개 시안<br>기록 홈 → 사진에 그리기 → 일기 작성 → 완성된 일기</p><div class="print-cover-palette">${concepts.map(c=>`<div style="background:${c.accent};color:${['pop','night'].includes(c.id)?'#252525':'white'}"><b>${c.no}</b><span>${c.name}</span></div>`).join('')}</div>`);
  concepts.forEach(c => Object.entries(modeNames).forEach(([mode,label]) => {
    const palette=appearance(c,mode);
    add('print-concept', `<header><div><span class="eyebrow">CONCEPT ${c.no} / ${c.ko} / ${mode.toUpperCase()}</span><h2>${c.name}<span>${c.tagline}</span></h2><p class="concept-origin"><span class="print-mode-label ${mode}">${label} · ${mode.toUpperCase()}</span> ${c.mood} · 4 SCREENS</p></div>${swatches(palette)}</header><div class="print-screens">${Object.entries(viewNames).map(([view,viewLabel],i)=>`<div><span class="print-screen-label">0${i+1} / ${viewLabel}</span><div class="print-phone-wrap">${phone(c,view,mode)}</div></div>`).join('')}</div><div class="print-design-note"><p><b>${label} 팔레트</b>배경 ${palette.bg} · 본문 ${palette.ink}<br>강조 ${palette.accent} · 보조 ${palette.soft}</p><p><b>서체·형태</b>${c.type}<br>${c.radius}</p><p><b>${label} 표현</b>${modeNotes[c.id][mode]}</p></div>`,palette);
  }));
  for(let round=1;round<=2;round++) {
    const subset=concepts.filter(c=>(c.round||1)===round);
    add('print-comparison', `${masthead(`COMPARE — ${round===1?'01–06':'07–12'}`)}<h2 class="print-section-title">${round===1?'기존 여섯 가지 시선.':'사진 위에 그리는 여섯 가지 하루.'}</h2><p class="print-lead">모든 디자인에 라이트 4개·다크 4개, 총 8개 화면을 제공합니다. 기록 홈 · 사진에 그리기 · 일기 작성 · 완성된 일기.</p><table><thead><tr><th>콘셉트</th><th>첫인상</th><th>화면의 중심</th><th>설계 시 고려할 점</th></tr></thead><tbody>${subset.map(c=>`<tr><th>${c.no} ${c.name}</th><td>${c.mood}</td><td>${c.layout}</td><td>${c.caution}</td></tr>`).join('')}</tbody></table><div class="comparison-callout"><h3>사진 위의 한 획이, 나의 하루가 됩니다.</h3><p>원본 사진을 보존하며 그 위에 선·그림·글씨를 더합니다. 그림을 적용한 뒤 짧은 이야기를 적고, 저장한 일기는 도구 없이 감상합니다.</p></div><p class="print-photo-credit">샘플 사진: Lorem Picsum / Unsplash — Luke Chesser, Paul Jarvis, Oleg Chursin. 상세 출처: assets/credits.txt.</p>`);
  }
  document.getElementById('print-book').innerHTML=pages.map((p,i)=>`<section class="print-page ${p.cls}"${p.c?` style="${style(p.c)}"`:''}>${p.html}<div class="print-foot">DRAWRY / PHOTO + DRAWING<span>디자인 시안 · 실제 앱 기능 미연결</span><span>${i+1} / ${pages.length}</span></div></section>`).join('');
}

if (document.getElementById('print-book')) {
  renderPrintBook();
} else {
  let currentView = 'all';
  let currentMode = 'both';
  let roundFilter = 'all';
  const grid = document.getElementById('concept-grid');
  const dialog = document.getElementById('concept-dialog');
  let activeConcept = null;
  let dialogView = 'home';
  let dialogMode = 'light';
  grid.innerHTML = concepts.map(c => `<article class="concept-card" data-round="${c.round||1}" id="concept-${c.id}" style="${style(c)}"><div class="card-heading"><div><span class="concept-number">${c.no}</span><h3>${c.name}<small>${c.ko}</small></h3></div><span class="screen-count">LIGHT 4 + DARK 4</span></div><div class="concept-stage"><span class="stage-caption">${c.mood}</span><div class="preview">${screenSet(c, currentView, currentMode)}</div></div><div class="card-copy"><h4>${c.tagline}</h4><p>${c.layout}</p><div class="card-footer">${swatches(c)}<button type="button" data-detail="${c.id}" class="detail-button" aria-label="${c.name} 자세히 보기">자세히 보기 <span>↗</span></button></div></div></article>`).join('');
  document.getElementById('comparison-body').innerHTML = concepts.map(c => `<tr><th scope="row"><span class="table-dot" style="background:${c.accent}"></span><button type="button" data-detail="${c.id}">${c.no} ${c.name}</button></th><td>${c.mood}</td><td>${c.layout}</td><td>${c.fit}</td><td>${c.caution}</td></tr>`).join('');
  function syncFilter() {
    let visible = 0;
    concepts.forEach(c => {
      const show = roundFilter === 'all' || String(c.round || 1) === roundFilter;
      document.getElementById(`concept-${c.id}`).hidden = !show;
      if (show) visible++;
    });
    document.getElementById('visible-count').textContent = `${visible}개의 방향`;
    document.querySelectorAll('[data-round-filter]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.roundFilter === roundFilter)));
    requestAnimationFrame(sizePreviews);
  }
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
    document.getElementById('dialog-content').innerHTML = `<div class="dialog-heading"><span class="concept-number">${c.no}</span><div><h2 id="dialog-title">${c.name}</h2><p>${c.ko} — ${c.tagline}</p></div></div><div class="dialog-layout" style="${style(palette)}"><div class="dialog-preview" data-mode="${dialogMode}"><div class="segmented mode-tabs" role="group" aria-label="상세 시안 모드 선택">${Object.entries(modeNames).map(([mode,label])=>`<button type="button" data-dialog-mode="${mode}" aria-pressed="${mode===dialogMode}">${label}</button>`).join('')}</div><div class="segmented" role="group" aria-label="상세 시안 화면 선택">${Object.entries(viewNames).map(([view, label])=>`<button type="button" data-dialog-view="${view}" aria-pressed="${view===dialogView}">${label}</button>`).join('')}</div><div id="dialog-phone">${phone(c,dialogView,dialogMode)}</div><span class="preview-label">화면 디자인 시안 · 기능 미연결</span></div><div class="dialog-spec"><span class="eyebrow">THE IDEA</span><h3>${c.tagline}</h3><p>${c.description}</p><h4>${modeNames[dialogMode].toUpperCase()} COLOR PALETTE</h4>${tokens(palette)}<div class="spec-pair"><div><h4>TYPOGRAPHY</h4><p>${c.type}</p></div><div><h4>SHAPE & SPACING</h4><p>${c.radius}<br>${c.rhythm}</p></div></div><h4>${modeNames[dialogMode]} 표현</h4><p>${modeNotes[c.id][dialogMode]}</p><h4>DESIGN RULES</h4><ol>${c.rules.map(rule=>`<li>${rule}</li>`).join('')}</ol><div class="tradeoff"><b>고려할 점</b><span>${c.caution}</span></div></div></div>`;
    sizePreviews();
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
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
    if (button.dataset.roundFilter) { roundFilter = button.dataset.roundFilter; syncFilter(); }
    if (button.id === 'close-dialog') dialog.close();
  });
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',event=>{ if(event.target===dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); }});
  syncFilter();
}
})();
