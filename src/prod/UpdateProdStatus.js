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
    selectProdStatus: '',
    quantity: '',
    deltaE: '',
}

class UpdateProdStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prodOrderNum: '', //Nummer
            statusID: '3', //ID des Kunden
            statusdescription: 'Produktion abgeschlossen', //String mit Beschreibung
            data: null,
            selectProdStatus: '',
            prodStatus: [],
            tableRef: '',
        }
    }


    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log([e.target.name] + " + " + e.target.value)
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        this.setState(
            { newProd: true }
        )

        axios
            .post('https://2pkivl4tnh.execute-api.eu-central-1.amazonaws.com/prod/updateprodstatus', this.state)
            .then((res) => {
                console.log(res.data)
                var data = JSON.stringify(res.data)
                data = JSON.parse(data)
                data = data.body.status
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

        var orderStatus = this.state.selectProdStatus

        if (orderStatus == 'open' || orderStatus == 'planned' || orderStatus == 'produced') {
            axios
                .post('https://2pkivl4tnh.execute-api.eu-central-1.amazonaws.com/prod/readorderinfo', { "orderStatus": orderStatus })
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
        } else {
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

    }

    setnewProd(event) {
        console.log(event.target.value)
    }

    render() {
        const {
            prodOrderNum,
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
                                                    name="prodOrderNum"
                                                    title="Die Produktionsordernummer könnte zum Beispiel wie folgt aussehen: C-20200616-12345-1"
                                                    value={prodOrderNum}
                                                    onChange={this.changeHandler} />
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Button type="submit" style={{ float: 'left', margin: '20px' }} color="primary" variant="contained"
                                                    disabled={!this.state.prodOrderNum}
                                                    title="Wenn Sie hier klicken wird der Status aktualisiert"
                                                >Produktionsauftrag abschließen</Button>
                                            </Grid>
                                        </Grid >
                                    </Grid>

                                </FormControl>
                                <div>
                                    Wenn eine Bestellung fertig produziert ist dann geben Sie bitte in das Textfeld die Produktionsordernummer ein, welche auf dem Etikett der T-Shirts aufgedruckt ist und klicken Sie dann rechts auf die Schaltfläche. Hierdurch werden der Status der Bestellung bei V&V aktualisiert und die Materialwirtschaft benachrichtigt um die Order abzuholen.

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
                                                <div onChange={this.changeHandler}> Filtern Sie nach Produktionsstatus: <br />
                                                    <input type="radio" value={""} defaultChecked name="selectProdStatus" /> Alle anzeigen <br />
                                                    <input type="radio" value={"open"} name="selectProdStatus" /> Offene Aufträge <br />
                                                    <input type="radio" value={"planned"} name="selectProdStatus" /> Eingeplante Aufträge <br />
                                                    <input type="radio" value={"produced"} name="selectProdStatus" /> Abgeschlossene Aufträge <br />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Button type="submit" style={{ float: 'left', margin: '20px' }} color="primary" variant="contained"
                                                    title="Wenn Sie alle Aufträge in der Datenbank einsehen möchten dann klicken Sie bitte hier. Über die Auswahl Links können Sie sich gezielt Aufträge nach dem Produktionsstatus anzeigen lassen."
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
                                    title="Produktionsstatus der Aufträge"
                                    columns={[
                                        { title: "Production Order Nr", field: "prodOrderNum" },
                                        { title: "Prod Sort Nr", field: "ProdSortNum" },
                                        { title: "End Date", field: "endDate" },
                                        { title: "HEX color", field: "colorHEX" },
                                        { title: "Prod Status", field: "prodStatus" },
                                        { title: "Anzahl", field: "quantity" },
                                        { title: "Delta E", field: "deltaE" },
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
                        </div>
                    </form>
                </div>
                <FooterPage />
            </>
        );
    }
}

export default UpdateProdStatus; 