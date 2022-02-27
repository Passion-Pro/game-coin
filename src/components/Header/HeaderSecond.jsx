import React from 'react';
import './HeaderSecond.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

function HeaderSecond() {
    const [{ userInfo}] = useStateValue();
    const history = useHistory();

    return (
        <>

            <div className='HeaderSecond_Out'>
                <div className='HeaderSecond'>
                    <div></div>
                    <div className="HeaderSecond__Div">
                        <div onClick={() => {
                            history.push('/')
                        }} className={window.location.pathname === '/' ? "followingCard__active" : "followingCard"}>
                            Rank
                        </div>
                        <div onClick={() => {
                            history.push('/help')
                        }} className={window.location.pathname === '/help' ? "followingCard__active" : "followingCard"}>
                            Help{' '} <HelpOutlineRoundedIcon fontSize='small' />
                        </div>
                        <button disabled={userInfo?.decision} onClick={() => {
                            history.push('/play')
                        }} className={"followingCard__button"}>
                            PLAY{' '} <PlayArrowRoundedIcon fontSize='small' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderSecond
