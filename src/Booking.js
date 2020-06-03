import React from 'react';
import './App.css';
import BookingTable from './components/BookingTable';
import GlobalAppBar from './components/GlobalAppBar';  
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



function Booking() {
  return (

<>
   
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      
    <GlobalAppBar/>
      
    <div style={{ padding: '20px'}} ><h2>Auslagerung B2B & B2C</h2></div>
        
      
    <BookingTable/>

    <div style={{ padding: '20px'}} ><h2>Auslagerung Stock</h2></div>
        
    <div style={{display:'flex', alignItems:'center', margin:'20px'}}>
        <form noValidate autoComplete="off">
          <TextField style={{margin:'5px'}} id="outlined-basic" label="Produktinsnummer" variant="outlined" />
          <TextField style={{margin:'5px'}} id="outlined-basic" label="Anzahl" variant="outlined" />
        </form>
        <Button style={{margin:'5px'}} variant="contained" color="primary">
           Auslagern
        </Button>
        </div>
        <div><p></p></div>
        
         
</>
      
  
  );
}

export default Booking;
