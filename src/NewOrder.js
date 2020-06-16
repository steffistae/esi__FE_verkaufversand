import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBarSales from './components/AppBarSales';  
import Editable from './components/OrderTable';  




function NewOrderLayout() {
  return (

<>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      
    <AppBarSales/>
      
    <div style={{ paddingTop: '20px', paddingLeft: '20px'}} ><h2>Neue Bestellung anlegen</h2></div>
        
        <div style={{ maxWidth: '100%' }}>
        <div style={{display:'flex', alignItems:'center', margin:'20px'}}>
        <form noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Kundennummer" variant="outlined" />
        </form>
        <Button style={{margin:'5px'}} variant="contained" color="primary">
        Aufrufen
        </Button>
        </div>

        <div style={{ paddingTop: '20px'}} >

        <Editable/>
        </div>
        </div>

        
     </>
      
  
  );
}

export default NewOrderLayout;