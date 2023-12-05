import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Upload from './components/Upload/Upload'
import Confirm from './components/Confirm/Confirm'
import Page1 from './components/Page1/Page1';
import Page2 from './components/Page2/Page2'
import Edit from './components/Edit/Edit'

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/send' element={<Upload/>}/>
        <Route exact path='/confirm' element={<Confirm/>}/>
        <Route exact path='/page1/:id' element={<Page1/>}/>
        <Route exact path='/page2/:id' element={<Page2/>}/>
        <Route exact path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
