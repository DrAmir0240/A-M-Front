import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";
import './css/resume.css';
import amir from "./css/img/amir.jpg";

function ResumeAmir() {
    const [founders, setFounders] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://back-end.a8m.ir/api/founders/1')
            .then(response => {
                setFounders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('خطا در دریافت داده:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    const technologiesString = founders.technologies || '';
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
            <div className="resume-container">
                <div className="resume-header">
                    <div className="resume-name">
                        <h1>{founders.full_name || 'amir'}</h1>
                    </div>
                    <div className="resume-logo">
                        <img src={amir} alt="Founder Logo" className="circular-founder-logo" />
                    </div>
                </div>
                <div className="resume-description">
                    <p dir="auto" style={{ unicodeBidi: "plaintext" }}>
                        {founders.description?.split('\n').map((line, index) => (
                            <span key={index} style={{ display: 'block', marginBottom: '10px' }}>
                                {line}
                            </span>
                        )) || 'توضیحات در دسترس نیست'}
                    </p>
                </div>
            </div>

            <div className="resume-container2">
                <div className="resume-text2">
                    <p className="resume-tech-title">Technologies</p>
                    <div className="resume-tech-icons">
                        {technologiesArray.length > 0 ? (
                            technologiesArray.map((tech, index) => {
                                const iconTech = tech.toLowerCase().replace(/\s+/g, '');
                                const iconClass = `devicon-${iconTech}-plain colored`;
                                return (
                                    <div key={index} className="tech-card">
                                        <i className={iconClass} style={{ fontSize: '48px' }}></i>
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

            <div className="resume-container-combined">
                <div className="resume-text-combined">
                    <div className="experience-section">
                        <h2 className="section-title">تجربیات کاری</h2>
                        <ul className="experience-list">
                            {(founders.experience || 'تجربه کاری در دسترس نیست')
                                .split(/\r?\n/)
                                .filter(item => item.trim() !== '')
                                .map((item, index) => (
                                    <li key={`exp-${index}`}>{item}</li>
                                ))}
                        </ul>
                    </div>
                    <div className="education-section">
                        <h2 className="section-title">تحصیلات</h2>
                        <ul className="experience-list">
                            {(founders.education || 'تحصیلات در دسترس نیست')
                                .split(/\r?\n/)
                                .filter(item => item.trim() !== '')
                                .map((item, index) => (
                                    <li key={`edu-${index}`}>{item}</li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ResumeAmir;