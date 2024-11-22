import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../Redux/CartSlice';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white/10 rounded-lg p-6 shadow-lg backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white/20 rounded-lg p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || 'https://via.placeholder.com/100'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-300">{item.description}</p>
                    <p className="text-white font-semibold">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-white">Quantity: {item.quantity}</p>
                  <button
                    onClick={() => handleRemove(item)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 bg-purple-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-white flex justify-between">
            Total: <span>₹{totalAmount}</span>
          </h3>
          <button
            className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
