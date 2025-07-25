import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface EventPopupState {
  hideUntil: string | null; // 'YYYY-MM-DD' format
  setHideUntil: (date: string) => void;
  isPopupVisible: (today: string) => boolean;
}

export const useEventPopupStore = create<EventPopupState>()(
  persist(
    (set, get) => ({
      hideUntil: null,
      setHideUntil: (date) => set({ hideUntil: date }),
      isPopupVisible: (today) => {
        const { hideUntil } = get();
        if (!hideUntil) {
          return true; // Never hidden before
        }
        // If the date to hide until is before today, show it.
        return today > hideUntil;
      },
    }),
    {
      name: 'event-popup-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
