import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import useWishlistStore from '../../store/wishlistStore';
import './Wishlist.css';

function Wishlist() {
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!wishlistItems.length) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');

    Promise.all(
      wishlistItems.map((id) =>
        fetch(`https://dummyjson.com/products/${id}`)
          .then((response) => 
            { if (!response.ok) {
              throw new Error('Failed to fetch wishlist product'); 
            }
            return response.json();
        })
      ))
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Unable to load wishlist.');
        setLoading(false);
      });
  }, [wishlistItems]);

  if (loading) {
    return <div className="pages">Loading wishlist...</div>;
  }

  if (error) {
    return <div className="pages">{error}</div>;
  }

  return (
    <div className="pages wishlist-page">
      <div className="wishlist-header">
        <div>
          <h1>My Wishlist</h1>
          <p>{products.length} item(s) saved</p>
        </div>

        <Heart size={28} />
      </div>

      {products.length === 0 ? (
        <div className="wishlist-empty">
          <Heart size={50} />
          <h2>Your wishlist is empty</h2>
          <p>Add products you love.</p>

          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {products.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="wishlist-image">
                <img src={product.thumbnail} alt={product.title} />
              </Link>
              <div className="wishlist-info">
                <Link to={`/product/${product.id}`} className="wishlist-title" >
                  {product.title}
                </Link>
                <p className="wishlist-price"> ${product.price}</p>
                <button className="wishlist-remove"
                  onClick={() => removeFromWishlist(product.id)} >
                  <Trash2 size={18} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;