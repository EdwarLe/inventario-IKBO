const InventoryStatus = ({ inventoryStatus }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory Status</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Product</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Expiration Date</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {inventoryStatus.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{item.product}</td>
              <td className="border border-gray-300 p-2">{item.quantity}</td>
              <td className="border border-gray-300 p-2">{new Date(item.expirationDate).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">
                <span className={`px-2 py-1 rounded ${
                  item.status === 'Vigente' ? 'bg-green-200 text-green-800' :
                  item.status === 'Por vencer' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryStatus;