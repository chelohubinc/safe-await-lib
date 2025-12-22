import { coreSafe } from "./core/safe";

/**
 * `safe` is the core function of the SAFE-AWAIT-LIB package.
 *
 * It safely executes any synchronous or asynchronous operation and
 * always returns a predictable tuple instead of throwing errors.
 *
 * ## Basic usage
 * ```ts
 * import safe from "safe-await-lib";
 *
 * const [err, data] = await safe(async () => fetchData());
 *
 * if (err) {
 *   console.error(err.message, err.code);
 * } else {
 *   console.log(data);
 * }
 * ```
 *
 * ## Philosophy
 * - No try/catch pollution
 * - No unhandled promise rejections
 * - Explicit error handling
 *
 * ## Planned extensions
 * - v0.2.0: withTimeout, retry
 * - v0.3.0: all, allSettled
 * - v0.4.0: withContext
 * - v0.5.0: once
 * - v0.6.0: strict
 * - v0.7.0: map, unwrap
 * - v0.8.0: mockSuccess, mockError
 * - v0.9.0: debug
 *
 * ## Return value
 * Always returns a tuple:
 * - `[null, result]` on success
 * - `[SafeError, null]` on failure
 */
export const safe = Object.assign(coreSafe, {
    // v0.2.0
    // withTimeout,
    // retry,

    // v0.3.0
    // all,
    // allSettled,

    // v0.4.0
    // withContext,

    // v0.5.0
    // once,

    // v0.6.0
    // strict,

    // v0.7.0
    // map,
    // unwrap,

    // v0.8.0
    // mockSuccess,
    // mockError,

    // v0.9.0
    // debug,
});

export default safe;