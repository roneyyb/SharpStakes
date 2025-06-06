import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const StorageKeys = {
    "userPredictionDetails": "userPredictionDetails"
};

// Get all items for a given key
export function getItems<T>(key: string): T[] {
    const json = storage.getString(key);
    if (!json) return [];
    try {
        return JSON.parse(json) as T[];
    } catch {
        return [];
    }
}

// Add an item to the list under a given key
export function addItem<T>(key: string, item: T): void {
    const items = getItems<T>(key);
    items.push(item);
    storage.set(key, JSON.stringify(items));
}

// Delete an item from the list under a given key using a predicate
export function deleteItem<T>(key: string, predicate: (item: T) => boolean): void {
    const items = getItems<T>(key);
    const filtered = items.filter(item => !predicate(item));
    storage.set(key, JSON.stringify(filtered));
}

// Save any value under a key (overwrites existing value)
export function saveItemKey<T>(key: string, value: T): void {
    storage.set(key, JSON.stringify(value));
}

// Remove a value by key
export function removeItemKey(key: string): void {
    storage.delete(key);
}
