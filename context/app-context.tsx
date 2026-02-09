import { DECOR_PRODUCTS } from '@/constants/products';
import React, { createContext, useContext, useState } from 'react';

interface CartItem {
  productId: string;
  quantity: number;
}

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  date: string;
  venue: string;
  specialRequests?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  items: OrderItem[];
  bookingDetails: BookingDetails;
  totalAmount: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'vendor' | 'admin';
}

interface AppContextType {
  // Auth State
  user: User | null;
  isAuthenticated: boolean;
  // Auth Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  // Cart & Wishlist
  cartItems: CartItem[];
  wishlistItems: string[];
  orders: Order[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  getCartTotal: () => number;
  isInWishlist: (productId: string) => boolean;
  createOrder: (bookingDetails: BookingDetails) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user database - in real app, this would be Firebase Auth
  const mockUsers: { [key: string]: { password: string; user: User } } = {
    'test@example.com': {
      password: 'password123',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      },
    },
    // Demo vendor account mapped to Elite Events Co. (v1)
    'vendor@decornest.com': {
      password: 'password123',
      user: {
        id: 'v1',
        email: 'vendor@decornest.com',
        name: 'Elite Events Vendor',
        role: 'vendor',
      },
    },
  };

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userRecord = mockUsers[email];
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid email or password');
    }

    setUser(userRecord.user);
    setIsAuthenticated(true);
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mockUsers[email]) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user'
    };

    mockUsers[email] = {
      password,
      user: newUser
    };

    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    clearCart();
  };

  const addToCart = (productId: string) => {
    setCartItems(current => {
      const existing = current.find(item => item.productId === productId);
      if (existing) {
        return current.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(current =>
      current.filter(item => item.productId !== productId)
    );
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(current =>
      current.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlistItems(current => {
      if (current.includes(productId)) {
        return current.filter(id => id !== productId);
      }
      return [...current, productId];
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = DECOR_PRODUCTS.find(p => p.id === item.productId);
      return total + (product?.price ?? 0) * item.quantity;
    }, 0);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  const createOrder = (bookingDetails: BookingDetails) => {
    const orderItems: OrderItem[] = cartItems.map(item => {
      const product = DECOR_PRODUCTS.find(p => p.id === item.productId)!;
      return {
        productId: item.productId,
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: item.quantity
      };
    });

    const order: Order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'confirmed',
      items: orderItems,
      bookingDetails,
      totalAmount: getCartTotal(),
    };
    setOrders(current => [order, ...current]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(current =>
      current.map(order =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        // Auth state and actions
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        // Cart & Wishlist state and actions
        cartItems,
        wishlistItems,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        getCartTotal,
        isInWishlist,
        createOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}