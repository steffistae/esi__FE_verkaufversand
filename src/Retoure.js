import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GlobalAppBar from './components/GlobalAppBar';  
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Radio } from '@material-ui/core';

class Retoure extends Component {
	constructor(props) {
		super(props)

		this.state = {
            prodOrderNr: '', //Nummer
            customerID: '', //ID des Kunden
            lack: '', //String mit Beschreibung
            newProd: false //boolean
		}
    }

    changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		this.setState(
			{newProd: true}
		)
		axios
			.post('https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addcustomer', this.state)
			.then(response => {
				console.log(response)
			})
			.then(response => this.setState({response}))
			.catch(error => {
				console.log(error)
			})
    }

    setnewProd(event) {
        console.log(event.target.value)
      }
    
    render() {
        const {prodOrderNr, customerID, lack, newProd} = this.state
        return (  
            <>
		<div>
			<form onSubmit={this.submitHandler}>
				<div>
					<GlobalAppBar/>
				</div>
				
				<div style={{ padding: '20px'}} ><h2>Retoure anlegen</h2></div>
				
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
						<TextField 
							label="Produktionsordernummer"  
							type="text"
							name="prodOrderNr"
							value={prodOrderNr}
							onChange={this.changeHandler} />
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField
							label="Kundennummer"
							type="text"
							name="customerID"
							value={customerID}
							onChange={this.changeHandler} />
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField
							label="Mangel" 
							type="text"
							name="lack"
							value={lack}
							onChange={this.changeHandler}/>
						</Grid>
						<Grid item xs={6} sm={6}>
						<div onChange={this.changeHandler,this.setnewProd.bind(this)}> Neue Produktion <br/>
                            <input type="radio" value={true} name="newProd"/> Ja <br/>
                            <input type="radio" value={false} name="newProd"/> Nein
                        </div>
						</Grid>
							  			
					</Grid >
					<Grid item xs={6} sm={6}>
					<Button type="submit" style={{float: 'left', margin:'20px'}} color="primary" variant="contained">Submit
						</Button></Grid>
					</Grid>
					<div>
						<h2>
							Bestätigung: 
						</h2>
					</div>
				</FormControl>
				</div>    
			</form>
		</div>
		</>        
			);
		}
	}

export default Retoure; 