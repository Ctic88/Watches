import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={ref}
            style={{
                height: '80vh',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'var(--bg-card)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.3s ease'
            }}
        >
            <motion.div style={{ y: yText, opacity: opacityText, padding: '40px', zIndex: 10 }}>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '13px' }}
                >
                    New Collection
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ fontSize: '72px', fontFamily: 'var(--font-heading)', fontWeight: 700, lineHeight: 1.05, marginBottom: '32px', maxWidth: '900px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
                >
                    Precision in every second.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ fontSize: '24px', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.5, fontWeight: 400, margin: '0 auto' }}
                >
                    Discover our curated selection of the world's finest timepieces.
                </motion.p>
            </motion.div>

            {/* Background enhancement */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(212, 136, 6, 0.03) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        </section>
    );
}
