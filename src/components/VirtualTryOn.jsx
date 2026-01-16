import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, RotateCw, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';

export default function VirtualTryOn({ watch, isOpen, onClose }) {
    const [image, setImage] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // UseRef for stable drag tracking values
    const dragRef = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0 });
    const containerRef = useRef(null);

    if (!isOpen || !watch) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    // Global event listeners for smooth dragging outside the container
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - dragRef.current.startX;
            const deltaY = e.clientY - dragRef.current.startY;

            setPosition({
                x: dragRef.current.lastX + deltaX,
                y: dragRef.current.lastY + deltaY
            });
        };

        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                // Update final position references
                dragRef.current.lastX = position.x;
                dragRef.current.lastY = position.y;
            }
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, position.x, position.y]);

    const onMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
        // Sync ref with current state in case of jumps
        dragRef.current.lastX = position.x;
        dragRef.current.lastY = position.y;
    };

    // Generic wrist image for demo
    const defaultWrist = "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&q=80&w=1000";

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ width: '100%', maxWidth: '900px', height: '80vh', background: '#000', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
                onClick={e => e.stopPropagation()}
            >
                {/* SVG Filter Definition for Background Removal */}
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                        <filter id="remove-white" colorInterpolationFilters="sRGB">
                            <feComponentTransfer>
                                <feFuncR type="identity" />
                                <feFuncG type="identity" />
                                <feFuncB type="identity" />
                            </feComponentTransfer>
                            {/* 
                                Matrix to turn white transparent: R+G+B > Threshold -> Alpha = 0.
                                Alpha = -1.3*R - 1.3*G - 1.3*B + 1*A + 3.8
                                White(1,1,1) -> -3.9 + 1 + 3.8 = 0.9 -> This logic is inverse.
                                Wait, SVG Matrix clamps to [0,1]? Yes.
                                If result < 0, it becomes 0.
                                
                                Let's retry logic:
                                We want Alpha to be 0 for White.
                                Alpha = 4 - (R+G+B).
                                Matrix row 4: -1 -1 -1 1 4
                                White(1,1,1) -> -3 + 1 + 4 = 2 (Clamped to 1). Still opaque.
                                
                                We want White -> 0.
                                Alpha = 1 - (R+G+B - Threshold)*Slope
                                
                                Let's stick with what worked conceptually before:
                                "3 - (R+G+B)"
                                Matrix: 0 0 0 0 0 | 0 0 0 0 0 | 0 0 0 0 0 | -1 -1 -1 1 3
                                White (1,1,1) -> -3 + 1 + 3 = 1. Still failing.
                                
                                Wait, if existing alpha is 1...
                                -1 -1 -1 0 3 ?
                                White -> -3 + 3 = 0. YES!
                                
                                Try: -1.33 -1.33 -1.33 0 4 ?
                                White -> -3.99 + 4 = 0.01.
                                
                                Let's go with: -1.5 -1.5 -1.5 0 4.5
                                White(1,1,1) -> -4.5 + 4.5 = 0.
                                Light Color(0.9,0.9,0.9) -> -4.05 + 4.5 = 0.45.
                                Dark Color(0,0,0) -> 0 + 4.5 = 4.5 (Clamped to 1).
                            */}
                            <feColorMatrix
                                type="matrix"
                                values="1 0 0 0 0  
                                        0 1 0 0 0  
                                        0 0 1 0 0  
                                        -1.5 -1.5 -1.5 0 4.5"
                            />
                        </filter>
                    </defs>
                </svg>

                {/* Header */}
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1c1c1e', borderBottom: '1px solid #333' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#fff', margin: 0 }}>Virtual Try-On</h2>
                        <span style={{ fontSize: '12px', background: 'var(--accent)', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>BETA</span>
                    </div>
                    <button onClick={onClose} style={{ color: '#fff', opacity: 0.7 }}><X size={24} /></button>
                </div>

                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                    {/* Canvas Area */}
                    <div
                        style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'default', background: '#111' }}
                        ref={containerRef}
                    >
                        <img
                            src={image || defaultWrist}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', opacity: image ? 1 : 0.5 }}
                        />

                        {!image && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                                <p style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>Upload a photo of your wrist<br />or use this model.</p>
                                <label style={{ pointerEvents: 'auto', cursor: 'pointer', background: 'var(--accent)', color: '#fff', padding: '10px 20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                                    <Upload size={16} />
                                    Upload Photo
                                    <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                                </label>
                            </div>
                        )}

                        {/* Watch Overlay */}
                        <div
                            onMouseDown={onMouseDown}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                                width: '200px',
                                cursor: 'grab',
                                userSelect: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10
                            }}
                        >
                            <img
                                src={watch.image}
                                style={{
                                    width: '100%',
                                    pointerEvents: 'none',
                                    filter: 'url(#remove-white)',
                                }}
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* Controls Sidebar */}
                    <div style={{ width: '250px', background: '#1c1c1e', padding: '24px', borderLeft: '1px solid #333', color: '#fff', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Adjust Fit</h3>
                            <p style={{ fontSize: '12px', opacity: 0.6 }}>Drag the watch to position it.</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <button onClick={() => setScale(s => Math.max(0.2, s - 0.1))} style={{ padding: '8px', background: '#333', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}><ZoomOut size={18} /></button>
                                <span style={{ fontSize: '12px', fontWeight: 600 }}>Size</span>
                                <button onClick={() => setScale(s => Math.min(3, s + 0.1))} style={{ padding: '8px', background: '#333', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}><ZoomIn size={18} /></button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <button onClick={() => setRotation(r => r - 15)} style={{ padding: '8px', background: '#333', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}><RotateCw size={18} style={{ transform: 'scaleX(-1)' }} /></button>
                                <span style={{ fontSize: '12px', fontWeight: 600 }}>Rotate</span>
                                <button onClick={() => setRotation(r => r + 15)} style={{ padding: '8px', background: '#333', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}><RotateCw size={18} /></button>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <div style={{ background: '#333', padding: '16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={watch.image} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', fontWeight: 600 }}>{watch.brand}</div>
                                    <div style={{ fontSize: '10px', opacity: 0.7 }}>{watch.model}</div>
                                </div>
                            </div>
                        </div>

                        <label style={{ cursor: 'pointer', background: '#333', color: '#fff', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600, fontSize: '14px', marginTop: '10px' }}>
                            <Upload size={16} />
                            Change Photo
                            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                        </label>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
