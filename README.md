# Drawry — Android

사진 자체 위에 선·그림·글씨를 덧그리고, 짧은 이야기와 함께 기기에 보관하는 그림일기 앱입니다. Kotlin·Jetpack Compose 기반의 **Android 전용 프로젝트**로 다시 시작합니다.

## 디자인 콘셉트 먼저 보기

- **[통합 HTML](docs/design/index.html)** — 기존 6 + 신규 6, 총 12개 콘셉트·96개 화면, 디자인별 라이트 4개·다크 4개 동시 표시·확대
- **[통합 PDF 디자인 북](docs/design/drawry-design-concepts.pdf)** — 표지·디자인별 라이트/다크 2쪽·비교표, A4 가로 27쪽
- [PDF 원본 HTML](docs/design/print.html) — 브라우저 인쇄용

HTML은 파일을 브라우저에서 직접 열면 됩니다. 사진·CSS·JavaScript가 로컬에 있어 네트워크나 설치가 필요 없습니다. `docs/design/` 폴더째 옮기면 다른 컴퓨터에서도 열립니다.

‘전체 12개 / 기존 01–06 / 새로운 07–12’로 나눠 비교할 수 있습니다. 모든 시안은 기록 홈·사진에 그리기·일기 작성·완성된 일기의 네 화면을 갖습니다. 각 화면을 라이트·다크 두 모드로 만들어 디자인마다 8개씩 제공합니다. 기본 보드에서는 두 모드를 함께 표시하며, 모두·라이트·다크 필터로 나눠 볼 수 있습니다. 사진 위 드로잉을 핵심으로 하며, 시안 속 펜 도구는 실제 입력 기능이 연결되지 않은 미리보기입니다.

12개 콘셉트 각각 홈·그리기·작성·상세의 구성을 다르게 설계했습니다. 잡지의 날짜 조판, 팝 포스터, 제본 노트, 엽서 앞뒷면, 장면별 캡션 등 고유한 형태를 라이트·다크에서 유지합니다. 사진과 낙서는 모든 단계에서 원래 비율로 표시합니다. HTML의 ‘흑백으로 비교’를 누르면 색을 제외한 배치·서체·형태를 확인할 수 있습니다.

| 번호 | 방향 | 핵심 |
| --- | --- | --- |
| 01 | Quiet Archive | 사진과 글이 나란한 가로 목록, 여백 중심 상세 |
| 02 | Sunday Notes | 세리프, 잡지 같은 조판, 에스프레소 |
| 03 | Day Pop | 라임, 굵은 선, 자유로운 구성 |
| 04 | After Hours | 딥 네이비, 사진 몰입, 앰버 |
| 05 | Little Garden | 세이지, 둥근 형태, 다정한 기분 표현 |
| 06 | Blue Index | 코발트, 날짜 인덱스, 정돈된 격자 |
| 07 | Blue Atelier | 링 제본 스케치북, 줄노트 작성, 연필 도구함 |
| 08 | Doodle Picnic | 버터색 사진 카드, 피사체 위 귀여운 낙서 |
| 09 | Painted Moments | 사진 윤곽선, 그림책처럼 감상하는 페이지 |
| 10 | Quiet Studio | 큰 사진 작업면, 명확한 펜·지우개·이동 도구 |
| 11 | Dear Today | 사진 앞면·편지 뒷면, 날짜 소인과 서명 |
| 12 | Frame by Frame | 3컷 보드, 장면별 캡션, 순서대로 읽는 상세 |

## 초기화 범위와 현재 상태

2026-10-19 요청으로 iOS 프로젝트·CI, 스케치북 UI, 기존 아이콘 시안·스크린샷·손글씨 폰트 및 해당 화면 전용 테스트를 제거했습니다. 기존 양 플랫폼 미디어 검증 도구와 이전 계획도 정리했습니다. 과거 코드는 Git 이력에서 확인할 수 있습니다.

**현재 Android 앱에는 중립적인 재설계 안내 화면만 있습니다.** 위 콘셉트를 앱에 적용한 상태가 아니며, 기록 작성·조회 화면은 새로 구현해야 합니다. 저장소·미디어·앱 상태 모델·암호화·백업·낙서 처리 로직과 관련 코어/저장소 테스트는 남겼습니다. 초기화 화면은 기존 DB를 열거나 기기 데이터를 수정하지 않습니다. 임시 단색 D 아이콘은 최종 브랜드 아이콘이 아닙니다.

## 프로젝트

- `android/app/` — Compose 시작 화면, 보존된 AppModel·저장·미디어·낙서 처리
- `android/core/` — 데이터 모델·암호화·백업·낙서 좌표와 단위 테스트
- `shared/` — Android 모듈에서 참조하는 암호화 규격·테스트 벡터·라이선스
- `docs/design/` — 디자인 탐색 HTML, PDF, 로컬 사진과 출처
- `.github/workflows/android.yml` — Android 빌드·lint·코어/저장소 검증 설정

## Android 개발

Android Studio에서 `android/`를 엽니다. 프로젝트 설정은 JDK 17, Gradle 8.13, SDK 36, 최소 API 26입니다. 로컬 SDK 경로는 무시되는 `android/local.properties`의 `sdk.dir`에 지정합니다.

```sh
cd android
./gradlew :core:test :app:assembleDebug :app:lintDebug
```

기기 검증은 개인 기록이 없는 테스트 전용 에뮬레이터에서만 실행합니다. 기존 수동 테스트 기기에는 사용자 기록이 있을 수 있습니다.

```sh
./gradlew :app:connectedDebugAndroidTest
```

운영 서명은 `DRAWRY_KEYSTORE`, `DRAWRY_STORE_PASSWORD`, `DRAWRY_KEY_ALIAS`, `DRAWRY_KEY_PASSWORD`로 설정합니다. 현재 상태는 배포용 완성 앱이 아닙니다.

다음 작업은 [TODO](TODO.md), 재개 방법은 [HANDOFF](HANDOFF.md), 실행한 검증은 [VALIDATION_STATUS](VALIDATION_STATUS.md)를 확인합니다.
