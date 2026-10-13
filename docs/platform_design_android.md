# Platform Design – Android

## Purpose

This document consolidates official Android design guidelines and best‑practice patterns for building native Android applications. It serves as a quick reference for the agent when generating UI, navigation, or integrating platform services.

## When to Consult

- When starting a new Android screen or component.
- During UI/UX validation against Material 3.
- When adding platform‑specific features: push notifications, deep links, permissions, and background work.
- When preparing an Android release or troubleshooting build issues.

## Scope

- Material Design 3 components and styling.
- Android navigation (Navigation Component, deep linking).
- Lifecycle, permissions, and runtime behaviour.
- System integration: notifications, clipboard, file picker, shortcuts.
- Accessibility and localization.

## Core Concepts

1. **Material Design 3** – Adaptive theming, dynamic colors, elevation.
2. **Android Architecture Components** – ViewModel, LiveData, Flow, Room.
3. **Navigation** – SafeArgs, NavGraph, deep link handling.
4. **Lifecycle Awareness** – LifecycleOwner, observe, dispose.

## Detailed Operational Guidance

### Material Design 3
- Use the `androidx.compose.material3` library for Compose UI.
- Enable **dynamic color** via `MaterialTheme.colorScheme` with `dynamicLightColorScheme` / `dynamicDarkColorScheme`.
- Follow **elevation** guidelines (0– Elevation 6 for floating actions).
- Use **Surface** and **Card** components for content blocks.

### Navigation
- Define a `nav_graph.xml` using the Navigation Editor.
- Use `navController.navigate("/profile?userId=${id}")` with SafeArgs.
- Deep link the app’s URL scheme: `android:scheme="https"` in the manifest.

### Permissions
- Declare in the manifest and request at runtime.
- Use `ActivityResultContracts.RequestPermission` for single permissions.
- For batches, `multiplePermissions` contract.

### System Integration
- Toasts: `Toast.makeText(context, text, Toast.LENGTH_SHORT).show()`.
- Notifications: use the `NotificationCompat.Builder` with `Channel`.
- Shared Storage: `Files` via `getExternalFilesDir`.

### Accessibility
- Ensure `contentDescription` on interactive elements.
- Use semantic roles; Compose’s `Modifier.semantics`.
- Respect system font size changes; test with `scaleFactor`.

## Rules and Constraints
- Do not hardcode dimension units; use `dp` and `sp`.
- Avoid background work on main thread – use `WorkManager` or Coroutines.
- Keep third‑party libraries up to date to avoid permission conflicts.
- Use `android.app.assist.AssistScope` for quick actions.

## Practical Implementation Guidance
| Feature | Framework | Example |
|---------|-----------|---------|
| Button | Jetpack Compose | `Button(onClick = { }) { Text("Submit") }` |
| ViewModel | AndroidX | `class MyViewModel : ViewModel() { val data = MutableLiveData<String>() }` |
| Navigation | Compose Navigation | `val navController = rememberNavController()` |

## Common Mistakes
- Assuming all permissions are granted at install time.
- Over‑loading the UI thread with network or disk IO.
- Ignoring Android’s dark mode; neglecting to provide dark color scheme.

## Troubleshooting
- **App crashes on startup** – Check for missing `minSdkVersion` < 21.
- **UI flickers** – Avoid `MutableStateFlow` inside `onCreate` without proper scopes.
- **Missing deeplinks** – Ensure intent filters are declared and `android:launchMode` is `singleTop`.

## Cross‑Platform Considerations
- For cross‑platform projects using Flutter, map these guidelines to `MaterialApp` theming and `SafeArea` handling.
- Platform abstraction: Create shared `PlatformServices` interface to separate Android specifics.

## Related Knowledge
- [Platform Design – Windows](platform_design_windows.md)
- [Platform Design – macOS](platform_design_macos.md)
- [Design & UX](design_and_ux.md)
- [Design Tokens](design_tokens.md)

## Official References
- Android Developers: https://developer.android.com
- Material Design 3: https://m3.material.io
- Android Accessibility: https://developer.android.com/training/accessibility

## Version / Date
- Updated: 2026‑10‑07
- Android SDK: 33
- Kotlin 1.9
