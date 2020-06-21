import React, { Component } from "react";
import axios from "axios";
import AppBarSales from "../components/AppBarSales";
import FooterPage from '../components/Footer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class KPIBoard extends Component {
  /*  constructor(props) {
     super(props);
 
     this.state = {
       error: null,
       isLoaded: false,
       items: [],
       stateID: '',
       trigger: '',
     };
   } 
 
   submitHandler = e => {
     console.log(this.state.trigger)
     axios
       .get(
         "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getstatusid?statusID=" +
           this.state.trigger
       )
       .then(
         (result) => {
           this.setState({
             isLoaded: true,
             items: result.data,
           });
           console.log(result)
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
     console.log(this.state.trigger);
   };
   
 
   changeHandler = e => {
     this.setState({ [e.target.name]: e.target.value })
   };
 
   */




  render() {
    /* const { error, trigger } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else { */



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

              <Card
                style={{ margin: "20px", width: "350px" }}>
                <CardContent>
                  <span style={{ fontSize: 100, paddingLeft: 100 }} class="material-icons MuiIcon-root" aria-hidden="true">business_center</span>
                  <Typography gutterBottom variant="h3" component="h3">
                    44
          </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    Anzahl Businesskunden (B2B)
          </Typography>
                </CardContent>
              </Card>

              <Card
                style={{ margin: "20px", width: "350px" }}>
                <CardContent>
                  <span style={{ fontSize: 100, paddingLeft: 100 }} class="material-icons MuiIcon-root" aria-hidden="true">group</span>
                  <Typography gutterBottom variant="h3" component="h3">
                    67
                 </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    Anzahl Endkunden (B2C)
          </Typography>
                </CardContent>
              </Card>

              <Card
                style={{ margin: "20px", width: "350px" }}>
                <CardContent>
                  <span style={{ fontSize: 100, paddingLeft: 100 }} class="material-icons MuiIcon-root" aria-hidden="true">shopping_cart</span>
                  <Typography gutterBottom variant="h3" component="h3">
                    124
          </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    Anzahl Bestellugen (insgesamt)
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


                <Card
                  style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography  gutterBottom variant="h3" component="h3">
                      124
          </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Bestellugen im Status 1: {<br></br>} "Bestellung eingegangen"
          </Typography>
                  </CardContent>
                </Card>

                <Card
                  style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      12
          </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Bestellugen im Status 2: {<br></br>} "In Produktion"
          </Typography>
                  </CardContent>
                </Card>

                <Card
                  style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography  gutterBottom variant="h3" component="h3">
                      34
          </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Bestellugen im Status 3: {<br></br>} "Produktion abgeschlossen"
          </Typography>
                  </CardContent>
                </Card>

                <Card
                  style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography  gutterBottom variant="h3" component="h3">
                      12
          </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Bestellugen im Status 4: {<br></br>} "Bestellung versandbereit"
          </Typography>
                  </CardContent>
                </Card>
             
                <Card
                  style={{ margin: "20px", width: "350px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      8
          </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Bestellugen im Status 5: {<br></br>} "Bestellung ausgebucht" {<br></br>}
                    </Typography>
                  </CardContent>
                </Card>

                <Card
                  style={{ margin: "20px", width: "450px" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h3" component="h3">
                      10
          </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Bestellugen im Status 6: {<br></br>} "Bestellung geprüft & versandbereit"
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
