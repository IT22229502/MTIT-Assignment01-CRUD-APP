import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InventoryList_Gemini.css';

const InventoryList_Gemini = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to permanently remove this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  if (loading) return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Syncing Inventory...</p>
    </div>
  );

return (
    <div className="page-wrapper">
      <div className="inventory-card">
        <div className="card-header">
          {/* Left Side: Title */}
          <div className="header-brand">
            <h1>POS Inventory</h1>
            <p className="subtitle">Live Stock Management</p>
          </div>

          {/* Middle: Integrated Stats (Fills the horizontal space) */}
          <div className="header-stats-row">
            <div className="mini-stat">
              <span className="label">Products</span>
              <span className="value">{products.length}</span>
            </div>
            <div className="mini-stat">
              <span className="label">Low Stock</span>
              <span className="value warning">{products.filter(p => p.stockQuantity < 10).length}</span>
            </div>
            <div className="mini-stat">
              <span className="label">Total Value</span>
              <span className="value success">
                ${products.reduce((acc, p) => acc + (p.price * p.stockQuantity), 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Right Side: Refresh */}
          <div className="header-actions">
            <button className="refresh-btn" onClick={fetchProducts}>
              ↻ Refresh
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Product Details</th>
                <th style={{ width: '15%' }}>Unit Price</th>
                <th style={{ width: '25%' }}>Stock Status</th>
                <th className="text-right" style={{ width: '15%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="product-info">
                    <div className="avatar-placeholder">
                      {product.productName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="name-text">{product.productName}</div>
                      <div className="product-id">ID: {product._id.substring(0, 8)}</div>
                    </div>
                  </td>
                  <td className="price-text">${product.price.toFixed(2)}</td>
                  <td>
                    <div className={`stock-indicator ${product.stockQuantity < 10 ? 'critical' : ''}`}>
                      <span className="dot"></span>
                      {product.stockQuantity} units
                    </div>
                  </td>
                  <td className="text-right">
                    <button className="action-btn delete" onClick={() => deleteProduct(product._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <footer className="card-footer">
          <p>© 2026 POS System | Developed by Zamran</p>
        </footer>
      </div>
    </div>
  );
};

export default InventoryList_Gemini;