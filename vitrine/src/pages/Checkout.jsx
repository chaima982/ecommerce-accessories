import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import axios from "axios";

import "../styles/checkout.css";

const Checkout = () => {
  const [prod, setProd] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8060/product/')
      
    .then(response => response.json())
    
    .then(data => {
      
      setProd(data.data);
      
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
  

 
  const [enterName, setEnterName] = useState("");

  const [enterNumber, setEnterNumber] = useState("");
  
  const [enterCity, setEnterCity] = useState("");
  const [payement, setPayement] = useState("");

  
  //Amount
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 7;

  const totalAmount = cartTotalAmount + Number(shippingCost);
  //Items
  const cartItems = useSelector((state) => state.cart.cartItems);
  const produits= cartItems.map((item) => (
    item.ref
  ))
 
  const quant= cartItems.map((item) => (
    item.quantity
  ))
  const [shippingInfo,setShippingInfo]=useState([])
  const sum = quant.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split('T')[0] + "T00:00:00.000Z";
 

  const filtered = prod.filter((item) => produits.includes(item.ref));


console.log()
const outOfStockProducts = filtered.filter(item => item.quantite === 0);
useEffect(() => {
    const outOfStockProducts = filtered.filter(item => item.inStock === "false");
  
  if (outOfStockProducts.length > 0) {
    console.log("Items out of stock:");
    
    outOfStockProducts.forEach(item => {
      console.log(item.name);
    });
  } else if (shippingInfo.length > 0 && produits.length>0) {
    axios.post('http://localhost:8060/order/create', shippingInfo[0])
      .then(response => {
        console.log("Order saved successfully:", response.data);
        // Perform any necessary actions after successful order submission
      })
      .catch(error => {
        console.error('Error saving order:', error);
      });
  }
}, [filtered, shippingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      client: enterNumber,
      orderDate:formattedCurrentDate ,
      //phone: enterNumber,
      quantity:sum,
      deliveryAddress: enterCity,
      paymentMethod: payement,
      product:produits[0],
      totalPrice:totalAmount,
      panier: "64db589bc58757454f4c3655"
      
    };

    setShippingInfo([...shippingInfo,userShippingAddress])
    
    filtered.forEach((item) => {
      const cartItem = cartItems.find((cartItem) => cartItem.ref === item.ref);
      const updatedQuantity = item.quantite - cartItem.quantity; // Calculate the difference
      console.log(updatedQuantity)
      console.log(item._id)
      if (item.quantite>0){
      axios.put(`http://localhost:8060/product/update/${item._id}`, { quantite: updatedQuantity })
        .then((response) => {
          console.log(`Quantity updated for product ${item._id}`);
          // Handle any further actions or notifications
        })
        .catch((error) => {
          console.error(`Error updating quantity for product ${item._id}`, error);
        });
      }
    });

    filtered.forEach((item) => {
      if (item.quantite===1)
        {
          axios.put(`http://localhost:8060/product/update/${item._id}`, { inStock: "false" })
          .then((response) => {
            console.log(`etat stock updated for product ${item._id}`);
            // Handle any further actions or notifications
          })
          .catch((error) => {
            console.error(`Error updating etat stock for product ${item._id}`, error);
          });
        }
    });
  };
  shippingInfo.length >0  &&  console.log(shippingInfo[0])
  



  

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
            
            
            {<div className="msg">
            {outOfStockProducts.length>0 && <h1 >Les produits suivants  sont out of stock réessayez de passer une autre commande svp . </h1>}
            {outOfStockProducts.map((x)=>  <div className="out-prod-name"><img src={`http://localhost:8060/getImage/${x.gallerie[0].name}`} alt={`product-img`} className=" out-img"/> 
               : {x.name} .</div>)}
            </div>}
              <h6 className="mb-4">Vos infos</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Nom et Prenom"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

             
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="numèro de télèphone"
                    required
                     
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Adresse"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <div className="form__group">
                 <select
                  required
                  className="payment-select"
                  onChange={(e) => setPayement(e.target.value)}
                >
                  <option value="" disabled selected>Selectionner la methode de payement</option>
                  <option value="credit">Credit</option>
                  <option value="cash">Cash</option>
                </select>
                </div>
                <button type="submit" className="addTOCart__btn">
                  Commander
                </button>
              </form>
            </Col>
          
            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Sur-total: <span>${cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                 Livraison: <span>${shippingCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
 /*const verif=users.filter((item)=>item.numTel===shippingInfo.phone)
  const client = verif.Length >0 ? [verif[0]._id] : [enterName]

  */
