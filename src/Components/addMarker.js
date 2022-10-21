import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../firebase";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";

function AddMarker({marker, setMarker}) {
  const [user, loading, error] = useAuthState(auth);

  const [ newMarker, setNewMarker ] = useState({
    name: "",
    desc: "",
    coordinates: [0, 0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'markers'), {
        name: newMarker.name,
        coordinates: [
          newMarker.coordinates[0],
          newMarker.coordinates[1]
        ],
        userId: user?.uid,
      })
      setMarker(null);
      setNewMarker({
        name: "",
        coordinates: [0, 0]
      })
    } catch (err) {
      alert(err)
    }
  }

  const resetMarker = () => {
    setMarker(null)
    setNewMarker({
      name: "",
      coordinates: [0, 0]
    })
  }

  useEffect(() => {
    if (marker) {
      setNewMarker({
        name: newMarker.name,
        coordinates: [
          marker.lat,
          marker.lng
        ]
      })
    }
  }, [marker])


  return (
    <div className={"addMarkerContainer"}>
      <h2>New marker</h2>
      <div>
        <label>Name :</label> &nbsp;
        <input type="text" value={newMarker.name} onChange={(e)=>{setNewMarker(prevState => {return {...prevState, name: e.target.value}})}} />
      </div>
      <label>LAT : {marker ? marker.lat : "0"} </label>
      <label>LNG : {marker ? marker.lng : "0"} </label>
      <span className={"link"} onClick={resetMarker}>Reset</span>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}


export default AddMarker;