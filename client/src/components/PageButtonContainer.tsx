import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

interface PageButtonContainerProps {
  currentPage: number;
  selectPage: (page: number) => void;
  numberOfPages: number;
}

export default function PageButtonContainer(props: PageButtonContainerProps) {
  const { currentPage, selectPage, numberOfPages } = props;

  const pages = Array(numberOfPages)
    .fill('')
    .map((_: any, index: number) => index + 1);

  function previousPage() {
    if (currentPage === 1) return;

    let newPage = currentPage - 1;
    selectPage(newPage);
  }

  function nextPage() {
    if (currentPage === pages.length) return;

    let newPage = currentPage + 1;
    selectPage(newPage);
  }

  return (
    <Wrapper>
      <button className='prev-btn' onClick={previousPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber: number) => {
          return (
            <button
              type='button'
              className={`pageBtn ${pageNumber === currentPage && 'active'}`}
              key={pageNumber}
              onClick={() => selectPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}
