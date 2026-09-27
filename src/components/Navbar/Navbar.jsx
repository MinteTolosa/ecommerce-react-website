import { Link, useSearchParams } from 'react-router-dom';
import { Heart, ShoppingCart, User } from "lucide-react";
import { useState , useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
// import { getProductById } from '../../data/product';
import Modal from '../Modal/Modal';
import './Navbar.css';

function NavBar() {
  const { user, Logout } = useAuth();
  const cartCount = useCartStore((state) => state.getCartCount());
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const [modalType, setModalType] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('search') || '';
  const [search, setSearch] = useState(searchParam);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState('');

  
  useEffect(() => {
  if (!wishlistItems.length) {
    setWishlistProducts([]);
    setWishlistError('');
    return;
  }
  setWishlistLoading(true);
  setWishlistError('');

  Promise.all(
    wishlistItems.map((id) =>
      fetch(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch wishlist product');
          }
          return response.json();
        })
    )
  )
    .then((data) => {
      setWishlistProducts(data);
      setWishlistLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setWishlistError('Unable to load wishlist.');
      setWishlistLoading(false);
    });
}, [wishlistItems]);

  function handleSearch(event) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  }

  function clearFilter() {
    setSearch('');
    setSearchParams({});
  }

  // const wishlistProducts = wishlistItems
  //   .map((id) => getProductById(id))
  //   .filter((product) => product);

  return (
    <>
      <header className='navbar'>
        <div className='nav-container'>
          <Link to='/' className='navbar-brand' onClick={clearFilter}>Addis-Shop</Link>

          <form className='navbar-search' onSubmit={handleSearch}>
            <input
              type='search'
              placeholder='Search products...'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type='submit'>Search</button>
          </form>

          <div className='navbar-actions'>
            <button className='nav-action' onClick={() => setModalType('account')}>
            <User size={22} />
              Account
            </button>
            <button className='nav-action icon-button' onClick={() => setModalType('wishlist')}>
            <Heart size={22} />
            <span>Wishlist</span>
            {wishlistItems.length > 0 && (
              <span className='item-count'>
                {wishlistItems.length}
              </span>
            )}
            </button>
            <Link to='/checkout' className='nav-action icon-button'>
            <ShoppingCart size={22} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className='item-count'>
                {cartCount}
              </span>
            )}
            </Link>
          </div>
        </div>
      </header>

      <nav className='category-nav'>
        <div className='nav-container category-links'>
          <Link to='/' onClick={clearFilter}>Home</Link>
          <Link to='/?category=smartphones'>Phones</Link>
          <Link to='/?category=laptops'>Laptops</Link>
          <Link to='/?category=tablets'>Tablets</Link>
          <Link to='/?category=mobile-accessories'>Audio</Link>
        </div>
      </nav>

      { modalType && ( <Modal onClose={() => setModalType(null)}>
          {modalType === 'wishlist' 
          ? ( <div>
              <h2>Wishlist</h2>
              {wishlistLoading ? (
                <p>Loading wishlist...</p>
              ) : wishlistError ? (
                <p>{wishlistError}</p>
              ) : !wishlistProducts.length ? (
            <div>
              <p>Your wishlist is empty.</p>
              <Link className='btn btn-primary'
                    to='/' onClick={() => setModalType(null)} >
                Browse Products
              </Link>
            </div>  ) 
            : (
              <div className='wishlist-list'>
              {wishlistProducts.map((product) => (
              <div className='wishlist-item' key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
        <div>
          <h3>{product.title}</h3>
          <p>{product.price} ETB</p>
          <Link to={`/products/${product.id}`} className='btn btn-secondary'
            onClick={() => setModalType(null)} >
              View Product
          </Link>
          <button className='btn btn-smallsecondary'
            onClick={() => removeFromWishlist(product.id)} >
             Remove
          </button>
        </div>
        </div>
      ))}
  </div>
)}
  </div>
    ) : !user ? (
  <div>
    <h2>Account</h2>
    <p>Login or create an account to continue.</p>
    <div className='account-modal-actions'>
      <Link className='btn btn-secondary' to='/auth?mode=login' 
      onClick={() => setModalType(null)}>
        Login
      </Link>
      <Link className='btn btn-primary' to='/auth?mode=signup' 
      onClick={() => setModalType(null)}>
        SignUp
      </Link>
    </div>
    </div> ) 
    : (
      <div>
        <h2>My Account</h2>
        <p>Hello, {user.email}</p>
        <button className='btn btn-secondary' onClick={Logout}>
          Logout
        </button>
      </div> )}

     </Modal>
      )}
    </>
  );
}

export default NavBar;
