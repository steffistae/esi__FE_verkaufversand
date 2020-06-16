import React from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FooterPage from "../components/Footer";
import axios from 'axios'

function Editable() {
  const { useState } = React;

  const [count, incrementCount] = useState(1);
  const [customerId, setCustomerId] = useState("");
  const [tostock, settoStock] = useState();

  const [columns, setColumns] = useState([
    { title: "Artikelnummer", field: "articleNr" },
    { title: "Farbcode", field: "colorcode" },
    { title: "Motivnummer", field: "motivNr" },
    { title: "Anzahl", field: "quantity", type: "numeric" },
    {
      //      title: 'Stock or Sale?',
      //      field: 'toStock',
      //      lookup: { true: 'for Stock', false: 'for Sale' },
    },
  ]);

  const [data, setData] = useState([
    
  ]);

  function createOrder() {
    console.log(
      data.map((element) => {
        return {
          customerID: customerId,
          lineItem: element.tableData.id + 1 + "",
          articleNr: element.articleNr,
          colorCode: element.colorcode,
          quantity: element.quantity,
          motivNr: element.motivNr,
          toStock: parseInt(tostock),
        };
      })
    );
    axios
      .post('https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/addOrder', data)
      .then(console.log(data))
      .then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
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
            />
          </form>{" "}
          <br />
        </div>
        <div style={{paddingLeft: "20px", paddingBottom: "20px"}} onChange={(e) => settoStock(e.target.value)}>
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
      <FooterPage />
    </>
  );
}

export default Editable;
