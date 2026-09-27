import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Day 19: Zustand - Wishlist Store

const useWishlistStore = create(
  persist(
    (set) => ({
      wishlistItems: [],

      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.wishlistItems.includes(productId);

          return {
            wishlistItems: exists
              ? state.wishlistItems.filter((id) => id !== productId)
              : [...state.wishlistItems, productId]
          };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter((id) => id !== productId)
        }));
      },

      clearWishlist: () => set({ wishlistItems: [] })
    }),
    {
      name: 'addis-shop-wishlist'
    }
  )
);

export default useWishlistStore;
