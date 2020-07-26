
//import axios from "axios";



/*function getArticleNrs() 
{
    axios
      .get(
        "https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/getkpidata"
      )
      .then(response => {
        return response.json();
      })
      .then(data => {
        
        
       
        
        let teamsFromApi = data.map(team => {
        return { value: team, display: team };
        });
        this.setState({
          teams: [
            {
              value: "",
              display:
                "(Select your favourite team)"
            }
          ].concat(teamsFromApi)
        });
      })
      .catch(error => {
        console.log(error);
      });
}*/



const dropdown = 
{10000001: '10000001 - T-Shirt | weiß | XS', 
10000002: '10000002 - T-Shirt | weiß | S',
10000003: '10000003 - T-Shirt | weiß | M',
10000004: '10000005 - T-Shirt | weiß | L',
10000005: '10000005 - T-Shirt | weiß | XL',
10000011: '10000001 - T-Shirt | schwarz | XS', 
10000012: '10000002 - T-Shirt | schwarz | S',
10000013: '10000003 - T-Shirt | schwarz | M',
10000014: '10000005 - T-Shirt | schwarz | L',
10000015: '10000005 - T-Shirt | schwarz | XL'
};


 module.exports = { dropdown };
