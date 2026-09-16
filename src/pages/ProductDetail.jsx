import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import { getProductById } from '../data/product';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  useEffect(() => {
      if(!product) {
      navigate('/');
      }
    },[product, navigate]);

    if(!product){
      return <div>Loading...</div>;
    }

  return (
    <div className='page'>
      <div className='container'>
        <div className='product-detail'>
          <div className='product-detail-image'>
            <img src={product.image} alt={product.name} />
          </div>
          <div className='product-detail-info'>
            <h1 className='product-detail-name'>{product?.name}</h1>
            <p className='product-detail-price'>${product?.price.toFixed(2)}</p>
            <p className='product-detail-description'>{product?.description}</p>
            <button className='btn btn-primary'>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default ProductDetail

