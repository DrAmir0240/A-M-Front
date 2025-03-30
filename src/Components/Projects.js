import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/example.css';
import axios from 'axios';


const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    // Fetch projects from API
    useEffect(() => {
        axios
            .get('https://back-end.a8m.ir/api/')
            .then((response) => {
                setProjects(response.data.projects || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Map projects to card format
    const cards = projects.map((project) => ({
        id: project.id,
        title: project.name || 'Untitled',
        image: project.picture // مسیر کامل عکس
    }));

    const handleMoreDetail = (cardId) => {
        navigate(`/projects/${cardId}`);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div id="example" className="example-our-portfolio section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="example-section-heading">
                                        <h4>
                                            <span>نمونه پروژه‌های انجام‌شده</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="portfolio-grid">
                                {cards.map((card) => (
                                    <div
                                        key={card.id}
                                        className="portfolio-card"
                                        onClick={() => handleMoreDetail(card.id)}
                                    >
                                        <div className="thumb">
                                            <img
                                                src={card.image}
                                                alt={card.title}

                                            />
                                        </div>
                                        <div className="down-content">
                                            <h4>{card.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;