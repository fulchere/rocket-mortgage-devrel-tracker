import React from 'react'
import './App.css';

import Crouter from './components/Crouter'
import {AuthProvider} from './contexts/AuthContext'

function App() {


  return (
    <AuthProvider>
    <div className="App">
      <Crouter />
    </div>
    </AuthProvider>
  );
}

export default App;
