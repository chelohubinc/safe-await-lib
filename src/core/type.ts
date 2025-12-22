/**
 * Standardized error object used throughout the SAFE-AWAIT package.
 *
 * Every error returned by `safe()` or its extensions follows this shape,
 * ensuring consistent and predictable error handling.
 */
export interface SafeError {
    /** Human-readable error message */
    message: string;

    /** Machine-readable error code */
    code: string;

    /** Original error or additional context, if available */
    cause?: unknown;
}

/**
 * Standard return type for all SAFE-AWAIT operations.
 *
 * The result is always a tuple:
 * - `[null, T]` when the operation succeeds
 * - `[SafeError, null]` when the operation fails
 *
 * This pattern eliminates the need for try/catch blocks.
 */
export type SafeResult<T> = Promise<[SafeError | null, T | null]>;

/**
 * Accepted input type for the `safe()` function.
 *
 * Allows passing either:
 * - a Promise
 * - a function returning a value or a Promise
 *
 * This enables lazy execution and consistent error handling.
 */
export type SafeInput<T> = Promise<T> | (() => T | Promise<T>);
