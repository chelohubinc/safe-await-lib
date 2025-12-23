import { formatError } from "../errors/formatter";
import { SafeInput, SafeResult } from "./type";

/**
 * Internal execution engine for SAFE-AWAIT-LIB.
 *
 * Safely executes a promise, synchronous value, or a function returning a value or promise,
 * converting any thrown or rejected value into a standardized `SafeResult` tuple.
 *
 * ## Behavior
 * - Resolves with `[null, result]` if the operation succeeds.
 * - Resolves with `[SafeError, null]` if the operation throws or rejects.
 * - Never throws — always returns `[SafeError | null, T | null]`.
 *
 * @param input - A promise, a synchronous value, or a function returning a value or promise
 *
 * @returns A Promise resolving to a `[SafeError | null, T | null]` tuple
 */
export async function coreSafe<T>(input: SafeInput<T>): SafeResult<T> {
    try {
        const promise = typeof input === 'function' ? input() : input;
        const result = await promise;
        return [null, result];
    } catch (error) {
        return [formatError(error), null];
    }
}
