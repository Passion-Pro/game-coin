import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUp from "./components/Login/SignUp";
import Home from "./components/Home/Home";
import db, { auth } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useEffect, useState } from "react";
import Loginwithsignin from "./components/Login/Loginwithsignin";
import PlayPage from "./components/play/PlayPage";
import Profile from "./components/Login/Profile";
import Help from "./components/Help/Help";
import Popup from "./Popup";

function App() {
  const [{ user, userInfo, showPopIn }, dispatch] = useStateValue();

  const [data, setData] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        dispatch({
          type: actionTypes.SET_USER,
          user: auth,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (user?.uid) {
      db.collection("users")
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_USERINFO,
            userInfo: snapshot.data(),
          });
        });
    }
  }, [user]);
  console.log("userInfo",userInfo?.sendTo)

  return (
    <div
      className="App"
      onClick={() => {
        if (showPopIn) {
          dispatch({
            type: actionTypes.SET_SHOW_POP,
            showPop: false,
          });
        }
      }}
    >
      <Router>
        <Switch>
          {userInfo?.name && userInfo?.sendTo===userInfo?.name && <Popup/>}
          <>
            {user ? (
              !userInfo?.email ? (
                <>
                  <Route path="/signin">
                    <Loginwithsignin />
                  </Route>
                  <Route path="/">
                    <SignUp />
                  </Route>
                </>
              ) : (
                <>
                  <Route exact path="/play">
                    {user?.email ? <PlayPage /> : <Loginwithsignin />}
                  </Route>
                  <Route exact path="/help">
                    {user?.email ? <Help /> : <Loginwithsignin />}
                  </Route>
                  <Route exact path="/userProfile">
                    {user?.email ? <Profile /> : <Loginwithsignin />}
                  </Route>
                  <Route exact path="/">
                    {user?.email ? <Home /> : <Loginwithsignin />}
                  </Route>
                </>
              )
            ) : (
              <>
                <Route path="/">
                  <Loginwithsignin />
                </Route>
              </>
            )}
          </>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
