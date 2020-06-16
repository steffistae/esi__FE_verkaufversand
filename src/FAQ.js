import React, { Component } from "react";
import GlobalAppBar from './components/GlobalAppBar';
import Faq from "react-faq-component";
import FooterPage from './components/Footer';

const data = {
    rows: [
        {
            title: "Wie erstelle ich eine CSV Datei?",
            content: `Diese Funktion finden Sie indem Sie links auf den Reiter "Produktion" und dann auf den Button "CSV Export" klicken.`,
        },
        {
            title: "Wo sehe ich die Status der Produktionsaufträge",
            content:
                'Diese finden Sie wenn Sie auf den Reiter "Produktion" gehen und dann auf die Registerkarte Produktionsstatus klicken. Hier gibt es nun den Button "Produktionsstatus abfragen" mit dem Sie alle offenen und geplanten Aufträge in der Datenbank abfragen können. Diese werden Ihnen dann in der Tabelle darunter anschaulich dargestellt.',
        },
        {
            title: "Wie lege ich einen neuen Auftrag an?",
            content: `Bitte klicken Sie hierfür in dem Drop-Down Menü links auf "Vertrieb & Versand" und wählen Sie die Registerkarte "Neue Bestellung" rechts oben aus. Hier können Sie nun alle Daten eingeben und zur Datenbank hinzufügen. Die Produktion wird daraufhin automatisch verständigt. `,
        },
        {
            title: "Wie aktualisiere ich eine Tabelle?",
            content: `Bitte klicken Sie hierfür in der Tabelle auf den refresh-Button oben rechts. `,
        },
        {
            title: "Wie lege ich eine neue Retoure an?",
            content: `Bitte klicken Sie hierfür in dem Drop-Down Menü links auf "Vertrieb & Versand" und wählen Sie die Registerkarte "Retoure" rechts oben aus. Hier können Sie nun alle Daten eingeben und zur Datenbank hinzufügen. Bei einer notwendigen Neuproduktion wird die Produktion automatisch benachrichtigt `,
        },
        {
            title: "Wie füge ich einen neuen Geschäftskunden zur Kundenkartei hinzu?",
            content: `Bitte klicken Sie hierfür in dem Drop-Down Menü links auf "Vertrieb & Versand" und wählen Sie die Registerkarte "Neuer Kunde" rechts oben aus. Hier können Sie nun alle Daten eingeben und zur Datenbank hinzufügen. Achten Sie darauf, bei Geschäftskunde "Ja" zu wählen. `,
        },
    ],
};

const stylesFAQ = {
    bgColor: 'white',
    titleTextColor: 'black',
    rowTitleColor: "black",
    rowContentColor: 'grey',
    arrowColor: "black",
};

class FAQ extends Component {
    render() {
        return (
            <>
                <GlobalAppBar />

                <div style={{ padding: '20px', paddingLeft: '30px' }} ><h2>Häufig gestellte Fragen </h2>
                    <div style={{ width: '1200px', padding: '0px', paddingLeft: '10px' }}>
                            <Faq data={data} styles={stylesFAQ} />
                    </div>
                </div>
                <FooterPage />
            </>
        );
    }
}

export default FAQ; 