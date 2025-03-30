import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};

const ensureCookies = async () => {
    try {
        console.log("Sending initial POST request to get CSRF token...");

        const response = await fetch("https://back-end.a8m.ir/graphql/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://back-end.a8m.ir/graphql/",
            },
            body: JSON.stringify({ query: "{ ping }" }),
        });

        if (!response.ok) {
            console.error("Failed to set cookies with POST:", response.status);
            return null;
        }

        await new Promise(resolve => setTimeout(resolve, 500)); // تاخیر کوتاه برای ذخیره کوکی‌ها

        const csrftoken = getCookie("csrftoken");
        if (!csrftoken) {
            console.error("CSRF token not found in cookies.");
            return null;
        }

        console.log("CSRF Token retrieved:", csrftoken);
        return csrftoken;
    } catch (error) {
        console.error("Error setting cookies:", error);
        return null;
    }
};

const setupClient = async () => {
    const csrftoken = await ensureCookies();

    if (!csrftoken) {
        console.error("CSRF token is not available, requests may fail.");
        return null;
    }

    const httpLink = new HttpLink({
        uri: "https://back-end.a8m.ir/graphql/",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
            "Referer": "https://back-end.a8m.ir/graphql/",
        },
    });

    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });
};

export default setupClient;
