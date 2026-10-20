# GitHub Actions 중지

사용자가 실행 정책을 정해줄 때까지 GitHub Actions를 실행하지 않는다.
자동 실행과 수동 실행 모두 새로 구성하거나 다시 활성화하지 않는다.

기존 Android 워크플로는 `disabled-workflows/android.yml`에 보관한다.
`.github/workflows`에는 실행 가능한 YAML 파일을 두지 않는다.
이 변경은 워크플로 파일을 비활성 위치로 이동한 것이며, GitHub 저장소의 Actions 권한 설정을 변경한 것은 아니다.
