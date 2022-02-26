import React, { useEffect, useState } from 'react'
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Header from '../Login/Header'
import HeaderSecond from '../Header/HeaderSecond'
import ListPage from '../ListPage/ListPage'
import Nodata from '../Nodata/Nodata';
import ListHead from '../ListHead/ListHead';

function Home() {

    const [{ user, userInfo }] = useStateValue();
    const [data, setData] = useState([]);
    // const [data1, setData1] = useState(["name":'Name',"totalMatch":"totalMatch"]);
    useEffect(() => {
            db.collection("users").orderBy('coin','asc').onSnapshot((snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                );
            })
    }, []);

  return (
    <div>
    <Header/>
    <HeaderSecond />
    <ListHead data1={true}/>
     {data.length!==0 ? data.map((data,serial)=>(
         <ListPage data={data} serial={serial}/>
     ))
    :<Nodata/>
    }
    </div>
  )
}

export default Home