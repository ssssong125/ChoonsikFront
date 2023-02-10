import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callRegisterAPI
} from '../../apis/MemberAPICalls'

function Register() {

    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        memberName: '',
        memberEmail: ''
    });
    
    useEffect(() => {
        if(member.status === 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    }, // eslint-disable-next-line
    [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }; 

    const onClickBackHandler = () => {
        // 돌아가기 클릭시 메인 페이지로 이동
        navigate("/", { replace: true })
    }
    
    const onClickRegisterHandler = () => {
        dispatch(callRegisterAPI({
            form: form
        }));
    }

    const loginLogo = '/images/running.png';
    const signInImg = '/images/Wink.png';

    return (
        <div className={ RegisterCSS.backgroundDiv}>
            <div className={ RegisterCSS.registerDiv }>
                <div className={RegisterCSS.logoDiv}>
                    <img className={RegisterCSS.loginLogo} src={loginLogo} alt='춘식이 얼굴.jpg'/>
                </div>
                
                <table>
                    <tbody>
                        <tr>
                            <td style={{textAlign: 'center'}}><strong>ID</strong></td>
                            <td colSpan={3}>
                                <input 
                                    type="text" 
                                    name="memberId"
                                    placeholder="아이디" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br></br>
                        <tr>
                            <td style={{textAlign: 'center'}}><strong>Password</strong></td>
                            <td colSpan={3}>
                                <input 
                                    type="password"
                                    name="memberPassword" 
                                    placeholder="패스워드" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br></br>
                        <tr>
                            <td style={{textAlign: 'center'}}><strong>Name</strong></td>
                            <td colSpan={3}>
                                <input 
                                    type="text" 
                                    name="memberName"
                                    placeholder="이름" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br></br>
                        <tr>
                            <td style={{textAlign: 'center'}}><strong>Email</strong></td>
                            <td colSpan={3}>
                                <input 
                                    type="email" 
                                    name="memberEmail"
                                    placeholder="이메일" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br></br>
                    </tbody>
                </table>





                
                <button
                    onClick = { onClickRegisterHandler }
                >   
                    <div className={RegisterCSS.DivInButton}>
                        <img src={signInImg} alt='SignIn.jpg'/>
                        <span>SignUp</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Register;