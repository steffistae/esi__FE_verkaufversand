import React from 'react';


var styleFooter = {
  backgroundColor: "#3f51b5",
  borderTop: "1px solid #3f51b5",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "25px",
  width: "100%",
  color: '#000000',
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

function Footer({ children }) {
  return (
    <>
      <div>
        <div style={phantom} />
        <div style={styleFooter}>
          <a href="/faq" color="white">Haben Sie Fragen? Hier geht es zu den FAQ</a>
          {children}
        </div>
      </div>
    </>
  )
}

export default Footer