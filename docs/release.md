# Android 출시 준비

최종 디자인과 기준 v1.0은 확정했으며, Android 기록 화면은 아직 미구현 상태로 출시할 수 없다.

프로젝트 설정: applicationId `com.poyal.drawry`, versionName `2.0.0`, versionCode `2`, minSdk 26, compile/target SDK 36, JDK 17, Gradle 8.13. 실제 출시 시 버전과 스토어 요구 사항을 다시 확인한다.

필요한 작업: 확정한 디자인 기준에 따른 앱 화면 구현, 런처 아이콘 제작, 실기기·접근성·백업/복원 검증, 16KB 네이티브 라이브러리 호환성 확인, Google Play 업로드 키·지원/개인정보 URL·설명·스크린샷 준비.

운영 서명은 README의 네 가지 환경 변수로 제공한다. 저장소에 인증 정보를 넣지 않는다. 현재 단색 D 아이콘은 개발용 임시 자산이다. 앱에 계정·서버·분석이 없는 실제 구현과 명시적 공유·카메라/마이크 사용을 기준으로 데이터 공개 문구를 작성한다.

실제 실행 검증 결과는 [VALIDATION_STATUS](../VALIDATION_STATUS.md)를 참고한다. CI 설정 존재를 원격 검증 통과로 간주하지 않는다.
