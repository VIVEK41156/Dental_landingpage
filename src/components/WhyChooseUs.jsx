import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyChooseUs.css';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const items = trackRef.current.querySelectorAll('.timeline-item');
        const line = lineRef.current;

        // Initial State for items (applies universally)
        gsap.set(items, { opacity: 0, y: 50, rotateX: 30 });
        // Initial state for line will be handled by CSS or the first animation in matchMedia

        // Use matchMedia for responsive animations
        let mm = gsap.matchMedia();

        mm.add({
            // Desktop
            isDesktop: "(min-width: 993px)",
            // Mobile
            isMobile: "(max-width: 992px)",
        }, (context) => {
            let { isDesktop, isMobile } = context.conditions;

            // Master Timeline triggered by scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: isMobile ? "top 80%" : "top 60%", // Start earlier on mobile
                    end: "bottom 80%",
                    scrub: 1,
                }
            });

            // Animate Line Filling
            tl.to(line, {
                width: isDesktop ? '100%' : '4px', // Full width on desktop, fixed width on mobile
                height: isMobile ? '100%' : '4px', // Full height on mobile, fixed height on desktop
                duration: 4,
                ease: "none"
            });

            // Animate Items sequentially
            items.forEach((item, index) => {
                const startTime = index * 0.9;

                tl.to(item, {
                    opacity: 1,
                    y: 0,
                    x: 0, // Reset any X offset
                    rotateX: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }, startTime);

                // Glow effect on icon
                tl.to(item.querySelector('.timeline-icon'), {
                    backgroundColor: '#22d3ee',
                    boxShadow: '0 0 30px #22d3ee',
                    duration: 0.2
                }, startTime);
            });
        });

        // Initial State cleanup
        return () => mm.revert();
    }, []);

    return (
        <section className="why-choose-us" ref={sectionRef} id="why-choose-us">
            <div className="why-choose-us__bg">
                {/* Animated Grid Background */}
                <div className="grid-bg"></div>
            </div>

            <div className="container">
                <div className="why-choose-us__header">
                    <h2 className="why-choose-us__title">
                        Why Dentists Choose <br />
                        <span className="gradient-text">DigitmarketUS for SEO?</span>
                    </h2>
                    <p className="why-choose-us__intro">
                        Most patients search Google before booking a dentist. If your practice doesn’t appear on Page 1
                        or in Google Maps, those patients choose another clinic.
                    </p>
                </div>

                {/* 3D Timeline Flow */}
                <div className="timeline-container">
                    {/* The Connecting Line */}
                    <div className="timeline-line-bg"></div>
                    <div className="timeline-line-fill" ref={lineRef}></div>

                    <div className="timeline-track" ref={trackRef}>
                        {/* Step 1 */}
                        <div className="timeline-item">
                            <div className="timeline-marker">
                                <div className="timeline-icon">1</div>
                            </div>
                            <div className="timeline-content glass-card">
                                <h3>Rank High</h3>
                                <p>For targeted keywords & service-based searches.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="timeline-item">
                            <div className="timeline-marker">
                                <div className="timeline-icon">2</div>
                            </div>
                            <div className="timeline-content glass-card">
                                <h3>Google Maps</h3>
                                <p>Appear in top local results for immediate visibility.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="timeline-item">
                            <div className="timeline-marker">
                                <div className="timeline-icon">3</div>
                            </div>
                            <div className="timeline-content glass-card">
                                <h3>Active Visibility</h3>
                                <p>Be seen by patients actively searching for dental care.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="timeline-item">
                            <div className="timeline-marker">
                                <div className="timeline-icon">4</div>
                            </div>
                            <div className="timeline-content glass-card">
                                <h3>Cost Efficient</h3>
                                <p>Reduce long-term marketing costs with organic growth.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Conclusion */}
                <div className="why-choose-us__footer">
                    <p className="footer-glow-text">
                        Digitmarketus SEO Service delivers sustainable, long-term visibility compared to short term paid advertising.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;
