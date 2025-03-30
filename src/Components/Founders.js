import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/founders.css';
import amir from './css/img/amir.jpg';
import mehdi from './css/img/mehdi.jpg';


const Founders = () => {
    const slides = [
        { id: 'amir', image: amir, name: 'Amir Omidi', position: 'Back-end Developer' },
        { id: 'mehdi', image: mehdi, name: 'Mehdi Hahghi', position: 'Front-end Developer' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState(null); // برای نگه داشتن اسلاید قبلی
    const [direction, setDirection] = useState('right-to-left');
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevSlide(currentSlide); // اسلاید فعلی را به عنوان اسلاید قبلی ذخیره می‌کنیم
            setDirection((prev) => (prev === 'right-to-left' ? 'left-to-right' : 'right-to-left'));
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length, currentSlide]);

    const handleMoreInfo = () => navigate(`/founders/${slides[currentSlide].id}`);

    return (
        <div id="founders" className="sli">
            <div className="slider-container">
                <div className="slide">
                    {/* اسلاید قبلی در پس‌زمینه */}
                    {prevSlide !== null && (
                        <div className="slide-content slide-prev">
                            <img src={slides[prevSlide].image} alt={slides[prevSlide].name} className="slide-image" />
                            <div className="intro-text">
                                <span className="label">MY NAME IS</span>
                                <h2>{slides[prevSlide].name}</h2>
                                <span className="label">AREA OF EXPERTISE</span>
                                <p>{slides[prevSlide].position}</p>
                            </div>
                        </div>
                    )}
                    {/* اسلاید فعلی */}
                    <div className={`slide-content slide-current ${direction}`} key={currentSlide}>
                        <img src={slides[currentSlide].image} alt={slides[currentSlide].name} className="slide-image" />
                        <div className="intro-text">
                            <span className="label">MY NAME IS</span>
                            <h2>{slides[currentSlide].name}</h2>
                            <span className="label">AREA OF EXPERTISE</span>
                            <p>{slides[currentSlide].position}</p>
                        </div>
                    </div>
                    <div className="overlay">
                        <div className="info-right">
                            <button className="more-info-btn" onClick={handleMoreInfo}>
                                اطلاعات بیشتر
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Founders;