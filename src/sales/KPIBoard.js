import React, { Component } from "react";
import axios from "axios";
import AppBarSales from "../components/AppBarSales";
import FooterPage from "../components/Footer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


class KPIBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
    this.submitHandler();
  }

  submitHandler = (e) => {
    axios
      .get(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getkpidata"
      )
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            items: response.data.body,
          });
          console.log(response.data.body);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  render() {
    const {items} = this.state;
    let content = "";
    return (
      <>
        <div>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          <AppBarSales />

          <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
            <h2>KPI Board</h2>
          </div>
          <div style={{ maxWidth: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "20px",
              }}
            >
              <Card style={{ margin: "20px", width: "350px" }}>
                <CardContent>
                  <span
                    style={{ fontSize: 100, paddingLeft: 100 }}
                    class="material-icons MuiIcon-root"
                    aria-hidden="true"
                  >
                    business_center
                  </span>
                  <Typography gutterBottom variant="h3" component="h3">
                    {(content = this.state.items.allBusinessCustomers)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Anzahl Businesskunden (B2B)
                  </Typography>
                </CardContent>
              </Card>

              <Card style={{ margin: "20px", width: "350px" }}>
                <CardContent>
                  <span
                    style={{ fontSize: 100, paddingLeft: 100 }}
                    class="material-icons MuiIcon-root"
                    aria-hidden="true"
                  >
                    group
                  </span>
                  <Typography gutterBottom variant="h3" component="h3">
                    {(content = this.state.items.allOrdinaryCustomers)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Anzahl Endkunden (B2C)
                  </Typography>
                </CardContent>
              </Card>

              <Card style={{ margin: "20px", width: "350px" }}>
                <CardContent>
                  <span
                    style={{ fontSize: 100, paddingLeft: 100 }}
                    class="material-icons MuiIcon-root"
                    aria-hidden="true"
                  >
                    shopping_cart
                  </span>
                  <Typography gutterBottom variant="h3" component="h3">
                    {(content = this.state.items.allOrders)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="p"
                  >
                    Anzahl Bestellungen (insgesamt)
                  </Typography>
                </CardContent>
              </Card>
            </div>

            <div style={{ maxWidth: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px",
                }}
              >
                <Card style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      {(content = this.state.items.allOrdersinstatusId1)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      Bestellugen im Status 1: {<br></br>} "Bestellung
                      eingegangen"
                    </Typography>
                  </CardContent>
                </Card>

                <Card style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      {(content = this.state.items.allOrdersinstatusId2)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      Bestellugen im Status 2: {<br></br>} "In Produktion"
                    </Typography>
                  </CardContent>
                </Card>

                <Card style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      {(content = this.state.items.allOrdersinstatusId3)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      Bestellugen im Status 3: {<br></br>} "Produktion
                      abgeschlossen"
                    </Typography>
                  </CardContent>
                </Card>

                <Card style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      {(content = this.state.items.allOrdersinstatusId4)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      Bestellugen im Status 4: {<br></br>} "Bestellung
                      versandbereit"
                    </Typography>
                  </CardContent>
                </Card>

                <Card style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      {(content = this.state.items.allOrdersinstatusId5)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      Bestellugen im Status 5: {<br></br>} "Bestellung
                      ausgebucht" {<br></br>}
                    </Typography>
                  </CardContent>
                </Card>

                <Card style={{ margin: "20px", width: "450px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      {(content = this.state.items.allOrdersinstatusId6)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      Bestellugen im Status 6: {<br></br>} "Bestellung geprüft &
                      versandbereit"
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <FooterPage />
      </>
    );
  }
}

//}

export default KPIBoard;
