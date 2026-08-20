import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="status-msg">Loading products…</p>;

  return (
    <div className="wrap">
      <div className="page-head">
        <h1>Shop Our Products</h1>
        <input
          className="search-input"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="status-msg">No products found.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <div className="product-card" key={p._id}>
              <Link to={`/product/${p._id}`} className="product-img-wrap">
                {p.image ? (
                  <img src={p.image} alt={p.name} />
                ) : (
                  <div className="product-img-placeholder">No Image</div>
                )}
              </Link>
              <div className="product-info">
                <Link to={`/product/${p._id}`} className="product-name">{p.name}</Link>
                <p className="product-category">{p.category}</p>
                <div className="product-bottom">
                  <span className="product-price">₹{p.price}</span>
                  <button
                    className="btn-primary-sm"
                    disabled={p.stock === 0}
                    onClick={() => addToCart(p)}
                  >
                    {p.stock === 0 ? 'Out of stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
