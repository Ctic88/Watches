import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export function useStore() {
    return useContext(StoreContext);
}

export function StoreProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('favorites');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    const [compareList, setCompareList] = useState(() => {
        try {
            const saved = localStorage.getItem('compareList');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        try {
            const saved = localStorage.getItem('recentlyViewed');
            return saved ? JSON.parse(saved) : [];
        } catch { return []; }
    });

    useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
    useEffect(() => localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);
    useEffect(() => localStorage.setItem('compareList', JSON.stringify(compareList)), [compareList]);
    useEffect(() => localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed)), [recentlyViewed]);

    const addToCart = (watch) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === watch.id);
            if (existing) {
                return prev.map(item => item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...watch, quantity: 1 }];
        });
    };

    const removeFromCart = (watchId) => {
        setCart(prev => prev.filter(item => item.id !== watchId));
    };

    const updateQuantity = (watchId, delta) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === watchId) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            });
        });
    };

    const clearCart = () => setCart([]);

    const toggleFavorite = (watch) => {
        setFavorites(prev => {
            if (prev.find(item => item.id === watch.id)) {
                return prev.filter(item => item.id !== watch.id);
            }
            return [...prev, watch];
        });
    };

    const addToCompare = (watch) => {
        setCompareList(prev => {
            if (prev.find(item => item.id === watch.id)) return prev;
            if (prev.length >= 2) return [prev[1], watch]; // Keep last 2
            return [...prev, watch];
        });
    };

    const removeFromCompare = (watchId) => {
        setCompareList(prev => prev.filter(item => item.id !== watchId));
    };

    const addToRecentlyViewed = (watch) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(item => item.id !== watch.id);
            return [watch, ...filtered].slice(0, 5); // Keep last 5, newest first
        });
    };

    return (
        <StoreContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, clearCart,
            favorites, toggleFavorite,
            compareList, addToCompare, removeFromCompare,
            recentlyViewed, addToRecentlyViewed
        }}>
            {children}
        </StoreContext.Provider>
    );
}
