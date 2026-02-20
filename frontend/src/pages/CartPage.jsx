import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart } from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';
import Loading from '../components/common/Loading';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await dispatch(updateCartItem({ itemId, quantity: newQuantity })).unwrap();
    } catch (error) {
      toast.error(error || 'Failed to update cart');
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error || 'Failed to remove item');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <FiShoppingBag className="mx-auto text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="md:flex gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="border-b last:border-b-0 p-4 flex items-center gap-4"
              >
                <img
                  src={item.product?.image || 'https://via.placeholder.com/100'}
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-semibold w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/3 mt-6 md:mt-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cart.totalPrice?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${((cart.totalPrice || 0) * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>
                  ${cart.totalPrice > 100 ? '0.00' : '10.00'}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>
                  $
                  {(
                    (cart.totalPrice || 0) +
                    (cart.totalPrice || 0) * 0.1 +
                    (cart.totalPrice > 100 ? 0 : 10)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-md hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
