import { describe, expect, it } from "vitest";
import { ERROR_CODES, safe } from 'safe-await-lib';

describe('safe.withTimeout()', () => {
    it('resolves success before timeout', async () => {
        const fn = () => Promise.resolve("ok");
        const [err, data] = await safe.withTimeout(fn, 1000);
        expect(err).toBeNull();
        expect(data).toBe("ok");
    });

    it('return error on timeout', async () => {
        const fn = () => new Promise(resolve => setTimeout(() => resolve("ok"), 200));
        const [err, data] = await safe.withTimeout(fn, 100);
        expect(data).toBeNull();
        expect(err).not.toBeNull();
        expect(err?.code).toBe(ERROR_CODES.TIMEOUT);
    });

    it('return error if function rejected', async () => {
        const fn = () => Promise.reject(new Error("fail"));
        const [err, data] = await safe.withTimeout(fn, 1000);
        expect(data).toBeNull();
        expect(err).not.toBeNull();
        expect(err?.message).toBe("fail");
    });

    it('handles static values', async () => {
        const [err, data] = await safe.withTimeout(Promise.resolve("static"), 1000);
        expect(err).toBeNull();
        expect(data).toBe("static");
    });

    it('handles if zero timeout', async () => {
        const fn = () => new Promise(resolve => setTimeout(() => resolve("ok"), 50));
        const [err, data] = await safe.withTimeout(fn, 0);
        expect(data).toBeNull();
        expect(err).not.toBeNull();
        expect(err?.code).toBe(ERROR_CODES.TIMEOUT);
    });

});
