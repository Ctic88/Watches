import { useState, useEffect, useMemo } from 'react';
import { StoreProvider } from './context/StoreContext';
import watchesData from './data/watches.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import WatchCard from './components/WatchCard';
import WatchModal from './components/WatchModal';
import RecentlyViewed from './components/RecentlyViewed';
import WatchAdvisor from './components/WatchAdvisor';
import LimitedDrop from './components/LimitedDrop';
import { AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import Footer from './components/Footer';

function AppContent() {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  // Theme state: check localStorage or system preference, default to light
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const brands = useMemo(() => {
    const allBrands = watchesData.map(w => w.brand);
    return ['All', ...new Set(allBrands)];
  }, []);

  const filteredWatches = useMemo(() => {
    let result = watchesData;

    // Filter by Brand
    if (selectedBrand !== 'All') {
      result = result.filter(w => w.brand === selectedBrand);
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(w =>
        w.brand.toLowerCase().includes(q) ||
        w.model.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));
    }

    return result;
  }, [selectedBrand, searchQuery, sortBy]);

  return (
    <div className="app">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <main className="container">
        <LimitedDrop />
        <FilterBar
          brands={brands}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {filteredWatches.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>No watches found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid">
            {filteredWatches.map(watch => (
              <WatchCard
                key={watch.id}
                watch={watch}
                onClick={() => setSelectedWatch(watch)}
              />
            ))}
          </div>
        )}
      </main>

      <RecentlyViewed onWatchClick={setSelectedWatch} />

      {/* Floating Advisor Button */}
      <button
        onClick={() => setIsAdvisorOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'linear-gradient(135deg, var(--accent) 0%, #aa6b04 100%)',
          color: '#fff',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 90,
          transition: 'transform 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Sparkles size={24} />
      </button>

      <AnimatePresence>
        {selectedWatch && (
          <WatchModal
            watch={selectedWatch}
            onClose={() => setSelectedWatch(null)}
          />
        )}
        {isAdvisorOpen && (
          <WatchAdvisor
            isOpen={isAdvisorOpen}
            onClose={() => setIsAdvisorOpen(false)}
            onSelectWatch={setSelectedWatch}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
