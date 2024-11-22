import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import InventoryEntryForm from './components/InventoryEntryForm';
import InventoryRemoveForm from './components/InventoryRemoveForm';
import InventoryStatus from './components/InventoryStatus';

function App() {
  const [products, setProducts] = useState([]);
  const [inventoryStatus, setInventoryStatus] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchInventoryStatus();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchInventoryStatus = async () => {
    try {
      const response = await axios.get('/api/inventory/status');
      setInventoryStatus(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching inventory status:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Perishable Inventory Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductForm onProductCreated={fetchProducts} />
        <InventoryEntryForm products={products} onEntryAdded={fetchInventoryStatus} />
        <InventoryRemoveForm products={products} onInventoryRemoved={fetchInventoryStatus} />
      </div>
      
      <div className="mt-8">
        <InventoryStatus inventoryStatus={inventoryStatus} />
      </div>
    </div>
  );
}

export default App;