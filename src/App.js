import Countries from "./components/Countries";
import Header from "./components/Header";
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Country from "./components/Country";


function App() {
  return (
    <Router>
      <main className=" bg-gray-50 dark:bg-gray-900">
        <Header/>
        <Routes>
        <Route exact path='/' element={<Countries/>}
        />
        <Route path="/:name" element={<Country/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
