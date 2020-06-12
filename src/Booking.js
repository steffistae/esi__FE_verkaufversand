import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AppBarSales from "./components/AppBarSales";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Booking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      error: null,
      isLoaded: false,
      orderNr: "",
      prodOrderNr: "",
      fkmaterials: "",
      quantity: "",
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: parseInt(e.target.value) });
  };

  submitHandler = (e) => {
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
  };

  bookingMaWi(fkmaterials, quantity, prodOrderNr) {
    const data = {
      fkmaterials: this.state.fkmaterials,
      quantity: this.state.quantity,
      prodOrderNr: "",
    };
    console.log({ data });
    axios
      .post("https://jsonplaceholder.typicode.com/posts", { data })
      .then((result) => {
        console.log({ data });
      });
  }

  bookingOrder(orderNr) {
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
    } = this.state;
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
              <h2>Status prüfen</h2>
              <Button
                onClick={() => this.submitHandler()}
                //type="submit"
                style={{ margin: "10px" }}
                variant="contained"
                color="primary"
              >
                {" "}
                Status aktualisieren
              </Button>{" "}
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
                  title="Status der aktuellen Aufträge"
                  columns={[
                    { title: "ProductionOrderNr", field: "prodOrderNr" },
                    { title: "OrderNr", field: "orderNr" },
                    { title: "StatusID", field: "statusID" },
                  ]}
                  data={this.state.items}
                  actions={[
                    {
                      icon: "refresh",
                      tooltip: "Refresh",
                      isFreeAction: true,
                      onClick: () =>
                        this.tableRef.current &&
                        this.tableRef.current.onQueryChange(),
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
                          label="Ordernummer"
                          type="text"
                          name="orderNr"
                          value={orderNr}
                          onChange={this.changeHandler}
                          style={{ float: "left", margin: "5px" }}
                          id="outlined-basic"
                          label="OrderNr"
                          variant="outlined"
                        />

                        <Button
                          onClick={() => this.submitHandler()}
                          style={{ float: "left", margin: "10px" }}
                          variant="contained"
                          color="primary"
                        >
                          {" "}
                          Prüfen
                        </Button>
                        <Button
                          onClick={() => this.bookingOrder()}
                          style={{ float: "left", margin: "10px" }}
                          variant="contained"
                          color="primary"
                        >
                          {" "}
                          Auslagern
                        </Button>

                        <div style={{ paddingTop: "60px", paddingLeft: "0px" }}>
                          <h2>Auslagerung Stock</h2>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "10px",
                          }}
                        >
                          <TextField
                            name="fkmaterials"
                            value={fkmaterials}
                            style={{ float: "left", paddingLeft: "0px" }}
                            id="outlined-basic"
                            label="Artikelnummer"
                            variant="outlined"
                            onChange={this.changeHandler}
                          />
                          <TextField
                            name="quantity"
                            label="Menge"
                            value={quantity}
                            style={{ paddingLeft: "5px" }}
                            id="outlined-basic"
                            variant="outlined"
                            onChange={this.changeHandler}
                          />

                          <Button
                            onClick={() => this.bookingMaWi()}
                            style={{ margin: "20px" }}
                            color="primary"
                            variant="contained"
                          >
                            Auslagern
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Booking;
