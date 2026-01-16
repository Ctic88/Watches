import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useEffect, useRef } from 'react';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer({ isOpen, onClose }) {
    const { cart, removeFromCart, updateQuantity } = useStore();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const drawerRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (drawerRef.current && !drawerRef.current.contains(event.target) && !isCheckoutOpen) {
                onClose();
            }
        }
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose, isCheckoutOpen]);

    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return sum + price * item.quantity;
    }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, background: '#000', zIndex: 1000
                        }}
                    />
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            position: 'fixed',
                            top: 0, right: 0, bottom: 0,
                            width: '100%', maxWidth: '400px',
                            background: 'var(--bg-card)',
                            zIndex: 1001,
                            boxShadow: '-10px 0 40px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px' }}>Shopping Bag</h2>
                            <button onClick={onClose}><X size={24} /></button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                            {cart.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                                    <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '20px' }} />
                                    <p>Your bag is empty.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                    {cart.map(item => (
                                        <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                                            <div style={{ width: '80px', height: '80px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <img src={item.image} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{item.brand}</div>
                                                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>{item.model}</div>
                                                <div style={{ fontSize: '14px' }}>{item.price}</div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                                <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--text-secondary)' }}><X size={16} /></button>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '8px' }}>
                                                    <button onClick={() => updateQuantity(item.id, -1)}><Minus size={12} /></button>
                                                    <span style={{ fontSize: '12px', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)}><Plus size={12} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 600, fontSize: '18px' }}>
                                    <span>Total</span>
                                    <span>{total}</span>
                                </div>
                                <button
                                    onClick={() => setIsCheckoutOpen(true)}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: 'var(--text-primary)',
                                        color: 'var(--bg-primary)',
                                        borderRadius: '12px',
                                        fontWeight: 600,
                                        fontSize: '16px'
                                    }}>
                                    Checkout
                                </button>
                            </div>
                        )}

                        <AnimatePresence>
                            {isCheckoutOpen && (
                                <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
