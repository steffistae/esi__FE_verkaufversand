import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NewCustomer from './sales/NewCustomer';
import AllCustomer from './sales/Kundenkartei'
import NewOrder from './sales/NewOrder';
import Home from './Home';
import Status from './sales/Status';
import Booking from './sales/Booking';
import Retoure from './sales/Retoure';
import ProdHome from './prod/ProdHome';
import MaterialManagement from './prod/MaterialManagement';
import ProdManagement from './prod/ProdManagement';
import OrderManagement from './prod/OrderManagement';
import Kundenanfrage from './sales/Kundenanfrage';
import Sending from './sales/Sending';
import Dashboard from './prod/Dashboard/Dashboard.js';
import Kundenanfrage from './sales/Kundenanfrage'
import KPIBoard from './sales/KPIBoard'
import FAQ from './FAQ'

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

function App() {
  return (
    <>

      <Switch>

        <Route path="/home" component={Home} />
        <Route path="/sales/newcustomer" component={NewCustomer} />
        <Route path="/sales/allcustomer" component={AllCustomer} />
        <Route path="/sales/neworder" component={NewOrder} />
        <Route path="/sales/booking" component={Booking} />
        <Route path="/sales/status" component={Status} />
        <Route path="/sales/customerrequest" component={Kundenanfrage} />
        <Route path="/sales/retoure" component={Retoure} />
        <Route path="/sales/sending" component={Sending} />
        <Route path="/sales/kpiboard" component={KPIBoard} />
        <Route path="/prod/ProdHome" component={ProdHome} />
        <Route path="/prod/MaterialManagement" component={MaterialManagement} />
        <Route path="/prod/ProdManagement" component={ProdManagement} />
        <Route path="/prod/OrderManagement" component={OrderManagement} />
        <ThemeProvider theme={theme}>
        <Route path="/prod/Dashboard" component={Dashboard} />
        </ThemeProvider>
        <Route path="/faq" component={FAQ} />
        <Route path="/" component={Home} />

        

      </Switch>

    </>
  );
}

export default App;
