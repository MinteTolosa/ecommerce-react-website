import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { getProductById } from '../../data/product';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import './ProductDetail.css';

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  // const product = getProductById(id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const [selectedImage, setSelectedImage] = useState('');

  const productInCart = product
    ? cartItems.find((item) => item.id === product.id)
    : null;

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : '';

  useEffect(() => { setLoading(true); setError('');
  fetch(`https://dummyjson.com/products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Product not found');
      }
      return response.json();
    })
    .then((data) => {
      setProduct(data);
      setSelectedImage(data.thumbnail);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setError('Unable to load product.');
      setLoading(false);
    });
}, [id]);
  // useEffect(() => {
  //   if (!product) {
  //     navigate('/');
  //   }
  // }, [product, navigate]);

  if (loading) {
  return <div className='pages'>Loading product...</div>;
}
if (error) {
  return <div className='pages'>{error}</div>;
}
if (!product) {
  return <div className='pages'>Product not found.</div>;
}

  return (
    <div className='page'>
    <div className='container'>
    <div className='product-detail'>
    {/* <div className='product-detail-image'> */}
    <div className='product-image-gallery'>
    <div className='product-main-image'>
    <img
      src={selectedImage}
      alt={product.title}
    />
  </div>
  <div className='product-thumbnails'>
    {product.images.map((image) => (
      <button key={image}
        onClick={() => setSelectedImage(image)}
        className='product-thumbnail-button' >
      <img src={image} alt={product.title} />
      </button>
    ))}
  </div>
</div>
{/* </div> */}
 <div className='product-detail-info'>
  <h1 className='product-detail-name'>{product.title} </h1>
  <p className='product-detail-category'>
    Category: {product.category} </p>
  <p className='product-detail-brand'>
   Brand: {product.brand || 'No brand'} </p>
  <p className='product-detail-rating'>
    Rating: {product.rating} </p>
  <p className='product-detail-stock'>
     Stock: {product.stock} available
   </p>
   <p className='product-detail-price'>{product.price.toFixed(2)} ETB</p>
     {product.discountPercentage > 0 && (
     <p className='product-detail-discount'>
      {product.discountPercentage.toFixed(1)}% OFF
  </p>
      )}
  <p className='product-detail-description'>{product.description}</p>

  <button className='btn btn-primary-detail'
    onClick={() => addToCart(product.id)} >
     Add to Cart {productQuantityLabel}
   </button>
   </div>
   </div>
   </div>
   </div>
  );
}

export default ProductDetail;
