import React, { Component } from 'react'
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GlobalAppBar from '../components/GlobalAppBar';
import ProdAppBar from '../components/ProdAppBar';

import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';

import axios from 'axios'

var testDataColor = {
  "idcharges": 0,
  "date": null,
  "fkmaterials": 0,
  "chargeColor": {
    "ppml": 0,
    "viscosity": 0.00,
    "deltaE": 0.000
  },
  "material": {
    "name": "...",
    "art": "Farbe",
    "description": "Farbe ...",
    "idmaterials": 0,
    "minStock": 0,
    "size": 0.00,
    "measure": "0"
  }
}

var testDataShirts = {
  "date": null,
  "chargeShirt": {
    "absorbency": 0,
    "whiteness": 0
  },
  "idcharges": 0,
  "material": {
    "art": "...",
    "description": "...",
    "size": 0,
    "idmaterials": 0,
    "minStock": 0,
    "name": "...",
    "measure": "..."
  },
  "fkmaterials": 0
}

// {

//   viskositaet: 0.101,
//   ppml: 900,
//   deltaE: 1,
//   saugfaehigkeit: 28.3,
//   weissgrad: 97

// }

class OrderMaterial extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chargennummer: '', //Nummer
      statusID: '3', //ID des Kunden
      statusdescription: 'Chargennummer', //String mit Beschreibung
      dataColor: testDataColor,
      dataShirt: testDataShirts
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    this.setState(
      { newProd: true }
    )

    // axios
    //   .post('https://423rw0hwdj.execute-api.eu-central-1.amazonaws.com/Prod/')
    //   .then((res) => {
    //     console.log(res.data)
    //     var data = JSON.stringify(res.data)
    //     data = JSON.parse(data)
    //     data = data.body.message
    //     return data
    //   })
    //   .then(data => {
    //     console.log("data: " + data)
    //     this.setState({ data: data })
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })

    var config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'crossDomain': true,
      }
    };

    var data = {
      "chargesNum": this.state.chargennummer
    }
    axios
      .post('https://2pkivl4tnh.execute-api.eu-central-1.amazonaws.com/prod/addQualityValue', data)
      .then((res) => {
        console.log(res)
        var res = JSON.stringify(res.data)
        res = JSON.parse(res)

        if (res.chargeColor === undefined) {
          this.setState({dataColor: testDataColor})
          this.setState({ dataShirt: res })
        } else {
          this.setState({dataShirt: testDataShirts})
          this.setState({ dataColor: res })
        }
        return res
      })
      .then()
      .catch(error => {
        console.log(error)
      })
  }

  setnewProd(event) {
    console.log(event.target.value)
  }

  render() {
    const { chargennummer } = this.state;
    let content = '';


    return (
      <>
        <div>
          <form onSubmit={this.submitHandler}>
            <div>
              <ProdAppBar />
            </div>

            <div style={{ padding: '20px' }} ><h2>Qualitätswerte für Chargennummer ermitteln </h2></div>

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
                        label="Chargennummer"
                        type="text"
                        name="chargennummer"
                        value={chargennummer}
                        onChange={this.changeHandler} />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <Button type="submit" style={{ float: 'left', margin: '20px' }} color="primary" variant="contained">Qualitätswerte abfragen</Button>
                    </Grid>
                  </Grid >

                </Grid>
                <div>
                  <h2> Farbparameter: </h2>

                    Chargennummer: {content = this.state.dataColor.idcharges} <br />
                    Artikel: {content = this.state.dataColor.material.name} <br />
                    Beschreibung: {content = this.state.dataColor.material.description} <br />
                    PPML: {content = this.state.dataColor.chargeColor.ppml} <br />
                    Viskosität: {content = this.state.dataColor.chargeColor.viscosity} <br />
                    Delta E: {content = this.state.dataColor.chargeColor.deltaE} <br /> <br />

                    <h2> T-Shirt Parameter: </h2>

                    Chargennummer: {content = this.state.dataShirt.idcharges} <br />
                    Artikel: {content = this.state.dataShirt.material.name} <br />
                    Saugfähigkeit Shirt: {content = this.state.dataShirt.chargeShirt.absorbency} <br />
                    Weißgrad Shirt: {content = this.state.dataShirt.chargeShirt.whiteness} <br />
                </div>
              </FormControl>
            </div>
          </form>
        </div>
      </>
    );

  }
}


export default OrderMaterial; 