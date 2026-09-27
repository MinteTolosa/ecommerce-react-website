import useCartStore from '../store/cartStore';

// Day 19: Zustand - Context Migration

export function useCart() {
  return useCartStore();
}

export default function Cartprovider({ children }) {
  return children;
}
