import React from 'react';
import '../App.css';



import ProdAppBar from '../components/ProdAppBar';
import FooterPage from '../components/Footer';



function SplitLargeOrders() {

  return (
    <>
      <div>
        <ProdAppBar />
      </div>

      <div style={{ padding: '20px' }} >
        <h2>Große Aufträge aufsplitten</h2>

        <button class="addMore" margin="15px" title="Hier können Sie Aufträge aufteilen, um eine optimale Produktionsauslastung sicherzustellen">?</button>
        
      </div>



      <FooterPage />
    </>
  );
}

export default SplitLargeOrders;
