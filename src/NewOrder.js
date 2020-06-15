import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBarSales from "./components/AppBarSales";
import { FormControl } from "@material-ui/core";
import { Grid } from "@material-ui/core";

class NewOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerID: "",
      toStock: false,
      lineItem: "1",
      articleNr: "",
      colorCode: "",
      quantity: "",
      motivNr: "",
      lineItem2: "",  
      articleNr2: "",
      colorCode2: "",
      quantity2: "",
      motivNr2: ""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({toStock: true})
  };

  submitHandler = e => {
    const data = {
      customerID: this.state.customerID,
      lineItem: this.state.lineItem,
      articleNr: this.state.articleNr,
      colorCode: this.state.colorCode,
      quantity: this.state.quantity,
      motivNr: this.state.motivNr,
      toStock: this.state.toStock
    }
    const data2 = {
      customerID: this.state.customerID,
      lineItem: this.state.lineItem2,
      articleNr: this.state.articleNr2,
      colorCode: this.state.colorCode2,
      quantity: this.state.quantity2,
      motivNr: this.state.motivNr2,
      toStock: this.state.toStock
    }

    e.preventDefault();
    console.log([{data},{data2}]);
    axios
      .post(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addorder",
        [{data},{data2}]
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      customerID,
      lineItem,
      lineItem2,
      articleNr,
      articleNr2,
      colorCode,
      colorCode2,
      quantity,
      quantity2,
      motivNr,
      motivNr2,
      toStock,
    } = this.state;
    let content = "";
    return (
      <>
        <div>
          <form onSubmit={this.submitHandler}>
            <div>
              <AppBarSales />
            </div>

            <div style={{ paddingLeft: "20px",paddingTop: "10px" }}>
              <h2>Neue Bestellung anlegen</h2>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", margin: "20px" }}
            >
              <form noValidate autoComplete="off">
                <TextField
                  label="Kundennummer"
                  type="text"
                  name="customerID"
                  value={customerID}
                  onChange={this.changeHandler}
                  id="outlined-basic"
                  variant="outlined"
                />
              </form>
            </div>
            <div style={{ paddingLeft: "20px",paddingTop: "10px" }} onChange={this.changeHandler}>
              {" "}
              Auf Lager:
              <input type="radio" value={toStock} name="toStock" /> Ja
              <input type="radio" name="toStock" /> Nein
            </div>

            <div style={{ maxWidth: "100%", padding: "20px" }}>
              <FormControl>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid container spacing={1}>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Position"
                        type="number"
                        name="lineItem"
                        value={lineItem}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Artikelnummer"
                        type="text"
                        name="articleNr"
                        value={articleNr}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Farbcode"
                        type="text"
                        name="colorCode"
                        value={colorCode}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Menge"
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Motivnummer"
                        type="text"
                        name="motivNr"
                        value={motivNr}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}></Grid>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Position"
                        type="number"
                        name="lineItem2"
                        value={lineItem2}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Artikelnummer"
                        type="text"
                        name="articleNr2"
                        value={articleNr2}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Farbcode"
                        type="text"
                        name="colorCode2"
                        value={colorCode2}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Menge"
                        type="number"
                        name="quantity2"
                        value={quantity2}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                      <TextField
                        label="Motivnummer"
                        type="text"
                        name="motivNr2"
                        value={motivNr2}
                        onChange={this.changeHandler}
                      />
                    </Grid>

                    <Grid item xs={2} sm={2}></Grid>
                  </Grid> 
                  <Grid item xs={2} sm={2} style= {{paddingTop: "20px"}}>
                    <Button type="submit" color="primary" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                <div>
                  <h3>Bestätigung: {(content = this.state.data)}</h3>
                </div>
              </FormControl>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default NewOrder;
