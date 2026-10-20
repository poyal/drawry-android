package com.poyal.drawry

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/** Placeholder until the approved design baseline is implemented in Compose. */
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
                Text("최종 디자인을 확정했습니다.", style = MaterialTheme.typography.headlineSmall)
                Text("연결된 엽서에 사진과 이야기를 담는 디자인입니다. 확정된 디자인 기준에 따라 Android 화면을 구현할 예정입니다.")
                Text("디자인 기준: docs/design/design-system.html", style = MaterialTheme.typography.bodySmall)
                Text("최종 시안: docs/design/index.html", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
