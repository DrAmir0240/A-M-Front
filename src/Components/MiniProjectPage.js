import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function MiniProjectPage() {
    const { projectName } = useParams();
    const [ProjectComponent, setProjectComponent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProject = async () => {
            try {
                const normalizedName = projectName.replace(/\s+/g, '');
                console.log('projectName from URL:', projectName);
                console.log('normalizedName:', normalizedName);
                const projectModule = await import(`../MiniProjects/${normalizedName}/src/index.js`);
                setProjectComponent(() => projectModule.default);
                setLoading(false);
            } catch (err) {
                console.error(`Error loading project with name ${projectName}:`, err);
                setError(`مشکلی در بارگذاری مینی‌پروژه "${projectName}" پیش آمد. ممکن است پروژه وجود نداشته باشد یا نام آن اشتباه باشد.`);
                setLoading(false);
            }
        };

        loadProject();
    }, [projectName]);

    if (loading) {
        return <div>در حال بارگذاری مینی‌پروژه...</div>;
    }

    if (error) {
        return (
            <div>
                <div>{error}</div>
                <button onClick={() => navigate(-1)}>بازگشت</button>
            </div>
        );
    }

    return (
        <div>
            <div className="mini-project-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <br/>
                <div className="mini-project-container" style={{ width: '100%', maxWidth: '1200px' }}>
                    {ProjectComponent && <ProjectComponent />}
                </div>
              <br/>
            </div>
        </div>
    );
}

export default MiniProjectPage;