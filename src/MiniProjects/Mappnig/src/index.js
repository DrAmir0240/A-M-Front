import React, { useEffect, useState } from "react";
import "./styles/Mapping.css";
import SearchBox from "./Components/SearchBox";
import SearchBoxl from "./Components/SearchBoxl";
import MapSection from "./Components/MapSection";
import Header from "./Components/Header";
import "leaflet/dist/leaflet.css";
import { ApolloProvider } from "@apollo/client";
import setupClient from "./Components/apolloClient";

const Mapping = () => {
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setupClient()
            .then((apolloClient) => {
                if (apolloClient) {
                    setClient(apolloClient);
                } else {
                    setError("عدم موفقیت در مقداردهی اولیه Apollo Client. لطفاً دوباره تلاش کنید.");
                }
            })
            .catch((err) => {
                console.error("Error initializing Apollo Client:", err);
                setError("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
            });
    }, []);

    if (error) return <p className="error-message">{error}</p>;
    if (!client) return <p>در حال آماده‌سازی...</p>;

    return (
        <ApolloProvider client={client}>
            <div className="app">
                <Header />
                <div className="main-container">
                    <div className="left-column">
                        <SearchBoxl />
                    </div>
                    <div className="center-column">
                        <MapSection />
                    </div>
                    <div className="right-column">
                        <SearchBox />
                        <SearchBox />
                    </div>
                </div>
            </div>
        </ApolloProvider>
    );
};

export default Mapping;
