import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyOrders } from '../store/slices/orderSlice';
import Loading from '../components/common/Loading';
import { FiPackage } from 'react-icons/fi';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <FiPackage className="mx-auto text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
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
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h3>
                <p className="text-gray-600 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm">
                  {order.orderItems.length} item(s)
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">
                  ${order.totalPrice.toFixed(2)}
                </p>
                <div className="mt-2">
                  {order.isPaid ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      Pending
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
