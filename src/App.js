import './App.css';
import MapComponent from "./Components/map";
import Sidebar from "./Components/sidebar";
import {useState, useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";


function App() {
  const [marker, setMarker] = useState();

  const [user, loading, error] = useAuthState(auth);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  /*const fetchRole = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setUserRole(data.role);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };*/

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <>
        <div className={"container"}>
          <Sidebar userId={user?.uid} marker={marker} setMarker={setMarker}/>
          <MapComponent userId={user?.uid} marker={marker} setMarker={setMarker}/>
        </div>


    </>
  );
}

export default App;
