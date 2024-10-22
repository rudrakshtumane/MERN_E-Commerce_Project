/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

const ProductCard = ({ product, onProductUpdated, onProductDeleted }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="overflow-hidden border rounded-lg shadow-lg">
      <div className="p-4">
        {/* Display the product image */}
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded-md" 
          />
        )}
         <h5 className="text-lg font-bold text-black">{product.name}</h5>
        <p className="text-gray-700">Price: ${product.price}</p>
        <p className="text-gray-700">
          Instock: {product.inStock ? "Yes" : "No"}
        </p>
        <p className="text-gray-700">Quantity: {product.quantity}</p>

        <div className="flex space-x-2 mt-4 justify-between">
          <button
            className="btn btn-outline btn-info text-white px-5 py-2 rounded"
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline btn-error text-white px-5 py-2 rounded"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <UpdateProduct
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        product={product}
        onProductUpdated={onProductUpdated}
      />

      <DeleteProduct
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        product={product}
        onProductDeleted={onProductDeleted}
      />
    </div>
  );
};

export default ProductCard;
