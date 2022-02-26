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
                    <div>
                        {userInfo?.name}
                    </div>
                    <div>
                        {userInfo?.name}
                    </div>
                    <div>
                        {userInfo?.name}
                    </div>
                    <div>
                        {userInfo?.name}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp