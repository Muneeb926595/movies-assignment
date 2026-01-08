import { StateStorage } from 'zustand/middleware';
import { StorageKeys, storageService } from '../../services/storage';

export const moviesStorage: StateStorage = {
  getItem: name => storageService.getItem<string>(name as StorageKeys) as any,
  setItem: (name, value) => {
    storageService.setItem(name as StorageKeys, value);
  },
  removeItem: name => {
    storageService.removeItem(name as StorageKeys);
  },
};
