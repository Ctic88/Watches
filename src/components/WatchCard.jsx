import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowLeftRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function WatchCard({ watch, onClick }) {
    const { addToCart, toggleFavorite, favorites, addToCompare, compareList } = useStore();
    const isFav = favorites.some(f => f.id === watch.id);
    const isCompared = compareList.some(c => c.id === watch.id);

    const handleAction = (e, action) => {
        e.stopPropagation();
        action();
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.02, translateY: -5 }}
            onClick={onClick}
            style={{
                background: 'var(--bg-card)',
                borderRadius: '24px',
                padding: '30px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 10px 30px var(--shadow-color)',
                transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                height: '100%',
                justifyContent: 'space-between',
                position: 'relative'
            }}
        >
            <div style={{ position: 'absolute', top: '16px', right: '16px', left: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10 }}>
                {/* Left side empty or could have "New" badge later */}
                <div></div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={(e) => handleAction(e, () => addToCompare(watch))}
                        style={{
                            width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(4px)', border: '1px solid rgba(0,0,0,0.05)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: isCompared ? 'var(--accent)' : 'var(--text-secondary)', transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}
                        title="Compare"
                    >
                        <ArrowLeftRight size={14} />
                    </button>
                    <button
                        onClick={(e) => handleAction(e, () => toggleFavorite(watch))}
                        style={{
                            width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(4px)', border: '1px solid rgba(0,0,0,0.05)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: isFav ? '#d32f2f' : 'var(--text-secondary)', transition: 'all 0.2s',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}
                        title="Add to Favorites"
                    >
                        <Heart size={14} fill={isFav ? "currentColor" : "none"} />
                    </button>
                </div>
            </div>

            <div style={{ width: '100%' }}>
                <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{watch.brand}</div>
                <div style={{ fontSize: '20px', fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: '20px', lineHeight: 1.2, color: 'var(--text-primary)', height: '48px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {watch.model}
                </div>

                <div style={{ width: '100%', aspectRatio: '1/1', marginBottom: '20px', overflow: 'hidden', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card-bg-image)' }}>
                    <img src={watch.image} alt={watch.model} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
            </div>

            <div style={{ width: '100%' }}>
                <div style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 500 }}>{watch.price}</div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button
                        onClick={(e) => handleAction(e, () => addToCart(watch))}
                        style={{
                            flex: 1,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            background: 'var(--text-primary)', color: 'var(--bg-primary)',
                            padding: '10px', borderRadius: '40px', fontSize: '13px', fontWeight: 500
                        }}
                    >
                        <ShoppingBag size={14} /> Add
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
