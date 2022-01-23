import React from 'react';
import { Col, Card, Pagination } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faCommentsDollar } from '@fortawesome/free-solid-svg-icons';

const CustomPagination = (props) => {
    const [activeItem, setActiveItem] = React.useState(1);
    const {
        postsPerPage = 2,
        totalPosts = 5,
        size = 'sm',
        withIcons = false,
        disablePrev = false,
        paginate,
    } = props;

    const onPrevItem = () => {
        const prevActiveItem = activeItem === 1 ? activeItem : activeItem - 1;
        setActiveItem(prevActiveItem);
        paginate(prevActiveItem);
    };

    const onNextItem = (totalPosts) => {
        const nextActiveItem = activeItem === totalPosts ? activeItem : activeItem + 1;
        if (nextActiveItem <= Math.ceil(totalPosts / postsPerPage)){
            setActiveItem(nextActiveItem);
            paginate(nextActiveItem);
            // console.log(`test 1 ${activeItem}`)
            // console.log(`test 2 ${totalPosts}`)
            // console.log(`test 3 ${nextActiveItem}`)
            // console.log(Math.ceil(totalPosts / postsPerPage))
        }

    };

    const items = [];
    for (let number = 1; number <= Math.ceil(totalPosts / postsPerPage); number++) {
        const isItemActive = activeItem === number;

        const handlePaginationChange = () => {
            setActiveItem(number);
            paginate(number);
        };

        items.push(
            <Pagination.Item active={isItemActive} key={number} onClick={handlePaginationChange}>
                {number}
            </Pagination.Item>,
        );
    }

    // const pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    //     pageNumbers.push(i);
    // }

    // itemactive=()=>{
    //     onpage.classList.togg
    // }

    return (
        <Pagination size={size} className="mt-3 justify-content-end">
            <Pagination.Prev disabled={disablePrev} onClick={onPrevItem}>
                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleLeft} /> : 'Previous'}
            </Pagination.Prev>

            {items}
            
            <Pagination.Next onClick={() => {onNextItem(totalPosts);}}>
                {withIcons ? <FontAwesomeIcon icon={faAngleDoubleRight} /> : 'Next'}
            </Pagination.Next>
        </Pagination>

        // <nav >
        //     <ul className="pagination mb-0 mt-2 justify-content-end">
        //         <li className="page-item disabled">
        //             <a className="page-link" href="#">Previous</a>
        //         </li>
        //         {pageNumbers.map(number => (
        //             <li key={number} className="page-item ">
        //                 <a onClick={() => paginate(number)}  href="#" className="page-link">
        //                     {number}
        //                 </a>
        //             </li>
        //         ))}
        //         <li className="page-item">
        //             <a className="page-link" href="#">Next</a>
        //         </li>
        //     </ul>
        // </nav>
    );
};
export default CustomPagination;
