import { useState } from 'react';
import axios from 'axios';

const InventoryRemoveForm = ({ products, onInventoryRemoved }) => {
  const [removeEntry, setRemoveEntry] = useState({ productId: '', quantity: 0 });

  const handleRemoveEntry = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/inventory/remove', removeEntry);
      setRemoveEntry({ productId: '', quantity: 0 });
      onInventoryRemoved();
    } catch (error) {
      console.error('Error removing inventory:', error);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Remove Inventory</h2>
      <form onSubmit={handleRemoveEntry} className="space-y-4">
        <select
          value={removeEntry.productId}
          onChange={(e) => setRemoveEntry({...removeEntry, productId: e.target.value})}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Product</option>
          {products.map(product => (
            <option key={product._id} value={product._id}>{product.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={removeEntry.quantity}
          onChange={(e) => setRemoveEntry({...removeEntry, quantity: parseInt(e.target.value)})}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Remove
        </button>
      </form>
    </div>
  );
};

export default InventoryRemoveForm;