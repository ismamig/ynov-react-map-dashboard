import './App.css';
import MapComponent from "./Components/map";
import Sidebar from "./Components/sidebar";

function App() {
  return (
    <div className={"container"}>
      <Sidebar/>
      <MapComponent />
    </div>
  );
}

export default App;
