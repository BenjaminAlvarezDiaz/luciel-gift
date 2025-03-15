import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home.jsx";
import Puzzle from "./screens/Puzz.jsx";
import Letter from "./screens/Letter.jsx";
import Dice from "./screens/Dice.jsx";

function App() {
    return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element = {<Home />}/>
                <Route path="/puzzle" element = {<Puzzle />}/>
                <Route path="/letter" element = {<Letter />}/>
                <Route path="/dice" element = {<Dice />}/>
            </Routes>
        </Router>
    </div>
    );
}

export default App;