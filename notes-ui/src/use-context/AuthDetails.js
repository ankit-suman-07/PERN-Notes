import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthDetails = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhoto, setUserPhoto] = useState("");


    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user && loggedIn) {
    //         // Update state
    //             setAuthUser(user);
    //             setUserName(user.displayName.displayName || "");
    //             setUserEmail(user.email || "");
    //             setUserPhoto(user.photoURL || "");
    //             setLoggedIn(true);
    //         }
    //     });

    //     // Cleanup the subscription when the component unmounts
    //     return () => {
    //         unsubscribe();
    //     };
    // }, [loggedIn]);

    // useEffect(() => {
    //     console.log("User ? : -> : ", authUser);
    //     console.log("LoggedIn ? : -> : ", loggedIn);

    // }, [loggedIn, authUser]);


    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Signed Out");
                setAuthUser(null);
                setLoggedIn(false);
                setUserName("");
                setUserEmail("");
                setUserPhoto("");
            })
            .catch(error => console.log(error));
    };

    // Provide the context value to the components
    const contextValue = {
        authUser,
        setAuthUser,
        loggedIn,
        setLoggedIn,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userPhoto,
        setUserPhoto,
        userSignOut
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}

        </AuthContext.Provider>
    );
};