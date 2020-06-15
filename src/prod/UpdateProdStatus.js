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


class UpdateProdStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prodOrderNr: '', //Nummer
            statusID: '3', //ID des Kunden
            statusdescription: 'Produktion abgeschlossen', //String mit Beschreibung
            data: null
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
        axios
            .post('https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/updatestatus', this.state)
            .then((res) => {
                console.log(res.data)
                var data = JSON.stringify(res.data)
                data = JSON.parse(data)
                data = data.body.message
                return data
            })
            .then(data => {
                console.log("data: " + data)
                this.setState({ data: data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    setnewProd(event) {
        console.log(event.target.value)
    }

    render() {
        const { prodOrderNr } = this.state;
        let content = '';
        return (
            <>
                <div>
                    <div><ProdAppBar /></div>
                    <form onSubmit={this.submitHandler}>

                        <div style={{ padding: '20px', paddingLeft: '30px' }} ><h2>Produktionsstatus der Aufträge auf "erledigt" updaten </h2>

                            <div style={{ width: '1200px', padding: '0px', paddingLeft: '10px' }}>
                                <FormControl>
                                    <Grid container
                                        direction="row"
                                        justify="center"
                                        alignItems="flex-start">

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
                                                <Button type="submit" style={{ float: 'left', margin: '20px' }} color="primary" variant="contained">Auftragsstatus updaten</Button>
                                            </Grid>
                                        </Grid >

                                    </Grid>
                                    <div>
                                        <h2>
                                            Bestätigung: {content = this.state.data}
                                        </h2>
                                    </div>
                                </FormControl>
                            </div>
                        </div>
                    </form>

                    <hr style={{
                        color: "#282c34",
                        backgroundColor: "#282c34",
                        height: 2,
                        borderColor: "#282c34"
                    }} />
                </div>
            </>
        );
    }
}

export default UpdateProdStatus; 