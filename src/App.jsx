import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage />}/>;
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
