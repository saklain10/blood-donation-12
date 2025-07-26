
// src/providers/AuthProvider.jsx
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config"; // Assuming this exports the Firebase app instance

export const AuthContext = createContext(null);
const auth = getAuth(app); // Get the auth instance
const googleProvider = new GoogleAuthProvider(); // Initialize Google Auth Provider

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading to true

  // Firebase user creation
  const createUser = (email, password) => {
    setLoading(true); // Set loading true when starting an auth operation
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Firebase sign in
  const signIn = (email, password) => {
    setLoading(true); // Set loading true when starting an auth operation
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true); // Set loading true when starting an auth operation
    return signInWithPopup(auth, googleProvider);
  };

  // Update Firebase user profile (displayName, photoURL)
  const updateUser = (profile) => {
    // This function doesn't change loading state as it's a profile update, not a full auth state change
    return updateProfile(auth.currentUser, profile);
  };

  // Log out user
  const logOut = () => {
    setLoading(true); // Set loading true when starting an auth operation
    return signOut(auth);
  };

  // Observe auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("Auth State Changed:", currentUser); // Debugging log
      setUser(currentUser);
      // Only set loading to false AFTER the user object is fully populated.
      // This is crucial for getIdToken to be available in useAxiosSecure.
      // The `onAuthStateChanged` callback is generally reliable for this.
      setLoading(false); // Always set loading to false once auth state is known
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []); // Empty dependency array means this runs once on component mount

  const authInfo = {
    user,
    setUser, // Expose setUser for direct updates to context (used in Login/Register for backend data)
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUser,
    logOut,
    auth, // IMPORTANT: Expose the Firebase auth instance for useAxiosSecure
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
