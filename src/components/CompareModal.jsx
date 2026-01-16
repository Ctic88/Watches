import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

function getMockSpecs(watchId) {
    // Deterministic mock specs based on ID
    const movements = ['Automatic', 'Quartz', 'Manual Wind', 'Co-Axial Master Chronometer'];
    const cases = ['40mm', '42mm', '39mm', '44mm', '41mm'];
    const materials = ['Stainless Steel', 'Titanium', 'Rose Gold', 'Ceramic', 'White Gold'];
    const waterRes = ['100m', '300m', '50m', '200m'];

    return {
        movement: movements[watchId % movements.length],
        caseSize: cases[watchId % cases.length],
        material: materials[watchId % materials.length],
        waterResistance: waterRes[watchId % waterRes.length]
    };
}

export default function CompareModal({ isOpen, onClose }) {
    const { compareList, removeFromCompare, addToCart } = useStore();

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ width: '100%', maxWidth: '1000px', maxHeight: '80vh', background: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: 'var(--text-primary)' }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px' }}>Compare</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: compareList.length === 2 ? '1fr 1fr' : '1fr', divideX: '1px solid var(--border-color)' }}>
                    {compareList.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Select watches to compare.</div>
                    ) : (
                        compareList.map(item => {
                            const specs = getMockSpecs(item.id);
                            return (
                                <div key={item.id} style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <button onClick={() => removeFromCompare(item.id)} style={{ alignSelf: 'flex-end', marginBottom: '20px' }}><X size={20} /></button>
                                    <div style={{ width: '200px', height: '200px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={item.image} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <h3 style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase' }}>{item.brand}</h3>
                                    <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '10px' }}>{item.model}</h2>
                                    <div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '40px' }}>{item.price}</div>

                                    <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <SpecRow label="Movement" value={specs.movement} />
                                        <SpecRow label="Case Size" value={specs.caseSize} />
                                        <SpecRow label="Case Material" value={specs.material} />
                                        <SpecRow label="Water Resistance" value={specs.waterResistance} />
                                    </div>

                                    <button onClick={() => addToCart(item)} style={{ marginTop: '40px', width: '100%', padding: '12px', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '12px', fontWeight: 600 }}>
                                        Add to Cart
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

function SpecRow({ label, value }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
            <span style={{ fontWeight: 500 }}>{value}</span>
        </div>
    );
}
