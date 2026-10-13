# Performance Engineering

Measure before optimizing. Define user-visible budgets for startup, input latency, frame time, memory, I/O, battery, network, and binary size; profile representative release builds on target hardware.

- Keep hot paths allocation-aware, avoid repeated parsing and unnecessary rebuilds, and use bounded background work.
- Use async I/O for waits, but move CPU-heavy work to suitable workers and design cancellation/backpressure.
- Lazy-load expensive features and assets; cache stable or expensive results with invalidation rules.
- Virtualize long lists, reduce overdraw and excessive effects, optimize images/fonts, and inspect frame pacing rather than average FPS alone.
- Measure database queries, indexes, transactions, serialization, and migration cost.
- Treat cross-platform renderers, GPU backends, text shaping, window composition, and native bridges as platform-specific performance risks.
- Benchmark stable units with realistic data; use tracing/profilers for system interactions. Never trade correctness, accessibility, or maintainability for an unmeasured gain.
- Establish budgets before optimizing: cold/warm startup, input latency, frame-time percentile, peak memory, disk/network time, battery cost, and binary/install size. Record device, OS, build mode, dataset, and measurement method.
- Avoid unnecessary allocations, parsing, rebuilds, layout passes, overdraw, and serialized work. Virtualize large collections, lazy-load expensive features, batch I/O, and add caching only with an invalidation policy.

## Sources

- Rust standard library: https://doc.rust-lang.org/std/
- Cargo profiles: https://doc.rust-lang.org/cargo/reference/profiles.html
- Android performance: https://developer.android.com/topic/performance
- Windows design materials: https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/materials
