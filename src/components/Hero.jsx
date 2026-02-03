import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleTeeth from './ParticleTeeth';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Component
 * Stunning 3D visualization section with scroll-triggered rotation
 */
const Hero = ({ onContactClick }) => {
    const textRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Text Reveal Animation
        gsap.fromTo(textRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            }
        );
    }, []);

    return (
        <section className="hero" id="home" ref={sectionRef}>
            <div className="hero__container container">

                {/* Left Content */}
                <div className="hero__content" ref={textRef}>
                    <h1 className="hero__title">
                        <span className="hero__title-highlight">Digitmarket US</span>
                        <span className="hero__title-sub">Trusted Dental SEO Services in Chicago</span>
                    </h1>

                    <p className="hero__description glass-text">
                        Digitmarketus helps dentists and dental clinics in Chicago improve their online visibility
                        and organic Google rankings through ethical Dental SEO services. We specialize in Dental
                        SEO helping practices become more visible to people actively searching for dental care.
                    </p>

                    <div className="hero__actions">
                        <motion.button
                            className="btn btn-primary hero__btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onContactClick}
                        >
                            Book Free SEO Audit
                        </motion.button>

                        <motion.button
                            className="btn btn-outline hero__btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onContactClick}
                        >
                            Contact Us
                        </motion.button>
                    </div>
                </div>

                {/* Right Content - 3D Visual */}
                <div className="hero__visual">
                    <div className="hero__3d-container">
                        {/* 3D Particle Canvas */}
                        <Canvas
                            camera={{ position: [0, 0, 10], fov: 45 }}
                            style={{ width: '100%', height: '100%' }}
                            gl={{ preserveDrawingBuffer: true, alpha: true }}
                        >
                            <Suspense fallback={null}>
                                <Environment preset="city" />
                                <group position={[0, -0.5, 0]} scale={1.3}>
                                    <ParticleTeeth />
                                </group>
                                <OrbitControls
                                    enableZoom={false}
                                    enablePan={false}
                                    autoRotate
                                    autoRotateSpeed={0.5}
                                />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
