import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBarSales from "../components/AppBarSales";
import FooterPage from "../components/Footer";
import MaterialTable from "material-table";

class Retoure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      answer: null,
      data: null,
      isLoaded: false,
      items: [],
      stateID: "",
      trigger: "",
    };
  }

  lookUp() {
    axios
      .get(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getorders?orderNr=" +
          this.state.trigger
      )
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            items: response.data.orderDetails,
          });
          console.log(response);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
  };

  createRetoure(rowData) {
    //ohne Neuproduktion
    var body = rowData;
    console.log(body);
    let i;
    for (i in body)
    {
        body[i].newProd=false;
    }
    body = JSON.stringify({ body });
    console.log(body)
    axios
      .post(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addretour",
        body
      )
      .then((res) => {
        console.log(res.data);
        var data = JSON.stringify(res.data);
        data = JSON.parse(data);
        data = data.answer;
        console.log(data);
        return data;
      })
      .then(data => {
        this.setState({ answer: data })
      })
    this.lookUp();
  }

  createNewOrder(rowData) {
    //mit Neuproduktion
    var body = rowData;
    console.log(body);
    let i;
    for (i in body)
    {
        body[i].newProd=true;
    }
    body = JSON.stringify({ body });
    console.log(body)
    axios
      .post(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addretour",
        body
      )
      .then((res) => {
        console.log(res.data);
        var data = JSON.stringify(res.data);
        data = JSON.parse(data);
        data = data.answer;
        console.log(data);
        return data;
      })
      .then(data => {
        this.setState({ answer: data })
      })
    this.lookUp();
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { error, trigger } = this.state;
    let content = "";
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
                      label="Bestellnummer*"
                      type="text"
                      name="trigger"
                      value={trigger}
                      onChange={this.changeHandler}
                      id="outlined-basic"
                    />
                  </form>

                  <div>
                    <Button
                      onClick={() => this.lookUp()}
                      style={{ float: "left", margin: "20px" }}
                      variant="contained"
                      color="primary"
                      disabled={!this.state.trigger}
                    >
                      Bestellpositionen anzeigen
                    </Button>
                  </div>
                </div>

                <div style={{ paddingTop: "25px" }}>
                  <MaterialTable
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                    title="Bestellpositionen"
                    columns={[
                      { title: "Position", field: "lineItem" },
                      { title: "Produktionsaufragsnummer", field: "prodOrderNr" },
                      { title: "Artikelnummer", field: "articleNr" },
                      { title: "Farbcode", field: "colorCode",
                      cellStyle: (input, rowData) => {
                        return {
                          backgroundColor: rowData?.colorCode || input,
                        };
                      },
                    },
                      { title: "Menge", field: "quantity" },
                      {
                        title: "Preis (€)",
                        field: "price",
                        //hier noch lookup für price=null --> "kein Preis vorhanden"
                      },
                    ]}
                    data={this.state.items}
                    actions={[

                     
                        {
                          icon: "refresh",
                          tooltip: "Aktualisieren",
                          isFreeAction: true,
                          onClick: (e) =>
                          this.lookUp(e),
                        },
                      
                      {
                        icon: "repeat",
                        tooltip: "Retoure",
                        onClick: (event, rowData) =>
                          this.createRetoure(rowData),
                      },
                      {
                        icon: "build",
                        tooltip: "Neuproduktion",
                        onClick: (event, rowData) =>
                          this.createNewOrder(rowData),
                      },
                    ]}
                    options={{
                      selection: true,
                      headerStyle: {
                        backgroundColor: "#3f51b5",
                        color: "#FFFF",
                      },
                    }}
                    editable={{
                    
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div style={{ paddingLeft: "20px" }}>
            <h3>Bestätigung: {(content = this.state.answer)}</h3>
          </div>
          <FooterPage />
        </>
      );
    }
  }
}

export default Retoure;
