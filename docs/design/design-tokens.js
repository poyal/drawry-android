/* Drawry design baseline 1.0.0. Dimensions are Android dp; typography is sp.
   Browser studies use a separate, compressed presentation canvas. */
(function (root) {
  'use strict';
  const tokens = {
    version: '1.0.0',
    approvedAt: '2026-10-20',
    direction: '18 / Two Little Things',
    palette: {
      light: {
        background: '#F6F6F2', surface: '#FFFFFF', surfaceSoft: '#EEE2D9',
        text: '#292D2A', textSecondary: '#565955', accent: '#B84B35', selectedText: '#A23E2C',
        actionBackground: '#B84B35', actionText: '#FFFFFF',
        outline: '#DDDEDD', controlOutline: '#7B827A', focus: '#B84B35',
        error: '#B3261E', errorSurface: '#FCE9E5', success: '#3F684D',
        disabledText: '#83867F', disabledSurface: '#E8E9E2', stage: '#E9E7E1'
      },
      dark: {
        background: '#1D201E', surface: '#282D29', surfaceSoft: '#343A34',
        text: '#F0EEE7', textSecondary: '#BCBAB5', accent: '#E39A81', selectedText: '#E39A81',
        actionBackground: '#343A34', actionText: '#E39A81',
        outline: '#4C504B', controlOutline: '#80877E', focus: '#E39A81',
        error: '#FFB4AB', errorSurface: '#4E2623', success: '#ADC7AD',
        disabledText: '#7D847B', disabledSurface: '#2C312D', stage: '#272C28'
      }
    },
    typography: {
      wordmark: {label: '앱 로고', size: 28, lineHeight: 36, weight: 700},
      pageTitle: {label: '홈 화면 제목', size: 28, lineHeight: 36, weight: 600},
      screenTitle: {label: '상단 화면 이름', size: 20, lineHeight: 28, weight: 600},
      entryTitle: {label: '일기 제목', size: 22, lineHeight: 32, weight: 600},
      cardTitle: {label: '목록의 일기 제목', size: 18, lineHeight: 26, weight: 600},
      body: {label: '사진 이야기·본문', size: 16, lineHeight: 26, weight: 400},
      label: {label: '입력 라벨·버튼', size: 14, lineHeight: 20, weight: 500},
      caption: {label: '날짜·보조 정보', size: 12, lineHeight: 18, weight: 400}
    },
    spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48],
    radius: {photo: 2, postcard: 12, field: 12, toolbox: 24, sheet: 28, pill: 999},
    layout: {contentPadding: 20, cardPadding: 16, itemGap: 12, sectionGap: 24, maxReadingWidth: 640},
    controls: {touchMin: 48, primaryHeight: 48, iconSize: 24, iconStroke: 1.75, fieldMinHeight: 56, focusWidth: 2},
    motion: {pressMs: 120, transitionMs: 200},
    copy: {
      home: '나의 기록', drawing: '사진에 그리기', editor: '일기 쓰기', detail: '나의 일기',
      titleLabel: '일기 제목', captionLabel: '사진 이야기', optional: '선택',
      titlePlaceholder: '오늘의 제목을 적어보세요',
      captionPlaceholder: '이 사진을 보면 어떤 생각이 드나요?',
      titleFallback: '{M}월 {d}일의 기록'
    }
  };
  root.DRAWRY_DESIGN_SYSTEM = tokens;
  if (typeof module !== 'undefined' && module.exports) module.exports = tokens;
})(globalThis);
