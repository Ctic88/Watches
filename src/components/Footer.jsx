import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ background: '#0e0e0e', color: '#fff', paddingTop: '80px', paddingBottom: '40px', borderTop: '1px solid #222' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>

                {/* Brand Column */}
                <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', marginBottom: '20px' }}>WatchStore.</h3>
                    <p style={{ color: '#888', lineHeight: 1.6, fontSize: '14px', maxWidth: '300px' }}>
                        Curators of the world's finest timepieces. We believe in the art of horology and the timeless elegance of mechanical perfection.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                        <SocialIcon icon={<Instagram size={20} />} />
                        <SocialIcon icon={<Facebook size={20} />} />
                        <SocialIcon icon={<Twitter size={20} />} />
                        <SocialIcon icon={<Linkedin size={20} />} />
                    </div>
                </div>

                {/* Shop Column */}
                <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '0.1em' }}>Shop</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <LinkItem>New Arrivals</LinkItem>
                        <LinkItem>Best Sellers</LinkItem>
                        <LinkItem>Limited Editions</LinkItem>
                        <LinkItem>Pre-Owned</LinkItem>
                        <LinkItem>Accessories</LinkItem>
                    </ul>
                </div>

                {/* Support Column */}
                <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '0.1em' }}>Support</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <LinkItem>Contact Concierge</LinkItem>
                        <LinkItem>Shipping & Returns</LinkItem>
                        <LinkItem>Warranty</LinkItem>
                        <LinkItem>Service Center</LinkItem>
                        <LinkItem>FAQ</LinkItem>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '0.1em' }}>The Collector's Club</h4>
                    <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>
                        Join our exclusive list for early access to drops and private sales.
                    </p>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            placeholder="Email address"
                            style={{
                                width: '100%',
                                background: '#1c1c1e',
                                border: '1px solid #333',
                                padding: '14px 16px',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                        />
                        <button style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'var(--accent)',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px',
                            color: '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container" style={{ borderTop: '1px solid #222', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <p style={{ color: '#555', fontSize: '12px' }}>© 2026 WatchStore Inc. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <span style={{ color: '#555', fontSize: '12px', cursor: 'pointer' }}>Privacy Policy</span>
                    <span style={{ color: '#555', fontSize: '12px', cursor: 'pointer' }}>Terms of Service</span>
                </div>
            </div>
        </footer>
    );
}

function LinkItem({ children }) {
    return (
        <li style={{ color: '#aaa', fontSize: '14px', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent)'} onMouseOut={e => e.target.style.color = '#aaa'}>
            {children}
        </li>
    );
}

function SocialIcon({ icon }) {
    return (
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1c1c1e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--accent)'} onMouseOut={e => e.currentTarget.style.background = '#1c1c1e'}>
            {icon}
        </div>
    );
}
