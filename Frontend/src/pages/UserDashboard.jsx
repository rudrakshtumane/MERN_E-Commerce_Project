import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false); // Cart modal state

  // Fetch categories with token authentication
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      try {
        const response = await axios.get("http://localhost:5002/api/Categories/getCategories", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to request
          },
        });
        setCategories(response.data);
      } catch (err) {
        setError("Error fetching categories"); // Handle error
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products with token authentication when a category is selected
  const fetchProducts = async (categoryId) => {
    const token = localStorage.getItem("token"); 
    try {
      const response = await axios.get(`http://localhost:5002/api/products/getProductByCategory/${categoryId}`, { // Use category ID
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to request
        },
      });
      setProducts(response.data);
      setSelectedCategory(categoryId); // Set selected category ID
    } catch (err) {
      setError(`Error fetching products for category ID ${categoryId}`); 
      console.error(err);
    }
  };

  // Function to add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Ensure that each product added to cart is unique by _id
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        // Update quantity if the product exists in the cart
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new product to the cart with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Function to open/close cart modal
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white p-4 flex justify-between items-center">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category._id}
              className="btn btn-ghost px-4 py-2 text-black"
              onClick={() => fetchProducts(category._id)} 
            >
              {category.CategoryName}
            </button>
          ))}
        </div>
        
        {/* Cart Icon */}
        <div className="relative">
          <button className="btn btn-warning" onClick={toggleCart}>
             🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </div>
      </nav>

      {/* Error Display */}
      {error && <div className="text-red-500 p-4">{error}</div>}

      {/* Products Section */}
      <section className="container mx-auto p-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="p-4 border rounded shadow mb-4">
                {/* Product Card */}  
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover mb-4 rounded-md" 
                />
                <h5 className="text-lg font-bold text-black py-3">{product.name}</h5>
                <button className="btn btn-ghost text-gray-700 text-md">Price: ${product.price}</button>
                <button
                  className="btn btn-outline text-gray-700 ml-20 px-5"
                  onClick={() => addToCart(product)} // Add to Cart
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            selectedCategory && <p className="text-red-500">No products found for this category</p>
          )}
        </div>
      </section>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md w-1/3">
            <h3 className="text-xl font-bold mb-4 text-black">Your Cart</h3>
            {cart.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 text-black">Product</th>
                    <th className="py-2 text-black">Quantity</th>
                    <th className="py-2 text-black">Price</th>
                    <th className="py-2 text-black">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td className="border px-4 py-2 text-black">{item.name}</td>
                      <td className="border px-4 py-2 text-black">{item.quantity}</td>
                      <td className="border px-4 py-2 text-black">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="btn btn-outline btn-error"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Your cart is empty</p>
            )}

            {/* Total Price */}
            {cart.length > 0 && (
              <div className="mt-4 text-black">
                <h4 className="text-lg font-bold">Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h4>
              </div>
            )}

            <button className="btn btn-primary mt-4" onClick={toggleCart}>Close</button>
            <button className="btn btn-primary mt-4 ml-4">Proceed to pay</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
