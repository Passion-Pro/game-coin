import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Login/Header";
import HeaderSecond from "../Header/HeaderSecond";
import PlayerCard from "./PlayerCard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Name from "../ListPage/Name";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

function PlayPage() {
  const [selectOpponent, setSelectOpponent] = useState(false);
  const [input, setInput] = useState();
  const [users, setUsers] = useState([]);
  const[opponent , setOpponent] = useState([]);
  const[{userInfo} , dispatch] = useStateValue();

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(
        snapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }))
      )
    );
  }, []);

  return (
    <Container>
      <Header />
      <HeaderSecond />
      <div className="content">
        <PlayerCard data = {userInfo}/>
      </div>
      <div className="opponent">
        {!selectOpponent && (
          <button
            onClick={() => {
              setSelectOpponent(true);
              setOpponent([]);
            }}
            style={{
              display: "flex",
              border: "0",
              borderRadius: "20px",
              backgroundColor: "#1357d4",
              marginTop: "26px",
              padding: "12px",
              fontWeight: "bold",
              color: "white",
              width: "200px",
              alignItems: "center",
              justifyContent: "center",
              margin: "12px 0",
            }}
          >
            Choose Opponent
          </button>
        )}
        {selectOpponent && !opponent?.data?.name &&  (
          <div className="select_oppponent">
            <div className="search">
              <SearchOutlinedIcon className="searchIcon" />
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
            <div className="search_results">
              {/* <Name data={data}/> */}
              {users && input && 
                users
                  .filter((item) => {
                    return item?.data?.name
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  })
                  .map((data) => (
                      <div onClick = {() => {
                        setOpponent(data);
                        console.log("SEt" , data);
                        
                      }}>
                          <Name data={data}/>
                      </div>
                  ))}
            </div>
          </div>
        )}
        {opponent?.data?.name && (
                <PlayerCard data = {opponent?.data}/>
        )}
      </div>

    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  .content {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .opponent {
    display: flex;
    justify-content: center;
    flex-direction : column;
    align-items: center;

    button {
      cursor: pointer;
    }
  }

  .select_oppponent {
    display: flex;
    flex-direction: column;
  }

  .search {
    background-color: #fff;
    width: 400px;
    border-radius: 20px;
    padding: 5px;
    display: flex;
    margin-bottom: 10px;
    border: 1px solid lightgray;
    margin-top: 15px;

    input {
      border: 0px;
      outline-width: 0px;
      width: 94%;
    }
    .searchIcon {
      color: gray !important;
    }
  }
`;

export default PlayPage;
