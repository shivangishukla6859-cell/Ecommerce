import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

dotenv.config();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 99.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    rating: 4.5,
    numReviews: 120
  },
  {
    name: 'Smart Watch Pro',
    description: 'Feature-rich smartwatch with heart rate monitor, GPS, and water resistance. Track your fitness goals with style.',
    price: 249.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 30,
    rating: 4.7,
    numReviews: 85
  },
  {
    name: 'Leather Jacket',
    description: 'Classic genuine leather jacket with modern design. Durable and stylish for any occasion.',
    price: 199.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    stock: 25,
    rating: 4.3,
    numReviews: 45
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes with advanced cushioning technology. Perfect for daily runs and workouts.',
    price: 129.99,
    category: 'footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 60,
    rating: 4.6,
    numReviews: 200
  },
  {
    name: 'Laptop Backpack',
    description: 'Spacious laptop backpack with multiple compartments. Water-resistant and ergonomic design.',
    price: 79.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 40,
    rating: 4.4,
    numReviews: 95
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe. Brew perfect coffee every morning.',
    price: 89.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1517668808823-f8c0e0e0e0e0?w=500',
    stock: 35,
    rating: 4.5,
    numReviews: 150
  },
  {
    name: 'Yoga Mat',
    description: 'Premium non-slip yoga mat with carrying strap. Perfect for yoga, pilates, and workouts.',
    price: 39.99,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 70,
    rating: 4.2,
    numReviews: 180
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking. Long battery life and comfortable design.',
    price: 29.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    stock: 100,
    rating: 4.3,
    numReviews: 250
  },
  {
    name: 'Cotton T-Shirt',
    description: '100% organic cotton t-shirt. Soft, comfortable, and eco-friendly. Available in multiple colors.',
    price: 24.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 150,
    rating: 4.1,
    numReviews: 300
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature. Eye-friendly lighting for work.',
    price: 49.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    stock: 45,
    rating: 4.6,
    numReviews: 110
  },
  {
    name: 'Water Bottle',
    description: 'Stainless steel insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 34.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    stock: 80,
    rating: 4.4,
    numReviews: 175
  },
  {
    name: 'Gaming Keyboard',
    description: 'Mechanical gaming keyboard with RGB backlighting. Responsive keys for competitive gaming.',
    price: 149.99,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    stock: 20,
    rating: 4.8,
    numReviews: 90
  }
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create regular user
    const user = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    });

    // Create products
    await Product.insertMany(products);

    console.log('✅ Seed data created successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('Admin - Email: admin@example.com, Password: admin123');
    console.log('User - Email: user@example.com, Password: user123');
    console.log(`\n📦 Created ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
