import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { removeFromCart, addToCart, setTotalAmount,clearCart} from '../Redux/CartSlice'; // Redux actions
import axios from 'axios';
import styled from 'styled-components'; // Use styled-components for custom styling

// Styled component for the Cart container
const CartContainer = styled.div`
  background: linear-gradient(90deg, #1c1c3d, #4b0082); /* Blue gradient */
  min-height: 100vh;
  padding: 2rem;
  color: white;
  text-align: center;
`;

const CartContent = styled.div`
  max-width: 5xl;
  margin: auto;
  background: rgba(255, 255, 255, 0.1); /* Light background with transparency */
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.15); /* Lighter background for each item */
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(5px);
`;

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Assuming user is stored in auth slice

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/cart/${user.userId}`);
        const cartData = response.data;
  
        if (cartData && cartData.length > 0) {
          cartData.forEach(item => {
            dispatch(addToCart(item));  // Add to Redux store
          });
        } else {
          dispatch(clearCart()); // If no data, clear the cart
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [dispatch, user]);
  

  // Handle remove item from cart
  const handleRemove = async (cart_item_id) => {
    if (!cart_item_id) {
      console.error("Invalid cart_item_id provided for deletion");
      return;
    }

    try {
      // Make API call to remove item from the cart
      const response = await axios.delete(`http://localhost:4000/api/cart/delete/${cart_item_id}`);
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
    <CartContainer>
      <CartContent>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold my-6">
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => {
              return (
                <CartItemContainer key={item.cart_item_id || item.id}>
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.title || 'Product Image'}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.title || 'Item Name'}</h3>
                      <p className="text-sm">{item.description || 'No description available'}</p>
                      <p className="font-semibold">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p>Quantity: {item.quantity}</p>
                    <button
                      onClick={() => handleRemove(item.cart_item_id)} // Use cart_item_id for deletion
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </CartItemContainer>
              );
            })}
          </div>
        )}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold flex justify-between">
            Total: <span>₹{totalAmount}</span>
          </h3>
          <button
            className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
