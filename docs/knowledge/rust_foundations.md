# Rust Foundations

## Selection guidance

Use Rust when memory safety, predictable performance, native integration, or a low-level toolchain materially improves the product. Start with stable Rust and pin the toolchain when compatibility matters.

## Core rules

- Ownership gives each value one owner; moving transfers ownership. Borrow with `&T` for shared access or `&mut T` for exclusive access.
- Lifetimes describe relationships between references; they do not extend an object's lifetime. Prefer owned data at boundaries and borrowed data inside short-lived operations.
- Traits express shared behavior; generics provide static polymorphism. Use enums and exhaustive `match` for closed state spaces.
- Return `Result<T, E>` for recoverable failures and preserve context; reserve panics for broken invariants or unrecoverable startup conditions.
- Async is cooperative: keep blocking I/O and CPU-heavy work off async executors. Choose concurrency primitives from ownership and cancellation requirements.
- Safe Rust prevents memory and data-race undefined behavior, not deadlocks, leaks, bad business decisions, or all resource exhaustion.

## Rust 2024

Set `edition = "2024"` intentionally. Audit newly unsafe environment/process functions, explicit unsafe blocks (`unsafe_op_in_unsafe_fn`), pattern restrictions, prelude additions, macro fragment behavior, and RPIT lifetime capture. Run `cargo fix --edition`, then review every generated change.

## Project operations

- Use Cargo workspaces for related crates and explicit dependency ownership.
- Keep feature flags small and document platform-specific features.
- Use `cargo test` for behavior, `cargo bench` for repeatable microbenchmarks, and a profiler for bottleneck diagnosis. Do not infer performance from benchmarks alone.
- Use release profiles for shipping; measure startup, memory, frame time, I/O, and binary size on target hardware.
- Isolate `cfg` platform code behind small adapters. Cross-compile only after validating target toolchains, native libraries, signing, packaging, and runtime behavior.

## Unsafe and FFI

Keep unsafe code at narrow boundaries with documented invariants, `repr(C)` layouts where required, explicit ownership and thread rules, and tests against the foreign ABI. Wrap raw bindings in a safe API. Never let panics or foreign exceptions cross an incompatible ABI.

## Sources

- Rust Book: https://doc.rust-lang.org/book/ (Rust 1.97.0+, 2026-07-09; Rust 2024)
- Rust Reference: https://doc.rust-lang.org/reference/ (stable language reference; verified 2026-10-08)
- Cargo Book: https://doc.rust-lang.org/cargo/ (verified 2026-10-08)
- Standard library: https://doc.rust-lang.org/std/ (verified 2026-10-08)
- Rust 2024 Edition Guide: https://doc.rust-lang.org/edition-guide/rust-2024/ (verified 2026-10-08)
- Rustonomicon: https://doc.rust-lang.org/nomicon/ (incomplete; use for unsafe/FFI concepts, verify APIs against current references)
- Rust API and delivery guidance: `docs/knowledge/rust_ecosystem.md`
