import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import styled from "styled-components";
import { useGlobalContext } from "../context/UserContext";

const Pagination = () => {
  const { numOfPages, page, changePage, filteringTransactions, isAdmin } =
    useGlobalContext();

  const pages = Array.from(
    {
      length: numOfPages > 15 && !isAdmin ? 15 : 20,
    },
    (_, index) => {
      return index + 1;
    }
  );
  const nextPage = () => {
    let newPage = Number(page) + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  return (
    <Wrapper className="w-[95%] md:max-w-[80%]">
      <button
        disabled={filteringTransactions}
        className="prev-btn btn"
        onClick={prevPage}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              disabled={filteringTransactions}
              type="button"
              className={
                Number(pageNumber) === Number(page)
                  ? "pageBtn active "
                  : "pageBtn "
              }
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        disabled={filteringTransactions}
        className="next-btn btn"
        onClick={nextPage}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default Pagination;
const Wrapper = styled.section`
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  /* max-width: 80%; */
  .prev-btn,
  .next-btn {
    color: var(--primary-500);
    width: 100px;
    height: 40px;
    background: var(--grey-200);
    border-color: transparent;
    border-radius: var(--borderRadius);
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .pageBtn {
    background: var(--grey-300);
    color: var(--primary-500);
    border-color: transparent;
    width: 30px;
    height: 20px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .active {
    background: var(--primary-500);
    color: var(--white);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
`;
