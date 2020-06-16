import React, { Component } from 'react'
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ProdAppBar from '../components/ProdAppBar';
import MaterialTable from "material-table";
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FooterPage from '../components/Footer';
import axios from 'axios'

var emptyStatus = {
    prodOrderNum: '',
    endDate: '',
    colorHEX: '',
    ProdSortNum: '',
    prodStatus: '',
    quantity: '',
    deltaE: '',
}

class UpdateProdStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prodOrderNr: '', //Nummer
            statusID: '3', //ID des Kunden
            statusdescription: 'Produktion abgeschlossen', //String mit Beschreibung
            data: null,

            prodStatus: [],
            tableRef: '',
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

    submitHandlerGetStatus = e => {
        e.preventDefault()
        console.log(this.state)
        this.setState(
            { newProd: true }
        )
        axios
            .get('https://2pkivl4tnh.execute-api.eu-central-1.amazonaws.com/prod/readorderinfo')
            .then((res) => {
                var data = JSON.stringify(res.data)
                data = JSON.parse(data)
                data = data.body
                console.log(data)
                return data
            })
            .then(data => {
                console.log("data: " + data)
                this.setState({ prodStatus: data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    setnewProd(event) {
        console.log(event.target.value)
    }

    render() {
        const {
            prodOrderNr,
            endDate,
            colorHEX,
            ProdSortNum,
            prodStatus,
            quantity,
            deltaE,
        } = this.state;
        let content = '';
        return (
            <>
                <div>
                    <div><ProdAppBar /></div>
                    <form onSubmit={this.submitHandler}>

                        <div style={{ padding: '20px', paddingLeft: '30px' }} ><h2>Produktionsstatus updaten und Auftrag abholen lassen </h2>

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
                                                <Button type="submit" style={{ float: 'left', margin: '20px' }} color="primary" variant="contained"
                                                    title="Geben Sie links in das Textfeld die Produktionsordernummer ein welche auf dem Etikett der T-Shirts aufgedruckt ist und klicken Sie dann hier. Hierdurch werden der Status der Bestellung bei V&V geupdated und die Materialwirtschaft benachrichtigt um die Order abzuholen"
                                                >Auftragsstatus updaten</Button>
                                            </Grid>
                                        </Grid >

                                    </Grid>

                                </FormControl>
                                <div>
                                    <h3>
                                        Bestätigung: {content = this.state.data}
                                    </h3>
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

                    <form onSubmit={this.submitHandlerGetStatus}>

                        <div style={{ padding: '20px', paddingLeft: '30px' }} ><h2>Produktionsstatus der anstehenden Aufträge einsehen </h2>

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
                                                    label="Production Status"
                                                    type="text"
                                                    name="prodStatus"
                                                    value={""}
                                                    onChange={this.changeHandler} />
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Button type="submit" style={{ float: 'left', margin: '20px' }} color="primary" variant="contained"
                                                    title="Wenn Sie alle offenen und geplanten Aufträge in der Datenbank einsehen möchten dann klicken Sie bitte hier"
                                                >Produktionsstatus abfragen</Button>
                                            </Grid>
                                        </Grid >

                                    </Grid>

                                </FormControl>
                                <div>
                                    <h3>
                                        Bestätigung: {content = this.state.data}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div style={{ maxWidth: "100%" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: "0px",
                                }}
                            ></div>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                            <div style={{ paddingTop: "5px" }}>
                                <MaterialTable
                                    style={{ marginLeft: "20px", marginRight: "20px" }}
                                    title="Produktionsstatus der aktuellen Aufträge"
                                    columns={[
                                        { title: "Production Order Nr", field: "prodOrderNum" },
                                        { title: "End Date", field: "endDate" },
                                        { title: "HEX color", field: "colorHEX" },
                                        { title: "Prod Sort Nr", field: "ProdSortNum" },
                                        { title: "Prod Status", field: "prodStatus" },
                                        
                                    ]}

                                    data={this.state.prodStatus}
                                    actions={[
                                        {
                                            icon: "done_all",
                                            tooltip: "Refresh",
                                            isFreeAction: true,
                                            onClick: (e) =>
                                                this.submitHandlerGetStatus(e),
                                        },
                                    ]}
                                    options={{
                                        headerStyle: {
                                            backgroundColor: "#3f51b5",
                                            color: "#FFFF",
                                        },
                                    }}
                                />
                            </div>
                        
                    </form>
                </div>
                <FooterPage /> 
            </>
        );
    }
}

export default UpdateProdStatus; 