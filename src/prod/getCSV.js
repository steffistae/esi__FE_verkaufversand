import React, { Component } from 'react'
import '../App.css';
import Button from '@material-ui/core/Button';
import ProdAppBar from '../components/ProdAppBar';
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FooterPage from '../components/Footer';
import axios from 'axios'


class GetCSV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: this.props.filename ? this.props.filename : 'data',
            url: ''
        };
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        var test = {
            "key1": "value1",
            "key2": "value2",
            "key3": "value3",
        };

        e.preventDefault()
        console.log(this.state)
        this.setState(
            { newProd: true }
        )
        axios
            .post('https://2pkivl4tnh.execute-api.eu-central-1.amazonaws.com/prod/sortOrders', { crossdomain: true })
            .then((res) => {
                console.log(res.data)
                var data = JSON.stringify(res.data)
                data = JSON.parse(data)
                data = data.url
                return data
            })
            .then(data => {
                console.log("data: " + data)
                this.setState({ url: data })
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

                        <div style={{ padding: '20px' }} ><h2>CSV File erstellen und herunterladen </h2></div>

                        <div style={{ width: '800px', padding: '20px' }}>
                            <FormControl>
                                <Grid container
                                    direction="row"
                                    justify="center"
                                    alignItems="flex-start"
                                >

                                    <Grid
                                        container spacing={3}>
                                        <Grid item xs={6} sm={6}>
                                            <Button type="submit" style={{ float: 'left', margin: '20px' }} color="primary" variant="contained"
                                            title="Erstellen Sie eine CSV-Datei mit den Nächsten anstehenden Aufträgen bequem per Knopfdruck">
                                                CSV-Datei erstellen</Button>
                                        </Grid>
                                        <Grid item xs={6} sm={6}>

                                            <a href={this.state.url} target="_blank" rel="noopener noreferrer" download>
                                                <Button style={{ float: 'left', margin: '20px' }} color="primary" variant="contained" title="Nachdem Sie die CSV-Datei mit den nächsten Aufträgen erstellt haben können Sie sie hier herunterladen und abspeichern">
                                                    <i className="fas fa-download" /> Download CSV-File  </Button>
                                            </a>

                                        </Grid>
                                    </Grid >
                                </Grid>

                            </FormControl>
                        </div>
                    </form>
                </div>
                <FooterPage />
            </>
        );
    }
}

export default GetCSV; 