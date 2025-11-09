import React from "react";
import CommonSection from "../components/UI/common-section/CommonSection";

import Jewelry from "../components/About/jewelry"
import Helmet from "../components/Helmet/Helmet";
const Contact = () => {
  return( 
   <Helmet title="Panier">
  <CommonSection title="Nos Informations" />
  <div className="app">
      
      <main className="app-main">
        <Jewelry />
      </main>
  
    </div>
  </Helmet>
)};

export default Contact;
