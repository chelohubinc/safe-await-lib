import { safe } from 'safe-await';
import { describe, expect, it } from "vitest";

class CustomError extends Error { };

describe('coreSafe / safe()', () => {
    it('should return data for a resolved promise', async () => {
        const [err, data] = await safe(Promise.resolve(42));
        expect(err).toBeNull();
        expect(data).toBe(42);
    });

    it('should return data for a sync function', async () => {
        const [err, data] = await safe(() => 10 + 5);
        expect(err).toBeNull();
        expect(data).toBe(15);
    });

    it('should return normalized error for a rejected promise', async () => {
        const [err, data] = await safe(Promise.reject(new Error("Fail")));
        expect(err).not.toBeNull();
        expect(err?.message).toBe("Fail");
        expect(err?.code).toBe('UNKNOWN_ERROR');
        expect(data).toBeNull();
    });

    it('should return normalized error for a function that throws', async () => {
        const [err, data] = await safe(() => {
            throw new CustomError("Boom");
        });
        expect(err).not.toBeNull();
        expect(err?.message).toBe("Boom");
        expect(err?.code).toBe('UNKNOWN_ERROR');
        expect(data).toBeNull();
    });

    it('should handle string rejection', async () => {
        const [err, data] = await safe(Promise.reject("Simple string error"));
        expect(err).not.toBeNull();
        expect(err?.message).toBe("Simple string error");
        expect(err?.code).toBe('UNKNOWN_ERROR');
        expect(data).toBeNull();
    });

    it('should handle unknown rejection types', async () => {
        const [err, data] = await safe(Promise.reject({ random: 'object' }));
        expect(err).not.toBeNull();
        expect(err?.message).toBe("An unexpected error occurred");
        expect(err?.code).toBe('UNKNOWN_ERROR');
        expect(data).toBeNull();
    });
});
