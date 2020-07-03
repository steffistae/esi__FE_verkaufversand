
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
{10000001: '10000001 - T-Shirt', 10000002: '10000002 - Tasse'};


 module.exports = { dropdown };
