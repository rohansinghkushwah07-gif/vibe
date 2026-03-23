// Setup localStorage polyfill for server-side code
// Node 20+ defines a global.localStorage object, but it is a bare object without the
// Web Storage API. This helper ensures `localStorage.getItem/setItem` exist during SSR.
if (typeof window === "undefined") {
  type LocalStorageLike = { getItem?: unknown; setItem?: unknown };
  const globalWithStorage = global as unknown as { localStorage?: LocalStorageLike };
  const needsPolyfill =
    !globalWithStorage.localStorage ||
    typeof globalWithStorage.localStorage.getItem !== "function" ||
    typeof globalWithStorage.localStorage.setItem !== "function";

  if (needsPolyfill) {
    // Use a simple in-memory implementation of the Storage interface
    class LocalStorageImpl implements Storage {
      private store = new Map<string, string>();

      getItem(key: string): string | null {
        return this.store.get(key) ?? null;
      }

      setItem(key: string, value: string): void {
        this.store.set(key, String(value));
      }

      removeItem(key: string): void {
        this.store.delete(key);
      }

      clear(): void {
        this.store.clear();
      }

      get length(): number {
        return this.store.size;
      }

      key(index: number): string | null {
        const keys = Array.from(this.store.keys());
        return keys[index] ?? null;
      }
    }

    globalWithStorage.localStorage = new LocalStorageImpl() as LocalStorageLike;
  }
}
