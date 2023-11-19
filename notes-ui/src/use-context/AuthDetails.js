import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import { auth } from './Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthDetails = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhoto, setUserPhoto] = useState("");



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                setLoggedIn(true);
                setUserName(user.displayName || "");
                setUserEmail(user.email || "");
                setUserPhoto(user.photoURL || "");



            } else {
                setAuthUser(null);
                setLoggedIn(false);
            }
        });

        return () => {
            // Unsubscribe when the component unmounts
            unsubscribe();

        };
    }, []);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Signed Out");
            })
            .catch(error => console.log(error));
    };

    return (
        <AuthContext.Provider value={{ loggedIn, userName, userEmail, userPhoto }}>
            {children}

        </AuthContext.Provider>
    );
};