# Changelog

All notable changes to this project will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/)
and the format is inspired by [Keep a Changelog](https://keepachangelog.com/).

---

## [0.2.0] - 2025-12-23

### ✨ Added
- `safe.withTimeout(input, ms)`
  - Safely executes an async operation with a timeout
  - Returns a standardized `SafeError` with code `TIMEOUT_ERROR` on timeout
- `safe.retry(input, options)`
  - Retries a failing async operation
  - Configurable retries, delay, and retry callback
  - Returns `RETRY_FAILED` error code when all attempts fail

### 🧠 Improved
- Clearer error normalization across timeout and retry modules
- Better alignment between runtime behavior and TypeScript typings

---

## [0.1.4] - 2025-12-21

### ✨ Added
- Named exports for internal types and utilities
  - Exported `SafeError`
  - Exported shared TypeScript types
- Improved public API accessibility without breaking changes

---

## [0.1.3] - 2025-12-21

### 🐛 Fixed
- Package naming and repository normalization
- Corrected npm publishing configuration
- Improved build output consistency (ESM + CJS)

---

## [0.1.2] - 2025-12-21

### 🎉 Initial Release
- Core `safe()` function
- Standardized `SafeError` format
- Full TypeScript support
- Dual module output (ESM + CJS)

