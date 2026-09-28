import { create } from 'zustand';
import { persist } from 'zustand/middleware'
// import { getProductById } from '../data/product';

// Day 19: Zustand - Cart Store

const useCartStore = create( persist((set, get) => ({
  cartItems: [],

  addToCart: (productId) => {

    const cartItems = get().cartItems;
    const existing = cartItems.find((item) => item.id === productId);

    if(existing){
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      set({ cartItems: updatedCartItems });
    } else {
      set({ cartItems: [...cartItems, { id: productId, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => {
    set({
      cartItems: get().cartItems.filter((item) => item.id !== productId)
    });
  },

  updateQuantity: (productId, quantity) => {
    if(quantity <= 0){
      get().removeFromCart(productId);
      return;
    }

    set({
      cartItems: get().cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    });
  },

  // getCartItemsWithProducts: () => {
  //   return get().cartItems
  //     .map((item) => ({
  //       ...item,
  //       product: getProductById(item.id)
  //     }))
  //     .filter((item) => item.product);
  // },

  // getCartTotal: () => {
  //   return get().cartItems.reduce((total, item) => {
  //     const product = getProductById(item.id);
  //     return total + (product ? product.price * item.quantity : 0);
  //   }, 0);
  // },

  getCartCount: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  clearCart: () => { set({ cartItems: [] }); }
}),
    {
      name: 'addis-shop-cart'
    }
  )
);

export default useCartStore;
