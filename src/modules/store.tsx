import { create } from "zustand";

type GlobalState = {
  selectedTicker: string;
  setSelectedTicker: (ticker: string) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  selectedTicker: "AAPL",
  setSelectedTicker: (ticker) => set({ selectedTicker: ticker }),
}));
