import React, { useState } from "react";

function RestaurantListPagination({
  currentPage,
  totalPosts,
  postPerPage,
  setCurrentPage,
}) {
  const [activePage, setActivePage] = useState(1);

  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  // called when click the page no
  const handleClick = (page) => {
    setCurrentPage(page);
    setActivePage(page);
  };

  const handleDecrement = (currentPage) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setActivePage(currentPage - 1);
    }
  };

  const handleIncrement = (currentPage) => {
    if (currentPage < pages?.length) {
      setCurrentPage(currentPage + 1);
      setActivePage(currentPage + 1);
    }
  };

  return (
    <div>
      <nav aria-label="Page navigation">
        <ul className="inline-flex space-x-2">
          <li>
            <button
              onClick={() => handleDecrement(currentPage)}
              className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-white"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          {pages?.map((page, index) => {
            return (
              <li key={index}>
                <button
                  onClick={() => handleClick(page)}
                  className={`w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline ${
                    activePage === page
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100"
                  }  `}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => handleIncrement(currentPage)}
              className="flex items-center justify-center w-10 h-10 text-indigo-600 transition-colors duration-150  rounded-full focus:shadow-outline hover:bg-white"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default RestaurantListPagination;
