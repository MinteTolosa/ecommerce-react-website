// import { getProducts } from '../../data/product';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import ProductCards from '../../components/ProductCards/ProductCards';
import './Home.css';

const API = 'https://dummyjson.com/products';
const categories = [
  {
    name: 'Phones',
    value: 'smartphones',
    image: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13/1.webp'
  },
  {
    name: 'Laptops',
    value: 'laptops',
    image: 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp'
  },
  {
    name: 'Audio',
    value: 'mobile-accessories',
    image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-pro/1.webp'
  },
  {
    name: 'Tablets',
    value: 'tablets',
    image: 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8/1.webp'
  }
];
function Home() {
  // const products = getProducts();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  useEffect(() => {
  let url = `${API}?limit=${limit}&skip=${skip}`;

  if (category) {
    url = `${API}/category/${category}?limit=${limit}&skip=${skip}`;
  } else if (search) {
    url = `${API}/search?q=${search}&limit=${limit}&skip=${skip}`;
  }

  setLoading(true);

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    })
    .then((data) => {
      if (skip === 0) {
        setProducts(data.products);
      } else {
        setProducts((currentProducts) => [
          ...currentProducts, ...data.products ]);
      }
      setHasMore(skip + data.products.length < data.total);
      setLoading(false);
    })
    .catch((error) => { console.error(error);
      setError('Unable to load products.');
      setLoading(false);
    });
}, [category, search, skip]);

useEffect(() => {
  setSkip(0);
}, [category, search]);

  // const filteredProducts = products.filter((product) => {
  // const matchesCategory = !category || product.category === category;
  // const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });
//   const filteredProducts = products.filter((product) => {
//   const matchesCategory = !category || product.category === category;
//   const matchesSearch =
//     !search || product.title.toLowerCase().includes(search.toLowerCase());
//   return matchesCategory && matchesSearch;
// });

  const pageTitle = category 
    ? `${category} Products` 
    : search 
    ? `Search Results for "${search}"` 
    : 'Featured Products';

  if (loading) {
  return <div className='pages'>Loading products...</div>;
  }
  if (error) {
    return <div className='pages'>{error}</div>;
  }

  return (
    <div className='pages'>
      <section className='home-hero'>
        <div className='container home-hero-content'>
        <div>
          <p className='hero-label'>NEW ARRIVALS</p>
          <h1 className='home-title'>WelCome to Addis Shop</h1>
          <p className='home-subtitle'>
              Discover amazing product at greate price. </p>
            <a href='#featured-products' className='btn btn-primary hero-button'>
              Shop Now
            </a>
          </div>
        </div>
      </section>

      <section className='home-section'>
        <div className='container'>
          <div className='section-heading'>
            <h2>Popular Categories</h2>
            <p>Shop by category</p>
          </div>

   <div className='category-grid'>
    {categories.map((category) => (
    <Link to={`/?category=${category.value}`} className='category-card' key={category.value}>
      <img src={category.thumbnail} alt={category.value} />
      <h3>{category.value}</h3>
    </Link>
  ))}
  </div>
  </div>
  </section>

  <section className='home-section' id='featured-products'>
  <div className='container'>
     <div className='section-heading'>
     <h2>{pageTitle}</h2>
    <p>{products.length} product(s) found</p>
  </div>

   <div className='product-grid'>
     {products.length > 0
     ? products.map((product) => (
       <ProductCards product={product} key={product.id} /> ))
     : <p>No products found.</p>}
   </div>
  </div>
  { hasMore && (
  <div className='load-more-container'>
    <button className='btn btn-primary'
      onClick={() => setSkip((currentSkip) => currentSkip + limit)}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load More'}
    </button>
  </div>
)}
 </section>

   <section className='promotion-section'>
   <div className='container promotion-grid'>
    <div className='promotion-card'>
      <p>LIMITED OFFER</p>
      <h2>Upgrade your setup</h2>
      <span>Save more on selected technology products.</span>
    </div>
    <div className='promotion-card'>
      <p>WEEKEND DEAL</p>
      <h2>Audio & accessories</h2>
      <span>Find everyday essentials for your devices.</span>
    </div>
    </div>
      </section>

      <section className='newsletter-section'>
        <div className='container newsletter-content'>
          <div>
            <h2>Stay updated</h2>
            <p>Subscribe for new products, offers and store updates.</p>
          </div>
          <form className='newsletter-form' onSubmit={(event) => event.preventDefault()}>
            <input type='email' placeholder='Enter your email' />
            <button className='btn btn-primary' type='submit'>Subscribe</button>
          </form>
        </div>
      </section>

      <footer className='home-footer'>
        <div className='container footer-grid'>
          <div>
            <h3>Addis-Shop</h3>
            <p>Simple shopping for everyday technology.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link to='/'>All Category</Link>
            <Link to='/checkout'>Cart</Link>
            <Link to='/auth'>Account</Link>
          </div>
          <div>
            <h4>Customer Service</h4>
            <a href='/'>Contact Us</a>
            <a href='/'>Shipping Policy</a>
            <a href='/'>Return Policy</a>
          </div>
          <div>
            <h4>Follow Us</h4>
            <a href='/'>Facebook</a>
            <a href='/'>Instagram</a>
            <a href='/'>Telegram</a>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>© 2026 Addis-Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
