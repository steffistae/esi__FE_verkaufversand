import React from 'react';
import './App.css';
import GlobalTable from './components/GlobalTable';
import GlobalAppBar from './components/GlobalAppBar';  




function Status() {
  return (

<>
   
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      
    <GlobalAppBar/>
      
    <div style={{ padding: '20px'}} ><h2>Status</h2>
    <h5>Zur Statusabfrage einfach in der Tabelle nach der Ordernummer/Kundennummer suchen.</h5></div>
        

       
    <GlobalTable/>
         
</>
      
  
  );
}

export default Status;
