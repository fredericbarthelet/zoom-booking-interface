import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welbom on my booking app</h1>
      <Outlet />
    </div>
  );
}

export default App;
