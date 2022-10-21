import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import skateparks from "../data/skateparks.json";
import {useState} from "react";
import {LatLng} from "leaflet/src/geo";

function LocationMarker({marker, setMarker}) {
  const initialMarkers = new LatLng(51.505, -0.09);
  const map = useMapEvents({
    click(e) {
      // marker.push(e.latlng);
      setMarker(e.latlng);
      console.log(marker)
    }
  })

  return (
    <>
      {marker && <Marker position={marker}><Popup><span>New one</span></Popup></Marker>}
    </>
  )
}

function AddMarker({marker}) {
  const [ newMarker, setNewMarker ] = useState({
    name: "",
    desc: "",
    coordinates: [0, 0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(newMarker);
  }

  return (
    <div>
      <h2>Add Marker</h2>
      <label>Label</label>
      <input type="text" value={newMarker.name} onChange={(e)=>{setNewMarker(prevState => {return {...prevState, name: e.target.value, coordinates: [marker.lat, marker.lng]}})}} />
      <label>lat: {marker ? marker.lat : "0"} </label>
      <label>long: {marker ? marker.lng : "0"} </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

function MapComponent(props) {
  const [marker, setMarker] = useState();
  const [activePark, setActivePark] = useState(null);
  return (
    <div className={"content"}>
      {marker && <AddMarker marker={marker} />}
      <MapContainer center={[48.52, 2.19]} zoom={5} scrollWheelZoom={false}>
        {skateparks.features.map(park => (
          <Marker
            key={park.id}
            position={[
              park.coordinates[1],
              park.coordinates[0]
            ]}
            onClick={() => {
              setActivePark(park);
              console.log(activePark);
            }}

          />
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