import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../store/slices/orderSlice';
import Loading from '../components/common/Loading';

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Order not found</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Order #{order._id.slice(-8).toUpperCase()}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      Quantity: {item.quantity} x ${item.price}
                    </p>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <p className="text-gray-600">
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items Price:</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div>
                <span className="text-sm text-gray-600">Payment Method:</span>
                <p className="font-medium capitalize">{order.paymentMethod}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Status:</span>
                <div className="mt-2">
                  {order.isPaid ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      Not Paid
                    </span>
                  )}
                  {order.isDelivered && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm ml-2">
                      Delivered
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
