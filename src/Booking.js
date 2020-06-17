import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AppBarSales from "./components/AppBarSales";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FooterPage from './components/Footer'; 

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      error: null,
      isLoaded: false,
      orderNr: "",
      prodOrderNr: "TEST_J",
      fkmaterials: "",
      quantity: "",
      customerID: "",
      checked: false,
      data: null,
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    var trigger = "4";
    axios
      .get(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getstatusid?statusID=" +
          trigger
      )
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
          });
          console.log(result);
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
      );
    e.preventDefault();
    console.log(trigger);
  };

  bookingMaWi() {
//    const data = {
//      fkmaterials: this.state.fkmaterials,
//      quantity: this.state.quantity,
//      customerID: this.state.customerID,
//      prodOrderNr: "",
//    };

    const data = [{
      "fkmaterials": this.state.fkmaterials,
      "quantity": this.state.quantity
    },{
      "productionOrderNr": this.state.prodOrderNr    }
    ]
  

    console.log({ data });
    axios
      .post(" https://423rw0hwdj.execute-api.eu-central-1.amazonaws.com/Prod/goods/orders", { data })
      .then((res) => {
        console.log(res.data);
        var data = JSON.stringify(res.data);
        data = JSON.parse(data);
        data = data.message;
        console.log(data);
        return data;
      })
      .then((result) => {
        console.log({ data });
      });
  };

  bookingOrder() {
    const data = {
      orderNr: this.state.orderNr,
    };
    console.log({ data });
    axios
      .post("https://jsonplaceholder.typicode.com/posts", { data })
      .then((result) => {
        console.log({ data });
      });
  }

  render() {
    const {
      items,
      error,
      isLoaded,
      orderNr,
      fkmaterials,
      quantity,
      prodOrderNr,
      checked,
      customerID,
    } = this.state;
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

            <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
              <h2>Prüfen und Auslagern</h2>
              
            </div>
            <div style={{ maxWidth: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px",
                }}
              ></div>

              <div style={{ paddingTop: "5px" }}>
                <MaterialTable
                  style={{ marginLeft: "20px", marginRight: "00px" }}
                  title="Versandbereite Aufträge"
                  columns={[
                    { title: "ProductionOrderNr", field: "prodOrderNr" },
                    { title: "OrderNr", field: "orderNr" },
                    { title: "StatusID", field: "statusID" },
                    { title: "Geprüft", field: "checked"},
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
                  ]}
                  options={{
                    headerStyle: {
                      backgroundColor: "#3f51b5",
                      color: "#FFFF",
                    },
                  }}
                />
                <div>
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
                          style={{ float: "left", margin: "5px" }}
                          id="outlined-basic"
                          
                        />

                        <Button
                          onClick={() => this.bookingOrder()}
                          style={{ float: "left", margin: "10px" }}
                          variant="contained"
                          color="primary"
                          disabled={!this.state.orderNr}
                        >
                          {" "}
                          Prüfen
                        </Button>
                        <Button
                          onClick={() => this.bookingOrder()}
                          style={{ float: "left", margin: "10px" }}
                          variant="contained"
                          color="primary"
                          disabled={!this.state.orderNr}
                        >
                          {" "}
                          Auslagern
                        </Button>

                        <div style={{ paddingTop: "100px", paddingLeft: "0px" }}>
                          <h2>Auslagerung Stock</h2>
                        </div>

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
                            label="Artikelnummer"
                           
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
                            disabled={!this.state.fkmaterials, !this.state.quantity, !this.state.customerID}
                          >
                            Auslagern
                          </Button>
                        </div>
                        <div>
                          <h3>Bestätigung: {(content = this.state.data)}</h3>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <FooterPage/>
      </>
    );
  }
}

export default Booking;
