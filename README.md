# Drawry — Android

사진 자체 위에 선·그림·글씨를 덧그리고, 짧은 이야기와 함께 기기에 보관하는 그림일기 앱입니다. Kotlin·Jetpack Compose 기반의 **Android 전용 프로젝트**입니다.

## 최종 디자인 먼저 보기

- **[최종 디자인 HTML](docs/design/index.html)** — 연결 엽서 화면 1종(라이트 4개·다크 4개)과 확정된 딸기 우유 스케치북 아이콘
- **[최종 디자인 PDF](docs/design/final-design.pdf)** — 아이콘을 포함한 표지·라이트·다크, A4 가로 3쪽
- **[디자인 가이드 v1.1](docs/design/design-system.html)** — 문구·색상·서체·컴포넌트·배치·상태·아이콘 사용 규칙
- [구현 명세](docs/design/DESIGN_SYSTEM.md) · [공통 토큰](docs/design/design-tokens.js) — Android dp/sp와 콘텐츠·상태 규칙
- **[최종 아이콘 PNG](docs/design/assets/app-icon.png)** — 딸기 우유 스케치북, 승인된 1254×1254 원본 · [제작 기록](docs/design/assets/app-icon.prompt.json)
- [PDF 원본 HTML](docs/design/print.html) — 브라우저 인쇄용

HTML은 파일을 브라우저에서 직접 열면 됩니다. 사진·CSS·JavaScript가 로컬에 있어 네트워크나 설치가 필요 없습니다. `docs/design/` 폴더째 옮기면 다른 컴퓨터에서도 열립니다.

화면은 **Two Little Things — 두 장으로 남긴 하루**로 확정했습니다. 연결 엽서·리넨 톤·둥근 버튼을 사용하며, 기록 홈·사진에 그리기·일기 작성·완성된 일기를 라이트·다크로 제공합니다. `:)`는 상단 로고에만 제목과 같은 글자색으로 표시합니다. 사진과 그린 선은 원래 비율과 색을 유지합니다.

화면은 2026-10-20, **딸기 우유 스케치북 아이콘은 2026-10-21** 사용자 승인으로 확정했습니다. 아이콘의 핑크 표지·흰 링 2개·사진·로즈색 붓선은 같은 원본을 사용하며 화면의 리넨 팔레트와 구분합니다. 가이드 v1.1에 아이콘 사용 기준을 반영했습니다.

화면 이름은 고정이고, 일기 제목 하나와 사진별 이야기는 직접 작성합니다. 빈 제목은 기록 날짜로 표시하며 빈 메모는 상세에서 숨깁니다. 실제 구현은 디자인 기준의 dp/sp를 사용하며 압축된 시안의 px 값을 그대로 옮기지 않습니다.

`docs/design/`에는 최종 화면·아이콘·가이드와 필요한 표시·인쇄 소스만 남겼습니다. 이전 후보·색상 비교·흑백 샘플과 비교 PDF는 정리했습니다. 시안 속 작성·저장 도구는 실제 앱 기능과 연결되지 않은 미리보기이며, Android 화면과 런처 리소스 적용은 다음 단계입니다.

PDF를 갱신할 때는 로컬 Playwright와 Chrome이 준비된 환경에서 `node docs/design/export-pdf.cjs`를 실행합니다. 별도 경로의 Playwright는 `DRAWRY_PLAYWRIGHT_MODULE`로 지정할 수 있습니다. 이 명령은 사진·그림의 인쇄용 PNG와 3쪽 PDF를 함께 갱신합니다.

## 현재 상태

**현재 Android 앱에는 최종 디자인의 구현 대기 안내 화면만 있습니다.** 기록 작성·조회 화면은 새로 구현해야 합니다. 저장소·미디어·앱 상태 모델·암호화·백업·낙서 처리 로직과 관련 코어/저장소 테스트는 보존했습니다. 안내 화면은 기존 DB를 열거나 기기 데이터를 수정하지 않습니다. 런처에는 임시 단색 D 아이콘이 남아 있으며 확정된 스케치북 아이콘의 네이티브 자산 제작·적용은 다음 단계입니다.

## 프로젝트

- `android/app/` — Compose 시작 화면, 보존된 AppModel·저장·미디어·낙서 처리
- `android/core/` — 데이터 모델·암호화·백업·낙서 좌표와 단위 테스트
- `shared/` — Android 모듈에서 참조하는 암호화 규격·테스트 벡터·라이선스
- `docs/design/` — 디자인 기준·공통 토큰, 최종 HTML·PDF, 표시·인쇄 소스와 로컬 사진
- `.github/disabled-workflows/android.yml` — 중지한 Android 검증 설정. 실행 정책을 정할 때까지 GitHub Actions를 활성화하지 않습니다.

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
