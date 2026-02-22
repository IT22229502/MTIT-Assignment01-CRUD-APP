import React, { useEffect, useState, useMemo } from "react";
import "./InventoryList_ChatGPT.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function InventoryList_ChatGPT() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Controls */
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("name");

  /* Pagination */
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  /* Fetch */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      setError("Unable to load inventory");
    } finally {
      setLoading(false);
    }
  };

  /* Categories */
  const categories = useMemo(() => {
    const list = ["All"];
    products.forEach((p) => {
      if (p.category && !list.includes(p.category)) {
        list.push(p.category);
      }
    });
    return list;
  }, [products]);

  /* Filter + Sort */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    /* Search */
    if (search) {
      list = list.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    /* Category */
    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    /* Sort */
    switch (sort) {
      case "price":
        list.sort((a, b) => a.price - b.price);
        break;
      case "stock":
        list.sort((a, b) => a.stockQuantity - b.stockQuantity);
        break;
      default:
        list.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    return list;
  }, [products, search, category, sort]);

  /* Pagination */
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* Delete */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
      });

      fetchProducts();
    } catch {
      alert("Delete failed");
    }
  };

  /* Loading */
  if (loading) return <h2 className="loading">Loading inventory...</h2>;

  /* Error */
  if (error) return <h2 className="error">{error}</h2>;

  return (
    <div className="inventory-container">
      {/* Header */}
      <div className="inventory-header">
        <h2>📦 Inventory Management</h2>

        <div className="controls">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="name">Sort: Name</option>
            <option value="price">Sort: Price</option>
            <option value="stock">Sort: Stock</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price (Rs)</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty">
                  No products found
                </td>
              </tr>
            ) : (
              paginatedProducts.map((item, index) => (
                <tr key={item._id}>
                  <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>

                  <td className="name">{item.productName}</td>

                  <td>{item.category || "-"}</td>

                  <td>Rs {item.price.toFixed(2)}</td>

                  <td>{item.stockQuantity}</td>

                  <td>
                    <span
                      className={`status ${
                        item.stockQuantity === 0
                          ? "out"
                          : item.stockQuantity < 20
                          ? "low"
                          : "good"
                      }`}
                    >
                      {item.stockQuantity === 0
                        ? "Out"
                        : item.stockQuantity < 20
                        ? "Low"
                        : "Available"}
                    </span>
                  </td>

                  <td className="actions">
                    <button className="edit">✏️</button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ◀
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default InventoryList_ChatGPT;