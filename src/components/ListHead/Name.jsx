import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";

function Name({ data }) {
  return (
    <Container>
      {/* <Avatar className="student_avatar" src={data?.data?.photoURL} /> */}
      <p className="name">Name</p>
      <div className="preference_div">
        <p className="preference">Total</p>
      </div>
      <div className="preference_div">
        <p className="preference">Won</p>
      </div>
      <div className="preference_div">
        <p className="preference">Coin</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border: 1px solid lightgray;
  width: 94vw;
  background-color: #fff;
  max-width: 600px;
  justify-content: space-around;
   height: 40px;

  /* @media (max-width: 500px) {
    margin-left: 0 !important;
  } */

  .student_avatar {
    width: 50px;
    /* height: 50px; */
  }

  .name {
    width: 30%;
  }

  .preference_div {
    display: flex;
    width: 14%;
    p {
      width: 100%;
      text-align: center;
      border-radius: 20px;
      margin-bottom: auto;
      margin-top: auto;
    }
  }
`;

export default Name;
