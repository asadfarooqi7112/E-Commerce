import React, { useState, MouseEvent } from 'react';
import { FaStar } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';

// Define types for the props and individual item
interface Review {
  rating: number;
  user_name: string;
  review_title: string;
  review_content: string;
}

interface PaginationProps {
  data: Review[];
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 5;
  const lastIndex = recordsPerPage * currentPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = props.data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(props.data.length / recordsPerPage);
  const pagesNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  function prevPage(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(prev => prev - 1);
    }
  }

  function nextPage(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (currentPage !== totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }

  function changeCurrentPage(e: MouseEvent<HTMLButtonElement>, pageNumber: number): void {
    e.preventDefault();
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      {records.map((item, index) => (
        <div key={index} style={reviewContainer}>
          {Array(5).fill(0).map((_, i) => (
            <span key={i}>
              {item.rating >= i + 1 ? (
                <FaStar color='orange' />
              ) : (
                <AiOutlineStar />
              )}
            </span>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: 16, marginTop: "10px" }}>
            <Image style={{ width: "50px", borderRadius: "50%" }} src="/images/unknownMale.jpg" alt="Profile" />
            {item.user_name}
          </div>
          <p><strong>{item.review_title}</strong></p>
          <p>{item.review_content}</p>
        </div>
      ))}
      <nav>
        <ul style={paginationContainer}>
          <li>
            <button onClick={prevPage} style={paginationLink}>Prev</button>
          </li>
          {pagesNumbers.map((pageNumber, index) => (
            <li key={index} style={paginationItem}>
              <button
                onClick={(e) => changeCurrentPage(e, pageNumber)}
                style={{ ...paginationLink, ...(pageNumber === currentPage ? activePageLink : {}) }}>
                {pageNumber}
              </button>
            </li>
          ))}
          <li>
            <button onClick={nextPage} style={paginationLink}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

const reviewContainer: React.CSSProperties = {
  margin: "40px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const paginationContainer: React.CSSProperties = {
  display: "flex",
  listStyle: "none",
  padding: 0,
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
};

const paginationItem: React.CSSProperties = {
  margin: "0 5px",
};

const paginationLink: React.CSSProperties = {
  textDecoration: "none",
  padding: "10px 15px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  color: "#007bff",
  transition: "background-color 0.3s, color 0.3s",
};

const activePageLink: React.CSSProperties = {
  backgroundColor: "#007bff",
  color: "#fff",
};
