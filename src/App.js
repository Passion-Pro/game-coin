import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import SignUp from './components/Login/SignUp';
import Home from './components/Home/Home';
import db, { auth } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import Loginwithsignin from './components/Login/Loginwithsignin';
import Profile from './components/Login/Profile'

function App() {
  const [{ user, userInfo, showPop, showPopIn }, dispatch] = useStateValue();

  console.log("first", showPop, showPopIn)

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
            })
        })
    }
  }, [user]);

  return (
    <div className="App" onClick={() => {
      if (showPopIn) {
        dispatch({
          type: actionTypes.SET_SHOW_POP,
          showPop: false,
        })
      }
    }}>
      <Router>
        <Switch>
          <>
            {user ? (
              !userInfo?.email ?
                (
                <>
                  <Route path="/signin">
                    <Loginwithsignin />
                  </Route>
                  <Route path="/">
                    <SignUp />
                  </Route>
                </>
                )
                :
                <>
                  <Route exact path="/userProfile">
                    {user?.email ? <Profile /> : <Loginwithsignin />}
                  </Route>
                  <Route exact path="/">
                    {user?.email ? <Home /> : <Loginwithsignin />}
                  </Route>
                </>)
              :
              <>
                <Route path="/">
                  <Loginwithsignin/>
                </Route>
              </>
            }
          </>
        </Switch>
      </Router>
    </div>
  );
}

export default App;


{/* <Route path="/signup">
<SignUp />
</Route>
<Route path="/update">
<UpdateUserProfile />
</Route>
<Route path="/userProfile">
{user?.email ? <UserProfile /> : <Loginwithsignin />}
</Route>
<Route path="/help">
{user?.email ? <Help /> : <Loginwithsignin />}
</Route>
<Route path="/homepreferedBy">
{user?.email ? <HomePreferedBy /> : <Loginwithsignin />}
</Route>
<Route path="/findvalentine">
{user?.email ? <FindValentine /> : <Loginwithsignin />}
</Route>
<Route path="/public">
{user?.email ? <Public /> : <Loginwithsignin />}
</Route>
<Route path="/chat/:chatId">
{user?.email ? <HomeChat /> : <Loginwithsignin />}
</Route>
<Route exact path="/chat">
{user?.email ? <HomeChat /> : <Loginwithsignin />}
</Route>
<Route exact path="/chatMobile/:chatId">
{user?.email ? <ChatPage /> : <Loginwithsignin />}
</Route>
<Route path="/profilePop/:popId">
{user?.email ? <ValentinePopUp /> : <Loginwithsignin />}
</Route>
<Route path="/signin">
<Loginwithsignin />
</Route> */}