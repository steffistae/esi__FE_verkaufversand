import React from 'react';
import '../App.css';
import AppBarSales from '../components/AppBarSales';  
import Editable from '../components/OrderTable';  




function NewOrderLayout() {
  return (

<>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      
    <AppBarSales/>
      
    <div style={{ paddingTop: '20px', paddingLeft: '20px'}} ><h2>Neue Bestellung anlegen</h2></div>
        
      

       

        <Editable/>
      
        

        
     </>
      
  
  );
}

export default NewOrderLayout;