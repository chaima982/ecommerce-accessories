import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import heroImg from "../assets/5066691.jpg";
import "../styles/hero-section.css";
import { Link } from "react-router-dom";
import Category from "../components/UI/category/Category.jsx";
import "../styles/home.css";
import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/bread.png";
import ProductCard from "../components/UI/product-card/ProductCard.jsx";
import whyImg from "../assets/images/deliver.png";
import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";
const Home = () => {
  const [produits, setProduits] = useState([]);
  const [category, setCategory] = useState("Collier");
  const [filteredProduits, setFilteredProduits] = useState([]);
  const [hotPizza, setHotPizza] = useState([]);
const [sliced,setSliced]=useState([])
  useEffect(() => {
    fetch('http://localhost:8060/product/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduits(data.data);
        setFilteredProduits(data.data); // Initialize filteredProduits with all products
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
   
    const slicePizza = produits.slice(0, 4);
    setHotPizza(slicePizza);
  }, [produits]);

  useEffect(() => {
    
      const filteredProducts = produits.filter((item) => item.category[0] === category);
   
      setFilteredProduits(filteredProducts);
   
  }, [category,produits]);
  
  useEffect(() => {
    setSliced(filteredProduits.slice(0,8))
    
}, [filteredProduits]);

const [cat, setCat]=useState([])
  useEffect(() => {
    fetch('http://localhost:8060/categorie/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCat(data.data);
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <Helmet title="Home">
      <section className="first-sec">
      <Container>
          <Row>
            <Col lg="6" md="6">
            <div className="hero__content">
  <h5 className="mb-3 h5p">Élégance et Beauté</h5>
  <h1 className="mb-4 hero__title">
    <span>ORNEZ-VOUS</span> <br /> <span className="h5p">Avec des Bijoux</span> <span>Exquis.</span>
  </h1>

  <p>
    Découvrez un monde de beauté intemporelle et d'artisanat. Des superbes colliers aux bagues étincelantes, trouvez le bijou parfait à chérir pour toujours.
  </p>

  <div className="hero__btns d-flex align-items-center gap-5 mt-4">
    <button className="order__btn d-flex align-items-center justify-content-between">
      <a href="/foods">Acheter maintenant <i class="ri-arrow-right-s-line"></i></a>
    </button>

    <button className="all__jewelries-btn">
      <Link to="/foods"><span className="h5p">Explorer tous les bijoux</span></Link>
    </button>
  </div>





                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-car-line"></i>
                    </span>{" "}
                   <span className="h5p">With shipping charge</span> 
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-shield-check-line"></i>
                    </span>{" "}
                    <span className="h5p">100% service sécurisé</span>
                  </p>
                </div>
              </div>
            </Col>
          
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={ heroImg} alt="hero-img" className="w-100 ii" />
              </div>
            </Col>
          </Row>
        </Container>
      
      </section>

      <section className="pt-0">
        <Category />
      </section>

      <section className="pop-food-cont">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="h5p">Bijoux populaires</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center gap-4">
          {/*  
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "collier" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("collier")}
                >
                  <img src={foodCategoryImg01} alt="" />
                  Collier
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "Boucles" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("Boucles")}
                >
                  <img src={foodCategoryImg02} alt="" />
                  Boucles
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "Bracelet" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("Bracelet")}
                >
                  <img src={foodCategoryImg03} alt="" />
                  Bracelet
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "Rings" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("Rings")}
                >
                  <img src={foodCategoryImg02} alt="" />
                  Rings
                </button> */}
                {cat.map((item, index) => 
                   <button
                  className={`d-flex align-items-center gap-2 ${
                    category === item.name ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory(item.name)}
                >
                 {/*  <img src={foodCategoryImg03} alt="" /> */}
                  {item.name}
                </button> 
                 
                    )}
              </div>
            </Col>
              
            {sliced.map((item) => (
              <Col lg="3" md="4" sm="6" xs="11.5" key={item.id} className="mt-5">
                
                <ProductCard item={item} />
               
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="why__choose-us">
  <Container>
    <Row>
      <Col lg="6" md="6">
        <img src={whyImg} alt="why-tasty-treat" className="w-100 img-marg" />
      </Col>

      <Col lg="6" md="6">
        <div className="why__tasty-treat">
          <h2 className="tasty__treat-title mb-4">
            <span className="h5p">Pourquoi</span> <span>JBeauty ?</span>
          </h2>
          <p className="tasty__treat-desc">
            Découvrez les raisons de choisir Joyaux Élégants pour sublimer votre style avec nos magnifiques bijoux.
          </p>

          <ListGroup className="mt-4">
            <ListGroupItem className="border-0 ps-0">
              <p className="choose__us-title d-flex align-items-center gap-2 ">
                <i class="ri-checkbox-circle-line"></i> Bijoux chic et élégants
              </p>
              <p className="choose__us-desc">
                Explorez notre collection de bijoux soigneusement sélectionnés pour ajouter une touche de luxe à votre allure.
              </p>
            </ListGroupItem>

            <ListGroupItem className="border-0 ps-0">
              <p className="choose__us-title d-flex align-items-center gap-2 ">
                <i class="ri-checkbox-circle-line"></i> Support de qualité
              </p>
              <p className="choose__us-desc">
                Profitez d'un service client de qualité pour répondre à toutes vos questions et besoins.
              </p>
            </ListGroupItem>

            <ListGroupItem className="border-0 ps-0">
              <p className="choose__us-title d-flex align-items-center gap-2 ">
                <i class="ri-checkbox-circle-line"></i> Commandez de n'importe où
              </p>
              <p className="choose__us-desc">
                Passez votre commande depuis n'importe quel endroit, nous la livrerons jusqu'à votre porte.
              </p>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Col>
    </Row>
  </Container>
</section>

      {/*<section className="pt-0 hot-pizz">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5 ">
              <h2 className="h5p">Hot Pizza</h2>
            </Col>

            {hotPizza.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Distinctio quasi qui minus quos sit perspiciatis inventore
                  quis provident placeat fugiat!
                </p>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
            */}
  

    </Helmet>
  );
};

export default Home;
