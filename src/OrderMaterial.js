import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GlobalAppBar from './components/GlobalAppBar';  
import ProdAppBar from './components/ProdAppBar';  

import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';

function OrderMaterial() {
  return (
<>
<div>
    <ProdAppBar/>
</div>

<div style={{ padding: '20px'}} ><h2>T-Shirts und Farbe bei MAWI bestellen</h2></div>
 </>        
  );
}

export default OrderMaterial;
