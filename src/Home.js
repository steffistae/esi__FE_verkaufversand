import React from 'react';
import './App.css';
import GlobalAppBar from './components/GlobalAppBar';  




function App() {
  return (
<>

    <GlobalAppBar/>
    
<div>
    <div style={{display: 'flex', justifyContent: 'center'}}><h1>Welcome to YourShirt!</h1></div>
    <div style={{display: 'flex', justifyContent: 'center'}}><h2>First, choose your Working Area in the left menu! :) </h2></div>
</div>
</>
  );
}

export default App;
