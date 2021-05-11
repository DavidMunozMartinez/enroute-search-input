import { useEffect, useState } from 'react';
import './list-component.scss';
import _ from "lodash";
import { FaMale, FaFemale, FaRobot } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

function List(props: any) {

  // Saves the current page as a state, this state is related
  // to all pager data one way or another, so its the only one we
  // keep in the state, along-side the visible data in DOM.
  let [curPage, setPage] = useState(1);
  // Holds the visible DOM data from the current page.
  let [visible, setVisible] = useState([]);

  /**
   * Observe changes from the props.items property which is changed from the
   * filter input component
   */
  useEffect(() => {
    moveToPage(1);
  }, [props.items])

  // Holds visible data in the DOM from current page
  let visibleData: any = [];

  // Holds basic pager data
  let pager = {
    page: curPage,
    pageSize: props['page-size'],
    data: props.items,
    totalPages: 0
  };
  pager.totalPages = calculatePages();


  /**
   * Takes a page number and navigates to it if available
   * @param newPage page to navigate to
   */
  function moveToPage(newPage: number) {
    if (newPage > pager.totalPages || newPage < 0) {
      return;
    }
    // Update page state
    setPage(newPage);
    let startIndex = pager.pageSize * (newPage - 1);
    let endIndex = (pager.pageSize * newPage) - 1;
    visibleData = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (pager.data[i]) {
        visibleData.push(pager.data[i]);
        
      }
      // Update visible DOM data state
      setVisible(visibleData);
    }
  }

  /**
   * Calculates the number of pages based on data length and page size
   * @returns Number of pages
   */
  function calculatePages():number {
    let calculatedPages = Math.round(pager.data.length / pager.pageSize);
    return calculatedPages > 0 ? calculatedPages : 1;
  }

  return (
    <div className="List">
      <div className="items-container">
        {
          visible.map((data: any, index) => {
            return (<div className="item" key={index}> 
            <div className="name">{data.name} </div>
            <div className="icon">{data.gender === 'male' ? <FaMale></FaMale> : data.gender === 'female' ? <FaFemale> </FaFemale> : <FaRobot></FaRobot> } </div>
            </div>)
          })
        }
      </div>
      <div className="pager-container">
        <button disabled={pager.page === 1} onClick={() => { moveToPage(pager.page - 1); }}>
          <MdKeyboardArrowLeft></MdKeyboardArrowLeft>
          <span>Previous</span>
        </button>
        <select id="PageSelector" value={pager.page} onChange={event => { moveToPage(parseInt(event.target.value)) }}>
          {_.times(pager.totalPages, (num) => {
            return <option key={num} value={num + 1}>{num + 1}</option>
          })}
        </select>
        of {pager.totalPages}

        <button disabled={pager.page >= pager.totalPages} onClick={() => { moveToPage(pager.page + 1); }}>
          <span>Next</span>
          <MdKeyboardArrowRight></MdKeyboardArrowRight>
        </button>
      </div>
    </div>
  );
}

export default List;