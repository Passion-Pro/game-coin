import React, { useState } from 'react';
import './HeaderSecond.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

function HeaderSecond() {
    const [{ user, courseDiv, showExpandGroup, showMoreoption }, dispatch] = useStateValue();
    const history = useHistory();
    const [pathName, setPathName] = useState('');

    return (
        <>

            <div className='HeaderSecond_Out'>
                <div className='HeaderSecond'>
                    <div></div>
                    <div className="HeaderSecond__Div">
                        <div onClick={() => {
                            history.push('/')
                            setPathName('/')
                        }} className={window.location.pathname == '/' ? "followingCard__active" : "followingCard"}>
                            Rank
                        </div>
                        <div onClick={() => {
                            history.push('/help')
                            setPathName('/help')
                        }} className={window.location.pathname == '/help' ? "followingCard__active" : "followingCard"}>
                            Help{' '} <HelpOutlineRoundedIcon fontSize='small' />
                        </div>
                        <div onClick={() => {
                            history.push('/playpage')
                            setPathName('/playpage')
                        }} className={"followingCard__button"}>
                            PLAY{' '} <PlayArrowRoundedIcon fontSize='small' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderSecond
