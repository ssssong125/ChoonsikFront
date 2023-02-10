import LoginCSS from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callLoginAPI
} from '../../apis/MemberAPICalls'

function Login() {
        
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    // 폼 데이터 한번에 변경 및 State에 저장    
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    useEffect(() => {
        
        if(loginMember.status === 200){
            console.log("[Login] Login SUCCESS {}", loginMember);
            navigate("/", { replace: true });
        }
    } // eslint-disable-next-line
    ,[loginMember]);
    
    // 로그인 상태일 시 로그인페이지로 접근 방지
    if(loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");        
        return <Navigate to="/"/>
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickRegisterHandler = () => { 

        navigate("/register", { replace: true })
    }

    // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
    const onClickLoginHandler = () => { 
        
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }

    const loginLogo = '/images/ChoonsikFace.png';
    const signInImg = '/images/SleepyChoonsik.png';
    const loginImg = '/images/Wink.png';

    return (
        <div className={LoginCSS.backgroundDiv}>
            <div className={LoginCSS.loginDiv}>
                <div className={LoginCSS.logoDiv}>
                    <img className={LoginCSS.loginLogo} src={loginLogo} alt='춘식이 얼굴.jpg'/>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td style={{textAlign: 'center'}}><strong>ID</strong></td>
                            <td colSpan={3}>
                                <input 
                                    type="text" 
                                    name='memberId'
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
                                    name='memberPassword' 
                                    placeholder="패스워드" 
                                    autoComplete='off'
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br></br>
                        <tr>
                            <td colSpan={2}>
                                <button
                                    className={LoginCSS.signInButton}
                                    onClick={ onClickRegisterHandler }
                                >
                                    <div className={LoginCSS.DivInButton}>
                                        <img src={signInImg} alt='SignIn.jpg'/>
                                        <span>SignUp</span>
                                    </div>
                                </button>
                            </td>
                            <td></td>
                            <td colSpan={2}>
                                <button
                                    className={LoginCSS.loginButton}
                                    onClick={ onClickLoginHandler }
                                >
                                    <div className={LoginCSS.DivInButton}>
                                        <img src={signInImg} alt='SignIn.jpg'/>
                                        <span>Login</span>
                                    </div>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Login;