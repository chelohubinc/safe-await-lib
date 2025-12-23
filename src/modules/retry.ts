import { SafeInput, SafeResult } from "../core/type";
import { formatError } from "../errors/formatter";

/**
 * Configuration options for the `retry` function.
 */
export interface RetryOptions {
    /**
     * Number of retry attempts (default: 3)
     */
    retries?: number;

    /**
     * Delay in milliseconds between attempts (default: 0)
     */
    delayMs?: number;

    /**
     * Callback invoked after each failed attempt
     */
    onRetry?: (error: unknown, attempt: number) => void;
}


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retries a failing operation multiple times before giving up.
 *
 * Useful for unstable or flaky operations such as network requests.
 *
 * ## Usage
 * ```ts
 * const [err, data] = await safe.retry(
 *   () => fetchData(),
 *   { retries: 3, delayMs: 500 }
 * );
 * ```
 *
 * ## Behavior
 * - Retries the operation up to `retries` times
 * - Optional delay between attempts
 * - Calls `onRetry` after each failure
 * - Returns `RETRY_FAILED` if all attempts fail
 *
 * @param input A function or promise to retry
 * @param options Retry configuration
 */
export async function retry<T>(input: SafeInput<T>, options: RetryOptions = {}): SafeResult<T> {
    const {
        retries = 3,
        delayMs = 0,
        onRetry
    } = options;

    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const data = typeof input === 'function' ? (await input()) : (await input);
            return [null, data];
        } catch (err) {
            lastError = err;
            onRetry?.(err, attempt);
            if (attempt < retries && delayMs > 0) {
                await sleep(delayMs);
            }
        }
    }

    return [formatError(lastError, 'RETRY_FAILED'), null];
}