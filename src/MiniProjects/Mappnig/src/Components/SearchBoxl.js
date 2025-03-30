import React from "react";
import "../styles/b.css";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from react-icons

const SearchBoxl = () => {
    return (
        <div className="search-boxl">
            <div className="box">
                <input
                    type="text"
                    name="search"
                    id="search-input"
                    placeholder="Search..."
                />
                <a href="#" onClick={(e) => e.preventDefault()}>
                    <FaSearch className="fa-solid" />
                </a>
            </div>
            <div className="add">اضافه</div>
        </div>
    );
};

export default SearchBoxl;