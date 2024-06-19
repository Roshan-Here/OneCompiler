import React from "react";

function Pagination({ postPerPage, totalPages, paginate, currentPage }) {
  const pageNumbers = Math.ceil(totalPages / postPerPage);
//   console.log(pageNumbers)
  //   const numbers = [...Array(pageNumbers + 1).keys()].slice(1);
  // console.log(numbers);

  const handlenext = () => {
    pageNumbers === currentPage ? "" : paginate(currentPage + 1);
  };

  const handleprevious = () => {
    currentPage === 1 ? "" : paginate(currentPage - 1);
  };

  return (
    <div className="mt-24 flex justify-center">
      <div className="join">
        <button onClick={handleprevious} className="join-item btn text-green-300">«</button>
        {
          currentPage!==1?
          <button onClick={()=>paginate(1)} className="join-item btn text-green-300">First</button>
          : ""  
        }
        {/* <button onClick={()=>paginate(1)} className="join-item btn text-green-300">First</button> */}
        <button className="join-item btn text-green-300">Page {currentPage}</button>
        {/* <button onClick={()=>paginate(pageNumbers)} className="join-item btn text-green-300">last</button> */}
        {
          currentPage !==1?
          <button onClick={()=>paginate(pageNumbers)} className="join-item btn text-green-300">Last</button>
          : ""
          }
        <button onClick={handlenext} className="join-item btn text-green-300">»</button>
      </div>
    </div>
  );
}

export default Pagination;
