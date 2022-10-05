import React, { useEffect } from "react";
import "./paginado.css";

export default function paginated({
  videoGamesPerPage,
  allVideoGames,
  paginated,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];


  for (let i = 1; i < Math.ceil(allVideoGames / videoGamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <ul key={number}>
            <button className="pag" onClick={() => paginated(number)}>
              {number}
            </button>
          </ul>
        ))}
    </nav>
  );
}
