import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "@store/appSlice";
import { auth } from "./../../../firebaseConfig";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({ uid: user.uid, email: user.email || "" }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe(); 
  }, [dispatch]);

  return null;
};

export default AuthListener;
