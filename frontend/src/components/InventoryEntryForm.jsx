import { useState } from 'react';
import axios from 'axios';

const InventoryEntryForm = ({ products, onEntryAdded }) => {
  const [newEntry, setNewEntry] = useState({ productId: '', quantity: 0, expirationDate: '' });

  const handleAddEntry = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/inventory/entry', newEntry);
      setNewEntry({ productId: '', quantity: 0, expirationDate: '' });
      onEntryAdded();
    } catch (error) {
      console.error('Error adding inventory entry:', error);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Add Inventory Entry</h2>
      <form onSubmit={handleAddEntry} className="space-y-4">
        <select
          value={newEntry.productId}
          onChange={(e) => setNewEntry({...newEntry, productId: e.target.value})}
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
          value={newEntry.quantity}
          onChange={(e) => setNewEntry({...newEntry, quantity: parseInt(e.target.value)})}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={newEntry.expirationDate}
          onChange={(e) => setNewEntry({...newEntry, expirationDate: e.target.value})}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default InventoryEntryForm;