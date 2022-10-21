import './sidebar.css'
import {useEffect, useState} from "react";
import {addDoc, collection, onSnapshot, orderBy, query, deleteDoc, doc, where} from "firebase/firestore";
import {auth, db, logout} from "../firebase";
import AddMarker from "./addMarker";
import {useAuthState} from "react-firebase-hooks/auth";

function Sidebar({userId, marker, setMarker}) {
  const [ markerList, setMarkerList ] = useState([]);
  const [ list, setList ] = useState([]);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const q = query(collection(db, 'markers'), orderBy('name', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setMarkerList(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })


  },[])

  let newList = markerList.filter((marker) => marker.data.userId === userId)

  const handleDelete = async (id) => {
    const taskDocRef = doc(db, 'markers', id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className={"navContainer"}>
      <AddMarker marker={marker} setMarker={setMarker}/>
      <div>
        <h2>Markers</h2>
        <ul>
          {newList.map(elem => (
            <li key={elem.id} className={"sublistContainer"}>
              <div className={"name"}>{elem.data.name}</div>
              <button onClick={()=>{handleDelete(elem.id)}}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className={"userInfos"}>
        <span>Logged in as <b>{user?.email}</b></span>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar;