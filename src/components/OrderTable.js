import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FooterPage from "../components/Footer";
import axios from "axios";

var answer = null;


function Editable() {

  const { useState } = React;
  const [count, incrementCount] = useState(1);
  const [customerId, setCustomerId] = useState("");
  const [tostock, settoStock] = useState();
  const [columns, setColumns] = useState([
    { title: "Materialnummer", field: "materialNr", tooltip: "8-stellige Nummer: 10000001" },
    {
      title: "Farbcode", field: "colorCode", tooltip: "HEX-Code: #282C34", cellStyle: (input, rowData) => {
       // console.log('column', data);
        return {
          backgroundColor: rowData?.colorCode || input,
        };
      }
    },
    { title: "Motivnummer", field: "motivNr", tooltip: "4-stellige Nummer: 3489" },
    { title: "Anzahl", field: "quantity", type: "numeric" },
    {
      //      title: 'Stock or Sale?',
      //      field: 'toStock',
      //      lookup: { true: 'for Stock', false: 'for Sale' }, 
    },
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
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  let content = '';


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

            <input type="radio" value={1} name="tostock" /> Ja <br />
            <input type="radio" value={0} name="tostock" /> Nein <br />
          </div>
        </div>


        <MaterialTable
          style={{ marginTop: "40px", marginLeft: "20px", marginRight: "20px" }}
          title="Bestellung anlegen"
          columns={columns}
          data={data}
          options={{
            headerStyle: {
              backgroundColor: "#3f51b5",
              color: "#FFFF",
            },
            // rowStyle: rowData => ({
            //   backgroundColor: rowData.colorCode ? rowData.colorCode : null,
            // }),
            // cellStyle: (...all) => {
            //   console.log(all);
            //   return {};
            // }
          }}

          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  incrementCount(count + 1);
                  setData([...data, newData]);
                  console.log(count, newData);
                  console.log('NEW COLOR', newData.colorCode);
                
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
      >
        Speichern & an Produktion schicken
      </Button>
      <div style={{ paddingLeft: "20px" }}>
        <h3>Bestätigung: {(content = "")}</h3>
      </div>
      <FooterPage />
    </>
  );
}

export default Editable;
