import React from 'react';
import ChipComponent from './components/ChipComponent';
import './App.css';
const App = () => {
  return (
    <div className='container'>
      <div className='center-container'>
        <h1 style={{color: 'blue'}}>Pick Users</h1>
        <ChipComponent />
      </div>
    </div>
  );
};

export default App;
