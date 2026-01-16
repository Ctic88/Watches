import React, { useState } from 'react';
import { Watch, Moon, Sun, ShoppingBag, Heart, ArrowLeftRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import CartDrawer from './CartDrawer';
import FavoritesModal from './FavoritesModal';
import CompareModal from './CompareModal';

export default function Navbar({ theme, toggleTheme }) {
    const { cart, favorites, compareList } = useStore();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isFavOpen, setIsFavOpen] = useState(false);
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    return (
        <>
            <nav style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                width: '100%',
                height: '60px', // Slightly taller for better touch targets
                backgroundColor: 'var(--nav-bg)',
                backdropFilter: 'saturate(180%) blur(20px)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease, border-color 0.3s ease'
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '20px', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                        <Watch size={24} />
                        <span>WatchStore</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        {/* Compare Trigger */}
                        <NavIconBtn count={compareList.length} onClick={() => setIsCompareOpen(true)}>
                            <ArrowLeftRight size={20} />
                        </NavIconBtn>

                        {/* Favorites Trigger */}
                        <NavIconBtn count={favorites.length} onClick={() => setIsFavOpen(true)}>
                            <Heart size={20} />
                        </NavIconBtn>

                        {/* Cart Trigger */}
                        <NavIconBtn count={cart.reduce((a, b) => a + b.quantity, 0)} onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag size={20} />
                        </NavIconBtn>

                        <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 8px' }}></div>

                        <button
                            onClick={toggleTheme}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--text-primary)',
                                opacity: 0.8,
                                cursor: 'pointer'
                            }}
                            aria-label="Toggle Theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <FavoritesModal isOpen={isFavOpen} onClose={() => setIsFavOpen(false)} />
            <CompareModal isOpen={isCompareOpen} onClose={() => setIsCompareOpen(false)} />
        </>
    );
}

function NavIconBtn({ children, count, onClick }) {
    return (
        <button onClick={onClick} style={{ position: 'relative', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {children}
            {count > 0 && (
                <span style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    background: 'var(--accent)',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {count}
                </span>
            )}
        </button>
    );
}
