import { create } from "zustand";
import { getSessionStorageItem, StorageKeys } from "@/app/helpers/storage";

interface AppState {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  address: string;
  setAddress: (address: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoggedIn: Boolean(getSessionStorageItem(StorageKeys.TOKEN)),
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  address: "",
  setAddress: (address) => set({ address }),
}));
