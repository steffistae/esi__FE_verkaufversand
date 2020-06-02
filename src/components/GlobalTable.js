import React from 'react';
import MaterialTable from 'material-table';


const GlobalTable = () => {
  return (
    
    <MaterialTable

    columns={[
      { title: 'Pos', field: 'position', type: 'numeric'},
      { title: 'Artikelnummer', field: 'artnr', type: 'numeric' },
      { title: 'Colorcode', field: 'colorcode', type: 'numeric' },
      { title: 'Motiv', field: 'motivnr', type: 'numeric' },
      { title: 'Anzahl', field: 'quantity', type: 'numeric' },

      
    ]}
    data={[{ position: 1, artnr: 123456, colorcode: 999, motivnr:16, quantity:2 }, 
      { position: 2, artnr: 234567, colorcode: 111, motivnr:12, quantity:1 },
      { position: 3, artnr: 345678, colorcode: 212, motivnr:10, quantity:5 },
      { position: 4, artnr: 456789, colorcode: 989, motivnr:11, quantity:1 }]}
    
    title="Alle Bestellungen"

    actions={[
      {
        icon: 'save',
        tooltip: 'Save User',
        onClick: (event, rowData) => {
          // Do save operation
        }
      },
      {
        icon: 'delete',
        tooltip: 'Delete User',
        onClick: (event, rowData) => {
          // Do delete operation
        }
      }
    ]}

  />


  );
}

export default GlobalTable;





