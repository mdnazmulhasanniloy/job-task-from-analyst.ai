import React from 'react';

const Pagination = ({totalItem, itemPerPage, currentPage, setCurrentPage}) => {
    const pageNumber = [];

    for(let i=1; i<= Math.ceil(totalItem/itemPerPage); i++){
        pageNumber.push(i)
    }
    return (
             <nav aria-label="Page navigation example ">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage > 1 ? false : true} className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                <span className="sr-only">Previous</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              </button>
            </li>
            {
                pageNumber.map(number => <li key={number}>
                                            <button onClick={()=>setCurrentPage(number)} className={ currentPage === number ?
                                            'z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                                            : 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700' }>{number}</button>
                                        </li>
                )
            }
            
           
            
            <li>
              <button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage < pageNumber.length ? false : true} className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                <span className="sr-only">Next</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              </button>
            </li>
          </ul>
        </nav>
    );
};

export default Pagination;