# Rust Ecosystem and Delivery

## API and library conventions

- Design APIs for discoverability, predictable behavior, clear ownership, and interoperability with ordinary Rust types.
- Prefer consistent naming, `From`/`Into` conversions where semantics are obvious, standard traits when behavior matches, and documentation for panics, errors, safety, and complexity.
- Keep public types minimal and future-proof. Avoid exposing implementation details or unnecessary generic parameters.
- Make invalid states difficult to represent, but do not hide expensive work, allocation, blocking, or mutation behind innocent-looking methods.

## Error handling and tests

- Use typed errors at boundaries and add context at layer transitions. Preserve the original cause; do not stringify errors too early.
- Unit-test pure logic, integration-test boundaries, and exercise platform/FFI contracts with representative target builds.
- Test cancellation, timeouts, malformed input, partial I/O, concurrent access, persistence failure, and version migration—not only the happy path.

## Build and distribution

- Use workspaces for related crates, lock dependencies for applications, audit licenses and advisories, and keep feature flags explicit.
- Treat release profiles, target triples, native libraries, signing, installers, runtime assets, and update strategy as one distribution design.
- Use `cargo check` for fast feedback, `cargo test` for behavior, `cargo clippy` for maintainability, `cargo bench` for controlled benchmarks, and release builds for performance evidence.
- Cross-platform code should share domain behavior and isolate `cfg` blocks/native calls behind small adapters. Verify each target independently.

## Sources

- Rust API Guidelines: https://rust-lang.github.io/api-guidelines/ (official Rust library-team guidance; verified 2026-10-08)
- Cargo profiles: https://doc.rust-lang.org/cargo/reference/profiles.html (verified 2026-10-08)
- Cargo Book: https://doc.rust-lang.org/cargo/ (workspaces, dependencies, testing, packaging)
