import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

function Name({ data,serial }) {
  return (
    <Container>
      <div className="ProName">
      <p className="rank">{serial+1}</p>
      <Avatar className="student_avatar" src={data?.data?.profilePhotoUrl} />
      <p className="name">{data?.data?.name.length>7 ?data?.data?.name.splice(0,7):data?.data?.name}</p>
      
      </div>
      <div className="preference_div">
        <p className="preference">{data?.data?.TotalMatch}</p>
      </div>
      <div className="preference_div">
        <p className="preference">{data?.data?.TotalWon}</p>
      </div>
      <div className="preference_div">
        <p className="preference">{data?.data?.coin}</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid lightgray;
  align-items: center;
  width: 94vw;
  background-color: #fff;
  max-width: 600px;
  justify-content: space-around;

  .ProName{
    display: flex;
    align-items: center;
    justify-content: center;
    width:30%;
    justify-content: flex-start;
  }
  .rank{
    padding-right: 5px;
    font-size: large;
    font-weight: bold;
  }
  .student_avatar {
    width: 30px;
    height: 30px;
    margin: 4px;
  }

  .name {
    margin-left: 5px;
    font-style: italic;
    font-weight: bold;
  }

  .preference_div {
    display: flex;
    flex:0.2;
    p {
      padding: 4px 0;
      background-color: #0a0975;
      width: 100%;
      text-align: center;
      color: white;
      border-radius: 20px;
      margin: 2px;
    }
  }
`;

export default Name;
