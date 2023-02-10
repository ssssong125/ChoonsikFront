import BoardUpdateCSS from './BoardUpdate.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callBoardDetailAPI,
    callBoardUpdateAPI,
    callBoardDeleteAPI
} from '../../apis/BoardAPICalls';

function BoardUpdate() {

    const dispatch = useDispatch();
    const params = useParams();
    const board  = useSelector(state => state.boardReducer);
    // const productDetail  = useSelector(state => state.productReducer);  
    
    console.log('boardDetail', board);
    
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    // const [modifyMode, setModifyMode] = useState(false);
    const imageInput = useRef();
    const navigate = useNavigate();

    const [form, setForm] = useState({});

    useEffect(        
        () => {
            console.log('[BoardUpdate] boardCode : ', params.boardCode);

            dispatch(callBoardDetailAPI({	
                boardCode: params.boardCode
            }));                     
        } // eslint-disable-next-line
    ,[]);
    console.log('[BoardUpdate] boardTitle : ', board.boardTitle);

    useEffect(() => {
        // 이미지 업로드시 미리보기 세팅
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                    // console.log("setImageUrl" + result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    }, [image]);

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

        // console.log(e.target.files[0]);
        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {

        // if(modifyMode){
            imageInput.current.click();
        // }
    }
    
    // const onClickModifyModeHandler = () => {    // 수정모드

    //     setModifyMode(true);
    //     setForm({
    //         productCode: productDetail.productCode,
    //         productName: productDetail.productName,
    //         productPrice: productDetail.productPrice,
    //         productOrderable: productDetail.productOrderable,
    //         categoryCode: productDetail.categoryCode,
    //         productStock: productDetail.productStock,
    //         productDescription: productDetail.productDescription
    //     });
    // }

    // form 데이터 세팅    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            memberId: decoded,
            boardCode: board.boardCode
        });
    };

    const onClickBoardDeleteHandler = () => {

        console.log('[BoardDelete] onClickBoardDeleteHandler');

        dispatch(callBoardDeleteAPI({	// 상품 정보 업데이트
            boardCode: board.boardCode
        })); 
        navigate(`/board`, { replace: true});
        window.location.reload();
    }

    const onClickBoardUpdateHandler = () => {

        if(image && form.boardTitle != '') {
            console.log('[BoardUpdate] onClickBoardUpdateHandler');

            const formData = new FormData();
            formData.append("boardCode", form.boardCode);
            formData.append("boardTitle", form.boardTitle);
            formData.append("memberId", form.memberId);

            if(image){
                formData.append("boardImage", image);
            }

            dispatch(callBoardUpdateAPI({	// 상품 정보 업데이트
                form: formData
            })); 
            navigate(`/board/${params.boardCode}`, { replace: true});
            window.location.reload();
        } else if(!image) {
            alert('이미지를 등록해주세요.')
        } else if(form.boardTitle == '') {
            alert('제목을 입력해주세요.')
        }
    }

    const updateImg = '/images/Wink.png';

    return (
        <div className={BoardUpdateCSS.backgroundDiv}>
            <div className={BoardUpdateCSS.registDiv}>
                <div className={ BoardUpdateCSS.boardImageDiv } onClick={ onClickImageUpload }>
                    <img 
                        className={ BoardUpdateCSS.previewImage } 
                        // src={ imageUrl } 
                        src={ (imageUrl === null) ? board.imgUrl : imageUrl } 
                        // src={ (imageUrl === null) ? alert('a') : console.log('b') } 
                        alt="preview"
                    />
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
                        id='boardTitle'
                        name='boardTitle'
                        placeholder='Title'
                        // value={ (board? board.boardTitle : form.boardTitle) || ''}
                        // value={ (form.boardTitle == board.boardTitle? board.boardTitle : form.boardTitle) || ''}
                        value={ (form.boardTitle == null? board.boardTitle : form.boardTitle) || ''}
                        // value={ (form.boardTitle  != board.boardTitle? alert('a') : alert('b')) || ''}
                        className={ BoardUpdateCSS.boardTitleInput }
                        onChange={ onChangeHandler }
                        // required
                    />
                </div>
                <br></br>
                <div>
                    <button
                        className={BoardUpdateCSS.deleteButton}
                        onClick={ onClickBoardDeleteHandler }             
                    >
                        <div className={BoardUpdateCSS.DivInButton}>
                            <img src={updateImg} alt='SignIn.jpg'/>
                            <span>Delete</span>
                        </div>
                    </button>
                    <button
                        className={BoardUpdateCSS.registButton}
                        onClick={ onClickBoardUpdateHandler }             
                        >
                        <div className={BoardUpdateCSS.DivInButton}>
                            <img src={updateImg} alt='SignIn.jpg'/>
                            <span>Update</span>
                        </div>
                    </button>
                </div>
                <input 
                    readOnly
                    hidden
                    // id='memberId'
                    name='memberId'
                    value={decoded}
                />
                <input 
                    readOnly
                    hidden
                    // id='boardCode'
                    name='boardCode'
                    value={board.boardCode}
                />
            </div>
        </div>
    )

    // return (
    //     <div>
    //         {productDetail &&
    //         <div className={ ProductRegistrationCSS.productSection }>
    //             <div className={ ProductRegistrationCSS.productInfoDiv }>
    //                 <div className={ ProductRegistrationCSS.productImageDiv }>
    //                     { productDetail && <img 
    //                         className={ ProductRegistrationCSS.productImage } 
    //                         src={ (imageUrl === null) ? productDetail.productImageUrl : imageUrl } 
    //                         alt="preview"
    //                     />}
                        
    //                     <input                
    //                         style={ { display: 'none' }}
    //                         type="file"
    //                         name='productImage' 
    //                         accept='image/jpg,image/png,image/jpeg,image/gif'
    //                         onChange={ onChangeImageUpload }
    //                         ref={ imageInput }                            
    //                     />
    //                     <button 
    //                         className={ ProductRegistrationCSS.productImageButton }
    //                         onClick={ onClickImageUpload }    
    //                         style={ !modifyMode ? { backgroundColor: 'gray'} : null}
    //                     >
    //                         이미지 업로드
    //                         </button>
    //                 </div>
    //             </div>
    //             <div className={ ProductRegistrationCSS.productInfoDiv }>
    //                 <table>
    //                     <tbody>
    //                         <tr>
    //                             <td><label>상품이름</label></td>
    //                             <td>
    //                                 <input 
    //                                     name='productName'
    //                                     placeholder='상품 이름'
    //                                     value={ (!modifyMode ? productDetail.productName : form.productName) || ''}
    //                                     className={ ProductRegistrationCSS.productInfoInput }
    //                                     onChange={ onChangeHandler }
    //                                     readOnly={ modifyMode ? false : true }
    //                                     style={ !modifyMode ? { backgroundColor: 'gray'} : null}
    //                                 />
    //                             </td>
    //                         </tr>    
    //                         <tr>
    //                             <td><label>상품가격</label></td>
    //                             <td>
    //                                 <input 
    //                                     name='productPrice'
    //                                     placeholder='상품 가격'
    //                                     value={(!modifyMode ? productDetail.productPrice : form.productPrice) || 0 }
    //                                     type='number'
    //                                     className={ ProductRegistrationCSS.productInfoInput }
    //                                     onChange={ onChangeHandler }
    //                                     readOnly={ modifyMode ? false : true }
    //                                     style={ !modifyMode ? { backgroundColor: 'gray'} : null}
    //                                 />
    //                             </td>
    //                         </tr>    
    //                         <tr>
    //                             <td><label>활성화 여부</label></td>
    //                             <td>
    //                                 <label><input type="radio" name="productOrderable"  onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.productOrderable : form.productOrderable) === 'Y' ? true : false } value="Y" /> Y</label> &nbsp;
    //                                 <label><input type="radio" name="productOrderable"  onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.productOrderable : form.productOrderable) === 'N' ? true : false } value="N" /> N</label>
    //                             </td>
    //                         </tr>    
    //                         <tr>
    //                             <td><label>상품 종류</label></td>
    //                             <td>
    //                                 {/* categoryCode = 1:식사, 2:디저트, 3:음료 */}
    //                                 <label><input type="radio" name="categoryCode" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.categoryCode : form.categoryCode) === 1 ? true : false } value={1}/> 식사</label> &nbsp;
    //                                 <label><input type="radio" name="categoryCode" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.categoryCode : form.categoryCode) === 2 ? true : false } value={2}/> 디저트</label> &nbsp;
    //                                 <label><input type="radio" name="categoryCode" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.categoryCode : form.categoryCode) === 3 ? true : false } value={3}/> 음료</label>
    //                             </td>                                
    //                         </tr> 
    //                         <tr>
    //                             <td><label>상품 재고</label></td>
    //                             <td>
    //                             <input 
    //                                     placeholder='상품 재고'
    //                                     type='number'
    //                                     name='productStock'
    //                                     value={ (!modifyMode ? productDetail.productStock : form.productStock) || 0 }
    //                                     onChange={ onChangeHandler }
    //                                     readOnly={ modifyMode ? false : true }
    //                                     className={ ProductRegistrationCSS.productInfoInput }
    //                                     style={ !modifyMode ? { backgroundColor: 'gray'} : null}
    //                                 />
    //                             </td>
    //                         </tr> 
    //                         <tr>
    //                             <td><label>상품 설명</label></td>
    //                             <td>
    //                                 <textarea 
    //                                     className={ ProductRegistrationCSS.textAreaStyle }
    //                                     name='productDescription'
    //                                     onChange={ onChangeHandler }
    //                                     readOnly={ modifyMode ? false : true }
    //                                     value={ (!modifyMode ? productDetail.productDescription : form.productDescription) || '' }
    //                                     style={ !modifyMode ? { backgroundColor: 'gray'} : null}
    //                                 ></textarea>
    //                             </td>
    //                         </tr> 
    //                     </tbody>                        
    //                 </table>
    //             </div>
    //         </div>
    //         }

    //     </div>
    // );
}

export default BoardUpdate;