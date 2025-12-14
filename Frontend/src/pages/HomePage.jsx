import { useState, useEffect } from 'react';
import api from '../services/api';
import SweetCard from '../components/SweetCard';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Function to fetch sweets
  const fetchSweets = async () => {
    try {
      // Build query string based on search/filter
      let query = `/sweets/search?`;
      if (search) query += `name=${search}&`;
      if (category) query += `category=${category}`;
      
      // If no search/filter, query defaults to /sweets/search? which returns all or use /sweets
      // Using /sweets endpoint directly if no filters for default sort
      const endpoint = (search || category) ? query : '/sweets';
      
      const res = await api.get(endpoint);
      setSweets(res.data.data);
    } catch (error) {
      console.error("Error fetching sweets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search or fetch on change
  useEffect(() => {
    fetchSweets();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Welcome to the <span className="text-primary">Sweet Shop</span>
          </h1>
          <p className="text-gray-500">Satisfy your cravings with our delicious collection</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-600"
          >
            <option value="">All Categories</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Candy">Candy</option>
            <option value="Gummy">Gummy</option>
            <option value="Lollipop">Lollipop</option>
            <option value="Marshmallow">Marshmallow</option>
          </select>
        </div>

        {/* Grid Content */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading sweets...</div>
        ) : sweets.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No sweets found. Try a different search!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sweets.map((sweet) => (
              <SweetCard 
                key={sweet._id} 
                sweet={sweet} 
                refreshSweets={fetchSweets} // Pass refresh function to update stock after purchase
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;