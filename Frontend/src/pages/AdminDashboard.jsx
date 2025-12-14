import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Plus, Trash2, RefreshCw, Package, DollarSign, Tag, FileText, Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Chocolate',
    price: '',
    quantity: '',
    description: ''
  });

  // Restock State
  const [restockId, setRestockId] = useState(null);
  const [restockAmount, setRestockAmount] = useState('');

  // 1. Fetch Sweets
  const fetchSweets = async () => {
    try {
      const res = await api.get('/sweets'); 
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

  // 2. Handle Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit New Sweet
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/sweets', formData);
      toast.success('Sweet added successfully! 🎉');
      setFormData({ name: '', category: 'Chocolate', price: '', quantity: '', description: '' }); 
      fetchSweets(); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add sweet');
    }
  };

  // 4. Delete Sweet
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

  // 5. Restock Sweet
  const handleRestock = async (id) => {
    if (!restockAmount || restockAmount <= 0) {
      toast.warning('Enter a valid amount');
      return;
    }
    try {
      await api.post(`/sweets/${id}/restock`, { quantity: restockAmount });
      toast.success('Stock updated!');
      setRestockId(null); 
      setRestockAmount('');
      fetchSweets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Restock failed');
    }
  };

  return (
    // Updated Background to match Home Page
    <div className="min-h-screen bg-orange-50/30 pb-20 pt-10 font-sans">
      
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your inventory, restock items, and add new delicious treats.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Create Form (Styled as a Card) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-orange-500/10 border-2 border-orange-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Plus size={24} className="bg-orange-100 p-1 rounded-full box-content" />
                <h2 className="text-xl font-bold text-gray-800">Add New Sweet</h2>
              </div>
              
              <form onSubmit={handleCreate} className="space-y-5">
                {/* Name Input */}
                <div className="relative group">
                  <Package className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-700 font-medium"
                    placeholder="Product Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Price Input */}
                  <div className="relative group">
                    <DollarSign className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-700 font-medium"
                      placeholder="Price"
                    />
                  </div>
                  {/* Qty Input */}
                  <div className="relative group">
                    <Package className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      type="number"
                      name="quantity"
                      required
                      min="0"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-700 font-medium"
                      placeholder="Initial Qty"
                    />
                  </div>
                </div>

                {/* Category Input */}
                <div className="relative group">
                  <Tag className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-700 font-medium appearance-none cursor-pointer"
                  >
                    {['Chocolate', 'Candy', 'Gummy', 'Lollipop', 'Marshmallow', 'Other'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Description Input */}
                <div className="relative group">
                  <FileText className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-700 font-medium resize-none"
                    placeholder="Description..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-200">
                  + Add Product
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Inventory Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl shadow-orange-500/10 border-2 border-orange-100 overflow-hidden">
              <div className="p-6 border-b border-orange-100 flex justify-between items-center bg-orange-50/30">
                <h2 className="text-xl font-bold text-gray-800">Current Inventory</h2>
                <span className="bg-white border border-orange-200 text-primary px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                  {sweets.length} Items
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-orange-50 text-xs uppercase font-bold text-orange-900/70 tracking-wider">
                    <tr>
                      <th className="px-6 py-5">Product</th>
                      <th className="px-6 py-5">Category</th>
                      <th className="px-6 py-5">Stock</th>
                      <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {sweets.map((sweet) => (
                      <tr key={sweet._id} className="hover:bg-orange-50/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900 text-base">{sweet.name}</div>
                          <div className="text-xs text-gray-400">${sweet.price}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                            {sweet.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {sweet.quantity === 0 ? (
                            <span className="inline-flex items-center gap-1 text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100 text-xs">
                              Out of Stock
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 font-bold px-3 py-1 rounded-full border text-xs ${
                              sweet.quantity < 10 
                                ? 'bg-amber-50 text-amber-600 border-amber-100' 
                                : 'bg-green-50 text-green-600 border-green-100'
                            }`}>
                              {sweet.quantity} units
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-3">
                            {/* Restock Logic */}
                            {restockId === sweet._id ? (
                              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-orange-200 shadow-sm animate-fadeIn">
                                <input 
                                  type="number" 
                                  className="w-16 p-1 pl-2 text-center bg-gray-50 rounded-md text-sm outline-none border-none focus:ring-1 focus:ring-primary"
                                  placeholder="0"
                                  autoFocus
                                  value={restockAmount}
                                  onChange={(e) => setRestockAmount(e.target.value)}
                                />
                                <button 
                                  onClick={() => handleRestock(sweet._id)}
                                  className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition"
                                >
                                  <Check size={14} />
                                </button>
                                <button 
                                  onClick={() => setRestockId(null)}
                                  className="bg-gray-200 text-gray-500 p-1 rounded hover:bg-gray-300 transition"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => setRestockId(sweet._id)}
                                className="text-gray-400 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-all"
                                title="Restock Item"
                              >
                                <RefreshCw size={18} />
                              </button>
                            )}

                            <button 
                              onClick={() => handleDelete(sweet._id)}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                              title="Delete Item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {sweets.length === 0 && !loading && (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-gray-400 bg-gray-50/50">
                          <div className="flex flex-col items-center gap-2">
                            <Package size={40} className="text-gray-300" />
                            <p>No items in inventory yet.</p>
                          </div>
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