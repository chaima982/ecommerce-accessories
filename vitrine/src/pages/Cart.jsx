import React from "react";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
const [ress,setRess]=useState(false)
  return (
    <Helmet title="Panier">
      <CommonSection title="Panier" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length === 0 ? (
                <h5 className="text-center">Votre panier est vide</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Titre du Produit</th>
                      <th>Prix</th>
                      <th>Quantité</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (<>
                      
                      <CartItem item={item} key={item._id} /></>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-4">
                <h6>
                  Total : $
                  <span className="cart__subtotal">{totalAmount}</span>
                </h6>
                <p>Les taxes et les frais d'expédition seront calculés lors du paiement</p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/foods">Continuer les achats</Link>
                  </button>
                  <button className="addTOCart__btn">
                    <Link to="/checkout">Passer à la caisse</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const CartItem = (props) => { // Use the updated CartItem component
  const { ref, gallerie, name, price, quantity } = props.item;
  
  
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(ref));
  };
  
  return (
    <tr>
      <td className="text-center cart__img-box">
      
           
            <img
          src={`http://localhost:8060/getImage/${gallerie[0].name}`} // Updated image source
          alt="product-img" className="main-cart-img"
        />
            
      </td>
      <td className="text-center">{name}</td>
      <td className="text-center">${price}</td>
      <td className="text-center">{quantity}px</td>
      <td className="text-center cart__item-del">
        <i className="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
