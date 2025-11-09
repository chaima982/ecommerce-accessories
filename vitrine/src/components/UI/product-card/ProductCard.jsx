import React from "react";
import "../../../styles/product-card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const {
    _id,
    ref,
    name,
    price,
    description,
    gallerie,
    pourcentage,
    Marque,
    category,
    createdAt,
    dateDebutPromotion,
    dateFinPromotion,
    inStock,
    v,
  } = props.item;

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        ref,
        name,
        gallerie,
        price,
      })
    );
  };
  const handleLinkClick = () => {
    // Scroll to the top of the page when a related product is clicked
    window.scrollTo({
      top: 10,
      behavior: "smooth", // You can also use "auto" for instant scrolling
    });
  };
  return (
    <div className="product__item">
      <div  className="product__img">
    
      <Link onClick={handleLinkClick} to={`/foods/${ref}`}>
              
              <img
               src={`http://localhost:8060/getImage/${gallerie[0].name}`}  // Corrected the src attribute
                alt={`product-img`}
                className=" prod"
              />
      </Link>
         
      </div>
      <div className="product__content">
       
        <div className="heg" >
          <Link onClick={handleLinkClick} to={`/foods/${ref}`}>{name}</Link>
        </div>
        
        <div className="extra  ">
          <span className="product__price">${price}</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
/*{gallerie &&
  gallerie.map((image, index) => (
    <React.Fragment key={index}>
    <img
  src={`http://localhost:8060/getImage/${image.name}`} // Updated image source
  alt="product-img"
/>
    </React.Fragment>))}
*/