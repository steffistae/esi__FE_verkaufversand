import React, { Component } from "react";
import "./App.css";
import QRCode from "qrcode.react";
import AppBarSales from "./components/AppBarSales";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import FooterPage from './components/Footer';

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

  printButton() {
    this.setState({
      data: "Label wurde gedruckt",
    });
    return this.data
  }

  render() {
    let content = "";
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
            <div style={{ width: "800px", paddingLeft: "20px" }}
            >
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
                    onClick={() => this.printButton()}
                  >
                    Print
                  </Button>
                </div>
                <div>
                  <h3>Bestätigung: {(content = this.data)}</h3>
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
