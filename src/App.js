import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import NewCustomer from './NewCustomer';
import NewOrder from './NewOrder';
import Home from './Home';
import Status from './Status';



function App() {
  return (
<>

<Switch>
    <Route path="/home" component={Home} />
   <Route path="/newcustomer" component={NewCustomer} />
   <Route path="/neworder" component={NewOrder} />
   <Route path="/status" component={Status} />

 </Switch>
 

</>
  );
}

export default App;