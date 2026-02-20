import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FiShoppingCart, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                E-Commerce
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    className="relative text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <FiShoppingCart className="mr-1" />
                    Cart
                    {cartItemCount > 0 && (
                      <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/orders"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Orders
                  </Link>

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <FiSettings className="mr-1" />
                      Admin
                    </Link>
                  )}

                  <div className="flex items-center space-x-2">
                    <FiUser className="text-gray-700" />
                    <span className="text-gray-700 text-sm">{user?.name}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <FiLogOut className="mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2024 E-Commerce Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
