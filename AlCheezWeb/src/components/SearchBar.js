import React, { useState, useEffect, useRef } from 'react';
import { useProductsContext } from '../context/ProductsContext';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css'; 
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const { productsData, setSearchResult, setSearchWord } = useProductsContext();
    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");
    const [result, setResult] = useState([]);
    const [isResult, setIsResult] = useState(true);
    const navigate = useNavigate();
    const searchBarRef = useRef(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(input);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [input]);

    useEffect(() => {
        const filteredResults = productsData.filter((data) => {
            return debouncedInput && data.name.toLowerCase().includes(debouncedInput.toLowerCase());
        });
        setResult(filteredResults);  
    }, [debouncedInput, productsData]);

    const handleClickOutside = (event) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setIsResult(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function handleSelectedResult(id) {
        navigate(`/product-details/${id}`);
        navigate(0);
        setIsResult(false);
        setInput("");
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search-results?query=${encodeURIComponent(input)}`);
            setSearchResult(result);
            setSearchWord(input);
            setIsResult(false);
        }
    };

    return (
        <div className="search-bar-container" ref={searchBarRef}>
            <div style={{ display: 'flex', alignItems: 'center', borderRadius: '4px', padding: '5px' }}>
                <input 
                    className="search-bar-input"
                    placeholder='Type to search' 
                    value={input} 
                    onChange={(e) => {
                        setInput(e.target.value);
                        setIsResult(true);
                    }}
                    onKeyDown={handleKeyDown}
                />
                <FaSearch className="search-bar-icon" onClick={() => {
                    navigate(`/search-results?query=${encodeURIComponent(input)}`);
                    setSearchResult(result);
                    setSearchWord(input);
                    setIsResult(false);
                }} />
            </div>
            {isResult && <div className="search-results">
                {result.map((data, index) => (
                    <p 
                        key={index} 
                        className="search-result" 
                        onClick={() => handleSelectedResult(data.product_id)}
                    >
                        {data.name}
                    </p>
                ))}
            </div>}
        </div>
    );
}
