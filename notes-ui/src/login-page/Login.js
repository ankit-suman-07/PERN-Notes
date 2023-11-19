import React from 'react';
import "./Login.css";

import GoogleIcon from "../assets/google.png";
import BackGround from "../assets/bg.jpeg";

const Login = () => {
    return (
        <div className='login-div' >
            <img src={BackGround} alt='back-photo' className='back-img' />
            <div className='login-box' >
                <button>
                    <img src={GoogleIcon} />
                    <span>SignIn with Google</span>
                </button>
            </div>
        </div>
    )
}

export default Login