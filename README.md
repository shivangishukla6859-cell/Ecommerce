# E-Commerce MERN Stack Application

A production-ready, full-stack e-commerce application built with MongoDB, Express, React, and Node.js. This application features a scalable architecture, secure authentication, comprehensive product management, shopping cart functionality, and an admin dashboard.

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication with HttpOnly secure cookies
- Refresh token mechanism for enhanced security
- Role-based access control (Admin/User)
- Protected routes on both backend and frontend
- Secure password hashing with bcrypt

### Product Management
- Product listing with pagination
- Category filtering and search functionality
- Product details page
- Stock validation
- Admin product CRUD operations

### Shopping Cart
- Add to cart functionality
- Update cart item quantities
- Remove items from cart
- Persistent cart (database-based)
- Real-time stock validation

### Order Management
- Complete order placement flow
- Order history for users
- Order status tracking (Paid/Delivered)
- Admin order management
- Automatic stock deduction on order placement

### Admin Dashboard
- Product management (Create, Read, Update, Delete)
- User management
- Order management and status updates
- Dashboard overview

### Security Features
- XSS protection
- Helmet.js security headers
- Rate limiting
- Input sanitization
- CORS configuration
- MongoDB injection prevention

### Performance & Quality
- Backend input validation (express-validator)
- Frontend form validation (react-hook-form)
- Lazy loading and code splitting ready
- Redux Toolkit for state management
- Proper error handling with centralized middleware
- Loading and error states
- Clean, reusable UI components

## 📁 Project Structure

```
Ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   ├── orderController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── rateLimiter.js
│   │   │   └── validation.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Cart.js
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── utils/
│   │   │   ├── errorHandler.js
│   │   │   ├── asyncHandler.js
│   │   │   ├── apiResponse.js
│   │   │   ├── generateToken.js
│   │   │   └── seedData.js
│   │   ├── validators/
│   │   │   ├── authValidator.js
│   │   │   ├── productValidator.js
│   │   │   └── orderValidator.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ErrorMessage.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── RegisterForm.jsx
│   │   │   ├── products/
│   │   │   │   └── ProductCard.jsx
│   │   │   └── admin/
│   │   │       └── ProductFormModal.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── OrderDetailPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboardPage.jsx
│   │   │       ├── AdminProductsPage.jsx
│   │   │       ├── AdminOrdersPage.jsx
│   │   │       └── AdminUsersPage.jsx
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── productSlice.js
│   │   │   │   ├── cartSlice.js
│   │   │   │   └── orderSlice.js
│   │   │   └── store.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **express-mongo-sanitize** - MongoDB injection prevention
- **xss-clean** - XSS protection

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **Tailwind CSS** - Styling
- **React Icons** - Icons

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-in-production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
```

5. Start MongoDB (if running locally):
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

6. Seed the database with sample data:
```bash
npm run seed
```

This will create:
- Admin user: `admin@example.com` / `admin123`
- Regular user: `user@example.com` / `user123`
- 12 sample products

7. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Usage

### Default Login Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com`
- Password: `user123`

### Features Overview

1. **Browse Products**: View all products with pagination, search, and category filters
2. **Product Details**: View detailed product information
3. **Shopping Cart**: Add products to cart, update quantities, and remove items
4. **Checkout**: Complete order placement with shipping address and payment method
5. **Order History**: View all your past orders
6. **Admin Dashboard**: Manage products, users, and orders (admin only)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HttpOnly Cookies**: Prevents XSS attacks
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Server-side validation using express-validator
- **Rate Limiting**: Prevents brute force attacks
- **XSS Protection**: Input sanitization
- **MongoDB Injection Prevention**: Data sanitization
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet.js**: Security headers

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

### Products
- `GET /api/products` - Get all products (with pagination, filters, search)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin only)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🚀 Deployment

### Backend Deployment

1. Set environment variables in your hosting platform
2. Ensure MongoDB is accessible (use MongoDB Atlas for cloud)
3. Build and start the server:
```bash
npm start
```

### Frontend Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform (Vercel, Netlify, etc.)

3. Update the `VITE_API_URL` environment variable to point to your backend API

## 🧪 Testing

The application includes comprehensive error handling and validation. For production use, consider adding:
- Unit tests (Jest)
- Integration tests
- E2E tests (Cypress/Playwright)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, please open an issue in the repository.

---

Built with ❤️ using the MERN stack
