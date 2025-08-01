import { create } from 'zustand';

interface HeaderState {
  headerTitle: string | null;
  setHeaderTitle: (title: string | null) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  headerTitle: null,
  setHeaderTitle: (title) => set({ headerTitle: title }),
}));
