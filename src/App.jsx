import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />;
      </Routes>
    </div>
  );
}

export default App;
