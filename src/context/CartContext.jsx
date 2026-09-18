import { createContext, useState, useContext } from 'react';
import { getProductById } from '../data/product';

export const CartContext = createContext(null);

export default function Cartprovider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId) {
    const existing = cartItems.find((item) => item.id === productId);

    if(existing){
      const currentQuantity = existing.quantity;

      const updatedCartItems = cartItems.map((item) => 
        item.id === productId 
        ? { id: productId, quantity: currentQuantity + 1} 
        : item 
      );
        setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, {id: productId, quantity: 1}]);
    }
  }

  function getCartItemsWithProducts(){
    return cartItems.map(item => ({
      ...item, product: getProductById(item.id)}))
      .filter(item => item.product);
  }

  // Update product and quantity on the cart

  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) =>
      item.id != productId));
  }

  function updateQuantity(productId, quantity) {

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) => 
        item.id === productId 
          ? {...item, quantity} 
          : item
        )
      );
  }

  // Calculating the Cart Total price
  function getCartTotal() {
    const total = cartItems.reduce((total, item) =>{
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);

    return total;

  }
  // Clearing the cart after the checks the Order
  function clearCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        getCartItemsWithProducts, 
        removeFromCart, 
        updateQuantity, 
        getCartTotal,
        clearCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
