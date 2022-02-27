import React from "react";
import styled from "styled-components";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
function Popup() {
  const [{ userInfo, user }] = useStateValue();

  const history = useHistory();
  
  const accept = () => {
    if (userInfo?.decision === "lose") {
      if (userInfo?.coin === userInfo?.opponentCoin) {
        db.collection("users")
          .doc(user?.uid)
          .collection("game")
          .add({
            opponentName: userInfo.opponent,
            decision: userInfo.decision,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            db.collection("users")
              .doc(userInfo?.opponentUid)
              .update({
                decision: "",
                opponentUid: "",
                opponent: "",
                opponentCoin: "",
                coin: userInfo?.opponentCoin + 1,
                TotalMatch: userInfo?.opponentMatch + 1,
                TotalWon: userInfo?.opponentWon + 1,
                sendTo: "",
              })
              .then(() => {
                db.collection("users")
                  .doc(user?.uid)
                  .update({
                    decision: "",
                    opponentUid: "",
                    opponent: "",
                    opponentCoin: "",
                    coin: userInfo?.coin - 1,
                    TotalMatch: userInfo?.TotalMatch + 1,
                    TotalWon: userInfo?.TotalWon,
                    sendTo: "",
                  });
              }).then(()=>{
                  history('/')
              })
          });
      } else {
        var lose = userInfo?.coin / (userInfo?.coin + userInfo?.opponentCoin);
        db.collection("users")
          .doc(user?.uid)
          .collection("game")
          .add({
            opponentName: userInfo.opponent,
            decision: userInfo.decision,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            db.collection("users")
              .doc(userInfo?.opponentUid)
              .update({
                decision: "",
                opponentUid: "",
                opponent: "",
                opponentCoin: "",
                coin: userInfo?.opponentCoin + lose,
                TotalMatch: userInfo?.opponentMatch + 1,
                TotalWon: userInfo?.opponentWon + 1,
                sendTo: "",
              })
              .then(() => {
                db.collection("users")
                  .doc(user?.uid)
                  .update({
                    decision: "",
                    opponentUid: "",
                    opponent: "",
                    opponentCoin: "",
                    coin: userInfo?.coin - lose,
                    TotalMatch: userInfo?.TotalMatch + 1,
                    sendTo: "",
                  });
              }).then(()=>{
                history('/')
            })
          });
      }
    } else if (userInfo?.decision === "won") {
      if (userInfo?.coin === userInfo?.opponentCoin) {
        db.collection("user")
          .doc(user?.uid)
          .collection("game")
          .add({
            opponentName: userInfo.opponent,
            decision: userInfo.decision,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            db.collection("user")
              .doc(userInfo?.opponentUid)
              .update({
                decision: "",
                opponentUid: "",
                opponent: "",
                opponentCoin: "",
                coin: userInfo?.opponentCoin - 1,
                TotalMatch: userInfo?.opponentMatch + 1,
              })
              .then(() => {
                db.collection("user")
                  .doc(user?.uid)
                  .update({
                    decision: "",
                    opponentUid: "",
                    opponent: "",
                    opponentCoin: "",
                    coin: userInfo?.coin + 1,
                    TotalMatch: userInfo?.TotalMatch + 1,
                    TotalWon: userInfo?.TotalWon + 1,
                  });
              }).then(()=>{
                history('/')
            })
          });
      } else {
        lose = userInfo?.coin / (userInfo?.coin + userInfo?.opponentCoin);
        db.collection("user")
          .doc(user?.uid)
          .collection("game")
          .add({
            opponentName: userInfo.opponent,
            decision: userInfo.decision,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            db.collection("user")
              .doc(userInfo?.opponentUid)
              .update({
                decision: "",
                opponentUid: "",
                opponent: "",
                opponentCoin: "",
                coin: userInfo?.opponentCoin - lose,
                TotalMatch: userInfo?.opponentMatch + 1,
                TotalWon: userInfo?.opponentWon,
              })
              .then(() => {
                db.collection("user")
                  .doc(user?.uid)
                  .update({
                    decision: "",
                    opponentUid: "",
                    opponent: "",
                    opponentCoin: "",
                    coin: userInfo?.coin + lose,
                    TotalMatch: userInfo?.TotalMatch + 1,
                    TotalWon: userInfo?.TotalWon + 1,
                  });
              }).then(()=>{
                history('/')
            })
          });
      }
    }
  };

  const cancel = () => {
    db.colection("users")
      .doc(user?.uid)
      .update({
        decision: "",
        opponentUid: "",
        opponent: "",
        opponentCoin: "",
      })
      .then(() => {
        db.colection("users").doc(userInfo?.opponentUid).update({
          decision: "",
          opponentUid: "",
          opponent: "",
          opponentCoin: "",
        });
      });
  };
  return (
    <Container>
      <div className="remove_popup">
        {userInfo?.decision === "lose" ? (
          <p>{userInfo.opponent} claims he won against you</p>
        ) : (
          <p>{userInfo.opponent} claims you won against him</p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <button disable={userInfo?.decision === ""} onClick={accept}>
            Accept
          </button>
          <button disable={userInfo?.decision === ""} onClick={cancel}>
            Remove
          </button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;

  .remove_popup {
    background-color: #fff;
    width: 350px;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .remove_popup_header {
    display: flex;
    justify-content: flex-end;
  }

  .close_icon {
    font-size: 18px !important;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;

    &:hover {
      cursor: pointer;
      color: #555454;
    }
  }

  button {
    width: 80px;
    padding: 7px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 0;
    border-radius: 20px;
    background-color: #0044ff;
    color: white;
    margin: 0 12px;

    &:hover {
      cursor: pointer;
      background-color: #2e66ff;
    }
  }

  p {
    margin-top: 0;
    margin-bottom: 20px;
  }
`;

export default Popup;
