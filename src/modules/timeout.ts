import { ERROR_CODES } from '../errors/codes';
import { formatError } from '../errors/formatter';
import { SafeResult } from './../core/type';

/**
 * Executes an operation with a time limit.
 *
 * If the operation does not resolve within the given duration,
 * it fails with a `TIMEOUT_ERROR`.
 *
 * ## Usage
 * ```ts
 * const [err, data] = await safe.withTimeout(fetchData(), 1000);
 *
 * if (err?.code === ERROR_CODES.TIMEOUT) {
 *   console.error("Operation timed out");
 * }
 * ```
 *
 * ## Behavior
 * - Resolves with `[null, result]` if completed in time
 * - Resolves with `[SafeError, null]` on timeout or failure
 * - Never throws
 *
 * @param input A promise or synchronous value
 * @param ms Timeout duration in milliseconds
 */
export async function withTimeout<T>(input: T | Promise<T>, ms: number): SafeResult<T> {
    let timer: ReturnType<typeof setTimeout>;

    try {
        const promise = typeof input === 'function' ? input() : input;

        const timeoutPromise = new Promise<never>((_, reject) => {
            timer = setTimeout(() => reject(formatError(new Error(`Timeout after ${ms}ms`), 'TIMEOUT_ERROR')), ms);
        });

        const result = await Promise.race([promise, timeoutPromise]);
        return [null, result];
    } catch (error: any) {
        return [error, null];
    } finally {
        clearTimeout(timer!);
    }
}