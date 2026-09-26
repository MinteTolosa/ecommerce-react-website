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
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  const productInCart = product
    ? cartItems.find((item) => item.id === product.id)
    : null;

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : '';

  useEffect(() => {
  fetch(`https://dummyjson.com/products/${id}`)
    .then((response) => { if (!response.ok) {
        throw new Error('Product not found');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setProduct(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, [id]);

  // useEffect(() => {
  //   if (!product) {
  //     navigate('/');
  //   }
  // }, [product, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='page'>
      <div className='container'>
      <div className='product-detail'>
        <div className='product-detail-image'>
          <img src={product.thumbnail} alt={product.title} />
        </div>

      <div className='product-detail-info'>
        <h1 className='product-detail-name'>{product.title}</h1>
        <p className='product-detail-price'>{product.price.toFixed(2)} ETB</p>
        <p className='product-detail-description'>{product.description}</p>

        <button
          className='btn btn-primary-detail'
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
