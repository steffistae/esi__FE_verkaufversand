import React, { Component } from 'react'
import axios from 'axios'
import './App.css';
import QRCode from 'qrcode.react';

class Sending extends Component {
    
    render() {
    const downloadQR = () => {}
        return (
            <div>
            <QRCode
              id="C-20200607-1"
              value="C-20200607-1"
              size={290}
              level={"H"}
              includeMargin={true}
            />
            <a onClick={downloadQR}> Download QR </a>
          </div>
        
        );
    }
}

export default Sending;