import React from 'react'
import { Link } from 'react-router-dom';
import './ProductCards.css';


function ProductCards({product}) {
  return (

    <div>
        <div className='product-card'>
            <img src={product.image} alt={product.name} className='product-card-image' />
        <div className='product-card-content'>
            <h3 className='product-card-name'>{product.name}</h3>
            <p className='product-card-price'>{product.price} ETB</p>
            <div className='product-card-action'>
                <Link to={`/product/${product.id}`} className='btn btn-secondary'>
                     View Detail
                </Link>

                <button className='btn btn-primary'>
                    Add to Cart
                </button>

            </div>
        </div>
        </div>
    </div>

  )
}
export default ProductCards;