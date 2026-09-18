import {useCart} from '../context/CartContext';
import './Checkout.css';

 function Checkout() {

  const {
    getCartItemsWithProducts, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart } = useCart();

  const CartItems = getCartItemsWithProducts();
  const total = getCartTotal();

  function placeOrder() {
    alert('Successful Order!');
    clearCart();
  }

  return (
    <div className='pages'>
      <div className='containers'>
        <h1 className='page-title'>CheckOut</h1>
        <div className='checkout-container'>
          <div className='checkout-items'>
            <h2 className='checkout-sec-title'>Order Items-List</h2>
            {CartItems.map((item) => (
              <div className='checkout-item' key={item.id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className='checkout-item-image'
                  />
                  <div className='checkout-item-details'>
                    <h3 className='checkout-item-name'>{item.product.name}</h3>
                    <p className='checkout-item-price'>
                      {item.product.price} ETB each
                    </p>
                    <div className='checkout-item-controls'>
                      <div className='quantity-controls'>
                        <button className='quantity-btn'
                          onClick ={() => updateQuantity(item.id, item.quantity - 1)}>
                          -
                          </button>
                        <span className='quantity-value'>{item.quantity}</span>
                        <button className='quantity-btn'
                          onClick ={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                          </button>
                      </div>

                      <p className='checkout-item-total'>
                        {(item.product.price * item.quantity).toFixed(2)} ETB
                      </p>
                      <button className='btn btn-smallsecondary'
                        onClick={() => removeFromCart(item.id)} >
                        Remove
                      </button>
                    </div>
                  </div>
              </div>
            ))}
          </div>
          <div className='checkout-summary'>
              <h2 className='checkout-sec-title'>Total</h2>
              <div className='checkout-total'>
                <p className='checkout-total-label'>Sub-Total:</p>
                <p className='checkout-total-value'>{total.toFixed(2)} ETB</p>
              </div>
              <div className='checkout-total'>
                <p className='checkout-total-label'>Total:</p>
                <p className='checkout-total-value checkout-total-final'>
                  {total.toFixed(2)}
                </p>
              </div>
              <button className='btn btn-primary btn-large btn-block'
                onClick={placeOrder}>             
                place order
              </button>
             </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;