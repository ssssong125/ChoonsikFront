import BoardRegistCSS from './BoardRegist.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { Navigate } from "react-router-dom";

import {
    callBoardRegistAPI
} from '../../apis/BoardAPICalls';

function BoardRegist() {

    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        boardTitle: '',
        memberId: ''
    });

    useEffect(() => {
        // 이미지 업로드시 미리보기 세팅
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                }
            }   
            fileReader.readAsDataURL(image);
        }
    },[image]);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    let expire = new Date();
    const now = new Date();

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.sub;
        expire = new Date(temp.exp * 1000);

        console.log(`만료시간 : ${expire}`)
        console.log(`현재시간 : ${now}`)

        if(now > expire) {
            alert('토큰이 만료됐습니다. 다시 로그인 해주세요.')
    
            return <Navigate to="/login"/>
        }
    }

    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {

        imageInput.current.click();
    }

    // form 데이터 세팅    
    const onChangeHandler = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
            memberId: decoded
        });
    };

    const onClickBoardRegistrationHandler = () => {

        if(image && form.boardTitle != '') {

            console.log('[BoardRegistration] onClickBoardRegistrationHandler');

            const formData = new FormData();
            formData.append("boardTitle", form.boardTitle);
            formData.append("memberId", form.memberId);

            if(image){
                formData.append("boardImage", image);
            }

            console.log('[BoardRegistration] formData : ', formData.get("boardTitle"));
            console.log('[BoardRegistration] formData : ', formData.get("memberId"));
            console.log(formData.getAll('boardTitle')) 
            console.log(formData.getAll('memberId')) 
            console.log(image)
            console.log('[BoardRegistration] formData : ', formData.get("boardImage"));

            dispatch(callBoardRegistAPI({	// 상품 상세 정보 조회
                form: formData
            }));

            console.log(formData)
            
            alert('게시판으로 이동합니다.');
            navigate('/board', { replace: true });
            // window.location.reload();
        } else if(!image) {
            alert('이미지를 등록해주세요.')
        } else if(form.boardTitle == '') {
            alert('제목을 입력해주세요.')
        }
    }

    const registImg = '/images/Wink.png';

    return (
        <div className={BoardRegistCSS.backgroundDiv}>
            <div className={BoardRegistCSS.registDiv}>
                <div className={ BoardRegistCSS.boardImageDiv } onClick={ onClickImageUpload }>
                    { imageUrl? <img 
                        className={ BoardRegistCSS.previewImage } 
                        src={ imageUrl } 
                        alt="preview"
                    /> : <div className={BoardRegistCSS.plusDiv}>+</div>}
                    <input
                        style={ { display: 'none' }}
                        type="file"
                        name='boardImage' 
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={ onChangeImageUpload }
                        ref={ imageInput }
                    />
                </div>
                <br></br>
                <div>
                    <input 
                        name='boardTitle'
                        placeholder='Title'
                        className={ BoardRegistCSS.boardTitleInput }
                        onChange={ onChangeHandler }
                        required
                    />
                </div>
                <br></br>
                <button
                    className={BoardRegistCSS.registButton}
                    onClick={ onClickBoardRegistrationHandler }             
                >
                    <div className={BoardRegistCSS.DivInButton}>
                        <img src={registImg} alt='SignIn.jpg'/>
                        <span>Regist</span>
                    </div>
                </button>
                <input 
                    readOnly
                    hidden
                    id='memberId'
                    name='memberId'
                    value={decoded}
                />
            </div>
        </div>




        // <div>
        //     <div className={ BoardRegistCSS.productButtonDiv }>
        //         <button       
        //             onClick={ onClickBoardRegistrationHandler }             
        //         >
        //             상품 등록
        //         </button>
        //     </div>        
        //     <div className={ BoardRegistCSS.boardSection }>
        //         <div className={ BoardRegistCSS.boardInfoDiv }>
        //             <div className={ BoardRegistCSS.boardImageDiv }>
        //                 { imageUrl && <img 
        //                     className={ BoardRegistCSS.productImage } 
        //                     src={ imageUrl } 
        //                     alt="preview"
        //                 />}
        //                 <input
        //                     style={ { display: 'none' }}
        //                     type="file"
        //                     name='boardImage' 
        //                     accept='image/jpg,image/png,image/jpeg,image/gif'
        //                     onChange={ onChangeImageUpload }
        //                     ref={ imageInput }
        //                 />
        //                 <button 
        //                     className={ BoardRegistCSS.productImageButton }
        //                     onClick={ onClickImageUpload } 
        //                 >
        //                     이미지 업로드
        //                     </button>
        //             </div>
        //         </div>
        //         <div className={ BoardRegistCSS.productInfoDiv }>
        //             <table>
        //                 <tbody>
        //                     <tr>
        //                         <td><label>제목</label></td>
        //                         <td>
        //                             <input 
        //                                 name='boardTitle'
        //                                 placeholder='제목'
        //                                 className={ BoardRegistCSS.productInfoInput }
        //                                 onChange={ onChangeHandler }
        //                             />
        //                         </td>
        //                     </tr>    
        //                     <tr>
        //                         <td>
        //                             <input 
        //                                 readOnly
        //                                 hidden
        //                                 name='memberId'
        //                                 value={decoded}
        //                             />
        //                         </td>
        //                     </tr>
        //                 </tbody>                        
        //             </table>
        //         </div>
        //     </div>
        // </div>
    );
}

export default BoardRegist;