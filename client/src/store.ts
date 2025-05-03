// store.js
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useStore = create( 
    persist(
        (set, get: () => {
          addToFavourite: any; favourites: string[] ,
          clearCart :any,
}) => ({
            favourites: [],
            addToFavourite: (item: { id: string }) => {
              const existing = get().favourites.find((i: string) => i === item.id);
                if (!existing) {
                set((state: { favourites: string[] }) => ({ favourites: [...state.favourites, item.id] }));
                toast.success('Added to favourites');
                } else {
                set((state: { favourites: string[] }) => ({ favourites: state.favourites.filter((i) => i !== item.id) }));
                toast.success('Removed from favourites');
                }
            },
            clearCart: () => set({ favourites: [] }),
          }),
        {
          name: 'user_favourite', // key in localStorage
        }
      )
);

 
