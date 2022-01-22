import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./Components/Loading";
import NavbarComponent from "./Components/Navbars/NavbarComponent";
import {Home, Signup, Login,PageNotFound} from "./Components/Screens";
import { auth } from "./firebase-config";

function App() {
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  const update = useSelector(state=>state.updateData);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (auth.currentUser) {
        setIsUser(true);
      }
      else{
        setIsUser(false);
      }
      setLoading(false);
    }, 1000);
  }, [update]);

  return loading ? (
    <Loading />
  ) : (
        <Fragment>
          {isUser ? <NavbarComponent /> : <NavbarComponent noUser />}

          <Routes>
            {isUser ? (
              <Route path="/" element={<Home />} />
            ) : (
              <>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </Fragment>
  );
}

export default App;
