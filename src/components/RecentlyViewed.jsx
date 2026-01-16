import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';

export default function RecentlyViewed({ onWatchClick }) {
    const { recentlyViewed } = useStore();

    if (recentlyViewed.length === 0) return null;

    return (
        <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
            <div className="container">
                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '24px',
                    marginBottom: '30px',
                    color: 'var(--text-primary)'
                }}>
                    Recently Viewed
                </h3>

                <div style={{
                    display: 'flex',
                    gap: '20px',
                    overflowX: 'auto',
                    paddingBottom: '20px',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}>
                    {recentlyViewed.map((watch, index) => (
                        <motion.div
                            key={watch.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => onWatchClick(watch)}
                            style={{
                                flex: '0 0 200px',
                                background: 'var(--bg-card)',
                                borderRadius: '16px',
                                padding: '20px',
                                cursor: 'pointer',
                                border: '1px solid var(--border-color)',
                                transition: 'transform 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div style={{ width: '120px', height: '120px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={watch.image} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>{watch.brand}</div>
                            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{watch.model}</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{watch.price}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
