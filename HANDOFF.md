# 작업 재개

2026-10-20 사용자 요청으로 **18번 Two Little Things — 두 장으로 남긴 하루**와 디자인 기준 v1.0을 확정했다. [시각 가이드](docs/design/design-system.html)와 [구현 명세](docs/design/DESIGN_SYSTEM.md)를 먼저 읽고 [최종 8화면](docs/design/index.html)을 본다. 실제 Android 기록 화면은 아직 미구현 상태다.

## 현재 상태

- 사용자 지시로 GitHub Actions를 중지했다. `.github/workflows`에는 실행 파일을 두지 않으며, 기존 설정은 `.github/disabled-workflows/android.yml`에 보관한다. 사용자가 정책을 정해줄 때까지 자동·수동 워크플로를 새로 만들거나 다시 활성화하지 않는다.
- Android는 최종 디자인의 구현 대기 안내 화면으로 실행한다. `MainActivity`는 `AppModel`을 생성하지 않으며 기존 저장소를 열지 않는다.
- `AppModel`, `data/`, `InkCanvasView`, `core/`는 기능 재연결을 위해 보존했다.
- HTML은 로컬 정적 파일이며 작성·저장·공유 기능은 연결되지 않은 시각 시안이다.
- PDF는 `print.html`에서 생성한다. 표지 1·라이트 1·다크 1, 총 3쪽이다. 라이트·다크 페이지마다 4개 화면이 나란히 있다.
- 핵심 요구는 **사진 자체에 선·그림·글씨를 덧그리는 그림일기**다. 사진 밖 자유 배치 캔버스로 바꾸지 않는다.

- HTML과 PDF는 최종 18번 1종만 보여준다. 기록 홈·사진에 그리기·일기 작성·완성된 일기의 라이트·다크, 총 8개 화면이다.
- 연결된 두 엽서, 장면별 글쓰기, 리넨 톤과 둥근 버튼을 사용한다. `:)`는 상단 앱 로고에만 표시하며, 라이트에서는 제목과 같은 검정 계열, 다크에서는 제목과 같은 밝은 글자색이다.
- 320×700 시안에서 사진·그림의 원래 비율을 보존하고, 홈에서도 완성된 그림을 표시한다. 작성 버튼·사진 수정·사진 번호는 콘텐츠를 가리지 않도록 분리했다.
- 라이트의 종이 그림자와 다크의 명도별 카드·도구판을 구분한다. 다크의 주 행동은 낮은 밝기의 배경과 밝은 강조색 글자를 사용한다. 사진과 그림의 색은 두 모드에서 같다.
- 디자인 폴더에는 최종 시안과 기준, 실행에 필요한 소스·자산만 남긴다. 폐기한 후보·검토 이미지·미사용 테마를 다시 포함하지 않는다.

- 승인된 문구 구성: 고정 화면 이름, 일기 제목 하나, 사진별 선택 메모, 자동 날짜·사진 번호. 홈·작성·상세에서 같은 내용을 표시한다. 빈 제목의 날짜 표시와 빈 메모 숨김은 가이드 예시에서 확인할 수 있다.
- 기준 v1.0은 색상·서체·간격·형태·48dp 터치 영역·사진 수별 배치·저장/오류 상태·검수 조건을 정한다. 320×700 미리보기의 px를 Android dp/sp로 복사하지 않는다.
- `Diary.headline`과 `entryDate`는 기존 필드다. 사진별 메모 필드는 현재 `Media`에 없으므로 구현 전에 저장·백업 호환성을 설계한다. 메모는 사진 ID를 따라가야 하며 기존 `Diary.body`를 버리지 않는다.

## 파일

- `docs/design/design-system.html`, `.css`, `.js`: 시각 가이드와 입력·모드·컴포넌트 상태 예시
- `docs/design/DESIGN_SYSTEM.md`: 콘텐츠·동작·배치·네이티브 검수·인계 명세
- `docs/design/design-tokens.js`: 색상·Android dp/sp·고정 문구의 공통 원본
- `docs/design/index.html`: 최종 시안 진입점
- `docs/design/final-design.js`: 최종 18번 데이터·4개 화면, 모드·화면 필터, 확대, 3쪽 인쇄 구성
- `docs/design/final-design.css`: 최종 시안·모달·반응형·인쇄 스타일
- `docs/design/final-design.pdf`: 최종 시안 3쪽 PDF
- `docs/design/print.html`: 3쪽 PDF 원본
- `docs/design/export-pdf.cjs`: 로컬 Playwright + Chrome으로 원본 크기의 사진·그림 합성 PNG와 PDF를 재생성
- `docs/design/assets/print-*-ink.png`: PDF 전용 합성 이미지. 일반 HTML은 원본 사진·SVG를 유지
- `docs/design/assets/coffee.jpg`, `forest.jpg`, `credits.txt`: 사용 중인 샘플 사진 두 장과 출처

## 기기와 데이터

저장소 코드 초기화 허용을 기기 DB·AVD·키스토어 삭제 허용으로 해석하지 않는다. 이전 `drawry-sketchbook-qa`와 `drawry-test-16k`에는 수동 기록이 있을 수 있다. 설치·삭제·기기 테스트·샘플 주입을 이번 작업에서 실행하지 않는다. 데이터가 있는 기기에 전체 instrumentation 테스트를 실행하지 않는다.

빌드 설정은 README, 남은 작업은 TODO, 실제 검증은 VALIDATION_STATUS를 따른다. 이번 단계의 HTML·PDF 검증 결과를 네이티브 출시 검증으로 확대하지 않는다.
