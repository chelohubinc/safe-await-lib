import { ERROR_CODES } from '../errors/codes';
import { formatError } from '../errors/formatter';
import { SafeInput, SafeResult } from './../core/type';

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
 * - Resolves with `[null, result]` if the operation completes within the timeout.
 * - Resolves with `[SafeError, null]` if the operation throws or exceeds the timeout.
 * - Never throws — always returns `[SafeError | null, T | null]`.
 * - Use `err?.code === ERROR_CODES.TIMEOUT` to detect timeout errors specifically.
 *
 * @param input A promise or a function returning a value or a promise
 * @param input A promise, a synchronous value, or a function returning a value or a promise
 */
export async function withTimeout<T>(input: SafeInput<T>, ms: number): SafeResult<T> {
    let timer: ReturnType<typeof setTimeout>;

    try {
        const promise = typeof input === 'function' ? input() : input;

        const timeoutPromise = new Promise<never>((_, reject) => {
            timer = setTimeout(() => reject(formatError(new Error(`Timeout after ${ms}ms`), ERROR_CODES.TIMEOUT)), ms);
        });

        const result = await Promise.race([promise, timeoutPromise]);
        return [null, result];
    } catch (error: any) {
        return [error, null];
    } finally {
        clearTimeout(timer!);
    }
}