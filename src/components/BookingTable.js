import React from 'react';
import MaterialTable from 'material-table';



const BookingTable = () => {
  return (
    
    <MaterialTable

    columns={[
      { title: 'Pos', field: 'position', type: 'numeric'},
      { title: 'Ordernummer', field: 'ordernr', type: 'numeric' },
      { title: 'Kundennummer', field: 'customernr', type: 'numeric' },
      { title: 'Geprüft', field: 'proof', type: 'boolean' },  
      { title: 'Ausgebucht', field: 'booked', type: 'boolean' },

      
    ]}
    data={[{ position: 1, ordernr: 123456, customernr: 99999, proof: 0, booked:0 }, 
      { position: 2, ordernr: 234567, customernr: 99999, proof: 1, booked:0 },]}
    
    title="Vollständige Bestellungen"

    actions={[
      {
        icon: 'unarchive',
        //if(proof....true/0) {disabled: true},
        tooltip: 'Bestellung jetzt auslagern!',
        onClick: (event, rowData) => {
        }
      },
      {
        icon: 'verified',
        tooltip: 'Bestellung erfolgreich geprüft!',
        onClick: (event, rowData) => {
        }
      }
    ]}

  />


  );
}

export default BookingTable;





