import React from 'react';
import ChipComponent from './components/ChipComponent';
import './App.css';
const App = () => {
  return (
    <>
      <h1 style={{color: 'blue'}}>Pick Users</h1>
      <div className='conainer'>
        <ChipComponent/>
      </div>
    </>
  );
};

export default App;
