import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import styles from './Cart.module.css';

function Cart() {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const handleProceedToQuotes = () => {
        if (cartItems.length === 0) {
            alert('Please add vendors to cart first');
            return;
        }
        // Navigate to event planner (quotes page) with cart items
        navigate('/event-planner', { state: { cartItems } });
    };

    if (cartItems.length === 0) {
        return (
            <div className={styles.cartPage}>
                <Navbar />
                <div className={styles.emptyCart}>
                    <ShoppingCart size={80} className={styles.emptyIcon} />
                    <h2>Your Cart is Empty</h2>
                    <p>Add vendors to your cart to get quotes</p>
                    <button
                        onClick={() => navigate('/vendors')}
                        className={styles.btnBrowse}
                    >
                        Browse Vendors
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <Navbar />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Your Cart</h1>
                    <p>{cartItems.length} vendor{cartItems.length !== 1 ? 's' : ''} selected</p>
                </div>

                <div className={styles.cartLayout}>
                    <div className={styles.cartItems}>
                        {cartItems.map((item, index) => (
                            <div key={`${item.vendorId}-${item.packageType}-${index}`} className={styles.cartItem}>
                                <div className={styles.itemImage}>
                                    <img
                                        src={item.image || `https://images.unsplash.com/photo-${item.category === 'catering' ? '1555244162-803834f70033' :
                                            item.category === 'venue' ? '1519167758481-83f29da8c2b0' :
                                                item.category === 'decoration' ? '1478146896981-b80fe463b330' :
                                                    item.category === 'photography' ? '1542038784456-1ea8e1e3b9d8' :
                                                        '1514525253161-7a46d19cd819'
                                            }?w=400`}
                                        alt={item.vendorName}
                                    />
                                </div>

                                <div className={styles.itemDetails}>
                                    <div className={styles.itemHeader}>
                                        <div>
                                            <h3>{item.vendorName}</h3>
                                            <span className={styles.category}>{item.category}</span>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.vendorId, item.packageType)}
                                            className={styles.btnRemove}
                                            title="Remove from cart"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className={styles.itemInfo}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Package:</span>
                                            <span className={styles.packageBadge}>{item.packageType}</span>
                                        </div>
                                        {item.rating && (
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Rating:</span>
                                                <span className={styles.rating}>⭐ {item.rating}/5</span>
                                            </div>
                                        )}
                                        {item.location && (
                                            <div className={styles.infoRow}>
                                                <span className={styles.label}>Location:</span>
                                                <span>{item.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.itemFooter}>
                                        <div className={styles.quantityControl}>
                                            <button
                                                onClick={() => updateQuantity(item.vendorId, item.packageType, item.quantity - 1)}
                                                className={styles.btnQty}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className={styles.quantity}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.vendorId, item.packageType, item.quantity + 1)}
                                                className={styles.btnQty}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <div className={styles.itemPrice}>
                                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.cartSummary}>
                        <h2>Cart Summary</h2>

                        <div className={styles.summaryDetails}>
                            <div className={styles.summaryRow}>
                                <span>Total Vendors:</span>
                                <span>{cartItems.length}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Total Items:</span>
                                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                            </div>
                            <div className={styles.summaryDivider}></div>
                            <div className={styles.summaryRow}>
                                <span className={styles.totalLabel}>Estimated Total:</span>
                                <span className={styles.totalAmount}>₹{getCartTotal().toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className={styles.summaryActions}>
                            <button
                                onClick={handleProceedToQuotes}
                                className={styles.btnProceed}
                            >
                                Get Quotes <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={clearCart}
                                className={styles.btnClear}
                            >
                                Clear Cart
                            </button>
                            <button
                                onClick={() => navigate('/vendors')}
                                className={styles.btnContinue}
                            >
                                Continue Shopping
                            </button>
                        </div>

                        <div className={styles.note}>
                            <p>💡 <strong>Note:</strong> Prices shown are estimates. Final quotes will be provided by vendors based on your specific requirements.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
