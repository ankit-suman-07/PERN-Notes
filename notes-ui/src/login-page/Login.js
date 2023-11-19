import React, { useState, useContext, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleAuth } from "../firebase/Firebase";
import { signInWithPopup } from 'firebase/auth';
import { AuthDetails, AuthContext } from '../use-context/AuthDetails';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useHistory, useNavigate } from 'react-router-dom';

import "./Login.css";

import GoogleIcon from "../assets/google.png";
import BackGround from "../assets/bg.jpeg";

const Login = () => {
    const [newUser, setNewUser] = useState();
    const { setAuthUser, setLoggedIn, setUserName, setUserEmail, setUserPhoto, loggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

    const googleSignUp = async () => {
        try {
            // Sign in with Google
            const data = await signInWithPopup(auth, googleAuth);
            setNewUser(data.user);

            //window.location.href = '/';
            // Redirect to home page
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    useEffect(() => {
        console.log("User : -> : ", newUser);
        if (newUser) {
            // Update state
            setAuthUser(newUser);
            setUserName(newUser.displayName || "");
            setUserEmail(newUser.email || "");
            setUserPhoto(newUser.photoURL || "");
            setLoggedIn(true);
            navigate('/');
        }
        console.log("User : -> : ", newUser);
    }, [newUser]);


    return (
        <div className='login-div' >
            <img src={BackGround} alt='back-photo' className='back-img' />
            <div className='login-box' >
                <button onClick={googleSignUp}  >
                    <img src={GoogleIcon} />
                    <span>SignIn with Google</span>
                </button>
            </div>
        </div>
    )
}

export default Login