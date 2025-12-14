import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State for creating a sweet
  const [formData, setFormData] = useState({
    name: '',
    category: 'Chocolate',
    price: '',
    quantity: '',
    description: ''
  });

  // State for restocking (which item is being restocked?)
  const [restockId, setRestockId] = useState(null);
  const [restockAmount, setRestockAmount] = useState('');

  // 1. Fetch all sweets on load
  const fetchSweets = async () => {
    try {
      const res = await api.get('/sweets'); // Admin sees all sweets
      setSweets(res.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load inventory');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // 2. Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit New Sweet
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sweets', formData);
      toast.success('Sweet added successfully! 🎉');
      setFormData({ name: '', category: 'Chocolate', price: '', quantity: '', description: '' }); // Reset form
      fetchSweets(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add sweet');
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await api.delete(`/sweets/${id}`);
      toast.success('Item deleted');
      fetchSweets();
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  // 5. Handle Restock
  const handleRestock = async (id) => {
    if (!restockAmount || restockAmount <= 0) {
      toast.warning('Enter a valid amount');
      return;
    }

    try {
      await api.post(`/sweets/${id}/restock`, { quantity: restockAmount });
      toast.success('Stock updated!');
      setRestockId(null); // Close input
      setRestockAmount('');
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Restock failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Create Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Sweet</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="e.g. Milky Bar"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Initial Qty</label>
                    <input
                      type="number"
                      name="quantity"
                      required
                      min="0"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg bg-white outline-none"
                  >
                    {['Chocolate', 'Candy', 'Gummy', 'Lollipop', 'Marshmallow', 'Other'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="Describe the taste..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-secondary text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition shadow-md">
                  + Add Product
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Inventory Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-700">Current Inventory</h2>
                <span className="bg-purple-100 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                  {sweets.length} Items
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Stock</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sweets.map((sweet) => (
                      <tr key={sweet._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{sweet.name}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {sweet.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {sweet.quantity === 0 ? (
                            <span className="text-red-500 font-bold bg-red-50 px-2 py-1 rounded">Out of Stock</span>
                          ) : (
                            <span className={sweet.quantity < 10 ? 'text-orange-500 font-bold' : 'text-green-600 font-bold'}>
                              {sweet.quantity}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 flex gap-2 items-center">
                          {/* Restock Logic */}
                          {restockId === sweet._id ? (
                            <div className="flex items-center gap-1 animate-fadeIn">
                              <input 
                                type="number" 
                                className="w-16 p-1 border rounded text-xs"
                                placeholder="Qty"
                                value={restockAmount}
                                onChange={(e) => setRestockAmount(e.target.value)}
                              />
                              <button 
                                onClick={() => handleRestock(sweet._id)}
                                className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                              >
                                ✓
                              </button>
                              <button 
                                onClick={() => setRestockId(null)}
                                className="text-gray-400 hover:text-gray-600 text-xs px-1"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => setRestockId(sweet._id)}
                              className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded transition"
                            >
                              Restock
                            </button>
                          )}

                          <button 
                            onClick={() => handleDelete(sweet._id)}
                            className="text-red-500 hover:bg-red-50 px-3 py-1 rounded transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {sweets.length === 0 && !loading && (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                          No items in inventory yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;