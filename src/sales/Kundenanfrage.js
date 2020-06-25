import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AppBarSales from "../components/AppBarSales";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FooterPage from '../components/Footer';

class Kundenanfrage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      stateID: '',
      orderNr: '',
    };
  }

  submitHandler = e => {
    console.log(this.state.orderNr)
    axios
      .get(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getstatusvo?orderNr=" +
          this.state.orderNr
      )
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
    e.preventDefault();
  };
  

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  render() {
    const { error, orderNr } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <>
          <div>
            <form onSubmit={this.submitHandler}>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
              />

              <AppBarSales />

              <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
                <h2>Kundenanfrage prüfen</h2>
              </div>

              <div style={{ maxWidth: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "20px",
                  }}
                >
                  <form noValidate autoComplete="off">
                    <TextField
                      label="Ordernummer*"
                      type="text"
                      name="orderNr"
                      value={orderNr}
                      onChange={this.changeHandler}
                      id="outlined-basic"
                     
                    />
                  </form>

                  <div>
                    <Button
                      type="submit"
                      style={{ float: "left", margin: "20px" }}
                      variant="contained"
                      color="primary"
                      disabled={!this.state.orderNr}
                    >
                      Prüfen
                    </Button>
                  </div>
                </div>

                <div style={{ paddingTop: "25px" }}>
                  <MaterialTable
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                    title="Status der Bestellung"
                    columns={[
                      { title: "ProductionOrderNr", field: "prodOrderNr" },
                      { title: "StatusID", field: "statusID" },
                      {
                        title: "StatusDescription",
                        field: "Statusdescription",
                      },
                      { title: "Farbcode", field: "colorCode",
                      cellStyle: (input, rowData) => {
                        return {
                          backgroundColor: rowData?.colorCode || input,
                        };
                      },
                    },
                      { title: "Anzahl", field: "quantity"},
                      { title: "Motiv", field: "motivNr"},
                    ]}
                    data={this.state.items}
                    actions={[
                      {
                        icon: "refresh",
                        tooltip: "Aktualisieren",
                        isFreeAction: true,
                        onClick: (e) =>
                        this.submitHandler(e)
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
          <FooterPage/>
        </>
      );
    }
  }
}

export default Kundenanfrage;
