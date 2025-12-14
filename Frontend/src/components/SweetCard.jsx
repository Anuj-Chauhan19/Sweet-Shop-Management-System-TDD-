import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify'; // We will install this for nice alerts

const SweetCard = ({ sweet, refreshSweets }) => {
  const { user } = useAuth();

  const handlePurchase = async () => {
    if (!user) {
      toast.error('Please login to purchase sweets!');
      return;
    }

    try {
      await api.post(`/sweets/${sweet._id}/purchase`, { quantity: 1 });
      toast.success(`Enjoy your ${sweet.name}! 🍭`);
      refreshSweets(); // Reload data to update stock count
    } catch (error) {
      toast.error(error.response?.data?.message || 'Purchase failed');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Placeholder Image */}
      <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-4xl">
        {sweet.category === 'Chocolate' ? '🍫' : 
         sweet.category === 'Gummy' ? '🧸' : '🍬'}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{sweet.name}</h3>
          <span className="bg-purple-100 text-secondary text-xs px-2 py-1 rounded-full font-medium">
            {sweet.category}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {sweet.description || 'A delicious treat waiting for you!'}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">${sweet.price}</span>
            <div className="text-xs text-gray-400">
              Stock: <span className={sweet.quantity === 0 ? 'text-red-500 font-bold' : ''}>{sweet.quantity}</span>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            disabled={sweet.quantity === 0}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              sweet.quantity > 0
                ? 'bg-primary text-white hover:bg-pink-600 shadow-sm hover:shadow'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {sweet.quantity > 0 ? 'Buy Now' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SweetCard;