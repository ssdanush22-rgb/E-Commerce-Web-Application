import { useEffect, useState } from 'react';
import api from '../api/api';
import Sidebar from '../components/Sidebar';

const EMPTY_FORM = { name: '', description: '', price: '', image: '', category: '', stock: '' };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  function loadProducts() {
    api.get('/products').then((res) => setProducts(res.data)).catch(() => {});
  }

  useEffect(() => { loadProducts(); }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    }
  }

  function startEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <h1>Products</h1>

        <form className="product-form" onSubmit={handleSubmit}>
          <input name="name" placeholder="Product name" value={form.name} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required />
          <input name="image" placeholder="Image URL (optional)" value={form.image} onChange={handleChange} />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="full-width" />
          <div className="form-actions">
            <button className="btn-primary" type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
            {editingId && <button type="button" className="btn-ghost" onClick={cancelEdit}>Cancel</button>}
          </div>
          {error && <p className="error-msg">{error}</p>}
        </form>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td className="table-actions">
                  <button className="btn-ghost" onClick={() => startEdit(p)}>Edit</button>
                  <button className="btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
