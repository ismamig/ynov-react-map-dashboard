import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {LatLng} from "leaflet/src/geo";

import { db } from '../firebase.js';
import {collection, query, orderBy, onSnapshot, addDoc, Timestamp, where} from "firebase/firestore"


function LocationMarker({ marker, setMarker}) {
  // const initialMarkers = new LatLng(51.505, -0.09);
  const map = useMapEvents({
    click(e) {
      setMarker(e.latlng);
    }
  })

  return (
    <>
      {marker && <Marker position={marker}><Popup><span>New one</span></Popup></Marker>}
    </>
  )
}

function MapComponent({userId, marker, setMarker}) {
  const [ markerList, setMarkerList ] = useState([]);
  const [activePark, setActivePark] = useState(null);

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

  return (
    <div className={"content"}>
      <MapContainer center={[48.52, 2.19]} zoom={5} scrollWheelZoom={true}>
        {newList.map(elem => (
          <Marker
            key={elem.id}
            position={[
              elem.data.coordinates[0],
              elem.data.coordinates[1]
            ]}
          ><Popup><span>{elem.data.name}</span></Popup></Marker>
        ))}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker marker={marker} setMarker={setMarker}/>
      </MapContainer>
    </div>
  )
}

export default MapComponent;