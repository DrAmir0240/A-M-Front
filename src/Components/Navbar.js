import React from 'react';
import {useNavigate} from "react-router-dom";
import './css/navbar.css';
import logo from './css/img/logo1.png';
import { IoHomeOutline, IoBriefcaseOutline, IoPersonOutline, IoMailOutline } from 'react-icons/io5';

const Navbar = () => {


    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            {/* منوی دسکتاپ */}
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="menu">
                    <li>
                        <a href="#footer" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('footer');
                        }}>
                            <IoMailOutline/> ارتباط با ما
                        </a>
                    </li>

                    <li>
                        <a href="#example" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('example');
                            navigate(`/#example`)
                        }}>
                            <IoBriefcaseOutline/> نمونه کار‌های ما
                        </a>
                    </li>
                    <li>
                        <a href="#founders" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('founders');
                            navigate(`/#founders`)
                        }}>
                            <IoPersonOutline/> موسسان
                        </a>
                    </li>
                    <li>
                        <a href="#home" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('home');
                            navigate(`/`)
                        }}>
                            <IoHomeOutline/> خانه
                        </a>
                    </li>
                </ul>
            </nav>

            {/* منوی ثابت پایین صفحه برای گوشی‌ها */}
            <nav className="mobile-bottom-nav">
                <ul>
                    <li>
                        <a href="#footer" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('footer');
                        }}>
                            <IoMailOutline/> <span>ارتباط با ما</span>
                        </a>
                    </li>

                    <li>
                        <a href="#example" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('example');
                            navigate(`/#example`)
                        }}>
                            <IoBriefcaseOutline/> <span>نمونه کارها</span>
                        </a>
                    </li>
                    <li>
                        <a href="#founders" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('founders');
                            navigate(`/#founders`)
                        }}>
                            <IoPersonOutline/> <span>موسسان</span>
                        </a>
                    </li>
                    <li>
                        <a href="#home" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('home');
                            navigate(`/`)
                        }}>
                            <IoHomeOutline/> <span>خانه</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;