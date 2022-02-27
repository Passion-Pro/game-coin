import React from 'react'
import styled from 'styled-components'
import Avatar from "@mui/material/Avatar";
import { useStateValue } from '../../StateProvider';

function PlayerCard({data}) {
  const[{user , userInfo} , dispatch] = useStateValue();

  console.log("Userinfo is " , user);

  return (
    <Container>
       <Avatar className = "player_avatar" src = {data?.photoURL}/>
       <div className="player_info">
           <p className = "name">{data?.name}</p>
           <div className="coins">
               <img src="https://thumbs.dreamstime.com/b/golden-coin-dollar-symbol-isolated-black-background-horizontal-animation-d-render-130174755.jpg" alt="" />
               <p>{data?.coin}</p>
           </div>
       </div>
       <img src="https://b.kisscc0.com/20180705/yjw/kisscc0-computer-icons-trophy-award-symbol-download-golden-trophy-with-glaze-remix-5b3dc51cdb3f07.494809991530774812898.png" alt="" className="trophy" />
    </Container>
  )
};

const Container = styled.div`
 width : 400px;
 border : 3px solid lightgray;
 border-radius : 10px;
 padding : 10px;
 padding-top : 20px;
 padding-bottom : 20px;
 display : flex;


 .player_avatar{
     width : 100px;
     height : 100px;
     border : 1px solid lightgray;
 }

 img{
    width : 30px;
    object-fit : contain; 
 }

 .player_info{
    width : 100%;
    align-items : center;
 }

 .coins{
     display : flex;
     background-color : #000;
     color : white;
     border-radius : 20px;
     padding-left : 10px;
     padding-right : 20px;
     width : fit-content;
     margin-left : auto;
     margin-right : auto;

     p{
         margin-top : 0;
         margin-bottom : 0;
         margin-right : 10px;
         font-size : 19px;
     }
 }

 .name{
     font-size : 20px;
     margin-bottom : 10px;
     margin-top : 10px;
 }

 .trophy{
     width : 60px;
     object-fit : contain;
     margin-right : 10px;
 }
`;

export default PlayerCard