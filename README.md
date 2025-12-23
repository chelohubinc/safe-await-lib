# SAFE-AWAIT-LIB

[![Build Status](https://github.com/chelohubinc/safe-await-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/chelohubinc/safe-await-lib/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/safe-await-lib.svg)](https://www.npmjs.com/package/safe-await-lib)
[![License](https://img.shields.io/npm/l/safe-await-lib.svg)](https://github.com/chelohubinc/safe-await-lib/blob/main/LICENSE)

Safe async/await utility for handling promises **without try/catch**.  
Designed for **Node.js**, **TypeScript**, **React**, **React Native**, and **Expo**.

---

## 📌 Why SAFE-AWAIT-LIB?

Traditional `async / await` requires repetitive `try/catch` blocks, which:

- clutter business logic
- encourage inconsistent error handling
- hide error intent

**SAFE-AWAIT-LIB** solves this by enforcing a predictable, explicit error-handling pattern.

### Core idea

> **Async code should never throw — it should return.**

---

## 🚀 Features (v0.2.0)

- Safe execution of async functions and promises
- Always returns a predictable tuple: `[SafeError | null, T | null]`
- Standardized error normalization
- Fully typed with TypeScript
- Compatible with Node.js, React, React Native, and Expo
- Dual output: **ESM + CJS**
- Tree-shakable
- Built-in utilities:
  - `safe.withTimeout` — timeout control for async operations
  - `safe.retry` — retry logic for unstable operations

---

## 📦 Installation

```bash
# npm
npm install safe-await-lib

# yarn
yarn add safe-await-lib

# pnpm
pnpm add safe-await-lib
````

---

## ⚡ Basic Usage

```ts
import safe from 'safe-await-lib';

async function fetchData() {
  return 'Hello World';
}

const [err, data] = await safe(fetchData);

if (err) {
  console.error(err.message, err.code);
} else {
  console.log(data); // "Hello World"
}
```

### Using a direct promise

```ts
const [err, result] = await safe(Promise.resolve(42));
```

---

## 🛠️ API

### `safe(input)`

```ts
safe<T>(input: Promise<T> | (() => T | Promise<T>))
  → Promise<[SafeError | null, T | null]>
```

---

### `SafeError` structure

```ts
interface SafeError {
  message: string;   // Human-readable message
  code: string;      // Standardized error code
  cause?: unknown;   // Original error or context
}
```

---

## 🌱 Advanced Usage (v0.2.0)

### ⏱️ Timeout handling — `safe.withTimeout`

```ts
const [err, data] = await safe.withTimeout(fetchData(), 1000);

if (err?.code === 'TIMEOUT_ERROR') {
  console.error('Operation timed out');
}
```

---

### 🔁 Retry logic — `safe.retry`

```ts
const [err, data] = await safe.retry(
  () => fetchData(),
  {
    retries: 3,
    delayMs: 500,
    onRetry: (error, attempt) => {
      console.log(`Retry ${attempt} failed`, error);
    }
  }
);

if (err) {
  console.error(err.code); // RETRY_FAILED
}
```

---

## ✅ Available Today (v0.2.0)

SAFE-AWAIT-LIB currently provides:

- `safe()` — core safe async execution
- `safe.withTimeout()` — timeout control
- `safe.retry()` — retry mechanism

More utilities will be added incrementally.

---

## 🧪 Development

```bash
# Install dependencies
npm install

# Development build (watch mode)
npm run dev

# Type checking
npm run typecheck

# Run tests
npm test

# Build for production
npm run build
```

---

## 📊 Roadmap

| Version | Features               |
| ------: | ---------------------- |
|  v0.2.0 | withTimeout, retry ✅  |
|  v0.3.0 | all, allSettled        |
|  v0.4.0 | withContext            |
|  v0.5.0 | once                   |
|  v0.6.0 | strict                 |
|  v0.7.0 | map, unwrap            |
|  v0.8.0 | mockSuccess, mockError |
|  v0.9.0 | debug                  |

---

## 📝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Add tests for your changes
4. Ensure `npm test` passes
5. Submit a pull request

Please respect the existing **TypeScript typings** and **error model**.

---

## ❓ FAQ

### Why return a tuple instead of throwing?

It enforces explicit error handling and removes runtime surprises.

### Can I use this in React Native or Expo?

Yes. SAFE-AWAIT-LIB is runtime-agnostic and fully compatible.

### Is this production-ready?

Yes. The core API is stable and versioned.

---

## 📖 License

ISC License © Chelohub Inc.

---

## 🌐 Links

- **GitHub:** [https://github.com/chelohubinc/safe-await-lib](https://github.com/chelohubinc/safe-await-lib)
- **NPM:** [https://www.npmjs.com/package/safe-await-lib](https://www.npmjs.com/package/safe-await-lib)
