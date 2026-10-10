# Software Architecture – Modular Design

## Purpose

Guide to building modular, maintainable, and testable software across platforms. The autonomous agent uses these patterns to structure code, separate concerns, and share logic.

## When to Consult

- Starting a new project or refactoring.
- Adding new features requiring clear boundaries.
- Planning cross‑platform logic reuse.

## Scope

- Layered architecture (Presentation → Domain → Data).
- Dependency Injection and Service Locator patterns.
- Repository and Data‑Source abstractions.
- Module boundaries, naming conventions.
- Testability and injection of mocks.

## Core Concepts

1. **Clean Architecture** – Core domain with no external dependencies.
2. **Dart/Flutter Pattern** – `src/` folders for features, `shared`, `common`.
3. **Dependency Injection** – `get_it` or `riverpod`.
4. **Hexagonal Architecture** – Ports (interfaces) and adapters (implementations).
5. **Feature Modules** – Encapsulated feature code.

## Detailed Operational Guidance

### Folder Layout
```
lib/
├── src/
│   ├── core/          # shared utils, constants, exceptions
│   ├── features/
│   │   └── auth/
│   │       ├── data/
│   │       │   ├── models/      # DTOs
│   │       │   └── datasources/ # API, local db
│   │       ├── domain/
│   │       │   ├── entities/    # core business entities
│   │       │   ├── repositories/ # domain abstraction
│   │       │   └── usecases/     # business logic
│   │       └── presentation/
│   │           ├── widgets/     # UI
│   │           └── bloc/        # state management
├── app.dart
└── main.dart
```

### Dependency Injection
- Register in `main.dart`: `GetIt.instance.registerLazySingleton<WeatherRepository>(() => WeatherApi());`
- Retrieve via `GetIt.instance<WeatherRepository>()` or via Riverpod provider.

### Repository Pattern
```dart
abstract class UserRepository {
  Future<User> getUser();
}
```
- Implement with API, local cache, or mocked version for tests.

### Hexagonal Ports
- `UserService` interface defines contract.
- Adapter: `RemoteUserService`, `LocalUserService`.

## Rules and Constraints
- No direct external calls in domain logic.
- Keep feature modules isolated; only expose public API.
- Use interfaces for all external dependencies.
- Prefer immutable data classes with `freezed` or `json_serializable`.

## Practical Implementation Guidance
- Use `dart run build_runner build` to generate implementations.
- Use `lint` rules: `pedantic`, `effective_dart`.
- Write unit tests per `usecase`, `repository`, and `widget`.
- Adopt `riverpod` or `provider` for state injection.

## Common Mistakes
- Tight coupling between UI and data; skip the domain layer.
- Mixing platform code in shared modules.
- Burying business logic in repository implementations.

## Troubleshooting
- **Missing dependency** – Ensure `GetIt` registration.
- **Cold start delay** – Avoid heavy initializations in `main.dart`.
- **Test failures** – Use `mockito` for isolation.

## Cross‑Platform Considerations
- For platform‑specific services, create separate packages or conditional imports.
- Use `platform_dispatcher` plugin to isolate platform code.

## Related Knowledge
- [Flutter Widgets](flutter_widgets.md)
- [Dart Language Features](dart_language_features.md)
- [Design Tokens](design_tokens.md)
- [AI Applications](ai_applications.md)

## Official References
- Clean Architecture by Uncle Bob: https://www.martinfowler.com/bliki/CleanArchitecture.html
- Flutter Architecture Overview: https://medium.com/flutter-hub/flutter-architecture-4b93d7a4e7a3
- Provider and GetIt: https://pub.dev/packages/provider, https://pub.dev/packages/get_it

## Version / Date
- Updated: 2026‑10‑07
- Dart SDK: 3.3
