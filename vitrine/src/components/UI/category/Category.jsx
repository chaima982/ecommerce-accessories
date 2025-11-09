import React from "react";

import { Container, Row, Col } from "reactstrap";

import categoryImg01 from "../../../assets/tes1-remove.png";
import categoryImg02 from "../../../assets/tes2.jpg";
import categoryImg03 from "../../../assets/tes3.jpg";
import categoryImg04 from "../../../assets/tes4.jpg";

import "../../../styles/category.css";

const categoryData = [
  {
    display: "Boucles",
    imgUrl: categoryImg01,
  },
  {
    display: "Colliers",
    imgUrl: categoryImg02,
  },

  {
    display: "Diamond",
    imgUrl: categoryImg03,
  },

  {
    display: "Anneaux",
    imgUrl: categoryImg04,
  },
];

const Category = () => {
  let x=0;
  return (
    <Container>
      <Row >
        {categoryData.map((item, index) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={index}>
            <div className="category__item d-flex align-items-center gap-3 ">
              <div className="category__img">
                <img src={item.imgUrl} alt="category__item"  className={`ez${index}`}/>
              </div>
              
              <h6 style={{color:"#696969"}}>{item.display}</h6><span className="invis">{x++}</span>
            </div>

          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;
