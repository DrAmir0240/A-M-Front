import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Slogan from './Slogan';
import Aboutus from './Aboutus';
import Founders from './Founders';
import Projects from './Projects';
import Assist from './Assist';

function HomePage() {
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            // پاک کردن state از تاریخچه
            window.history.replaceState({}, document.title, '/home');
        }
    }, [location]);

    return (
        <main id="home">
            <Slogan />
            <Aboutus />
            <Founders id="founders" />
            <Projects id="example" />
            <Assist />
        </main>
    );
}

export default HomePage;