import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';
import Loading from '../components/common/Loading';
import ProductCard from '../components/products/ProductCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 }));
  }, [dispatch]);

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mb-12 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to E-Commerce Store</h1>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          <Link
            to="/products"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
