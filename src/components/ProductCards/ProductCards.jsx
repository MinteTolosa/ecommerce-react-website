import { Link } from 'react-router-dom';
import './ProductCards.css';
import { useCart } from '../../context/CartContext';
import useWishlistStore from '../../store/wishlistStore';

function ProductCards({ product }) {
    const { addToCart, cartItems } = useCart();
    const productInCart = cartItems.find((item) => item.id === product.id);
    const isInWishlist = useWishlistStore((state) => state.wishlistItems.includes(product.id));
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

    const productQuantityLabel = productInCart
        ? `(${productInCart.quantity})`
        : '';

    return (
        <div>
            <div className='product-card'>
                <button
                    className='wishlist-button'
                    type='button'
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
                    {isInWishlist ? '♥' : '♡'}
                </button>

                <img src={product.thumbnail} alt={product.title} className='product-card-image' />
                <div className='product-card-content'>
                    <h3 className='product-card-name'>{product.title}</h3>
                    <p className='product-card-price'>{product.price} ETB</p>
                    <div className='product-card-action'>
                        <Link className='btn btn-secondary' to={`/products/${product.id}`}>
                            View Detail
                        </Link>

                        <button
                            className='btn btn-primary'
                            onClick={() => addToCart(product.id)}
                        >
                            Add to Cart {productQuantityLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCards;
