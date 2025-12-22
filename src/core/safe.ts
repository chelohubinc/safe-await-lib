import { formatError } from "../errors/formatter";
import { SafeInput, SafeResult } from "./type";

/**
 * Internal execution engine for SAFE-AWAIT.
 *
 * This function executes a promise or a function safely and converts
 * any thrown or rejected value into a standardized `SafeResult` tuple.
 *
 * It is intentionally minimal and side-effect free, serving as the
 * foundation for all higher-level modules (retry, timeout, etc.).
 *
 * @param input - A promise or a function returning a value or a promise
 *
 * @returns A Promise resolving to a `[SafeError | null, T | null]` tuple
 */
export async function coreSafe<T>(input: SafeInput<T>): SafeResult<T> {
    try {
        const promise = typeof input === 'function' ? input() : input;
        const data = await promise;

        return [null, data];
    } catch (error) {
        return [formatError(error), null];
    }
}
