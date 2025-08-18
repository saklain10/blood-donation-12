
// src/providers/AuthProvider.jsx
import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword, // Ensure signInWithEmailAndPassword is imported
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Ensure this function directly returns the Firebase promise
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        currentUser.getIdToken().then((idToken) => {
          localStorage.setItem('access-token', idToken);
          axiosPublic.post('/add-user', {
            email: currentUser.email,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          })
          .then(res => {
            console.log("Backend user update/add response on login:", res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Error sending user to backend:", err);
            setLoading(false);
          });
        }).catch(error => {
            console.error("Error getting ID token:", error);
            localStorage.removeItem('access-token');
            setLoading(false);
        });
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
