import BoardDetailCSS from './BoardDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callBoardDetailAPI
} from '../../apis/BoardAPICalls';
import LoginModal from '../../components/common/LoginModal';

function BoardDetail() {    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const board  = useSelector(state => state.boardReducer); 

    const [amount, setAmount] = useState(1);
    const [loginModal, setLoginModal] = useState(false);

    useEffect(() => {
        dispatch(callBoardDetailAPI({	// 상품 상세 정보 조회
            boardCode: params.boardCode
        })); 
        // eslint-disable-next-line
    }, []);

    console.log(params.boardCode)

    const onClickReviewHandler = () => {
        navigate(`/review/${params.boardCode}`, { replace: false });
    };

    const onChangeAmountHandler = (e) => {
        setAmount(e.target.value);
    }

    const onClickPurchaseHandler = () => {

        // 로그인 상태인지 확인
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[onClickPurchaseHandler] token : ', token);

        if(token === undefined || token === null) {
            alert('로그인을 먼저해주세요');
            setLoginModal(true);
            return ;
        }

        // 토큰이 만료되었을때 다시 로그인
        if (token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }
    }

    const onClickEditHandler = () => {

    }

    const onClickCloseHandler = () => {
        
    }

    const editButtonImgUrl = '/images/Wink.png';
    const closeButtonImgUrl = '/images/Angry.png';
    
    return (
        <>
            { loginModal? <LoginModal setLoginModal={ setLoginModal }/> : null}
            <div className={ BoardDetailCSS.DetailDiv }>
                <div className={BoardDetailCSS.ImgDiv}>
                    <img src={ board.imgUrl } alt="이미지확인!" />
                </div>
                <h3>{board.boardTitle}</h3>
                <br/>
                <div className={BoardDetailCSS.ButtonDiv}>
                    <button className={BoardDetailCSS.editButton} onClick={onClickEditHandler}>
                        <div className={BoardDetailCSS.DivInButton}>
                            <img className={BoardDetailCSS.ButtonImg} src={editButtonImgUrl} alt='윙크하는 춘식이.png'/> 
                            <span>Edit</span>
                        </div>
                    </button>
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