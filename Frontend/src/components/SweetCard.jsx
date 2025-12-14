import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import { ShoppingBag, AlertCircle } from 'lucide-react';

const SweetCard = ({ sweet, refreshSweets }) => {
  const { user } = useAuth();

  const handlePurchase = async () => {
    if (!user) {
      toast.error('Please login to purchase sweets!');
      return;
    }

    try {
      await api.post(`/sweets/${sweet._id}/purchase`, { quantity: 1 });
      toast.success(`Added ${sweet.name} to your bag! 🍬`);
      refreshSweets(); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Purchase failed');
    }
  };

  const isLowStock = sweet.quantity > 0 && sweet.quantity < 10;
  const isOutOfStock = sweet.quantity === 0;

  return (
    // ADDED: border-2 border-orange-100
    <div className="group relative bg-orange-200 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 border-2 border-orange-300 overflow-hidden flex flex-col h-full">
      
      {/* 1. Image Area */}
      <div className="relative h-64 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 flex items-center justify-center overflow-hidden">
        <div className="absolute w-40 h-40 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        
        <span className="relative z-10 text-9xl filter drop-shadow-md transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
          {sweet.category === 'Chocolate' ? '🍫' : 
           sweet.category === 'Gummy' ? '🧸' : 
           sweet.category === 'Lollipop' ? '🍭' : 
           sweet.category === 'Marshmallow' ? '🍡' : '🍬'}
        </span>
        
        <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-gray-800 uppercase tracking-wider">
          {sweet.category}
        </span>
      </div>

      {/* 2. Content Area */}
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {sweet.name}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {sweet.description || 'A delicious treat made with premium ingredients. Perfect for satisfying your sweet tooth.'}
          </p>
        </div>

        {/* 3. Action Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-orange-100">
          <div>
            <span className="text-3xl font-extrabold text-gray-900">${sweet.price}</span>
            <div className="mt-1 min-h-[20px]">
              {isOutOfStock ? (
                 <span className="text-xs font-bold text-red-500 uppercase tracking-wide">Out of Stock</span>
              ) : isLowStock ? (
                <span className="flex items-center gap-1 text-xs font-bold text-orange-500">
                  <AlertCircle size={10} /> Low Stock: {sweet.quantity}
                </span>
              ) : (
                <span className="text-xs font-medium text-green-600">In Stock</span>
              )}
            </div>
          </div>

          <button
            onClick={handlePurchase}
            disabled={isOutOfStock}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-md ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-primary hover:scale-110 hover:shadow-lg hover:shadow-orange-500/40'
            }`}
            title="Add to Cart"
          >
            <ShoppingBag size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SweetCard;