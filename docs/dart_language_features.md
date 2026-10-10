# Dart Language Features

## Purpose

Provide a concise reference for key Dart language features, patterns, and idioms that the agent uses to write idiomatic, maintainable code.

## When to Consult

- Implementing new logic functions.
- Refactoring existing code.
- When dealing with asynchronous code.
- When ensuring null safety and type correctness.

## Scope

- Null safety and optionals.
- Async & await, Futures, Streams.
- Pattern matching (switch, when, pattern).
- Extension methods and mixins.
- Error handling with `try..catch` and custom exceptions.
- Generics and covariance/contravariance.
- Interfacing with native code via `ffi`.
- Code generation (`json_serializable`, `built_value`).

## Core Concepts

1. **Null Safety** – All types are non‑nullable by default; use `?` to allow null.
2. **Asynchronous Programming** – `Future<T>` and `Stream<T>` for single‑value async and event streams.
3. **Generics** – Type parameters with bounds.
4. **Extension Methods** – Add methods to existing classes.
5. **Pattern Matching** – Dart 3 introduces `switch`, `when`, and destructuring.
6. **Error Handling** – Use `throw` and `catch` blocks; define custom `Exception` classes.
7. **Interfacing with C** – `ffi` for native bindings; use `DynamicLibrary`.

## Detailed Operational Guidance

### Null Safety
```dart
String? maybeName; // can be null
final name = maybeName ?? 'Anonymous'; // null check
```
- Avoid `!` operator unless guaranteed non‑null.
- Use `late` for late initialization.

### Async & Await
```dart
Future<int> fetchCount() async {
  final response = await http.get(url);
  return int.parse(response.body);
}
```
- Prefer `await` over `.then()` in most cases.
- For multiple concurrent await, use `Future.wait`.

### Streams
```dart
Stream<int> countStream() async* {
  for (var i = 0; i < 10; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}
```
- Use `async*` and `yield` for generators.

### Generics
```dart
class Result<T> {
  final T value; // holds any type
  Result(this.value);
}
```
- Prefer covariance: `class Output<out T>` if output‑only.

### Extension Methods
```dart
extension StringX on String {
  bool get isNumber => double.tryParse(this) != null;
}
```
- Keep extensions focused on a single class.

### Pattern Matching (Dart 3)
```dart
String describe(num value) => switch (value) {
  0 => 'zero',
  1 => 'one',
  _ => 'many',
};
```
- Use `when` for `sealed` classes.

### Error Handling
```dart
try {
  riskyOperation();
} catch (e) {
  if (e is FormatException) {
    // specific handling
  } else rethrow;
}
```
- Prefer custom exceptions for domain errors.

## Rules and Constraints
- Never use `dynamic` unless interop; prefer strong types.
- Keep async boundaries minimal; return Futures, not synchronous values.
- For UI code, avoid long heavy sync ops in `build`.
- Use `const` constructors for immutable classes.
- Document public API with `///` comments.

## Practical Implementation Guidance
- Use `dart format` to keep style consistent.
- Generate boilerplate with `dart run build_runner build`.
- Enable `effective_dart` lint rules via `analysis_options.yaml`.

## Common Mistakes
- Using `new` keyword unnecessarily.
- Forgetting the `async` modifier on async functions.
- Unhandled `Future`s leading to silent failures.
- Over‑using `dynamic` causing runtime errors.

## Troubleshooting
- **Unhandled error** – Run `flutter run` with `--observe` to inspect stack.
- **Compilation error** – Check null‑safe annotations.
- **Memory leak** – Ensure `StreamSubscription` is cancelled.

## Cross‑Platform Considerations
- For platform channels, `MethodChannel` use null safety types.
- Use `ConditionalImport` to separate Android/ iOS/ Windows code.

## Related Knowledge
- [Flutter Widgets](flutter_widgets.md)
- [Design Tokens](design_tokens.md)
- [Godot Project Structure](godot_project_structure.md)

## Official References
- Dart language tour: https://dart.dev/guides/language
- Async programming: https://dart.dev/codelabs/async-await
- Generics: https://dart.dev/guides/language/language-tour#generics
- Pattern matching: https://dart.dev/guides/language/language-tour#pattern-match

## Version / Date
- Updated: 2026‑10‑07
- Dart SDK: 3.3
