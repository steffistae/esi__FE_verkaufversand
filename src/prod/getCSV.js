import React, { Component } from 'react'
import '../App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import GlobalAppBar from '../components/GlobalAppBar';  
import ProdAppBar from '../components/ProdAppBar';  

import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';

import axios from 'axios'


class GetCSV extends Component {
    constructor(props) {
        super(props)

        this.state = {
            prodOrderNr: '', //Nummer
            statusID: '3', //ID des Kunden
            statusdescription: 'Produktion abgeschlossen', //String mit Beschreibung
            data: null
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        this.setState(
            { newProd: true }
        )
        axios
            .post('https://5club7wre8.execute-api.eu-central-1.amazonaws.com/sales/updatestatus', this.state)
            .then((res) => {
                console.log(res.data)
                var data = JSON.stringify(res.data)
                data = JSON.parse(data)
                data = data.body.message
                return data
            })
            .then(data => {
                console.log("data: " + data)
                this.setState({ data: data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    setnewProd(event) {
        console.log(event.target.value)
    }

    render() {
        const { prodOrderNr } = this.state;
        let content = '';
        return (
            <>
                <div>
                    <form onSubmit={this.submitHandler}>
                        <div>
                            <ProdAppBar />
                        </div>

                        <div style={{ padding: '20px' }} ><h2>CSV File für die Maschinenkonfiguration </h2></div>

                    </form>
                </div>
            </>
        );
    }
}

export default GetCSV; 