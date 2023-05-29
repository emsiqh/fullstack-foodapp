import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { Main, Login, Dashboard } from "./containers";
import { app } from "./config/firebase.config";
import { setUserDetails } from "./context/actions/userActions";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { fadeInOut } from "./animations";
import { Alert, MainLoader } from "./components";
import { setCartItems } from "./context/actions/cartActions";

function App() {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then(data => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {
        isLoading && (
          <motion.div
            {...fadeInOut}
            className="fixed z-50 inset-0 bg-lighttextGray backdrop-blur-md flex items-center justify-center w-full"
          >
            <MainLoader />
          </motion.div>
        )
      }
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
}

export default App;
