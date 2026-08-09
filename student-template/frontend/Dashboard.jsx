import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from '/api/inventory/alerts'
  useEffect(() => {
    fetch('/api/inventory/alerts')
      .then((response) => response.json())
      .then((data) => {
        setInventoryData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching inventory alerts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  // If inventoryData is empty
  if (inventoryData.length === 0) {
    return <p>All inventory levels are healthy.</p>;
  }

  // Render inventory alerts table
  return (
    <div>
      <h2>Inventory Alerts</h2>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Reorder Level</th>
          </tr>
        </thead>

        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.reorder_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
