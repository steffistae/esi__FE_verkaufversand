import React, { Component } from 'react'
import '../App.css';
import Button from '@material-ui/core/Button';
import ProdAppBar from '../components/ProdAppBar';
import { FormControl } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FooterPage from '../components/Footer';
import axios from 'axios'


class ProdHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: this.props.filename ? this.props.filename : 'data',
            url: '',
            status: '',
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
            {
                newProd: true,
            }
        )
        axios
            .post('https://2pkivl4tnh.execute-api.eu-central-1.amazonaws.com/prod/sortOrders', { crossdomain: true })
            .then((res) => {
                console.log(res.data)
                var data = JSON.stringify(res.data)
                data = JSON.parse(data)
                return data
            })
            .then(data => {
                this.setState({ url: data.body.url, status: data.body.status })
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
                    <div><ProdAppBar /></div>

                    <form onSubmit={this.submitHandler}>

                        <div style={{ padding: '20px', paddingLeft: '30px' }} ><h1>Willkommen auf der Produktionsseite! </h1>

                            <div style={{ width: '1200px', padding: '0px', paddingLeft: '30px' }}>
                                <FormControl>
                                    <Grid container
                                        direction="row"
                                        justify="center"
                                        alignItems="flex-start">

                                        <Grid
                                            container spacing={3}>
                                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                                            <div>
                                                <p>Hier finden Sie alle relevanten Informationen welche die Produktion betreffen. Derzeit befindet sich die Webseite noch in einem Prototypen-Statium aber mit Ihrer Hilfe kann sie bald zu einer vollwertigen Unterstützung für den Alltag werden!
                                                </p>
                                            </div>
                                            <div>
                                                <p>Wenn Ihnen etwas auffällt was Sie anders darstellen würden, etwas unverständlich ist oder Sie sich gerne ausführlichere Informationen wünschen dann schreiben Sie uns gerne direktes Feedback an "feedback@blackforest_IT.de" und wir werden uns darum kümmern.
                                                </p>
                                            </div>

                                            <div style={{ width: '1200px', padding: '0px', paddingLeft: '30px' }}>

                                            <div>
                                                <h3>Hier finden Sie eine Übersicht der Funktionalitäten der Produktionsseite:</h3>
                                            </div>
                                            <div>
                                                <h2><a href="/prod/MaterialManagement">Materialmanagement</a></h2>
                                                <p> Unter der Registerkarte "Materialmanagement" haben Sie die folgenden Möglichkeiten: 
                                                    
                                                </p>
                                                <ol role="listitem" class="item">
                                                    <li value="-" role="listitem" class="">T-Shirts und Farbe bestellen bei der Materialwirtschaft (Ausblick)</li>
                                                    <li value="-" role="listitem" class="">Qualitätswerte für eine Chargennummer ermitteln</li>
                                                    <li value="-" role="listitem" class="">Material wieder einlagern (Ausblick)</li>
                                                </ol>
                                            </div>

                                            <div>
                                                <h2><a href="/prod/ProdManagement">Produktionsmanagement</a></h2>
                                                <p> Unter der Registerkarte "Produktionsmanagement" haben Sie die folgenden Möglichkeiten: 
                                                    
                                                </p>
                                                <ol role="listitem" class="item">
                                                    <li value="-" role="listitem" class="">Produktionsstatus für eine Bestellung aktualisieren (Produktion abgeschlossen) und die Abholung beauftragen</li>
                                                    <li value="-" role="listitem" class="">Alle anstehenden und vergangenen Aufträge in der Produktion einsehen und nach Status filtern</li>
                                                </ol>
                                            </div>

                                            <div>
                                                <h2><a href="/prod/OrderManagement">Auftragsmanagement</a></h2>
                                                <p> Unter der Registerkarte "Auftragsmanagement" haben Sie die folgenden Möglichkeiten: 
                                                    
                                                </p>
                                                <ol role="listitem" class="item">
                                                    <li value="-" role="listitem" class="">CSV-Datei mit den nach Delta-E und Fertigstellungsdatum sortierten Aufträgen erstellen und herunterladen</li>
                                                    <li value="-" role="listitem" class="">Reihenfolge der Aufträge manuell anpassen und große Aufträge aufteilen (Ausblick)</li>
                                                </ol>
                                            </div>
                                            </div>

                                            <div>
                                                <h3>Weitere Funktionalitäten werden in enger Abstimmung mit Ihnen und dem Unternehmen hinzukommen und weiterentwickelt!</h3>
                                            </div>
                                        </Grid >
                                    </Grid>

                                </FormControl>
                            </div>

                        </div>
                    </form>
                </div>
                <FooterPage />
            </>
        );
    }
}

export default ProdHome; 