import React from "react";
import { ListGroupItem } from "reactstrap";

import "../../../styles/cart-item.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const CartItem = ({ item }) => {
  const {
    ref,
    name,
    price,
    gallerie, // Updated attribute name
    quantity,
    totalPrice,
  } = item;

  const dispatch = useDispatch();

  const incrementItem = () => {
    dispatch(
      cartActions.addItem({
        ref,
        name,
        price,
        gallerie, // Updated attribute name
      })
    );
  };

  const decreaseItem = () => {
    dispatch(cartActions.removeItem(ref));
  };

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(ref));
  };

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <div className="ter">
      
      
     <img
          src={`http://localhost:8060/getImage/${gallerie[0].name}`} // Updated image source
          alt="product-img"
        />
            
            
            
            
      
  
            </div>

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{name}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price">
              {quantity}x <span>${totalPrice}</span>
            </p>
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={incrementItem}>
                <i className="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={decreaseItem}>
                <i className="ri-subtract-line"></i>
              </span>
            </div>
          </div>

          <span className="delete__btn" onClick={deleteItem}>
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
