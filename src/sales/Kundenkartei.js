import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AppBarSales from "../components/AppBarSales";
import FooterPage from '../components/Footer';

class AllCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      stateID: '',
    };
    this.submitHandler()
  }

  submitHandler = e => {
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
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
  };
  

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  render() {
    const { error } = this.state;
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
                      { title: "Kundennummer", field: "customerID" },
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
                        tooltip: "Aktualisieren",
                        isFreeAction: true,
                        onClick: (e) =>
                        this.submitHandler(e),
                      },
                    ]}
                    options={{
                      exportButton: true,
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