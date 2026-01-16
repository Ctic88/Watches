import { Search, ArrowUpDown } from 'lucide-react';

export default function FilterBar({ brands, selectedBrand, onSelectBrand, searchQuery, onSearchChange, sortBy, onSortChange }) {
    return (
        <div style={{ marginBottom: '40px' }}>
            {/* Top Row: Search & Sort */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '0 16px',
                    height: '48px',
                    transition: 'border-color 0.2s'
                }}>
                    <Search size={20} color="var(--text-secondary)" />
                    <input
                        type="text"
                        placeholder="Search watches..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            flex: 1,
                            marginLeft: '12px',
                            fontSize: '16px',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            height: '100%'
                        }}
                    />
                </div>

                <div style={{ position: 'relative', minWidth: '180px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '48px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        padding: '0 16px',
                        cursor: 'pointer'
                    }}>
                        <ArrowUpDown size={20} color="var(--text-secondary)" style={{ marginRight: '10px' }} />
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                width: '100%',
                                fontSize: '15px',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                outline: 'none',
                                appearance: 'none', // Remove default arrow in some browsers
                                WebkitAppearance: 'none'
                            }}
                        >
                            <option value="featured">Featured</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Brand Filters */}
            <div style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '10px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                justifyContent: 'flex-start',
            }}>
                {brands.map(brand => (
                    <button
                        key={brand}
                        onClick={() => onSelectBrand(brand)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '24px',
                            fontSize: '14px',
                            fontWeight: 500,
                            backgroundColor: selectedBrand === brand ? 'var(--accent)' : 'var(--bg-card)',
                            color: selectedBrand === brand ? '#fff' : 'var(--text-primary)',
                            border: selectedBrand === brand ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                            boxShadow: selectedBrand === brand ? '0 4px 12px var(--shadow-color)' : 'none',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                        }}
                    >
                        {brand}
                    </button>
                ))}
            </div>
        </div>
    );
}
