import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import Loading from '../../components/common/Loading';
import { FiEye } from 'react-icons/fi';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/orders');
      setOrders(response.data.orders);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      if (status === 'delivered') {
        await api.put(`/orders/${orderId}/deliver`);
      } else if (status === 'paid') {
        await api.put(`/orders/${orderId}/pay`, { id: 'mock_payment_id' });
      }
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  #{order._id.slice(-8).toUpperCase()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {order.user?.name || order.user?.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {!order.isPaid && (
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'paid')}
                        className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs hover:bg-yellow-200"
                      >
                        Mark Paid
                      </button>
                    )}
                    {order.isPaid && !order.isDelivered && (
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'delivered')}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs hover:bg-green-200"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {order.isPaid && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        Paid
                      </span>
                    )}
                    {order.isDelivered && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Delivered
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/orders/${order._id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FiEye className="inline" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
