// components/Footer.js
import React from 'react';
import styles from './css/footer.module.css';
import { FaInstagram, FaTelegram, FaGithub, FaPhoneAlt} from 'react-icons/fa';
import {SiGmail} from 'react-icons/si';
import {motion} from "framer-motion";
import logo from "./css/img/logo.png";

const Footer = () => {
    return (
        <div>
            <div className={styles.container}>
                {/* خط جداکننده بالای لوگو */}
                <div className={styles.separator}></div>

                {/* بخش لوگو */}
                <motion.div
                    className={styles.logoContainer}
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                >
                    <img src={logo} alt="Logo" className={styles.logo}/>
                </motion.div>

                {/* بخش ارتباط با ما */}
                <motion.div
                    className={styles.contactSection}
                    initial={{opacity: 0, y: 20}}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2>ارتباط با ما</h2>
                </motion.div>
            <nav id="footer"  className={styles.footer}>
                <ul>
                    <li>
                        <a href="#FooterQ">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span>
                         <FaInstagram/>
                        </span>
                        </a>
                    </li>
                    <li>
                        <a href="#footerQ">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span>
                         <FaTelegram/>
                        </span>
                        </a>
                    </li>
                    <li>
                        <a href="#footerQ">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span>
                         <FaGithub/>
                       </span>
                        </a>
                    </li>
                    <li>
                        <a href="#footerQ">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span>
                         <SiGmail/>
                        </span>
                        </a>
                    </li>
                    <li>
                        <a href="#FooterQ">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span>
                         <FaPhoneAlt/>
                        </span>
                        </a>
                    </li>
                </ul>
            </nav>

        </div>
        </div>
    );
};

export default Footer;