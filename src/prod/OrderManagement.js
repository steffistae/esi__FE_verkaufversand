import React, { Component } from 'react'
import '../App.css';
import Button from '@material-ui/core/Button';
import ProdAppBar from '../components/ProdAppBar';
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FooterPage from '../components/Footer';
import axios from 'axios'

import MaterialTable from "material-table";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import Icon from '@material-ui/core/Icon';
import GetAppIcon from '@material-ui/icons/GetApp';

class OrderManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: this.props.filename ? this.props.filename : 'data',
      url: '',
      status: '',
      items: [],
      chosen: [],
      selected: [],
      lengthSelected: 0,
    };

    this.submitHandlerGetStatus()
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = async (e) => {
    var test = {
      "key1": "value1",
      "key2": "value2",
      "key3": "value3",
    };

    e.preventDefault()
    console.log(this.state)
    this.setState(
      {
        newProd: true,
      }
    )

    var body = {
      "prodOrderNum": this.state.selected,
    }

    console.log(body)
    await axios
      .post('https://2pkivl4tnh.execute-api.eu-central-1.amazonaws.com/prod/sortOrders', body)
      // .post('https://2pkivl4tnh.execute-api.eu-central-1.amazonaws.com/prod/sortOrders', { crossdomain: true }, body)
      .then((res) => {
        console.log(res.data)
        var data = JSON.stringify(res.data)
        data = JSON.parse(data)
        return data
      })
      .then(data => {
        this.setState({ url: data.body.url, status: data.body.status })
      })
      .catch(error => {
        console.log(error)
      })

    this.submitHandlerGetStatus()
  }

  submitHandlerGetStatus = e => {
    if (typeof e != 'undefined') {
      e.preventDefault();
    }
    console.log(this.state)
    this.setState(
      { newProd: true }
    )

    axios
      .post('https://2pkivl4tnh.execute-api.eu-central-1.amazonaws.com/prod/readorderinfo', { "orderStatus": 'open' })
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

  toggle = prodOrderNum => {
    const selected = this.state.selected;

    if (selected.includes(prodOrderNum)) {
      selected.splice(selected.indexOf(prodOrderNum), 1);
      this.lengthSelected = 0;
    }
    else {
      selected.push(prodOrderNum);
      this.lengthSelected = 1;
    }

    this.setState({ selected });
    localStorage.setItem("chosen", JSON.stringify(selected));

    console.log(this.state);
  };

  render() {
    const { prodOrderNr } = this.state;
    let content = '';
    return (
      <>
        <div>
          <div><ProdAppBar /></div>

          <form onSubmit={this.submitHandler}>

            <div style={{ padding: '20px', paddingLeft: '30px' }} ><h2>CSV Datei erstellen und herunterladen </h2>

              <div style={{ width: '1200px', padding: '0px', paddingLeft: '10px' }}>
                <FormControl>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start">

                    <Grid
                      container spacing={3}>
                      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                      <Grid item xs={6} sm={6}>
                        <Button type="submit" style={{ float: 'left', margin: '20px' }} color="primary" variant="contained"
                          disabled={!this.lengthSelected}
                          title="Erstellen Sie eine CSV-Datei mit den Nächsten anstehenden Aufträgen bequem per Knopfdruck">
                          CSV-Datei erstellen</Button>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <a href={this.state.url} target="_blank" rel="noopener noreferrer" download>
                          <Button style={{ float: 'left', margin: '20px', height: '65px' }} alt="Download CSV-Datei" color="primary" variant="contained" title="Nachdem Sie die CSV-Datei mit den nächsten Aufträgen erstellt haben können Sie sie hier herunterladen und abspeichern"
                            disabled={!this.state.url}>
                            <i className="fa fa-download" icon="download" />  </Button>
                        </a>

                      </Grid>
                    </Grid >
                  </Grid>

                </FormControl>

                <div>
                  <h3>Hier finden Sie eine Schritt für Schritt Anleitung, wie Sie eine CSV Datei mit den anstehenden Aufträgen auswählen, sortieren und abspeichern können:</h3>
                  <ol role="listitem" class="item">
                    <li value="-" role="listitem" class="">In der Auflistung unterhalb finden Sie alle offenen Aufträge, welche noch nicht eingeplant sind. Wählen Sie zuerst die Aufträge aus, welche Sie als nächstes einplanen möchten, indem Sie auf die jeweilige Zeile anwählen mit diesem Icon: <Icon>checkbox</Icon> </li>
                    <li value="-" role="listitem" class="">Klicken Sie anschließend oberhalb dieses Texts auf 'CSV-Datei erstellen'. Dabei werden für die ausgewählten Aufträge alle relevanten Informationen aus der Datenbank zusammengefasst und als CSV-Datei exportiert.</li>
                    <li value="-" role="listitem" class="">Wenn das geklappt hat drücken Sie bitte auf die nun aktivierte Schaltfläche mit dem Download-Zeichen, um die Datei herunterzuladen und abzuspeichern.</li>
                  </ol>
                  <h3>Bestätigung: {content = this.state.status}</h3>
                </div>
              </div>

            </div>
          </form>

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
                  {
                    title: "Auswahl für CSV",
                    render: rowData => { /** https://stackoverflow.com/questions/55639508/how-to-set-custom-onchange-onclick-functions-for-material-table-select-checkboxe */
                      return (
                        <input
                          className="toggle_checkbox toggle"
                          type="checkbox"
                          onChange={this.toggle.bind(this, rowData.prodOrderNum)}
                          checked={this.state.selected.includes(rowData.prodOrderNum)}
                        />
                      );
                    },
                    cellStyle: {
                      width: 20,
                      maxWidth: 20,
                      padding: 20
                    },
                    headerStyle: {
                      width: 20,
                      maxWidth: 20,
                      padding: 20
                    }
                  },
                  { title: "Production Order Nr", field: "prodOrderNum" },
                  { title: "Order Nr", field: "orderNumber" },
                  { title: "Line Item", field: "lineItem" },
                  { title: "Artikel Nr", field: "articleNumber" },
                  { title: "End Date", field: "endDate" },
                  { title: "HEX color", field: "colorHEX" },
                  { title: "Prod Status", field: "prodStatus" },
                  { title: "Anzahl", field: "quantity" },
                  { title: "Delta E", field: "deltaE" },
                ]}

                data={this.state.prodStatus}
                options={{
                  headerStyle: {
                    backgroundColor: "#3f51b5",
                    color: "#FFFF",
                  },
                }}

                actions={[
                  {
                    icon: "done_all",
                    tooltip: "Refresh",
                    isFreeAction: true,
                    onClick: (e) =>
                      this.submitHandlerGetStatus(e),
                  },

                ]}
              />
            </div>
          </div>


          <hr style={{
            color: "#3f51b5",
            backgroundColor: "#3f51b5",
            height: 2,
            borderColor: "#3f51b5"
          }} />

          <div style={{ padding: '20px' }} >
            <h2>Große Aufträge aufsplitten</h2>

            (In Arbeit) Hier können Sie in Zukunft manuell große Aufträge aufteilen und so einplanen, dass die Produktion bestmöglich ausgelastet ist.
          </div>

        </div>
        <FooterPage />
      </>
    );
  }
}

export default OrderManagement; 