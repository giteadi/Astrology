import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeFromCart, addToCart, setTotalAmount } from '../Redux/CartSlice'; // Redux actions
import axios from 'axios';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Assuming user info is stored in auth slice

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `http://localhost:4000/api/cart/${user.userId}`
          );
          const cartData = response.data;

          console.log("Fetched Cart Items:", cartData); // Debugging log

          // Add items to Redux state
          cartData.forEach((item) => {
            dispatch(
              addToCart({
                cart_item_id: item.cart_item_id,
                item_id: item.item_id,
                title: item.title,
                description: item.description,
                price: item.price,
                quantity: item.quantity,
              })
            );
          });

          // Calculate total amount and update Redux
          const total = cartData.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          dispatch(setTotalAmount(total));
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user) fetchCartItems();
  }, [dispatch, user]);

  // Handle remove item from cart
  const handleRemove = async (cart_item_id) => {
    if (!cart_item_id) {
      console.error("Invalid cart_item_id provided for deletion"); // Debugging log
      return;
    }

    try {
      // Make API call to remove item from the cart
      const response = await axios.delete(
        `http://localhost:4000/api/cart/delete/${cart_item_id}`
      );
      if (response.status === 200) {
        console.log(`Item with cart_item_id: ${cart_item_id} removed successfully`);

        // Dispatch Redux action to remove item from state
        dispatch(removeFromCart(cart_item_id));

        // Update total amount in Redux after removal
        const updatedTotal = cartItems
          .filter((item) => item.cart_item_id !== cart_item_id)
          .reduce((acc, item) => acc + item.price * item.quantity, 0);
        dispatch(setTotalAmount(updatedTotal));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white/10 rounded-lg p-6 shadow-lg backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => {
              console.log("Cart Item ID:", item.cart_item_id); // Debugging log
              return (
                <div
                  key={item.cart_item_id}
                  className="flex justify-between items-center bg-white/20 rounded-lg p-4 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.title || 'Product Image'}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-300">{item.description || 'No description available'}</p>
                      <p className="text-white font-semibold">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-white">Quantity: {item.quantity}</p>
                    <button
                      onClick={() => handleRemove(item.cart_item_id)} // Remove by cart_item_id
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
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
