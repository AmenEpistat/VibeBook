export async function withMinDelay<T>(fn: () => Promise<T>, minDelay = 600): Promise<T> {
    const start = Date.now();
    const result = await fn();
    const elapsed = Date.now() - start;

    if (elapsed < minDelay) {
        await new Promise((res) => setTimeout(res, minDelay - elapsed));
    }

    return result;
}
