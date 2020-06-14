import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import QRCode from "qrcode.react";
import AppBarSales from "./components/AppBarSales";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Radio } from "@material-ui/core";

class Sending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderNr: "",
      id: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ id: true });
  };

  render() {
    const { orderNr, id } = this.state;
    const downloadQR = () => {};
    return (
      <>
        <div>
          <form onSubmit={this.submitHandler}>
            <div>
              <AppBarSales />
            </div>

            <div style={{ padding: "20px" }}>
              <h2>Versandlabel drucken</h2>
            </div>
            <div style={{ width: "800px", padding: "20px" }}>
              <FormControl>
                <TextField
                  label="Ordernummer"
                  type="text"
                  name="orderNr"
                  value={orderNr}
                  onChange={this.changeHandler}
                />

                <Button
                  type="submit"
                  style={{ margin: "20px" }}
                  color="primary"
                  variant="contained"
                >
                  Submit
                </Button>

                <div>
                  <QRCode
                    value={id}
                    size={290}
                    level={"H"}
                    includeMargin={true}
                  />

                  <Button
                    style={{ margin: "20px" }}
                    color="primary"
                    variant="contained"
                  >
                    Print
                  </Button>
                </div>
                <div>
                  <h3>Bestätigung:</h3>
                </div>
              </FormControl>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Sending;
