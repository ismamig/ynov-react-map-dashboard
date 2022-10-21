import './sidebar.css'
import data from '../data/skateparks.json'

function Sidebar() {
  return (
    <div className={"navContainer"}>
      <b>Markers</b>
      <ul>
        {data.features.map(park => (
          <li>{park.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar;