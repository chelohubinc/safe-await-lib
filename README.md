# SAFE-AWAIT

[![Build Status](https://github.com/chelohubinc/safe-await/actions/workflows/ci.yml/badge.svg)](https://github.com/chelohubinc/safe-await/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/safe-await.svg)](https://www.npmjs.com/package/safe-await)
[![License](https://img.shields.io/npm/l/safe-await.svg)](https://github.com/chelohubinc/safe-await/blob/main/LICENSE)

Safe async/await utility for handling promises without try/catch.  
Designed for **Node.js**, **TypeScript**, **React**, **React Native**, and **Expo**.

---

## 📌 Why SAFE-AWAIT?

Traditional async/await patterns require `try/catch` blocks, which can clutter code and make error handling inconsistent.  

**SAFE-AWAIT solves this problem by:**

- Returning a consistent `[SafeError | null, T | null]` tuple for every async operation
- Normalizing errors into a predictable format
- Eliminating boilerplate `try/catch` blocks
- Making code cleaner, safer, and easier to maintain

---

## 🚀 Features

- Safe execution of async functions and promises
- Standardized error handling with `SafeError` objects
- Fully TypeScript-typed for modern development
- Compatible with Node.js, React, React Native, and Expo
- Supports dual module output (ESM + CJS)
- Tree-shakable for modern bundlers
- Future-ready with planned modules: `withTimeout`, `retry`, `all`, `allSettled`, `once`, `strict`, `map`, `unwrap`, `mockSuccess`, `mockError`, `debug`

---

## 📦 Installation

```bash
# npm
npm install safe-await

# yarn
yarn add safe-await

# pnpm
pnpm add safe-await
````

---

## ⚡ Basic Usage

```ts
import safe from 'safe-await';

// Async function
async function fetchData() {
  return Promise.resolve('Hello World!');
}

// Using safe
const [err, data] = await safe(fetchData);

if (err) {
  console.error(err.message);
} else {
  console.log(data); // 'Hello World!'
}

// Direct promise usage
const [err2, result] = await safe(Promise.resolve(42));
```

---

## 🛠️ API Overview

### `safe(input: SafeInput<T>): SafeResult<T>`

- **input**: `Promise<T>` or `() => T | Promise<T>`
- **returns**: `[SafeError | null, T | null]`

### `SafeError` Structure

```ts
interface SafeError {
  message: string;   // Human-readable message
  code: string;      // Standardized error code
  cause?: unknown;   // Original error or additional context
}
```

---

## 🌱 Advanced Usage Examples

### Handling multiple async operations

```ts
// Future module: safe.all
const [err, results] = await safe.all([fetchData(), Promise.resolve(10)]);
```

### Using retry (planned in v0.2.0)

```ts
const [err, data] = await safe.retry(() => fetchData(), { attempts: 3, delay: 500 });
```

---

## 📊 Roadmap

| Version | Features Planned       |
| ------- | ---------------------- |
| v0.2.0  | withTimeout, retry     |
| v0.3.0  | all, allSettled        |
| v0.4.0  | withContext            |
| v0.5.0  | once                   |
| v0.6.0  | strict                 |
| v0.7.0  | map, unwrap            |
| v0.8.0  | mockSuccess, mockError |
| v0.9.0  | debug                  |

---

## 🧪 Development

```bash
# Install dev dependencies
npm install

# Run development build with watch
npm run dev

# Type check
npm run typecheck

# Run tests
npm test

# Build for distribution
npm run build
```

---

## 📝 Contributing

SAFE-AWAIT welcomes contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Run tests locally (`npm test`)
4. Submit a pull request

Please adhere to the existing **TypeScript typings** and **code style**.

---

## ❓ FAQ / Tips

- **Why use `[SafeError | null, T | null]` instead of try/catch?**
  It ensures consistent error handling and makes async code more readable.

- **Can I use this in React Native / Expo?**
  Yes. SAFE-AWAIT is fully compatible.

- **How do I handle retries or timeouts?**
  Future modules like `retry` and `withTimeout` will handle these cases cleanly.

---

## 📖 License

ISC License © Chelohub Inc.

---

## 🌐 Links

- **GitHub:** [https://github.com/chelohubinc/safe-await](https://github.com/chelohubinc/safe-await)
- **NPM:** [https://www.npmjs.com/package/safe-await](https://www.npmjs.com/package/safe-await)
