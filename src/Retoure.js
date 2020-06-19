import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AppBarSales from "./components/AppBarSales";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FooterPage from './components/Footer';

class Retoure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      stateID: '',
      trigger: '',
    };
  }

  submitHandler = e => {
    console.log(this.state.trigger)
    axios
      .get(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getstatusid?statusID=" +
          this.state.trigger
      )
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
          });
          console.log(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
    e.preventDefault();
    console.log(this.state.trigger);
  };
  

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  render() {
    const { error, isLoaded, items, stateID, trigger } = this.state;
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
                <h2>Retoure anlegen</h2>
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
                      label="Kundennummer*"
                      type="number"
                      name="trigger"
                      value={trigger}
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
                      disabled={!this.state.trigger}
                    >
                      Bestellungen anzeigen
                    </Button>
                  </div>
                </div>

                <div style={{ paddingTop: "25px" }}>
                  <MaterialTable
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                    title="Bestellungen des Kunden"
                    columns={[
                      { title: "ProductionOrderNr", field: "prodOrderNr" },
                      { title: "OrderNr", field: "orderNr" },
                      { title: "StatusID", field: "statusID" },
                      {
                        title: "StatusDescription",
                        field: "Statusdescription",
                      },
                    ]}
                    data={this.state.items}
                    actions={[
                      {
                        icon: "refresh",
                        tooltip: "Refresh",
                        isFreeAction: true,
                        onClick: (e) =>
                        this.submitHandler(e),
                      },
                      {
                        icon: "sync",
                        tooltip: "Retoure",
                        onClick: (event, rowData) => console.log(rowData)
                      },
                      {
                        icon: "build",
                        tooltip: "Neuproduktion",
                        onClick: (event, rowData) => console.log(rowData)
                      }
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

export default Retoure;
