import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Truck, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CheckoutModal({ isOpen, onClose }) {
    const { cart, clearCart } = useStore();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', address: '', city: '', zip: '',
        cardNumber: '', exp: '', cvc: ''
    });

    if (!isOpen) return null;

    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return sum + price * item.quantity;
    }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const handleNext = () => {
        if (step === 1) setStep(2);
        else if (step === 2) handlePlaceOrder();
    };

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
            clearCart();
        }, 2000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: 'var(--text-primary)', minHeight: '600px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px' }}>Checkout</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column' }}>

                    {/* Progress Steps */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '10px' }}>
                        <StepIndicator current={step} target={1} icon={<Truck size={16} />} />
                        <div style={{ width: '40px', height: '2px', background: 'var(--border-color)', alignSelf: 'center' }}></div>
                        <StepIndicator current={step} target={2} icon={<CreditCard size={16} />} />
                        <div style={{ width: '40px', height: '2px', background: 'var(--border-color)', alignSelf: 'center' }}></div>
                        <StepIndicator current={step} target={3} icon={<Check size={16} />} />
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '20px' }}>Shipping Details</h3>
                                <div style={{ display: 'grid', gap: '16px' }}>
                                    <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                                    <Input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                                    <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                                        <Input name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '20px' }}>Payment</h3>
                                <div style={{ background: 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)', padding: '20px', borderRadius: '16px', color: '#fff', marginBottom: '24px' }}>
                                    <div style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.7, marginBottom: '20px' }}>Credit Card</div>
                                    <input
                                        name="cardNumber" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleChange}
                                        style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '20px', letterSpacing: '2px', marginBottom: '20px', outline: 'none' }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <input name="exp" placeholder="MM/YY" value={formData.exp} onChange={handleChange} style={{ width: '60px', background: 'transparent', border: 'none', color: '#fff', outline: 'none' }} />
                                        <input name="cvc" placeholder="CVC" value={formData.cvc} onChange={handleChange} style={{ width: '40px', background: 'transparent', border: 'none', color: '#fff', outline: 'none' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 600, borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                                    <span>Total to pay</span>
                                    <span>{total}</span>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '24px' }}>
                                    <Check size={40} />
                                </div>
                                <h2 style={{ fontSize: '28px', fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>Order Placed!</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Thank you for your purchase. A confirmation email has been sent to {formData.email}.</p>
                                <button onClick={onClose} style={{ padding: '12px 30px', background: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '30px', fontWeight: 600 }}>Continue Shopping</button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer Actions */}
                    {step < 3 && (
                        <div style={{ marginTop: '30px', display: 'flex', gap: '16px' }}>
                            {step > 1 && (
                                <button onClick={() => setStep(step - 1)} style={{ padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                disabled={isProcessing}
                                style={{ flex: 1, background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '15px', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                {isProcessing ? 'Processing...' : (step === 2 ? `Pay ${total}` : 'Next Step')}
                                {!isProcessing && step < 2 && <ArrowRight size={18} />}
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

function StepIndicator({ current, target, icon }) {
    const isActive = current >= target;
    return (
        <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: isActive ? 'var(--accent)' : 'var(--bg-secondary)',
            color: isActive ? '#fff' : 'var(--text-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s'
        }}>
            {icon}
        </div>
    );
}

function Input(props) {
    return (
        <input
            {...props}
            style={{
                width: '100%', padding: '15px', background: 'var(--bg-secondary)',
                border: '1px solid transparent', borderRadius: '12px',
                color: 'var(--text-primary)', fontSize: '15px', outline: 'none',
                transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'transparent'}
        />
    );
}
