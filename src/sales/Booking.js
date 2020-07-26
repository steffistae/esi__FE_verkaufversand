import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AppBarSales from "../components/AppBarSales";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FooterPage from "../components/Footer";

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      material: [],
      error: null,
      isLoaded: false,
      orderNr: "",
      prodOrderNr: "",
      fkmaterials: "",
      quantity: "",
      customerID: "",
      data: null,
      answer: null,
    };
    this.submitHandler();
    this.tabletoStock();
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    axios
      .get(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/precheck"
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
      );
  };

  tabletoStock = (e) => {
    axios
      .get(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getkpidata"
      )
      .then((response) => {
        this.setState({
          material: response.data.body.allAtricleNrs,
        });
        console.log(response);
      });
  };

  bookingMaWi() {
    const data = [
      {
        fkmaterials: parseInt(this.state.fkmaterials),
        quantity: parseInt(this.state.quantity),
        customerID: parseInt(this.state.customerID),
      },
    ];

    console.log({ data });
    axios
      .post(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/postbooking",
        { data }
      ) 
      .then((res) => {
        console.log(res.data);
        var data = JSON.stringify(res.data);
        data = JSON.parse(data);
        data = data.ans;
        console.log(data);
        return data;
      })
      .then(data => {
        this.setState({ answer: data })
      })
  }

  bookingOrder(rowData) {
    console.log(rowData);
    axios
      .post(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/postbooking",
        rowData
      )
      .then((res) => {
        console.log(res.data);
        var data = JSON.stringify(res.data);
        data = JSON.parse(data);
        data = data.ans;
        console.log(data);
        return data;
      })
      .then(data => {
        this.setState({ answer: data })
      })
    this.submitHandler();
  }

  checkingOrder(rowData) {
    rowData.checked = true;
    console.log(rowData);
    axios
      .post(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/precheck",
        rowData
      ) //hier wird geprüft auf true gesetzt
      .then((res) => {
        console.log(res);
      });
    this.submitHandler();
  }

  render() {
    const { fkmaterials, quantity, customerID } = this.state;
    let content = "";
    return (
      <>
        <div>
          <form onSubmit={this.submitHandler}>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />

            <AppBarSales />

            <div
              style={{
                paddingTop: "20px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <h2>Auslagern und Prüfen</h2>
            </div>
            <div style={{ maxWidth: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0px",
                }}
              ></div>

              <div style={{ paddingTop: "0px" }}>
                <MaterialTable
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                  title="Versandbereite Aufträge"
                  columns={[
                    { title: "Bestellnummer", field: "orderNr" },
                    { title: "Status", field: "statusID", lookup: {4: "Bestellung versandbereit", 5: "Bestellung ausgebucht"} },
                    {
                      title: "Geprüft",
                      field: "tested",
                      lookup: { false: "nein", 0: "nein", null: "nein", true: "ja", 1: "ja" },
                    },
                  ]}
                  data={this.state.items}
                  actions={[
                    {
                      icon: "refresh",
                      tooltip: "Aktualisieren",
                      isFreeAction: true,
                      onClick: (e) => this.submitHandler(e),
                    },
                    rowData => ({
                      icon: "send",
                      tooltip: "Auslagern",
                      disabled: rowData.statusID == "5" || rowData.statusID == "6",
                      onClick: (event, rowData) => this.bookingOrder(rowData),
                    }),
                    rowData => ({
                     icon: "done_all",
                      tooltip: "Prüfen",
                      disabled: rowData.statusID == "4" || rowData.statusID == "6",
                      onClick: (event, rowData) => this.checkingOrder(rowData), 
                    })
                    
                  ]}
                  options={{
                    headerStyle: {
                      backgroundColor: "#3f51b5",
                      color: "#FFFF",
                    },
                  }}
                />
                <div
                  style={{
                    paddingTop: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <h2>ToStock-Ware ausbuchen</h2>
                  <div style={{ maxWidth: "100%" }}>
                    <form>
                      <MaterialTable
                        style={{ maxWidth: "100%" }}
                        title="toStock-Ware"
                        columns={[
                          { title: "Artikelnummer", field: "articleNr" },
                          { title: "Menge", field: "quantity" },
                          { title: "Materialnummer", field: "materialNr" },
                          {
                            title: "Farbcode",
                            field: "colorCode",
                            cellStyle: (input, rowData) => {
                              return {
                                backgroundColor: rowData?.colorCode || input,
                              };
                            },
                          },
                          { title: "Motivnummer", field: "motivNr" },
                        ]}
                        data={this.state.material}
                        actions={[
                          {
                            icon: "refresh",
                            tooltip: "Aktualisieren",
                            isFreeAction: true,
                            onClick: (e) => this.tabletoStock(e),
                          },
                        ]}
                        options={{
                          headerStyle: {
                            backgroundColor: "#3f51b5",
                            color: "#FFFF",
                          },
                        }}
                      />

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "5px",
                        }}
                      >
                        <TextField
                          name="fkmaterials"
                          value={fkmaterials}
                          style={{ float: "left", paddingLeft: "0px" }}
                          id="outlined-basic"
                          label="Artikelnummer*"
                          onChange={this.changeHandler}
                        />
                        <TextField
                          name="quantity"
                          label="Menge*"
                          value={quantity}
                          style={{ paddingLeft: "5px" }}
                          id="outlined-basic"
                          onChange={this.changeHandler}
                        />
                        <TextField
                          name="customerID"
                          label="Kundennummer*"
                          value={customerID}
                          style={{ paddingLeft: "5px" }}
                          id="outlined-basic"
                          onChange={this.changeHandler}
                        />

                        <Button
                          onClick={() => this.bookingMaWi()}
                          style={{ margin: "20px" }}
                          color="primary"
                          variant="contained"
                          title="Mit Klick auf diesen Button
                          wird die Materialwirtschaft mit der
                          Auslagerung des Artikels beauftragt"
                          disabled={
                            (!this.state.fkmaterials,
                            !this.state.quantity,
                            !this.state.customerID)
                          }
                        >
                          Auslagerung anfordern
                        </Button>
                      </div>
                      <div>
                        <h3>Bestätigung: {(content = this.state.answer)}</h3>
                      </div>
                    </form>
                  </div>
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

export default Booking;
