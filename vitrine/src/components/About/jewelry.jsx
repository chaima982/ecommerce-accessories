import React, { useState } from 'react';
import './Jewelry.css';

const JewelryEcommerce = () => {
    const [toggleTab, setToggleTab] = useState(1);

    const toggleState = (index) => {
        setToggleTab(index);
    };

    return (
        <>
            <section className="jewelry">
                <div className="row">
                    <div className="column">
                        <div className="tabs">
                            <div
                                className={toggleTab === 1 ? 'single-tab active-tab' : 'single-tab'}
                                onClick={() => toggleState(1)}
                            >
                                <h2>Adresses</h2>
                            </div>
                            <div
                                className={toggleTab === 2 ? 'single-tab active-tab' : 'single-tab'}
                                onClick={() => toggleState(2)}
                            >
                                <h2>Contact</h2>
                            </div>
                            <div
                                className={toggleTab === 3 ? 'single-tab active-tab' : 'single-tab'}
                                onClick={() => toggleState(3)}
                            >
                                <h2>Nos infos</h2>
                            </div>
                        </div>
                        <div className="tab-content">
                            {toggleTab === 1 && (
                                <div className="content active-content">
                                    <h2>Nos Adresses</h2>
                                    <p>Nous avons des emplacements dans plusieurs villes :</p>
                                    <ul>
                                        <li>Adresse 1 : Ville, Pays</li>
                                        <li>Adresse 2 : Ville, Pays</li>
                                        {/* Ajoutez plus d'adresses au besoin */}
                                    </ul>
                                </div>
                            )}

{toggleTab === 2 && (
    <div className="content active-content">
        <h2>Coordonnées</h2>
        <p>Vous pouvez nous joindre via divers canaux :</p>
        <div className="contact-info">
            <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>Téléphone : +1234567890</span>
            </div>
            <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>Email : info@example.com</span>
            </div>
            <div className="contact-item">
                <i className="fab fa-facebook"></i>
                <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
            <div className="contact-item">
                <i className="fab fa-twitter"></i>
                <a href="https://www.twitter.com/yourcompany" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
            {/* Add more social media links as needed */}
        </div>
    </div>
)}


                            {toggleTab === 3 && (
                                <div className="content active-content">
                                    <h2>À Propos de Notre Entreprise</h2>
                                    <p>Nous sommes une entreprise de commerce électronique de premier plan spécialisée dans les bijoux de haute qualité. Notre mission est de fournir à nos clients des pièces de bijouterie exquises et élégantes. Nous sommes fiers de notre savoir-faire et de notre engagement envers la satisfaction de la clientèle.</p>
                                    {/* Ajoutez plus d'informations générales sur l'entreprise */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JewelryEcommerce;
