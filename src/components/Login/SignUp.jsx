import React, { useState, useEffect } from 'react'
import './SignUp.css'
import Button from '@mui/material/Button';
import db, { auth, storage } from '../../firebase';
import { useStateValue } from "../../StateProvider"
import { actionTypes } from '../../reducer';
import { v4 as uuid } from "uuid"
import { useHistory } from "react-router-dom"
import firebase from 'firebase';
import Header from './Header';
import Loading from '../Loading/Loading';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';

function SignUp() {
    const [{ user }, dispatch] = useStateValue();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();
console.log(user)
    const createAccount = (e) => {
        e.preventDefault();
        db.collection("users")
            .where("name", "==", name)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot?.empty === true) {
                    db.collection('users').doc(user?.uid).set({
                        name: name,
                        email: user?.email,
                        coin: 5,
                        user: user?.uid,
                        photoURL:user?.photoURL,
                        TotalMatch:0,
                        TotalWon:0,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    }).then(() => {
                        alert('Your account create successfully.')
                        setLoading(false);
                        history.push('/')
                    })
                }else{
                    alert('Name not available')
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                alert('Please fill all data!')
                setLoading(false);
            });
    };
    return (
        // <>
        //     <Header />
            // {loading ?
            //     <Loading /> :
        //         <div className="signUp">
        //             <div className="signUp_in">
        //                 <div className="user_info">
        //                     <input type="text" placeholder='Enter Your Name'
        //                         value={name}
        //                         onChange={(e) => setName(e.target.value)}
        //                     />
        //                     <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', justifyContent: 'space-around', alignItems: "center" }}>
        //                         <Button variant="contained" style={{ width: '95%' }} onClick={createAccount}>Add Details</Button>
        //                         {/* <Button variant="contained" style={{ width: '45%' }} onClick={()=>"/signin"}>Sign in</Button> */}
        //                         <div style={{ display: "flex", padding: '6px 0' }} onClick={() => history.push('/signin')}>
        //                             Enter details to complete profile.
        //                             <br />
        //                             Already entered <div style={{ paddingLeft: '8px', color: "blue", fontWeight: '600', cursor: "pointer" }} >Sign in</div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     }
        // </>
        <>
            <Header />
            {loading ?
                <Loading /> :  <div className="signUp" style={{ alignItems: "center", justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'center', marginBottom: "10px", height: "fit-content", border: '1px solid lightgray', padding: '50px', borderRadius: '8px' }}>
                    {/* <div style={{ display: 'flex', border: "0", color: '', padding: "10px", margin: "10px", marginBottom: "20px", color: "#4c4545", fontSize: 'large', fontWeight: "bold", borderBottom: '1px solid #1c108b' }}>
                        Game Coin
                    </div> */}
                    <input style={{border:"1px solid lightgray",outline:'none',borderRadius:'4px', display:'flex',padding:"6px",width:'100%',marginBottom:"12px"}} type="text" placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button style={{ display: 'flex', border: "0", borderRadius: '20px', backgroundColor: '#1357d4', marginTop: "26px", padding: "12px", fontWeight: 'bold', color: "white", width: '200px', alignItems: "center", justifyContent: "center", margin: "12px 0" }} onClick={createAccount}>Create Account</button>
                </div>
            </div>}
        </>
    )
}

export default SignUp