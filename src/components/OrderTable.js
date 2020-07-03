import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FooterPage from "../components/Footer";
import axios from "axios";
import shadows from "@material-ui/core/styles/shadows";
const { dropdown } = require('./dropdown.js') 


console.log(dropdown)



var best = null;
function Editable() {
  const { useState } = React;
  const [count, incrementCount] = useState(1);
  const [customerId, setCustomerId] = useState("");
  const [tostock, settoStock] = useState();
  const [columns, setColumns] = useState([
    {
      title: "Materialnummer",
      field: "materialNr",
      initialEditValue: "10000001",
      tooltip: "8-stellige Nummer: 10000001",
      lookup: dropdown,   
    },
    {
      title: "Farbcode",
      field: "colorCode",
      tooltip: "HEX-Code: #282C34",
      cellStyle: (input, rowData) => {
        return {
          backgroundColor: rowData?.colorCode || input,
        };
      },
    },
    {
      title: "Motivnummer",
      field: "motivNr",
      tooltip: "4-stellige Nummer: 3489",
      initialEditValue: "1111",
      
      lookup: { 1111: '1111 - kein Motiv', 1112: '1112 - HS OG Logo', 1212: '1212 - YourShirt Logo', 1222: '1222 - Tierarzt Logo', 1222: '1235 - Autohaus Geiger Logo', 1335: '1335 - MAJA Fabrik Logo' , 1360: '1360 - Mercedes Stern', 1378: '1378 - Arztpraxis Schneider Logo'   },   
    },
    { title: "Anzahl", field: "quantity", type: "numeric" },
  ]);

  const [data, setData] = useState([]);

  function createOrder() {
    console.log(
      data.map((element) => {
        return {
          customerID: parseInt(customerId),
          lineItem: parseInt(element.tableData.id + 1 + ""),
          materialNr: parseInt(element.materialNr),
          colorCode: element.colorCode,
          quantity: parseInt(element.quantity),
          motivNr: parseInt(element.motivNr),
          toStock: parseInt(tostock),
          hexBackground: element.colorCode,
        };
      })
    );
    const createOrder = data.map((element) => {
      return {
        customerID: parseInt(customerId),
        lineItem: parseInt(element.tableData.id + 1 + ""),
        materialNr: parseInt(element.materialNr),
        colorCode: element.colorCode,
        quantity: parseInt(element.quantity),
        motivNr: parseInt(element.motivNr),
        toStock: parseInt(tostock),
      };
    });

    var body = createOrder;
    console.log(body);
    body = JSON.stringify({ body });
    axios
      .post(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addorder",
        body
      )
      .then(console.log(body))
      .then((response) => {
        console.log(response.data);
        var answer = JSON.stringify(response.data);
        answer = JSON.parse(answer);
        answer = answer.body.message[0];
        console.log(answer);
        best = answer;
        console.log(best);
        return best;
      })
      .catch((error) => {
        console.log(error);
      })
  }
  let content = "";
  return (
    <>
      <div style={{ maxWidth: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: "10px",
            margin: "20px",
          }}
        >
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Kundennummer"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              title="Die Angabe einer Kundennummer ist nur für Bestellungen notwendig, die nicht auf Lager produziert werden."
            />
          </form>{" "}
          <br />
          <div
            style={{ paddingLeft: "20px", float: "left" }}
            onChange={(e) => settoStock(e.target.value)}
          >
            Produktion auf Lager? <br />
            <input
              type="radio"
              value={1}
              name="tostock"
            /> Ja <br />
            <input type="radio" value={0} name="tostock" /> Nein <br />
       
          </div>
        </div>

      

        <MaterialTable
          style={{ marginTop: "40px", marginLeft: "20px", marginRight: "20px", '&&:hover': { color: 'red', boxShadow: 'none', webkitBoxShadow: 'none', mozBoxShadow: 'none', backgroundColor: 'transparent' } }}
          title="Bestellung anlegen"
          columns={columns}
          data={data}
          options={{
            headerStyle: {
              backgroundColor: "#3f51b5",
              color: "#FFFF",
            },
          }}
          icons={{
            Add: props => { return ( <Button variant="contained" color="primary"> <div class="mdc-button__ripple"></div>
           <i class="material-icons mdc-button__icon" aria-hidden="true"
             >add</i><span class="mdc-button__label"> Neues LineItem hinzufügen</span></Button> ) } 
        }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  incrementCount(count + 1);
                  setData([...data, newData]);
                  console.log(count, newData);
                  console.log("NEW COLOR", newData.colorCode);

                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
      <Button
        onClick={createOrder}
        style={{ float: "right", margin: "20px" }}
        variant="contained"
        color="primary"
        title="Mit Klick auf diesen Button
        werden alle obenstehenden Positionen
        automatisch zu einer Bestellung 
        zusammengefasst und automatisch 
        an die Produktion übermittelt"
      >
        Speichern & an Produktion schicken
      </Button>
      <FooterPage />
    </>
  );
}

export default Editable;
