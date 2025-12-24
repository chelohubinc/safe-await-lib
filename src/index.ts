import { coreSafe } from "./core/safe";
import { retry } from "./modules/retry";
import { withTimeout } from "./modules/timeout";

/**
 * Executes a synchronous or asynchronous operation safely.
 *
 * `safe` wraps any function, promise, or value and always returns a predictable tuple
 * instead of throwing errors.
 *
 * ## Usage
 * ```ts
 * const [err, data] = await safe(() => doSomething());
 * const [err2, data2] = await safe(fetchData()); // promise directly
 * const [err3, value] = await safe(42);          // synchronous value
 *
 * if (err) {
 *   console.error(err.code, err.message);
 * }
 * ```
 *
 * ## Behavior
 * - Never throws — always returns `[SafeError | null, T | null]`
 * - Normalizes any thrown or rejected value into a `SafeError`
 * - Supports promises, synchronous values, or functions returning a value or promise
 *
 * ## Return
 * - `[null, result]` on success
 * - `[SafeError, null]` on failure — use `err.code` to identify the error type
 */
export const safe = Object.assign(coreSafe, {
    withTimeout,
    retry,

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

export type {
    SafeError,
    SafeResult,
    SafeInput
} from "./core/type";

export type {
    ErrorCode,
    ErrorWithCause
} from "./errors/codes";

export type {
    RetryOptions
} from "./modules/retry";

export { ERROR_CODES } from "./errors/codes";

export default safe;