import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBarSales from "../components/AppBarSales";
import { FormControl } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import FooterPage from "../components/Footer";

class NewCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      surName: "",
      street: "",
      PostCode: "",
      city: "",
      country: "",
      phone: "",
      mail: "",
      business: false,
      company: "",
      response: [],
      data: null,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === "false") {
      this.setState({ business: false });
      return this.business;
    } else if (e.target.value === "true") {
      this.setState({ business: true });
      return this.business;
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addcustomer",
        this.state
      )
      .then((res) => {
        console.log(res.data);
        var data = JSON.stringify(res.data);
        data = JSON.parse(data);
        data = data.message;
        console.log(data);
        return data;
      })
      .then((data) => {
        console.log("data: " + data);
        this.setState({ data: data });
      })
      .then((response) => {
        console.log(response);
      })
      .then((response) => this.setState({ response }))
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      firstName,
      surName,
      street,
      PostCode,
      city,
      country,
      phone,
      mail,
      business,
      company,
    } = this.state;
    let content = "";
    return (
      <>
        <div>
          <form onSubmit={this.submitHandler}>
            <div>
              <AppBarSales />
            </div>

            <div style={{ padding: "20px" }}>
              <h2>Neuen Kunden anlegen</h2>
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
                        label="Vorname*"
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Nachname*"
                        type="text"
                        name="surName"
                        value={surName}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Straße*"
                        type="text"
                        name="street"
                        value={street}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="PLZ*"
                        type="number"
                        name="PostCode"
                        value={PostCode}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Stadt*"
                        type="text"
                        name="city"
                        value={city}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Land*"
                        type="text"
                        name="country"
                        value={country}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Telefon*"
                        type="number"
                        name="phone"
                        value={phone}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Mail*"
                        type="text"
                        name="mail"
                        value={mail}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <div onChange={this.changeHandler}>
                        {" "}
                        Geschäftskunde <br />
                        <input
                          type="radio"
                          value={true}
                          name="business"
                          defaultChecked
                        /> Ja <br />
                        <input
                          type="radio"
                          value={false}
                          name="business"
                        />{" "}
                        Nein
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        label="Firma"
                        type="text"
                        name="company"
                        value={company}
                        onChange={this.changeHandler}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={
                        (!this.state.firstName,
                        !this.state.surName,
                        !this.state.street,
                        !this.state.PostCode,
                        !this.state.city,
                        !this.state.country,
                        !this.state.phone,
                        !this.state.mail)
                      }
                    >
                      Kunden speichern
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
        <FooterPage />
      </>
    );
  }
}

export default NewCustomer;
