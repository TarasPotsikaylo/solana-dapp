export enum StorageKeys {
    TOKEN = 'TOKEN',
};

export const setSessionStorageItem = (item: string, value: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(item, value);
  }
};

export const getSessionStorageItem = (item: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.getItem(item);
  }
};

export const removeSessionStorageItem = (item: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(item);
  }
};

