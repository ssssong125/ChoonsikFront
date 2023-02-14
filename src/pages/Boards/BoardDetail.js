import BoardDetailCSS from './BoardDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callBoardDetailAPI
} from '../../apis/BoardAPICalls';

function BoardDetail() {    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const board  = useSelector(state => state.boardReducer); 

    useEffect(() => {
        dispatch(callBoardDetailAPI({	// 상품 상세 정보 조회
            boardCode: params.boardCode
        })); 
        // eslint-disable-next-line
    }, []);

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인

    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
    }

    console.log(params.boardCode)

    const onClickEditHandler = () => {

        // params.boardCode
        navigate(`/update/${params.boardCode}`, { replace: true});
        window.location.reload();
    }

    const onClickCloseHandler = () => {
        
        // params.currentPage
        // navigate(`/boards/${currentPage}`);
        navigate(-1);
    }

    const editButtonImgUrl = '/images/Wink.png';
    const closeButtonImgUrl = '/images/Angry.png';
    
    return (
        <>
            <div className={ BoardDetailCSS.DetailDiv }>
                <div className={BoardDetailCSS.ImgDiv}>
                    <img src={ board.imgUrl } alt="이미지확인!" />
                </div>
                <h3>{board.boardTitle}</h3>
                <br/>
                <div className={BoardDetailCSS.ButtonDiv}>
                    { decoded ==="ROLE_ADMIN" && 
                        <button className={BoardDetailCSS.editButton} onClick={onClickEditHandler}>
                            <div className={BoardDetailCSS.DivInButton}>
                                <img className={BoardDetailCSS.ButtonImg} src={editButtonImgUrl} alt='윙크하는 춘식이.png'/> 
                                <span>Edit</span>
                            </div>
                        </button>
                    }
                    <button className={BoardDetailCSS.closeButton} onClick={onClickCloseHandler}>
                        <div className={BoardDetailCSS.DivInButton}>
                            <img className={BoardDetailCSS.ButtonImg} src={closeButtonImgUrl} alt='윙크하는 춘식이.png'/> 
                            <span>Close</span>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}

export default BoardDetail;