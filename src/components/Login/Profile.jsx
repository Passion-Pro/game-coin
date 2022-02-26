import React from 'react'
import './SignUp.css';
import { useStateValue } from "../../StateProvider"
import Header from './Header';

function SignUp() {
    const [{ userInfo }] = useStateValue();
    return (
        <>
            <Header />
            <div className="signUp" style={{ alignItems: "center", justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'center', marginBottom: "10px", height: "fit-content", border: '1px solid lightgray', padding: '50px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', border: "0", color: '#1c0bb8', padding: "5px", margin: "10px", marginBottom: "20px", fontSize: 'large', fontWeight: "bold", borderBottom: '1px solid #1c108b' }}>
                        Profile
                    </div>
                    <div className='ProfileName'>
                        <div>
                            Name :
                        </div>
                        {userInfo?.name}
                    </div>
                    <div className='ProfileName'>
                        <div>
                            Email :
                        </div>
                        {userInfo?.email}
                    </div>
                    <div className='ProfileName'>
                        <div>
                            Coin :
                        </div>
                        {userInfo?.coin}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp