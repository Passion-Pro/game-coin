import React, { useEffect, useState } from 'react'
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Header from '../Login/Header'
import HeaderSecond from '../Header/HeaderSecond'
import ListPage from '../ListPage/ListPage'
import Nodata from '../Nodata/Nodata';

function Home() {

    const [{ user, userInfo }] = useStateValue();
    const [data, setData] = useState([]);
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
     {data.length!==0 ? data.map((data)=>(
         <ListPage data={data}/>
     ))
    :<Nodata/>
    }
    </div>
  )
}

export default Home