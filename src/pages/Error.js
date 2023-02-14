import ErrorCSS from './Error.module.css';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Error() {

    const navigate = useNavigate();

    const onClickCloseHandler = () => {
 
        navigate("/");
    }

    const sleepyChoonsikImg = '/images/sleepyChoonsikImg.png'
    const okImg = '/images/Wink.png';

    return (
        // <div>
        //     <h1>404 Error</h1>
        // </div>
        <>
            <div className={ ErrorCSS.DetailDiv }>
                <div className={ErrorCSS.ImgDiv}>
                    <img src={ sleepyChoonsikImg } alt="이미지확인!" />
                </div>
                <h3>404 Error : 페이지를 찾을 수 없습니다.</h3>
                <br/>
                <div className={ErrorCSS.ButtonDiv}>
                    <button className={ErrorCSS.closeButton} onClick={onClickCloseHandler}>
                        <div className={ErrorCSS.DivInButton}>
                            <img className={ErrorCSS.ButtonImg} src={okImg} alt='윙크하는 춘식이.png'/> 
                            <span>Close</span>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Error;