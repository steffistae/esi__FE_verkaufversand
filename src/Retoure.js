import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBarSales from './components/AppBarSales';  
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
			newProd: false, //boolean
			data: null,
		}
    }

    changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
		this.setState(
			{newProd: true}
		)
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addcustomer', this.state)
			.then((res) => {
                console.log(res.data)
                var data = JSON.stringify(res.data)
                data = JSON.parse(data)
				data = data.message
				console.log(data)
                return data
            })
			.then(response => {
				console.log(response)
			})
			.then(response => this.setState({response}))
			.catch(error => {
				console.log(error)
			})
    }


    render() {
		const {prodOrderNr, customerID, lack, newProd} = this.state
		let content = '';
        return (  
            <>
		<div>
			<form onSubmit={this.submitHandler}>
				<div>
					<AppBarSales/>
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
						<div onChange={this.changeHandler}> Neue Produktion <br/>
                            <input type="radio" value={newProd} name="newProd"/> Ja <br/>
							<input type="radio" name="newProd"/> Nein <br/>
                        </div>
						</Grid>
							  			
					</Grid >
					<Grid item xs={6} sm={6}>
					<Button type="submit" style={{float: 'left', margin:'20px'}} color="primary" variant="contained">Submit
						</Button></Grid>
					</Grid>
					<div>
					<h3>
							Bestätigung: {content = this.state.data}
						</h3>
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