const Cart = ({ cartItems = [], setCartItems }) => {
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = (price, quantity) => price * quantity;

  const calculateCartTotal = () =>
    cartItems.reduce(
      (total, item) => total + calculateTotal(item.price, item.quantity),
      0
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 flex justify-center items-start py-10">
      <div className="w-full max-w-6xl flex bg-white/10 rounded-xl backdrop-blur-md p-4">
        <div className="flex flex-col w-3/4 space-y-4 overflow-y-auto max-h-[500px]">
          {cartItems?.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white/20 rounded-lg p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-white text-lg">₹{item.price}</p>
                  <div className="flex items-center gap-4">
                    <button
                      className="px-2 py-1 bg-purple-600 rounded-full hover:bg-purple-500 text-white"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <p className="mx-2 text-white">{item.quantity}</p>
                    <button
                      className="px-2 py-1 bg-purple-600 rounded-full hover:bg-purple-500 text-white"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="text-white text-lg">
                    ₹{calculateTotal(item.price, item.quantity)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">Your cart is empty.</p>
          )}
        </div>
        <div className="w-1/4 ml-4 bg-purple-800 text-white rounded-xl p-6 flex flex-col items-center justify-between backdrop-blur-md">
          <h3 className="text-2xl font-bold mb-4">Cart Summary</h3>
          <div className="space-y-4 w-full">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{calculateCartTotal()}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>₹50</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>₹{calculateCartTotal() + 50}</p>
            </div>
          </div>
          <button className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
