import React, { Component } from 'react'
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import ProdAppBar from '../components/ProdAppBar';
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FooterPage from '../components/Footer';
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

class OrderMaterial extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chargennummer: '', //Nummer
      statusID: '3', //ID des Kunden
      statusdescription: 'Chargennummer', //String mit Beschreibung
      dataColor: testDataColor,
      dataShirt: testDataShirts,
      responseOrder: '',
      responseRestock: '',
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandlerOrder = e => {
    e.preventDefault()
    console.log("Button pressed submitHandlerMawi")
    this.setState(
      { responseOrder: 'Die Materialwirtschaft wurde benachrichtigt und wird die Ware bald liefern' }
    )
  }

  submitHandlerRestock = e => {
    e.preventDefault()
    console.log("Button pressed submitHandlerMawi")
    this.setState(
      { responseRestock: 'Die Materialwirtschaft wurde benachrichtigt und wird die Materialien bald abholen' }
    )
  }

  submitHandler = e => {
    e.preventDefault()
    console.log(this.state)
    this.setState(
      { newProd: true }
    )

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
          this.setState({ dataColor: testDataColor })
          this.setState({ dataShirt: res })
        } else {
          this.setState({ dataShirt: testDataShirts })
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
          <div> <ProdAppBar /> </div>

          <form onSubmit={this.submitHandlerOrder}>

            <div style={{ padding: '20px', paddingLeft: '30px' }} ><h2>Material bestellen </h2>

              <div style={{ width: '1200px', padding: '0px', paddingLeft: '10px' }}>
                <FormControl>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start">

                    <Grid
                      container spacing={3}>
                      <Grid item xs={6} sm={6}>
                        <form>
                          <Checkbox value="T-Shirts" inputProps={{ 'aria-label': 'Checkbox A' }} /> T-Shirts <br />
                          <Checkbox value="Cyan" inputProps={{ 'aria-label': 'Checkbox A' }} /> Cyan 10L <br />
                          <Checkbox value="Magenta" inputProps={{ 'aria-label': 'Checkbox A' }} /> Magenta 10L <br />
                          <Checkbox value="Yellow" inputProps={{ 'aria-label': 'Checkbox A' }} /> Yellow 10L<br />
                          <Checkbox value="Key" inputProps={{ 'aria-label': 'Checkbox A' }} /> Key 10L<br />
                        </form>
                      </Grid>

                      <Grid item xs={6} sm={6}>
                        <Button type="submit" style={{ float: 'center', margin: '14px', width: "200px" }} color="primary" variant="contained"
                          title="Wählen Sie links das Material aus, welches Sie sich liefern lassen möchten und klicken Sie dann hier"
                        >Material ordern</Button>
                      </Grid>
                    </Grid>
                  </Grid>

                </FormControl>
                <div>
                  Wählen Sie links das Material aus, welches Sie sich liefern lassen möchten und klicken Sie dann auf die blaue Schaltfläche.
                <h3>Bestätigung: {content = this.state.responseOrder}</h3>
                </div>
              </div>
            </div>

          </form>

          <hr style={{
            color: "#3f51b5",
            backgroundColor: "#3f51b5",
            height: 2,
            borderColor: "#3f51b5"
          }} />

          <form onSubmit={this.submitHandler}>

            <div style={{ padding: '20px', paddingLeft: '30px' }} ><h2>Qualitätswerte für Chargennummer ermitteln </h2>

              <div style={{ width: '1200px', padding: '0px', paddingLeft: '10px' }}>
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
                          title="Um die Qualitätswerte für eine Charge abzufragen geben Sie bitte in dieses Feld die Nummer ein welche auf dem entsprechenden Material aufgedruckt ist und klicken Sie nachfolgend auf die rechte blaue Schaltfläche."
                          value={chargennummer}
                          onChange={this.changeHandler} />
                      </Grid>

                      <Grid item xs={6} sm={6}>
                        <Button type="submit" style={{ float: 'left', margin: '14px', width: "200px" }} color="primary" variant="contained"
                          disabled={!this.state.chargennummer}
                        >Qualitätswerte abfragen</Button>
                      </Grid>
                    </Grid >
                  </Grid>
                </FormControl>
                <div>
                  Um die Qualitätswerte für eine Charge abzufragen geben Sie bitte in dem Feld links oberherhalb die Nummer ein, welche auf dem entsprechenden Material aufgedruckt ist, und klicken Sie nachfolgend auf die rechte Schaltfläche.
                  Die Werte können Sie anschließend unter Farbparameter beziehungsweise unter T-Shirt Parameter entnehmen.
                </div>


                <div style={{ width: '500px', padding: '0px', paddingLeft: '0px' }}>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                  >

                    <Grid
                      container spacing={100}>
                      <Grid item xs={6} sm={6} mr={100}>
                        <h3> Farbparameter </h3>
                        Chargennummer: {content = this.state.dataColor.idcharges} <br />
                        Artikel: {content = this.state.dataColor.material.name} <br />
                        Beschreibung: {content = this.state.dataColor.material.description} <br />
                        PPML: {content = this.state.dataColor.chargeColor.ppml} <br />
                        Viskosität: {content = this.state.dataColor.chargeColor.viscosity} <br />
                        Delta E: {content = this.state.dataColor.chargeColor.deltaE} <br /> <br />
                      </Grid>

                      <Grid item xs={6} sm={6} mx={100} pl={100}>
                        <h3> T-Shirt Parameter </h3>
                        Chargennummer: {content = this.state.dataShirt.idcharges} <br />
                        Artikel: {content = this.state.dataShirt.material.name} <br />
                        Saugfähigkeit Shirt: {content = this.state.dataShirt.chargeShirt.absorbency} <br />
                        Weißgrad Shirt: {content = this.state.dataShirt.chargeShirt.whiteness} <br />
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>

            </div>

            <hr style={{
              color: "#3f51b5",
              backgroundColor: "#3f51b5",
              height: 2,
              borderColor: "#3f51b5"
            }} />

          </form>

          <form onSubmit={this.submitHandlerRestock}>

            <div style={{ padding: '20px', paddingLeft: '30px' }} ><h2>Material wieder einlagern </h2>

              <div style={{ width: '1200px', padding: '0px', paddingLeft: '10px' }}>
                <FormControl>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start">

                    <Grid
                      container spacing={3}>
                      <Grid item xs={6} sm={6}>
                        <form>
                          <Checkbox value="T-Shirts" inputProps={{ 'aria-label': 'Checkbox A' }} /> T-Shirts <br />
                          <Checkbox value="Farbe" inputProps={{ 'aria-label': 'Checkbox A' }} /> Farbe <br />
                        </form>
                      </Grid>

                      <Grid item xs={6} sm={6}>
                        <Button type="submit" style={{ float: 'center', margin: '14px', width: "200px" }} color="primary" variant="contained"
                          title="Wenn Sie Material einlagern möchten wählen Sie bitte links die entsprechende Position aus und drücken Sie hier. Die Materialwirtschaft wird dann benachrichtigt werden und sich darum kümmern"
                        >Materialwirtschaft benachrichtigen</Button>
                      </Grid>
                    </Grid>
                  </Grid>

                </FormControl>

                <div>
                  Wenn Sie Material einlagern möchten wählen Sie bitte links die entsprechende Position aus und drücken Sie hier. Die Materialwirtschaft wird dann benachrichtigt werden und sich darum kümmern.
                <h3>Bestätigung: {content = this.state.responseRestock}</h3>

                </div>

              </div>
            </div>

          </form>
        </div>
        <FooterPage />
      </>
    );
  }
}

export default OrderMaterial; 