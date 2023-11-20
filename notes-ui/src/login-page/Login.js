import React, { useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, googleAuth } from "../firebase/Firebase";
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../use-context/AuthDetails';
import { useNavigate } from 'react-router-dom';

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
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setNewUser(user);

        });

        // Cleanup the subscription when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [loggedIn]);

    useEffect(() => {
        if (newUser) {
            // Update state
            setAuthUser(newUser);
            setUserName(newUser.displayName || "");
            setUserEmail(newUser.email || "");
            setUserPhoto(newUser.photoURL || "");
            setLoggedIn(true);
            navigate('/');
        }
    }, [newUser, navigate, setAuthUser, setLoggedIn, setUserEmail, setUserPhoto, setUserName]);


    return (
        <div className='login-div' >
            <img src={BackGround} alt='background' className='back-img' />
            <div className='login-logo' >
                NOTES.
            </div>
            <div className='login-box' >
                <button onClick={googleSignUp}  >
                    <img src={GoogleIcon} alt='google icon' />
                    <span>SignIn with Google</span>
                </button>
            </div>
            <div className='login-bottom' >
                Made by: ankitsuman07@gmail.com
            </div>
        </div>
    )
}

export default Login