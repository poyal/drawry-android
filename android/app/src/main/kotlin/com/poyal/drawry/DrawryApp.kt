package com.poyal.drawry

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/** Neutral reset screen. HTML concepts are proposals, not the selected app theme. */
@Composable
fun DrawryApp() {
    MaterialTheme(colorScheme = if (isSystemInDarkTheme()) darkColorScheme() else lightColorScheme()) {
        Surface(Modifier.fillMaxSize()) {
            Column(
                Modifier.safeDrawingPadding().verticalScroll(rememberScrollState()).padding(24.dp),
                verticalArrangement = Arrangement.spacedBy(20.dp),
            ) {
                Spacer(Modifier.height(64.dp))
                Text("Drawry", style = MaterialTheme.typography.displayMedium)
                Text("사진 위에 그리는 나의 그림일기", style = MaterialTheme.typography.titleLarge)
                HorizontalDivider()
                Text("새 디자인을 준비하고 있습니다.", style = MaterialTheme.typography.headlineSmall)
                Text("기존 화면을 초기화했습니다. 열두 가지 디자인 콘셉트 중 방향을 선택한 뒤 Android 화면을 구현합니다.")
                Text("디자인 시안: docs/design/index.html", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
