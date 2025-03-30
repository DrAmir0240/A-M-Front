import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
import './css/detail.css';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

function Detail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`https://back-end.a8m.ir/api/projects/${id}`);
                setProject(response.data);
                setLoading(false);
            } catch (err) {
                console.error('خطا در دریافت داده:', err);
                setError('مشکلی در بارگذاری داده‌ها پیش آمد.');
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const handleViewProject = () => {
        if (project && project.name) {
            const normalizedName = project.name.replace(/\s+/g, '');
            navigate(`/project/${normalizedName}`);
        }
    };

    const openImage = (image) => {
        setSelectedImage(image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!project) {
        return <div>پروژه‌ای یافت نشد.</div>;
    }

    const images = project.images?.map(item => item.image) || [];
    const technologiesString = project.technologies || '';
    const technologiesArray = technologiesString
        .split('\r\n')
        .filter(tech => tech.trim() !== '')
        .map(tech => tech.toLowerCase().trim())
        .map(tech => {
            // فقط دو مورد خاص رو تغییر می‌دیم
            if (tech === 'googlecloud') return 'Google Cloud';
            if (tech === 'amazonwebservices') return 'Amazon Web Services';
            return tech; // بقیه بدون هیچ تغییری
        });



    return (
        <div>
            <Navbar />

            <div className="detail-container">
                <div className="detail-header">
                    <div className="detail-name">
                        <h1>{project.name || 'جزئیات'}</h1>
                    </div>
                    <div className="detail-logo">
                        <img src={project.picture} alt="detail Logo" />
                    </div>
                </div>
                <div className="detail-description">
                    {project.description?.split('\n').map((line, index) => (
                        <span dir="auto" key={index} style={{ display: 'block', marginBottom: '10px', unicodeBidi: "plaintext" }}>
                            {line}
                        </span>
                    )) || 'اکتفا'}
                </div>
            </div>

            {images.length > 0 && (
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} onClick={() => openImage(image)}>
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {selectedImage && (
                <div className="modal-overlay" onClick={closeImage}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="عکس بزرگ" className="modal-image" />
                        <span className="modal-close" onClick={closeImage}>×</span>
                    </div>
                </div>
            )}

            <div className="resume-container2">
                <div className="resume-text2">
                    <p className="resume-tech-title"> تکنولوژی های استفاده شده در پروژه</p>
                    <div className="resume-tech-icons">
                        {technologiesArray.length > 0 ? (
                            technologiesArray.map((tech, index) => {
                                const iconTech = tech.toLowerCase().replace(/\s+/g, '');
                                const iconClass = `devicon-${iconTech}-plain colored`;
                                return (
                                    <div key={index} className="tech-card">
                                        <i className={iconClass} style={{fontSize: '48px'}}></i>
                                        <span className="tech-name">{tech}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <p>تکنولوژی‌ها مشخص نشده‌اند</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="detail-container3">
                <div className="detail-text3">
                    <p className="links-title">لینک‌ها</p>
                    <div className="buttons-container">
                        {project.github ? (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-button"
                            >
                                <i className="devicon-github-original"></i>
                                <span>گیت‌هاب پروژه</span>
                            </a>
                        ) : (
                            <button className="github-button disabled" disabled>
                                <i className="devicon-github-original"></i>
                                <span>گیت‌هاب در دسترس نیست</span>
                            </button>
                        )}

                        <button className="demo-button" onClick={handleViewProject}>
                            <i className="devicon-chrome-plain"></i>
                            <span>مشاهده پروژه</span>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Detail;