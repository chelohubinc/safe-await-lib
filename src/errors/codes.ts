/**
 * Standardized error codes used across the SAFE-AWAIT-LIB package.
 *
 * These codes allow consumers to reliably identify the nature
 * of an error without relying on string comparison of messages.
 *
 * Each module of the package should use one of these codes
 * when returning or normalizing an error.
 */
export const ERROR_CODES = {
    /** Fallback error for unknown or unhandled failures */
    UNKNOWN: 'UNKNOWN_ERROR',

    /** Thrown when an operation exceeds a configured timeout */
    TIMEOUT: 'TIMEOUT_ERROR',

    /** Used when all retry attempts have failed */
    RETRY_FAILED: 'RETRY_FAILED',

    /** Used when an operation is explicitly aborted or cancelled */
    ABORTED: 'ABORT_ERROR',

    /** Used when input validation fails */
    VALIDATION: 'VALIDATION_ERROR',

    /** Used when a function guarded by `once()` is called more than once */
    EXECUTION_ONCE: 'ALREADY_EXECUTED'
} as const;

/**
 * Union type of all supported error codes.
 *
 * This type ensures strong typing and prevents the use
 * of unsupported or custom error codes across the package.
 */
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

/**
 * Internal helper interface to support the `cause` property
 * on Error objects in environments where it is not
 * yet fully supported or typed.
 *
 * This allows SAFE-AWAIT-LIB to preserve the original error
 * while still returning a normalized SafeError object.
 */
export interface ErrorWithCause extends Error {
    cause?: unknown;
}
