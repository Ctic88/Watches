import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function FavoritesModal({ isOpen, onClose }) {
    const { favorites, toggleFavorite, addToCart } = useStore();

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ width: '100%', maxWidth: '800px', height: '80vh', background: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: 'var(--text-primary)' }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px' }}>Favorites</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
                    {favorites.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
                            <p>No favorites yet.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
                            {favorites.map(item => (
                                <div key={item.id} style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', position: 'relative' }}>
                                    <button onClick={() => toggleFavorite(item)} style={{ position: 'absolute', top: '10px', right: '10px', color: 'red' }}><X size={16} /></button>
                                    <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                                        <img src={item.image} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.brand}</div>
                                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.model}</div>
                                    <div style={{ fontSize: '14px', marginBottom: '12px' }}>{item.price}</div>
                                    <button onClick={() => addToCart(item)} style={{ width: '100%', padding: '8px', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                        <ShoppingBag size={14} /> Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
