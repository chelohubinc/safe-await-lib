import { SafeError } from '../core/type';
import { ERROR_CODES, ErrorCode, ErrorWithCause } from './codes';

/**
 * Normalizes any thrown value into a `SafeError`.
 *
 * This function is the foundation of SAFE-AWAIT's error-handling strategy.
 * It guarantees that all errors returned by the library follow the same
 * predictable structure, regardless of what was originally thrown.
 *
 * Supported inputs:
 * - `Error` instances (native or custom)
 * - string errors
 * - unknown or non-error values
 *
 * ## Normalization rules
 * - Preserves the original error message when possible
 * - Uses a standardized error code
 * - Keeps the original error in the `cause` field when available
 *
 * @param err - Any value thrown or rejected by an operation
 * @param defaultCode - Fallback error code when none is provided
 *
 * @returns A normalized `SafeError` object
 */
export function formatError(
    err: unknown,
    defaultCode: ErrorCode = ERROR_CODES.UNKNOWN
): SafeError {
    if (err instanceof Error) {
        const errorWithCause = err as ErrorWithCause;

        return {
            message: err.message,
            code: (err as any).code || defaultCode,
            cause: errorWithCause.cause ?? err
        };
    }

    if (typeof err === 'string') {
        return {
            message: err,
            code: defaultCode,
        };
    }

    return {
        message: 'An unexpected error occurred',
        code: defaultCode,
        cause: err
    };
}
