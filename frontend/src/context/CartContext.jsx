import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (vendor, packageType = 'basic') => {
    const existingItem = cartItems.find(
      item => item.vendorId === vendor._id && item.packageType === packageType
    );

    if (existingItem) {
      // Update quantity if already in cart
      setCartItems(cartItems.map(item =>
        item.vendorId === vendor._id && item.packageType === packageType
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new item
      const newItem = {
        vendorId: vendor._id,
        vendorName: vendor.name || vendor.businessName,
        category: vendor.category,
        packageType,
        price: packageType === 'premium' ? vendor.pricing?.premium || 0 : vendor.pricing?.basic || 0,
        quantity: 1,
        image: vendor.images?.[0] || vendor.image,
        rating: vendor.rating,
        location: vendor.location
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (vendorId, packageType) => {
    setCartItems(cartItems.filter(
      item => !(item.vendorId === vendorId && item.packageType === packageType)
    ));
  };

  const updateQuantity = (vendorId, packageType, quantity) => {
    if (quantity <= 0) {
      removeFromCart(vendorId, packageType);
    } else {
      setCartItems(cartItems.map(item =>
        item.vendorId === vendorId && item.packageType === packageType
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
