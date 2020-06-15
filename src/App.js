import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NewCustomer from './NewCustomer';
import NewOrder from './NewOrder';
import Home from './Home';
import Status from './Status';
import Booking from './Booking';
import Retoure from './Retoure';
import OrderMaterial from './prod/OrderMaterial';
import OrderPickup from './prod/OrderPickup';
import GetProdStatus from './prod/GetProdStatus';
import UpdateProdStatus from './prod/UpdateProdStatus';
import SplitLargeOrders from './prod/SplitLargeOrders';
import GetCSV from './prod/getCSV';
import Kundenanfrage from './Kundenanfrage'


function App() {
  return (
    <>

      <Switch>

        <Route path="/home" component={Home} />
        <Route path="/newcustomer" component={NewCustomer} />
        <Route path="/neworder" component={NewOrder} />
        <Route path="/booking" component={Booking} />
        <Route path="/status" component={Status} />
        <Route path="/customerrequest" component={Kundenanfrage} />
        <Route path="/retoure" component={Retoure} />
        <Route path="/orderMaterial" component={OrderMaterial} />
        <Route path="/orderPickup" component={OrderPickup} />
        <Route path="/getProdStatus" component={GetProdStatus} />
        <Route path="/updateProdStatus" component={UpdateProdStatus} />
        <Route path="/splitLargeOrders" component={SplitLargeOrders} />
        <Route path="/getCSV" component={GetCSV} />
        <Route path="/" component={Home} />

      </Switch>

    </>
  );
}

export default App;
