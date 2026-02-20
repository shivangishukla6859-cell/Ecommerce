import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../store/slices/orderSlice';
import { fetchCart } from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';
import Loading from '../components/common/Loading';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.orders);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const onSubmit = async (data) => {
    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const orderData = {
      orderItems: cart.items.map((item) => ({
        product: item.product._id || item.product,
        quantity: item.quantity,
      })),
      shippingAddress: {
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      },
      paymentMethod: data.paymentMethod,
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error || 'Failed to place order');
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return <Loading />;
  }

  const subtotal = cart.totalPrice || 0;
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="md:flex gap-8">
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                {...register('address', { required: 'Address is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  {...register('postalCode', { required: 'Postal code is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                {...register('country', { required: 'Country is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="card"
                    {...register('paymentMethod', { required: 'Please select a payment method' })}
                    className="mr-2"
                  />
                  Credit/Debit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="paypal"
                    {...register('paymentMethod')}
                    className="mr-2"
                  />
                  PayPal
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cash"
                    {...register('paymentMethod')}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
              </div>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="md:w-1/3 mt-6 md:mt-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span>
                    {item.product?.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
