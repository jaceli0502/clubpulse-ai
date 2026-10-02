// Video frames get an empty, ephemeral workspace; never read or write saved club data.
export function createBrowserStorage(search, persistent) {
  const ephemeral = new URLSearchParams(search).get('videoSession') === '1';
  const memory = new Map();
  return {
    getItem: key => ephemeral ? memory.get(key) ?? null : persistent().getItem(key),
    setItem: (key, value) => ephemeral ? memory.set(key, String(value)) : persistent().setItem(key, value)
  };
}
export const browserStorage = createBrowserStorage(globalThis.location?.search || '', () => localStorage);
