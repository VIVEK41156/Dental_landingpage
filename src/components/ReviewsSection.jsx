import { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import './ReviewsSection.css';

const reviewsData = [
    {
        id: 1,
        text: "We struggled to appear in Google Maps for years. After working with Digitmarket US, our practice became much more visible in local searches across Chicago.",
        author: "Dr. Michael R.",
        location: "Chicago, IL",
        tag: "Better Maps Ranking"
    },
    {
        id: 2,
        text: "Digitmarket US clearly understands dental SEO. Their focus on visibility and rankings helped our clinic stand out in a competitive area.",
        author: "Dr. Sarah L.",
        location: "Naperville, IL",
        tag: "Increased Visibility"
    },
    {
        id: 3,
        text: "Our website traffic from local searches improved steadily. The team explained everything in simple terms and focused only on SEO.",
        author: "Practice Manager",
        location: "Illinois",
        tag: "Traffic Growth"
    },
    {
        id: 4,
        text: "We noticed better placement for key dental searches and stronger Google Maps presence within a few months.",
        author: "Dr. Anil K.",
        location: "Schaumburg, IL",
        tag: "Stronger Presence"
    },
    {
        id: 5,
        text: "What we liked most was their ethical and long-term approach. No hype — just consistent improvements in visibility.",
        author: "Dr. Emily T.",
        location: "Evanston, IL",
        tag: "Ethical Growth"
    },
    {
        id: 6,
        text: "Digitmarket US helped us clean up local listings and optimize our service pages. Our practice is now easier to find online.",
        author: "Office Admin",
        location: "Oak Brook, IL",
        tag: "Easy to Find"
    },
    {
        id: 7,
        text: "Their dental-focused SEO strategy made a noticeable difference in how often patients mention finding us on Google.",
        author: "Dr. Jason M.",
        location: "Chicago, IL",
        tag: "More Patients"
    },
    {
        id: 8,
        text: "We appreciated the clear reporting and transparency. The focus on rankings and discoverability really worked for us.",
        author: "Clinic Owner",
        location: "Skokie, IL",
        tag: "Clear Reporting"
    },
    {
        id: 9,
        text: "Our clinic competes in a tough market, but Digitmarket US improved our organic presence without pushing ads.",
        author: "Dr. Laura P.",
        location: "Illinois",
        tag: "Organic Reach"
    },
    {
        id: 10,
        text: "A reliable SEO partner for dental practices. Their understanding of local search and Google Maps is strong.",
        author: "Director",
        location: "Chicago, IL",
        tag: "Local Search Expert"
    }
];

const ReviewCard = ({ review }) => (
    <div className="review-card">
        {/* Top: Name & Stars */}
        <div className="review-card-top">
            <h3 className="review-author-name">{review.author}</h3>
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                ))}
            </div>
        </div>

        {/* Middle: Quote */}
        <div className="review-card-body">
            <p>"{review.text}"</p>
        </div>

        {/* Divider */}
        <div className="review-divider"></div>

        {/* Bottom: Location & Tag */}
        <div className="review-card-bottom">
            <span className="review-location">{review.location}</span>
            <span className="review-tag">{review.tag}</span>
        </div>
    </div>
);

const ReviewsSection = () => {
    // State for the slider
    const [currentSlide, setCurrentSlide] = useState(0);
    const timeoutRef = useRef(null);

    // Use reviews directly as slides (1 per slide)
    const slides = reviewsData;
    const totalSlides = slides.length;

    // Auto-advance
    useEffect(() => {
        const nextSlide = () => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        };
        timeoutRef.current = setInterval(nextSlide, 5000); // 5 seconds per slide

        return () => {
            if (timeoutRef.current) clearInterval(timeoutRef.current);
        };
    }, [totalSlides]);

    // Manual Dot Click
    const goToSlide = (index) => {
        if (timeoutRef.current) clearInterval(timeoutRef.current);
        setCurrentSlide(index);
    };

    return (
        <section className="reviews-section">
            <div className="reviews-container">
                <div className="reviews-header">
                    <h2>What Our Clients Say</h2>
                    <p>Real results from dental practices across Illinois.</p>
                </div>

                {/* Slider Window */}
                <div className="slider-window">
                    <div
                        className="slider-track"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((review, index) => (
                            <div key={`slide-${index}`} className="slide-item">
                                <div className="slide-content-single">
                                    <ReviewCard review={review} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots Navigation - Yellow Dots like ref */}
                <div className="slider-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
