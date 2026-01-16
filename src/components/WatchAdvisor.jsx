import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, User, Briefcase, Heart, DollarSign, Activity, Clock, Search } from 'lucide-react';
import watchesData from '../data/watches.json';

// Helper to clean price string to number
const getPrice = (priceStr) => parseFloat(priceStr.replace(/[^0-9.]/g, ''));

export default function WatchAdvisor({ isOpen, onClose, onSelectWatch }) {
    const [step, setStep] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [preferences, setPreferences] = useState({
        persona: null,
        occasion: null,
        style: null,
        budget: null
    });
    const [results, setResults] = useState([]);

    if (!isOpen) return null;

    const steps = [
        {
            id: 'persona',
            question: "Who is this watch for?",
            subtitle: "Let's start with the basics.",
            options: [
                { id: 'me', label: 'Myself', icon: <User size={20} /> },
                { id: 'gift', label: 'A Gift', icon: <Heart size={20} /> },
                { id: 'partner', label: 'My Partner', icon: <User size={20} /> }
            ]
        },
        {
            id: 'occasion',
            question: "Where will it be worn?",
            subtitle: "Context matters.",
            options: [
                { id: 'daily', label: 'Daily Wear', icon: <Clock size={20} /> },
                { id: 'business', label: 'Business / Office', icon: <Briefcase size={20} /> },
                { id: 'adventure', label: 'Adventure / Sport', icon: <Activity size={20} /> },
                { id: 'special', label: 'Special Occasions', icon: <Sparkles size={20} /> }
            ]
        },
        {
            id: 'style',
            question: "Preferred Aesthetic?",
            subtitle: "What catches the eye?",
            options: [
                { id: 'minimalist', label: 'Minimalist & Clean', icon: <Search size={20} /> }, // Using generic icons for now
                { id: 'technical', label: 'Technical / Complex', icon: <Activity size={20} /> },
                { id: 'classic', label: 'Timeless Classic', icon: <Clock size={20} /> },
                { id: 'bold', label: 'Bold & Statement', icon: <Sparkles size={20} /> }
            ]
        },
        {
            id: 'budget',
            question: "What is your budget?",
            subtitle: "Unlocking the best value.",
            options: [
                { id: 'low', label: 'Entry Level', desc: 'Under $1,000', icon: <DollarSign size={20} /> },
                { id: 'mid', label: 'Mid-Range', desc: '$1,000 - $5,000', icon: <DollarSign size={20} /> },
                { id: 'luxury', label: 'Luxury', desc: '$5,000 - $15,000', icon: <DollarSign size={20} /> },
                { id: 'high', label: 'High-End', desc: 'Over $15,000', icon: <DollarSign size={20} /> }
            ]
        }
    ];

    const handleSelect = (key, value) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
        if (step < steps.length - 1) {
            setStep(prev => prev + 1);
        } else {
            startAnalysis({ ...preferences, [key]: value });
        }
    };

    const startAnalysis = (finalPrefs) => {
        setIsAnalyzing(true);
        // Simulate analysis delay
        setTimeout(() => {
            generateRecommendations(finalPrefs);
            setIsAnalyzing(false);
        }, 2000);
    };

    const generateRecommendations = (prefs) => {
        // Scoring Algorithm
        const scoredWatches = watchesData.map(watch => {
            let score = 0;
            const price = getPrice(watch.price);
            const text = (watch.description + ' ' + watch.model + ' ' + watch.brand).toLowerCase();

            // 1. Budget Filter (Hard Constraint - relaxed slightly)
            let matchesBudget = false;
            if (prefs.budget === 'low' && price < 1500) matchesBudget = true;
            else if (prefs.budget === 'mid' && price >= 800 && price <= 6000) matchesBudget = true;
            else if (prefs.budget === 'luxury' && price >= 4000 && price <= 18000) matchesBudget = true;
            else if (prefs.budget === 'high' && price > 12000) matchesBudget = true;

            if (!matchesBudget) return { ...watch, totalScore: -1 }; // Discard

            // 2. Occasion Scoring
            if (prefs.occasion === 'adventure') {
                if (text.includes('diver') || text.includes('water') || text.includes('chronograph') || text.includes('sport')) score += 5;
                if (watch.brand === 'Omega' || watch.brand === 'Breitling' || watch.brand === 'Tudor') score += 3;
            }
            if (prefs.occasion === 'business') {
                if (text.includes('elegant') || text.includes('slim') || text.includes('dress') || text.includes('leather')) score += 5;
                if (watch.brand === 'Cartier' || watch.brand === 'IWC' || watch.brand === 'Rolex') score += 3;
            }
            if (prefs.occasion === 'special') {
                if (text.includes('gold') || text.includes('diamond') || text.includes('precious') || text.includes('exquisite')) score += 5;
                if (watch.brand === 'Patek Philippe' || watch.brand === 'Audemars Piguet') score += 4;
            }
            if (prefs.occasion === 'daily') {
                if (text.includes('automatic') || text.includes('steel') || text.includes('versatile')) score += 5;
                score += 2; // Bias towards daily
            }

            // 3. Style Scoring
            if (prefs.style === 'minimalist') {
                if (text.includes('clean') || text.includes('simple') || text.includes('bauhaus') || text.includes('dial')) score += 4;
            }
            if (prefs.style === 'technical') {
                if (text.includes('complication') || text.includes('chronograph') || text.includes('movement') || text.includes('function')) score += 4;
            }
            if (prefs.style === 'classic') {
                if (text.includes('heritage') || text.includes('vintage') || text.includes('iconic')) score += 4;
            }
            if (prefs.style === 'bold') {
                if (text.includes('large') || text.includes('modern') || text.includes('unique') || text.includes('statement')) score += 4;
            }

            // Random variation to rotate inventory
            score += Math.random() * 2;

            return { ...watch, totalScore: score };
        });

        // Filter valid scores and sort
        const topPicks = scoredWatches
            .filter(w => w.totalScore > 0)
            .sort((a, b) => b.totalScore - a.totalScore)
            .slice(0, 3);

        // Fallback if no specific matches found (show random featured)
        if (topPicks.length < 3) {
            const featured = watchesData.sort(() => 0.5 - Math.random()).slice(0, 3);
            setResults(featured);
        } else {
            setResults(topPicks);
        }
    };

    const reset = () => {
        setStep(0);
        setPreferences({ persona: null, occasion: null, style: null, budget: null });
        setResults([]);
        setIsAnalyzing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-card)', borderRadius: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: 'var(--text-primary)', boxShadow: '0 25px 80px rgba(0,0,0,0.3)', minHeight: '550px' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ padding: '30px', background: 'linear-gradient(135deg, var(--accent) 0%, #aa6b04 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Sparkles size={24} />
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', margin: 0 }}>Watch Advisor</h2>
                    </div>
                    <button onClick={onClose} style={{ color: '#fff', opacity: 0.8 }}><X size={24} /></button>
                </div>

                {/* Content */}
                <div style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <AnimatePresence mode="wait">
                        {isAnalyzing ? (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles size={48} color="var(--accent)" />
                                </motion.div>
                                <h3 style={{ fontSize: '24px', fontWeight: 600 }}>Analyzing Catalog...</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Finding your perfect timepiece match.</p>
                            </motion.div>
                        ) : results.length > 0 ? (
                            <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ width: '100%' }}>
                                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '10px' }}>Your Curated Selection</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Based on your preferences.</p>
                                <div style={{ display: 'grid', gap: '16px' }}>
                                    {results.map((watch, idx) => (
                                        <motion.div
                                            key={watch.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            onClick={() => { onSelectWatch(watch); onClose(); }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '16px', cursor: 'pointer', textAlign: 'left', border: '1px solid transparent', transition: 'border-color 0.2s' }}
                                            whileHover={{ scale: 1.02, borderColor: 'var(--accent)' }}
                                        >
                                            <div style={{ width: '70px', height: '70px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <img src={watch.image} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>{watch.brand}</div>
                                                <div style={{ fontWeight: 600, fontSize: '15px' }}>{watch.model}</div>
                                            </div>
                                            <div style={{ fontWeight: 600, fontSize: '14px' }}>{watch.price}</div>
                                        </motion.div>
                                    ))}
                                </div>
                                <button onClick={reset} style={{ marginTop: '30px', padding: '12px 24px', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '20px', fontWeight: 600 }}>Start Over</button>
                            </motion.div>
                        ) : (
                            <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ width: '100%' }}>
                                <div style={{ marginBottom: '30px' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em' }}>Step {step + 1} of {steps.length}</span>
                                    <h3 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', marginTop: '10px' }}>{steps[step].question}</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>{steps[step].subtitle}</p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                                    {steps[step].options.map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleSelect(steps[step].id, opt.id)}
                                            style={{
                                                padding: '20px',
                                                background: 'var(--bg-secondary)',
                                                borderRadius: '20px',
                                                border: '2px solid transparent',
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '12px',
                                                transition: 'all 0.2s',
                                                height: '100%'
                                            }}
                                            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                                            onMouseOut={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                        >
                                            <div style={{
                                                width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-card)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                            }}>
                                                {opt.icon}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '15px', fontWeight: 600 }}>{opt.label}</div>
                                                {opt.desc && <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{opt.desc}</div>}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ marginTop: '30px', color: 'var(--text-secondary)', textDecoration: 'underline', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>Back</button>}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}
