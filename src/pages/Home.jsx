import React from 'react';
import {getProducts} from './../data/product';
import  './Home.css';
import ProductCards from '../components/ProductCards';
function Home() {

  const products = getProducts();
  return (
    <div className='pages'>
      <div className='home-hero'>
        <h1 className='home-title'>WelCome to Addis Shop</h1>
        <p className='home-subtitle'>Discover amazing product at greate price</p>
      </div>
      <div className='container'>
        <h2 className='page-title'> Our Product </h2>
        <div className='product-grid'>
          {products.map((product) => (
            <ProductCards product={product} key={product.id}/>
            ))}

        </div>
      </div>
    </div>
  )
}

export default Home;