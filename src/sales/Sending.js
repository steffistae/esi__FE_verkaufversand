import React, { Component } from "react";
import "../App.css";
import QRCode from "qrcode.react";
import AppBarSales from "../components/AppBarSales";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import FooterPage from '../components/Footer';
import axios from "axios";

class Sending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderNr: "",
      id: "1234567",
      data: null,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ id: true });
  };

  printButton = e => {
    this.setState(
      { data: "Label wurde erfolgreich gedruckt"}
    )
  }

  render() {
    let content = "";
    const { orderNr, id } = this.state;
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
            <div style={{ width: "800px", paddingLeft: "20px" }}
            >
              <FormControl>
                <TextField
                  label="Bestellnummer"
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
                  title="Das Label wird beim zuständigen
                  Versanddienstleister angefordert"
                  disabled={!this.state.orderNr}
                >
                  Label anfordern
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
                    title="Mit Klick auf den Button wird
                    das Label an den Labeldrucker übermittelt
                    und dort automatisch gedruckt"
                    onClick={() => this.printButton()}
                  >
                    Drucken
                  </Button>
                </div>
                <div>
                  <h3>Bestätigung: {(content = this.state.data)}</h3>
                </div>
              </FormControl>
            </div>
          </form>
        </div>
        <FooterPage/>
      </>
    );
  }
}

export default Sending;
