import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';

const AdminDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          to="/admin/products"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Products</p>
              <p className="text-2xl font-bold mt-2">Manage</p>
            </div>
            <FiShoppingBag className="text-4xl text-blue-600" />
          </div>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Orders</p>
              <p className="text-2xl font-bold mt-2">View All</p>
            </div>
            <FiPackage className="text-4xl text-green-600" />
          </div>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Users</p>
              <p className="text-2xl font-bold mt-2">Manage</p>
            </div>
            <FiUsers className="text-4xl text-purple-600" />
          </div>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Revenue</p>
              <p className="text-2xl font-bold mt-2">$0.00</p>
            </div>
            <FiDollarSign className="text-4xl text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="space-y-2">
          <Link
            to="/admin/products"
            className="block text-blue-600 hover:text-blue-800"
          >
            → Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="block text-blue-600 hover:text-blue-800"
          >
            → View Orders
          </Link>
          <Link
            to="/admin/users"
            className="block text-blue-600 hover:text-blue-800"
          >
            → Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
