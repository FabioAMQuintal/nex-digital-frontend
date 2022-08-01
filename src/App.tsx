import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route,  } from 'react-router-dom';

import { Home, SignUp, Dashboard } from './pages';

import './App.css';
import { Auth } from './components';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/home' element={
          <Auth>
            <Dashboard />
          </Auth>
        }/>
      <Route path='/signup' element={<SignUp />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;
