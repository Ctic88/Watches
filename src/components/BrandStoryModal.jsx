import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const stories = {
    'Rolex': {
        title: 'A Crown for Every Achievement',
        text: 'Since 1905, Rolex has been at the forefront of watchmaking innovation, from the first waterproof wristwatch, the Oyster, to the Perpetual rotor self-winding mechanism. Worn by explorers, achievers, and visionaries, a Rolex is more than a watch; it is a symbol of excellence.',
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2000'
    },
    'Omega': {
        title: 'Precise in Every Moment',
        text: 'From the depths of the ocean to the surface of the moon, Omega has set records for precision and reliability. As the Official Timekeeper of the Olympic Games and the choice of James Bond, Omega combines sporting spirit with elegance.',
        image: 'https://images.unsplash.com/photo-1623998021450-85c29c644e0d?auto=format&fit=crop&q=80&w=2000'
    },
    'Patek Philippe': {
        title: 'Begin Your Own Tradition',
        text: 'Founded in 1839, Patek Philippe is the last family-owned independent Genevan watch manufacturer. With total creative freedom, it designs, produces, and assembles what experts agree to be the finest timepieces in the world.',
        image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=2000'
    },
    'Audemars Piguet': {
        title: 'To Break the Rules, You Must First Master Them',
        text: 'Since 1875, Audemars Piguet has pushed the boundaries of Haute Horlogerie. In the Vallée de Joux, the brand has created complications and designs that have changed the industry, most notably the iconic Royal Oak.',
        image: 'https://images.unsplash.com/photo-1616058927055-6679589d3632?auto=format&fit=crop&q=80&w=2000'
    },
    'Cartier': {
        title: 'The Jeweler of Kings',
        text: 'Founded in Paris in 1847, Cartier is synonymous with open-mindedness and curiosity, seeing the beauty in everything. Creativity, freedom, excellence and sharing are all central to its values and watchmaking.',
        image: 'https://images.unsplash.com/photo-1594950454790-a2924194ae57?auto=format&fit=crop&q=80&w=2000'
    },
    'Generic': {
        title: 'The Art of Time',
        text: 'A masterpiece of engineering and design, this timepiece represents the pinnacle of horological craftsmanship. Every component is finished to the highest standards, ensuring a lifetime of precision and beauty.',
        image: 'https://images.unsplash.com/photo-1547996663-b830341fa521?auto=format&fit=crop&q=80&w=2000'
    }
};

export default function BrandStoryModal({ brand, isOpen, onClose }) {
    if (!isOpen) return null;

    const story = stories[brand] || stories['Generic'];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ width: '100%', maxWidth: '900px', height: '80vh', background: '#000', borderRadius: '0', overflow: 'hidden', display: 'flex', position: 'relative', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '30px', right: '30px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(10px)' }}
                >
                    <X size={20} />
                </button>

                <div style={{ flex: 1, position: 'relative' }}>
                    <img src={story.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)' }}></div>
                </div>

                <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#1c1c1e', color: '#fff' }}>
                    <h2 style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>Our Heritage</h2>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', marginBottom: '30px', lineHeight: 1.1 }}>{story.title}</h1>
                    <div style={{ width: '50px', height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: '30px' }}></div>
                    <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>
                        "{story.text}"
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>{brand}</div>
                        <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '4px' }}>Geneva, Switzerland</div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
