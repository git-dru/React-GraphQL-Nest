import React from "react";

export interface Props {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  handlePagination,
}: Props) => {

  return (
    <div className="pagition_main">
      {page !== 1 && (
        <button
          className="first_erow_btn"
          onClick={() => handlePagination(page - 1)}
        >
          {"<"}
        </button>
      )}
      <button className={`one_btn ${page === 1 ? 'active' : ''}`} onClick={() => handlePagination(1)}>{1}</button>
      {page > 3 && <span className="three_dots">...</span>}
      {page === totalPages && totalPages > 3 && (
        <button className="one_btn" onClick={() => handlePagination(page - 1)}>{page - 2}</button>
      )}
      {page > 2 && (
        <button className="one_btn" onClick={() => handlePagination(page - 1)}>{page - 1}</button>
      )}
      {page !== 1 && page !== totalPages && (
        <button className="one_btn active" onClick={() => handlePagination(page)}>{page}</button>
      )}
      {page < totalPages - 1 && (
        <button className="one_btn"
          onClick={() => handlePagination(page + 1)}
        >
          {page + 1}
        </button>
      )}
      {page === 1 && totalPages > 3 && (
        <button
          className="one_btn"
          onClick={() => handlePagination(page + 2)}
        >
          {page + 2}
        </button>
      )}
      {page < totalPages - 2 && <span className="three_dots">...</span>}
      {totalPages > 1 && (
        <button
          className={`one_btn ${page === totalPages ? 'active' : ''}`}
          onClick={() => handlePagination(totalPages)}
        >
          {totalPages}
        </button>
      )}
      {page !== totalPages && (
        <button
          className="first_erow_btn margin_left"
          onClick={() => handlePagination(page + 1)}
        >
          {">"}
        </button>
      )}
    </div>
  )
}

export default Pagination