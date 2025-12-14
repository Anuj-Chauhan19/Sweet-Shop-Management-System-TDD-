import { useState, useEffect } from 'react';
import api from '../services/api';
import SweetCard from '../components/SweetCard';
import { Search, Filter } from 'lucide-react';

const HomePage = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchSweets = async () => {
    try {
      let query = `/sweets/search?`;
      if (search) query += `name=${search}&`;
      if (category) query += `category=${category}`;
      
      const endpoint = (search || category) ? query : '/sweets';
      const res = await api.get(endpoint);
      setSweets(res.data.data);
    } catch (error) {
      console.error("Error fetching sweets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSweets();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-orange-50/80 font-sans">
      
      {/* 1. HERO SECTION (Responsive) */}
      <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-700 text-black pt-12 pb-24 md:pt-20 md:pb-32 px-4">
        <div className="container mx-auto text-center relative z-10">
          {/* Text scales from 4xl on mobile to 7xl on desktop */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight drop-shadow-sm leading-tight">
            Treat Yourself <br /> to <span className="text-black underline decoration-yellow-300 decoration-4 underline-offset-4">Something Sweet</span>
          </h1>
          <p className="text-base md:text-xl text-black/80 max-w-2xl mx-auto font-light px-2">
            Explore our handcrafted collection of premium chocolates, gummies, and candies.
          </p>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-40 h-40 md:w-64 md:h-64 bg-yellow-200 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER BAR (Responsive Stack) */}
      <div className="container mx-auto px-4 -mt-10 relative z-20 mb-12">
        <div className="bg-white p-2 rounded-3xl md:rounded-full shadow-2xl shadow-orange-500/20 border-2 border-orange-400 flex flex-col md:flex-row items-center max-w-4xl mx-auto backdrop-blur-sm gap-2 md:gap-0">

          {/* Search Input Section */}
          <div className="w-full relative group px-2">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder="What are you craving?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 md:py-4 bg-transparent border-none rounded-full focus:ring-0 text-gray-700 placeholder-gray-400 text-base md:text-lg font-medium outline-none"
            />
          </div>

          {/* Divider (Horizontal on Mobile, Vertical on Desktop) */}
          <div className="hidden md:block w-px h-10 bg-gray-100 mx-2"></div>
          <div className="md:hidden w-full h-px bg-gray-100 my-1"></div>

          {/* Category Dropdown Section */}
          <div className="relative w-full md:w-auto md:min-w-[220px] group px-2">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300">
              <Filter size={20} />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-12 pr-10 py-3 md:py-4 bg-transparent border-none rounded-full appearance-none focus:ring-0 text-gray-700 font-medium cursor-pointer outline-none hover:bg-gray-50/50 transition-colors"
            >
              <option value="">All Categories</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Candy">Candy</option>
              <option value="Gummy">Gummy</option>
              <option value="Lollipop">Lollipop</option>
              <option value="Marshmallow">Marshmallow</option>
            </select>
            
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          {/* Search Action Button */}
          <div className="p-1 w-full md:w-auto mt-2 md:mt-0">
            <button className="w-full md:w-14 h-12 md:h-14 bg-primary text-white rounded-full flex items-center justify-center hover:bg-orange-600 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 group">
              <Search size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      <main className="container mx-auto px-4 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {search || category ? 'Search Results' : 'Fresh Arrivals'}
          </h2>
          <span className="text-gray-500 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">
            Showing {sweets.length} products
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-96 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sweets.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200 mx-auto max-w-lg">
            <div className="text-6xl mb-4">🍩</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No sweets found</h3>
            <p className="text-gray-500 px-4">Try adjusting your search or filter to find what you crave.</p>
            <button 
              onClick={() => { setSearch(''); setCategory(''); }}
              className="mt-6 text-primary font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sweets.map((sweet) => (
              <SweetCard 
                key={sweet._id} 
                sweet={sweet} 
                refreshSweets={fetchSweets} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;