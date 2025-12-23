import { describe, expect, it } from "vitest";
import { ERROR_CODES, safe } from 'safe-await-lib';

describe('safe.retry()', () => {
    it('succeeds on first attempt', async () => {
        const fn = () => Promise.resolve("ok");
        const [err, data] = await safe.retry(fn, { retries: 3 });
        expect(err).toBeNull();
        expect(data).toBe("ok");
    });

    it('succeeds after a few retries', async () => {
        let count = 0;
        const fn = () => {
            count++;
            if (count < 3) throw new Error("fail");
            return "ok";
        }
        const [err, data] = await safe.retry(fn, { retries: 5 });
        expect(err).toBeNull();
        expect(data).toBe('ok');
        expect(count).toBe(3);
    });

    it('fails after all retries', async () => {
        const fn = () => { throw new Error('fail'); };
        const [err, data] = await safe.retry(fn, { retries: 2 });
        expect(data).toBeNull();
        expect(err).not.toBeNull();
        expect(err?.code).toContain(ERROR_CODES.RETRY_FAILED);
    });

    it('calls onRetry callback', async () => {
        let attempts: number[] = [];
        const fn = () => { throw new Error('fail'); };
        await safe.retry(fn, {
            retries: 3,
            onRetry: (_err, attempt) => attempts.push(attempt)
        });
        expect(attempts).toEqual([1, 2, 3]);
    });

    it('respects delay between retries', async () => {
        let timestamps: number[] = [];
        const fn = () => {
            timestamps.push(Date.now());
            throw new Error('fail');
        };
        const delay = 50;
        await safe.retry(fn, { retries: 3, delayMs: delay }).catch(() => { });
        expect(timestamps[1] - timestamps[0]).toBeGreaterThanOrEqual(delay);
    });
});
