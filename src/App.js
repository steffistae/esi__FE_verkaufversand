import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NewCustomer from './NewCustomer';
import NewOrder from './NewOrder';
import Home from './Home';
import Status from './Status';
import Booking from './Booking';
import Retoure from './Retoure';
import OrderMaterial from './OrderMaterial';
import OrderPickup from './OrderPickup';
import GetProdStatus from './GetProdStatus';
import UpdateProdStatus from './UpdateProdStatus';
import SplitLargeOrders from './SplitLargeOrders';

function App() {
  return (
<>

<Switch>

    <Route path="/home" component={Home} />
   <Route path="/newcustomer" component={NewCustomer} />
   <Route path="/neworder" component={NewOrder} />
   <Route path="/booking" component={Booking} />
   <Route path="/status" component={Status} />
   <Route path="/retoure" component={Retoure} />
   <Route path="/orderMaterial" component={OrderMaterial} />
   <Route path="/orderPickup" component={OrderPickup} />
   <Route path="/getProdStatus" component={GetProdStatus} />
   <Route path="/updateProdStatus" component={UpdateProdStatus} />
   <Route path="/splitLargeOrders" component={SplitLargeOrders} />

 </Switch>
 

</>
  );
}

export default App;
