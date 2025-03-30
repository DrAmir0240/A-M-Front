import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Slogan from './Components/Slogan';
import Aboutus from './Components/Aboutus';
import Assist from './Components/Assist';
import Footer from './Components/Footer';
import ResumeAmir from './Components/ResumeAmir';
import ResumeMehdi from "./Components/ResumeMehdi";
import Projects from "./Components/Projects";
import Detail from "./Components/Detail";
import Founders from './Components/Founders';
import MiniProjectPage from './Components/MiniProjectPage';
import Whyus from "./Components/Whyus";
import Perspective from "./Components/Perspective";

function App() {
    return (
        <Router>
            <div>
                <div className="app-container">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Navbar/>
                                    <main id="home">
                                        <Slogan />
                                        <Aboutus />
                                        <Founders />
                                        <Perspective/>
                                        <Projects/>
                                        <Whyus/>
                                        <Assist />
                                    </main>
                                    <Footer />
                                </>
                            }
                        />

                        <Route path="/founders" element={<Founders />} />
                        <Route path="/founders/amir" element={<ResumeAmir />} />
                        <Route path="/founders/mehdi" element={<ResumeMehdi />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<Detail />} />
                        <Route path="/project/:projectName/*" element={<MiniProjectPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
