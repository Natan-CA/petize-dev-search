import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/perfil/:user" element={<Perfil />}/>
            </Routes>
        </Router>
    );
}

export default App;
