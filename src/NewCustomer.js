import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GlobalAppBar from './components/GlobalAppBar';  
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';

function NewCustomer() {
  return (
<>
<div>
    <GlobalAppBar/>
</div>

<div style={{ padding: '20px'}} ><h2>Neuen Kunden anlegen</h2></div>

<div style={{ width: '800px', padding: '20px'}}>
<FormControl>
  <Grid   container
  direction="row"
  justify="center"
  alignItems="flex-start"
 >

    <Grid   
 container spacing={3}>
      <Grid item xs={6} sm={6}>
      <TextField id="lastname" label="Nachname" />
      </Grid>
      <Grid item xs={6} sm={6}>
      <TextField id="firstname" label="Vorname" />
      </Grid>
      <Grid item xs={6} sm={6}>
      <TextField id="street" label="Strasse" />
      </Grid>
      <Grid item xs={6} sm={6}>
      <TextField id="plz" label="Postleitzahl" />
      </Grid>
      <Grid item xs={6} sm={6}>
      <TextField id="city" label="Ort" />
      </Grid>
      <Grid item xs={6} sm={6}>
      <TextField id="country" label="Land" />
      </Grid>
      <Grid item xs={6} sm={6}>
      <TextField id="phone" label="Telefon" />
      </Grid>
      <Grid item xs={6} sm={6}>
      <TextField id="mail" label="Mail" />
      </Grid>
      <Grid item xs={12}  sm={6}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Privatkunde oder Businesskunde?</FormLabel>
        <RadioGroup aria-label="business" name="business" >
            <FormControlLabel value="private" control={<Radio />} label="Privat" />
            <FormControlLabel value="business" control={<Radio />} label="Business" />
        </RadioGroup>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
      <TextField id="businessname" label="Businessname" />
      </Grid>

    </Grid >
    <Grid item xs={12} sm={6}>
    <Button style={{margin:'5px'}} variant="contained" color="primary">
        Submit
        </Button></Grid>
  </Grid>
</FormControl>
</div>    
 </>        
  );
}

export default NewCustomer;
