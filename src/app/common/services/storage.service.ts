import { Injectable } from '@angular/core';

export enum StorageKeys {
    User = 'user',
    Selected_Page = 'selected_page',
}

export enum StorageType {
    Local = 'local',
    Session = 'session',
}

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    get<T>(
        key: StorageKeys,
        storageType: StorageType = StorageType.Session
    ): T {
        try {
            const item = getStorage(storageType).getItem(key);
            return JSON.parse(item);
        } catch {
            return null;
        }
    }

    set(
        key: StorageKeys,
        value: unknown,
        storageType: StorageType = StorageType.Session
    ): void {
        getStorage(storageType).setItem(key, JSON.stringify(value));
    }

    pop<T>(
        key: StorageKeys,
        storageType: StorageType = StorageType.Session
    ): T {
        const item = this.get<T>(key);
        getStorage(storageType).removeItem(key);
        return item;
    }
}

function getStorage(storageType: StorageType): Storage {
    if (storageType === StorageType.Session) {
        return window.sessionStorage;
    } else {
        return window.localStorage;
    }
}
