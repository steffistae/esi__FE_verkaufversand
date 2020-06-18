import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AppBarSales from "./components/AppBarSales";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FooterPage from './components/Footer';

class AllCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      stateID: '',
    };
  }

  submitHandler = e => {
    console.log(this.state)
    axios
      .get(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getallcustomers"
      )
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            items: response.data.body,
          });
          console.log(response.data.body)
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
      )
    e.preventDefault();
  };
  

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  render() {
    const { error, isLoaded, items, stateID, trigger } = this.state;
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
                <h2>Kundenkartei YourShirt</h2>
              </div>

              <div style={{ maxWidth: "100%" }}>


                <div style={{ paddingTop: "25px" }}>
                  <MaterialTable
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                    title="Daten aller Kunden"
                    columns={[
                      { title: "CustomerID", field: "customerID" },
                      { title: "Vorname", field: "firstName" },
                      { title: "Nachname", field: "surName" },
                      { title: "Firma", field: "company"},
                      { title: "Straße", field: "street" },
                      { title: "PLZ", field: "PostCode" },
                      { title: "Stadt", field: "city" },
                      { title: "Telefon", field: "phone" },
                      { title: "E-Mail", field: "mail" },
                      { title: "Kundentyp", field: "business", lookup: {0: 'Privatkunde', 1: 'Geschäftskunde'} },
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
                </div>
              </div>
            </form>
          </div>
          <FooterPage/>
        </>
      );
    }
  }
}

export default AllCustomer;