import { Link } from 'react-router-dom';
import './ProductCards.css';
import { useCart } from '../context/CartContext';


function ProductCards({product}) {
    const {addToCart, cartItems} = useCart();
    const productInCart = cartItems.find((item) => item.id === product.id );

    const productQuantityLabel = productInCart 
        ? `(${productInCart.quantity})`
        : "";
  return (

    <div>
        <div className='product-card'>
            <img src={product.image} alt={product.name} className='product-card-image' />
        <div className='product-card-content'>
            <h3 className='product-card-name'>{product.name}</h3>
            <p className='product-card-price'>{product.price} ETB</p>
            <div className='product-card-action'>
                <Link className='btn btn-secondary' to={`/products/${product.id}`}>
                     View Detail
                </Link>

                <button className='btn btn-primary'
                    onClick={() => addToCart(product.id)}>
                    Add to Cart {productQuantityLabel}
                </button>

            </div>
        </div>
        </div>
    </div>

  )
}
export default ProductCards;