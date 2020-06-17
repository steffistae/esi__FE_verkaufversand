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
    { title: "Materialnummer", field: "materialNr" },
    { title: "Farbcode", field: "colorCode" },
    { title: "Motivnummer", field: "motivNr" },
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
        answer = response.body.message
        return answer;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div style={{ maxWidth: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Kundennummer"
              variant="outlined"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              title="Die Angabe einer Kundennummer ist nur für Bestellungen notwendig, die nicht auf Lager produziert werden."
            />
          </form>{" "}
          <br />
        </div>
        <div
          style={{ paddingLeft: "20px", paddingBottom: "20px" }}
          onChange={(e) => settoStock(e.target.value)}
        >
          Produktion auf Lager? <br />
          <input type="radio" value={1} name="tostock" /> Ja <br />
          <input type="radio" value={0} name="tostock" /> Nein <br />
        </div>
      </div>

      <MaterialTable
        title="Bestellung anlegen"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                incrementCount(count + 1);
                setData([...data, newData]);
                console.log(count, newData);

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

      <Button
        onClick={createOrder}
        style={{ float: "right", margin: "5px" }}
        variant="contained"
        color="primary"
      >
        Bestellung abschicken
      </Button>
      <div style={{paddingLeft: "20px"}}>
        <h3>Bestätigung: {(answer)}</h3>
      </div>
      <FooterPage />
    </>
  );
}

export default Editable;
