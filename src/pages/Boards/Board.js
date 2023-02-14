import BoardCSS from './Board.module.css';
import ComponentBoard from "../../components/boards/Board";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callBoardListAPI
} from '../../apis/BoardAPICalls'

function Boards() {

    const [currentPage, setCurrentPage] = useState(1);
    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const boards = useSelector(state => state.boardReducer); 
    const boardList = boards.data;
    const pageInfo = boards.pageInfo;
    const pageNumber = [];

    useEffect(() => {
        
        dispatch(callBoardListAPI({
            currentPage: currentPage
        }));            
        // eslint-disable-next-line
    }, [currentPage]);

    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage ; i++) {
            pageNumber.push(i);
        }
    }
    
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    let expire = new Date();
    const now = new Date();

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
        expire = new Date(temp.exp * 1000);

        // console.log(`만료시간 : ${expire}`)
        // console.log(`현재시간 : ${now}`)

        if(now > expire) {
            alert('토큰이 만료됐습니다. 다시 로그인 해주세요.')
    
            return <Navigate to="/login"/>
        }
    }

    if(decoded === null) {

        alert('게시글을 보려면 먼저 로그인을 해주세요.')
        return <Navigate to="/login"/>
    }

    const choonsikFaceImg = '/images/ChoonsikFace.png'

    return (
        <>
            {/* 게시글 */}
            <div className={ BoardCSS.boardDiv }>
                { 
                    Array.isArray(boardList) && boardList.map((board) => (<ComponentBoard key={ board.boardCode } board={ board } currentPage={ currentPage }/>))
                }
            </div>
            {/* 페이징 버튼 */}
            <div className={BoardCSS.pagingDiv} style={{ }}>
                { Array.isArray(boardList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ BoardCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                // <li key={num} onClick={() => setCurrentPage(num)}>
                //     <button
                //         style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                //         className={ BoardCSS.pagingBtn }
                //     >
                //         {num}
                //     </button>
                // </li>
                    
                <li key={ num } onClick={() => setCurrentPage(num)}>
                    { currentPage === num?
                    <button
                        className={BoardCSS.choonsikBtn}
                    >
                        <div className={BoardCSS.divInButton}>
                             <img className={BoardCSS.choonsikFaceImg} src={choonsikFaceImg} alt='춘식이 얼굴.jpg'/> 
                        </div>
                    </button>
                    :
                    <button
                        className={BoardCSS.pagingBtn}
                    >
                        <div className={BoardCSS.divInButton}>
                            <span>{num}</span> 
                        </div>
                    </button>
                    }
                </li>
                ))}
                { Array.isArray(boardList) &&
                <button 
                    className={ BoardCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.endPage  || pageInfo.total === 0}
                >
                    &gt;
                </button>
                }
            </div>
        </>
    );
}

export default Boards;