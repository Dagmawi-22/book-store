import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
       <Header />
        
      </header>

      <div>
      {/* <Card item={'hey'}/> */}
      </div>
    </div>
  );
}

export default App;
