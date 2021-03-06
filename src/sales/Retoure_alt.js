import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBarSales from "../components/AppBarSales";
import { FormControl } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import FooterPage from "../components/Footer";

class Retoure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prodOrderNr: "", //Nummer
      customerID: "", //ID des Kunden
      lack: "", //String mit Beschreibung
      newProd: "", //boolean
      data: null,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === "false") {
      this.setState({ newProd: false });
      return this.newProd;
    } else if (e.target.value === "true") {
      this.setState({ newProd: true });
      return this.newProd;
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addretour",
        this.state
      )
      .then((res) => {
        console.log(res.data);
        var data = JSON.stringify(res.data);
        data = JSON.parse(data);
        data = data.answer;
        console.log(data);
        return data;
      })
      .then((response) => {
        console.log(response)
        return response;
      })
      .then((response) => this.setState({ response }))
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { prodOrderNr, customerID, lack, newProd } = this.state;
    let content = "";
    return (
      <>
        <div>
          <form onSubmit={this.submitHandler}>
            <div>
              <AppBarSales />
            </div>

            <div style={{ padding: "20px" }}>
              <h2>Retoure anlegen</h2>
            </div>

            <div style={{ width: "800px", padding: "20px" }}>
              <FormControl>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Produktionsordernummer*"
                        type="text"
                        name="prodOrderNr"
                        value={prodOrderNr}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Kundennummer*"
                        type="text"
                        name="customerID"
                        value={customerID}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Mangel*"
                        type="text"
                        name="lack"
                        value={lack}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <div onChange={this.changeHandler}>
                        {" "}
                        Neue Produktion <br />
                        <input
                          type="radio"
                          value={true}
                          name="newProd"
                        /> Ja <br />
                        <input
                          type="radio"
                          value={false}
                          name="newProd"
                        /> Nein <br />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Button
                      type="submit"
                      style={{ float: "left", margin: "20px" }}
                      color="primary"
                      variant="contained"
                      disabled={
                        (!this.state.prodOrderNr,
                        !this.state.customerID,
                        !this.state.lack)
                      }
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                <div>
                  <h3>Bestätigung: {(content = this.state.response)}</h3>
                </div>
              </FormControl>
            </div>
          </form>
        </div>
        <FooterPage />
      </>
    );
  }
}

export default Retoure;
