import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Home from "./components/HomePage/Home";
import About from "./components/About";
import NewsState from "./components/Context_News/NewsState";

function App() {
return (
  <>
 <NewsState>
    <Router>
    <Header/>
    
    
    <Routes>
    
    <Route exact path="/" element={<Home />}></Route>
    <Route exact path="/about" element={<About />}></Route>
    
    </Routes>


    <Header2 />
    </Router>
</NewsState>
  </>
);

}
export default App;
