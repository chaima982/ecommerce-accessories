import React, { useState, useEffect } from "react";


import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";

const FoodDetails = () => {
  const [produits, setProduits] = useState([]);
  const { ref } = useParams();
  const dispatch = useDispatch();
  
 
  

  


  const [selectedImageIndex, setSelectedImageIndex] = useState(0);


  const handleImageClick = (index) => {
    setSelectedImageIndex(index)
   
  
  }
  useEffect(() => {
    fetch('http://localhost:8060/product/')
      .then(response => response.json())
      .then(data => {
        setProduits(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const product = produits.find((item) => item.ref === ref);

  if (!product) {
    return <p>Product not found.</p>; 
  }

  const {
    name,
    category,
    price,
    description,
    gallerie,
    
    // ... other properties
  } = product;
  
  console.log(description)
  const relatedProduct = produits.filter((item) => category[0] === item.category[0]);
 
  const addItem = () => {
    dispatch(
      cartActions.addItem({
       ref,
       name,
        price,
        gallerie,
      })
    );
  };



 
  return (
    <Helmet title="Product-details">
      <CommonSection title={name}  />

      <section >
        <Container>
          <Row>
            
            <div className="first-of-row" >
            <div className="first-row">
            <Col lg="2" md="2">
            <div className="product__images ">    
            
            {gallerie.length >1 &&
          gallerie.map((image, index) => (
            
            <div  key={index}>
            <img
          src={`http://localhost:8060/getImage/${image.name}`} // Updated image source
          alt="product-img"  className={selectedImageIndex===index? "cond" :"aa"} onClick={() => handleImageClick(index)}
            
        />
            </div>))}
            </div>
               
             
              
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
             
            <img
          src={`http://localhost:8060/getImage/${gallerie[selectedImageIndex].name}`} // Updated image source
          alt="product-img" className="bb"
        />
          
        
                
              </div>
            </Col>
            </div>
            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{name}</h2>
                <p className="product__price">
                  {" "}
                  Prix: <span>${price}</span>
                </p>
                <p className="category mb-5">
                  Categorie: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addTOCart__btn">
                  Ajouter au panier
                </button>
              </div>
            </Col>
            </div>
            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                 
                >
                  Description
                </h6>
                
              </div>

              
                <div className="tab__content">
                  <p>{description}</p>
                </div>
           
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">Vous pourriez également aimer : </h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="12" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
