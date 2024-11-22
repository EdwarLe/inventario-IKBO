import { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductCreated }) => {
  const [newProduct, setNewProduct] = useState({ name: '', description: '' });

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', newProduct);
      setNewProduct({ name: '', description: '' });
      onProductCreated();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleCreateProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;