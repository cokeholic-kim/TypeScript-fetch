import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Subjects from './components/Subjects';
import Lists from './components/Lists';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import AddSubject from './components/AddSubject';
import AddFunctions from './components/AddFunctions';

function App() {
  const [subject,setSubject] = useState(0);
  const onChange = (subject:number):void => {
    setSubject(subject);
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Header sitename='typescript' onChange={onChange}/>
        <Routes>
          <Route path="/" element={<>
            <Subjects onChange={onChange}/>
            <Lists subject={subject}/>
          </>}/>
          <Route path ="/addSubject" element={<AddSubject/>}/>
          <Route path ="/addFunc" element={<AddFunctions/>}/>
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
