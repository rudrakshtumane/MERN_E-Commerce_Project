import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5002/api/products/getAllProduct', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (err) {
      setError('Error fetching products');
    }
  };


  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    fetchProducts(); 
  };
  
  const handleProductDeleted = () => {
    fetchProducts();  // Re-fetch products after a deletion
  };

  return (
    <div className="container mb-20">
      <h2 className='text-3xl font-semibold text-black text-center pb-8'>Product Lists</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
            <ProductCard 
              product={product} 
              onProductUpdated={handleProductUpdated} 
              onProductDeleted={handleProductDeleted} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
