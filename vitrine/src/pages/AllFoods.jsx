import React, { useState ,useEffect} from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";


import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";




const AllFoods = () => {
  const [produits, setProduits]=useState([])
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
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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

  console.log(cat)
  
  
  
  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  const searchedProduct = produits.filter((item) => {
   
    if (searchTerm === "" || searchTerm === "Tout" ) {
      return item;
    }
    else if (item.category[0].toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return null;
    }
  });

  const productPerPage = 8;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All-Foods">
      <CommonSection title="Notre Collection " />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input className="input-field"
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select className="w-50" onChange={(e) => setSearchTerm(e.target.value)}>
                  <option style={{display:"none"}}>choisir la categorie</option>
                  
                  <option> Tout</option>
                    {cat.map((item, index) => 
                  
                  < option >{item.name}</option>
                    )}
                </select>
              </div>
            </Col>

            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="12" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div className="pages">
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prec"}
                nextLabel={"Suiv"}
                containerClassName=" paginationBttns "
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
