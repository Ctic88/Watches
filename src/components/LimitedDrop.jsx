import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Bell } from 'lucide-react';

export default function LimitedDrop() {
    // Set drop time to 24 hours from now (simulated)
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 12, minutes: 45, seconds: 0 });
    const [isNotified, setIsNotified] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (val) => val.toString().padStart(2, '0');

    return (
        <section style={{ marginBottom: '60px', marginTop: '-40px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
                    borderRadius: '24px',
                    padding: '40px',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    border: '1px solid #333'
                }}
            >
                {/* Background Glow */}
                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(212,136,6,0.1) 0%, transparent 60%)', pointerEvents: 'none' }}></div>

                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px' }}>
                    <div style={{
                        background: 'rgba(212, 136, 6, 0.2)', color: '#d48806',
                        padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px',
                        textTransform: 'uppercase', letterSpacing: '0.1em'
                    }}>
                        <Timer size={14} />
                        Next Drop Incoming
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', marginBottom: '16px', lineHeight: 1.2 }}>
                        The "Midnight Gold" Collection
                    </h2>

                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '30px', maxWidth: '400px' }}>
                        Limited to 50 pieces worldwide. A masterpiece of engineering hidden in shadow. Be the first to know.
                    </p>

                    {/* Countdown */}
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '36px' }}>
                        <TimeBox value={timeLeft.hours} label="Hours" />
                        <span style={{ fontSize: '30px', fontWeight: 200, color: 'rgba(255,255,255,0.2)', marginTop: '5px' }}>:</span>
                        <TimeBox value={timeLeft.minutes} label="Mins" />
                        <span style={{ fontSize: '30px', fontWeight: 200, color: 'rgba(255,255,255,0.2)', marginTop: '5px' }}>:</span>
                        <TimeBox value={timeLeft.seconds} label="Secs" />
                    </div>

                    <button
                        onClick={() => setIsNotified(true)}
                        disabled={isNotified}
                        style={{
                            padding: '16px 32px',
                            background: isNotified ? '#333' : '#d48806',
                            color: isNotified ? '#888' : '#fff',
                            borderRadius: '30px',
                            fontWeight: 600,
                            border: 'none',
                            fontSize: '16px',
                            cursor: isNotified ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.2s'
                        }}
                    >
                        {isNotified ? (
                            <>Check your inbox</>
                        ) : (
                            <>
                                <Bell size={18} />
                                Notify Me
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}

function TimeBox({ value, label }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                fontSize: '42px', fontWeight: 700, fontFamily: 'monospace',
                background: 'linear-gradient(180deg, #fff 0%, #aaa 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
                {value.toString().padStart(2, '0')}
            </div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
                {label}
            </div>
        </div>
    );
}
