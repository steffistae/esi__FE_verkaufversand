import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GlobalAppBar from './components/GlobalAppBar';  
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Radio } from '@material-ui/core';

class NewCustomer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: '',
			surName: '',
            street: '',
            PostCode: '',
            city: '',
            country: '',
            phone: '',
            mail: '',
            business: true,
			company: '',
			response: [],
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		this.setState({
				business: this.state.business,
			  })
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

	setB2B(event) {
        console.log(event.target.value)
      }

	render() {
		const { firstName, surName, street, PostCode, city, country, phone, mail, business, company } = this.state
		return (
		<>
		<div>
			<form onSubmit={this.submitHandler}>
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
						<TextField 
							label="Vorname"  
							type="text"
							name="firstName"
							value={firstName}
							onChange={this.changeHandler} />
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField
							label="Nachname"
							type="text"
							name="surName"
							value={surName}
							onChange={this.changeHandler} />
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField
							label="Straße" 
							type="text"
							name="street"
							value={street}
							onChange={this.changeHandler}/>
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField
							label="PLZ" 
							type="number"
							name="PostCode"
							value={PostCode}
							onChange={this.changeHandler} />
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField
							label="Stadt"
							type="text"
							name="city"
							value={city}
							onChange={this.changeHandler} />
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField 
							label="Land"
							type="text"
							name="country"
							value={country}
							onChange={this.changeHandler} />
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField
							label="Telefon"
							type="text"
							name="phone"
							value={phone}
							onChange={this.changeHandler} />
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField 
							label="Mail"
							type="text"
							name="mail"
							value={mail}
							onChange={this.changeHandler} />
						</Grid>
						<Grid item xs={6} sm={6}>
						<div onChange={this.changeHandler,this.setB2B.bind(this)}> Geschäftskunde <br/>
                            <input type="radio" value={business} name="business"/> Ja <br/>
                            <input type="radio" value={false} name="business"/> Nein
                        </div>
						</Grid>
						<Grid item xs={6} sm={6}>
						<TextField
							label="Firma" 
							type="text"
							name="company"
							value={company}
							onChange={this.changeHandler} />
						</Grid>				  			
					</Grid >
					<Grid item xs={12} sm={6}>
					<Button type="submit" color="primary" variant="contained">Submit
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

export default NewCustomer; 
