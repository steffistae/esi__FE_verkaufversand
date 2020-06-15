import React, { Component } from 'react'
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ProdAppBar from '../components/ProdAppBar';

import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FooterPage from '../components/Footer';

class OrderPickup extends Component {

  constructor(props) {
    super(props)

    this.state = {
      prodOrderNum: '', //Nummer
      response: ''
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })

    this.setState({response : 'Die Materialwirtschaft wurde benachrichtigt und wird die Ware demnächst abholen'})
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    this.setState({response : 'Die Materialwirtschaft wurde benachrichtigt und wird die Ware demnächst abholen'})
  }

  render() {
    const { prodOrderNum } = this.state;
    let content = '';


    return (
      <>
        <div>
          <form onSubmit={this.submitHandler}>
            <div>
              <ProdAppBar />
            </div>

            <div style={{ padding: '20px' }} ><h2>Aufträge abholen lassen </h2></div>

            <div style={{ width: '800px', padding: '20px' }}>
              <FormControl>
                <Grid container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >

                  <Grid
                    container spacing={3}>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="prodOrderNum"
                        type="text"
                        name="prodOrderNum"
                        value={prodOrderNum}
                        onChange={this.changeHandler} />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Button type="submit" style={{ float: 'left', margin: '20px' }} color="primary" variant="contained">Aufträge bereit zur Abholung?</Button>
                    </Grid>
                  </Grid >
                </Grid>
                <div>
                  <h2>
                    Bestätigung: {content = this.state.response}
                  </h2>
                </div>
              </FormControl>
            </div>
          </form>
        </div>
        <FooterPage />
      </>
    );

  }
}

export default OrderPickup;
