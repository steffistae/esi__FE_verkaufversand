import React, { Component } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';
import AppBarSales from './components/AppBarSales'; 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Status extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    stateID: '',
  };




  submitHandler = e => {
    var trigger = '4';
    axios.get("https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getstatusid?statusID="+ trigger)
    .then(
      result => {
        this.setState({
          isLoaded: true,
          items: result.data
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
      );
		e.preventDefault()
    console.log(this.trigger)
    }
  
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  setStatusID() {
    this.setState(
      {trigger: this.state.stateID}
    .then(
      this.submitHandler
    )
    )
  }

  render() {
    const { error, isLoaded, items, stateID, trigger } = this.state;
//    const { trigger } = this.trigger;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <>
    <div>
      <form onSubmit={this.submitHandler}>
               
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        
      <AppBarSales/>
      
      <div style={{ paddingTop: '20px', paddingLeft: '20px'}} ><h2>Status prüfen</h2></div>
          
          <div style={{ maxWidth: '100%' }}>
          <div style={{display:'flex', alignItems:'center', margin:'20px'}}>
          <form noValidate autoComplete="off">
          <TextField label="Status ID"  
            type="text"
            name="statusID"
			      value={stateID}
			      onChange={this.changeHandler}
            id="outlined-basic" 
            variant="outlined" />
          </form>
          
          <div >
            <Button type="submit" style={{float: 'left', margin:'20px'}} variant="contained" color="primary">
            Prüfen
            </Button>
          </div>
          </div>
    
              <div style={{ paddingTop: '25px'}} >

              <MaterialTable style={{marginLeft:'20px', marginRight:'20px'}}
                title="Status der aktuellen Aufträge"
                columns={[
                { title: 'ProductionOrderNr', field: 'prodOrderNr' },
                { title: 'OrderNr', field: 'orderNr' },
                { title: 'StatusID', field: 'statusID' },
                { title: 'StatusDescription', field: 'Statusdescription' },]}
              data={this.state.items}
              actions={[
              {
              icon: 'refresh',
              tooltip: 'Refresh',
              isFreeAction: true,
              onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
                },]}
            options={{
            
            headerStyle: {
              backgroundColor: '#3f51b5',
              color: '#FFFF'
            }}
          }
          
                />
              </div>
              </div>
          </form>
          </div>
              
        </>
      );
    }
  }
}

export default Status;