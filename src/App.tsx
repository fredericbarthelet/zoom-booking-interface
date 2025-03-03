import "./App.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div>
      <h1>Welbom on my booking app</h1>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App;
