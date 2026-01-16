import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Youtube, BookOpen, Camera } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import BrandStoryModal from './BrandStoryModal';
import VirtualTryOn from './VirtualTryOn';

export default function WatchModal({ watch, onClose }) {
    const { addToRecentlyViewed } = useStore();
    const [isStoryOpen, setIsStoryOpen] = useState(false);
    const [isTryOnOpen, setIsTryOnOpen] = useState(false);

    useEffect(() => {
        if (watch) {
            addToRecentlyViewed(watch);
        }
    }, [watch]);

    if (!watch) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(50, 50, 50, 0.4)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    style={{
                        background: '#fff',
                        width: '100%',
                        maxWidth: '1000px',
                        height: 'min(90vh, 600px)',
                        borderRadius: '30px',
                        overflow: 'hidden',
                        display: 'grid',
                        position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                    className="modal-content"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: 20,
                            right: 20,
                            background: 'rgba(255,255,255,0.5)',
                            backdropFilter: 'blur(10px)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            transition: 'background 0.2s',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        className="close-btn"
                    >
                        <X size={20} color="#1d1d1f" />
                    </button>

                    <div style={{ background: 'var(--card-bg-image)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflow: 'hidden' }} className="modal-image-container">
                        <img src={watch.image} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>

                    <div style={{ padding: '60px', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-card)', color: 'var(--text-primary)' }} className="modal-details">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h3 style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{watch.brand}</h3>
                            <button
                                onClick={() => setIsStoryOpen(true)}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                <BookOpen size={14} />
                                Heritage
                            </button>
                        </div>
                        <h2 style={{ fontSize: '40px', fontFamily: 'var(--font-heading)', fontWeight: 700, margin: '0 0 24px', lineHeight: 1.1 }}>{watch.model}</h2>


                        <div style={{ height: '1px', width: '40px', background: 'var(--text-primary)', opacity: 0.1, marginBottom: '24px' }}></div>

                        <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '40px' }}>
                            {watch.description}
                        </p>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '24px', fontWeight: 600, marginRight: 'auto' }}>{watch.price}</span>

                            <button
                                onClick={() => setIsTryOnOpen(true)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    padding: '12px 24px',
                                    borderRadius: '30px',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <Camera size={18} />
                                Try on Wrist
                            </button>

                            <a
                                href={watch.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: 'var(--accent)',
                                    color: '#fff',
                                    padding: '12px 24px',
                                    borderRadius: '30px',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    transition: 'transform 0.2s',
                                    textDecoration: 'none'
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <Youtube size={18} />
                                Review
                            </a>
                        </div>
                    </div>
                </motion.div>
                <style>{`
            .modal-content {
            grid-template-columns: 1fr 1fr;
            }
            @media (max-width: 768px) {
            .modal-content {
                display: flex;
                flex-direction: column;
                overflow-y: auto;
                max-height: 90vh;
                height: auto;
            }
            .modal-image-container {
                height: 300px;
                flex-shrink: 0;
            }
            .modal-details {
                padding: 30px;
            }
            }
        `}</style>
            </motion.div>
            <AnimatePresence>
                {isStoryOpen && (
                    <BrandStoryModal brand={watch.brand} isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />
                )}
                {isTryOnOpen && (
                    <VirtualTryOn watch={watch} isOpen={isTryOnOpen} onClose={() => setIsTryOnOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}
