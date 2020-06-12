import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import MaterialTable from 'material-table'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBarSales from './components/AppBarSales'; 
import Editable from './components/OrderTable';

class NewOrder extends Component {
	constructor(props) {
		super(props)

		this.state = {
      customerID: '',
      lineItem: '',
      articleNr: '',
      colorCode: '',
      quantity: '',
      motivNr: '',
      toStock: true,
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
      .post('https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addorder', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
  }

  Editable() {
    const { useState } = React;
    const { customerID, lineItem, articleNr, colorCode, quantity, motivNr, toStock } = this.state

    let count = 1
  
    const [columns, setColumns] = useState([
      { title: 'Position', field: 'lineItem', initialEditValue: (count +1)},
      { title: 'Artikelnummer', field: 'articleNr'},
      { title: 'Farbcode', field: 'colorCode' },
      { title: 'Motivnummer', field: 'motivNr' },
      { title: 'Anzahl', field: 'quantity', type: 'numeric' },
      {
        title: 'Stock or Sale?',
        field: 'toStock',
        lookup: { 0: 'for Stock', 1: 'for Sale' },
      },
    ]);
  
    const [data, setData] = useState([
      { position: lineItem, articleNr: articleNr, colorcode: colorCode, motivNr: motivNr, quantity: quantity, toStock: toStock }=this.state,
     
    ]);
  
   
    return (
      
      
      <MaterialTable
        title="Bestellung anlegen"
        columns={columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                //count= count+1;  irgendwo muss count für die Position hochgezählt werden
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
               
                resolve()
              }, 1000)
            }),
           
        }}
  
       
  
      /> 
  
    )
  }

  
  render() {
    const { customerID, lineItem, articleNr, colorCode, quantity, motivNr, toStock } = this.state
    return (
    <>
    <div>
      <form onSubmit={this.submitHandler}>
               
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        
      <AppBarSales/>
      
      <div style={{ paddingTop: '20px', paddingLeft: '20px'}} ><h2>Neue Bestellung anlegen</h2></div>
          
          <div style={{ maxWidth: '100%' }}>
          <div style={{display:'flex', alignItems:'center', margin:'20px'}}>
          <form noValidate autoComplete="off">
          <TextField label="Kundennummer"  
              type="text"
              name="customerID"
							value={customerID}
							onChange={this.changeHandler}
              id="outlined-basic" 
              variant="outlined" />
          </form>
          </div>
          <div style={{ paddingTop: '20px'}} >
          <Editable/>

          </div>
          </div>
      </form>
      </div>


          
    </>
      
  
  );
}
}

export default NewOrder;