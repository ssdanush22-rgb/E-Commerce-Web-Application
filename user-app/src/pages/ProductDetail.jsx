import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data)).catch(() => {});
  }, [id]);

  if (!product) return <p className="status-msg">Loading…</p>;

  return (
    <div className="wrap">
      <button className="btn-ghost" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-grid">
        <div className="detail-img-wrap">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="product-img-placeholder">No Image</div>
          )}
        </div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="detail-price">₹{product.price}</p>
          <p className="detail-desc">{product.description || 'No description available.'}</p>
          <p className="detail-stock">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>

          {product.stock > 0 && (
            <div className="qty-row">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}>+</button>
            </div>
          )}

          <button
            className="btn-primary"
            disabled={product.stock === 0}
            onClick={() => addToCart(product, quantity)}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
