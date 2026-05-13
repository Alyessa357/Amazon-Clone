import logo2 from '../assets/logo2.png';
import location from '../assets/location.svg';
import search from '../assets/search.svg';
import cartIcon from '../assets/cartIcon.svg';

import { Link } from "react-router-dom";
import { useCartContext } from "../features/cart/cartContext";
import { useSearch } from "../features/searchContext";
import { useState } from "react";

import "../styles/NavBar.css";

const NavBar = () => {

    const { cart } = useCartContext();
    const { query, setQuery } = useSearch();

    // calculate total items
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);


    return (
        <>
        <nav>

            <section className="nav-main">

                <div className="nav-main-container">
                     {/* Nav Logo + location area */}
                    <section className="nav-left">

                        {/* Logo */}
                        <Link to="/" className="logo">
                            <img src={logo2} alt="logo" />
                        </Link>
                        
                        {/* location area */}
                        <div className="location-area">
                            <img src={location} alt="location" />
                            <div className="location-text">
                                <span className="span-1">Deliver to</span>
                                <span className="span-2">South Africa</span>
                            </div>
                        </div>

                    </section>

                    {/* Nav Search bar */}
                    <section className="nav-search">

                        <div className="search">
                            <select name="All" id="drop-down">
                                <option value="">All</option>
                                <option value="">Arts & Crafts</option>
                                <option value="">Automotive</option>
                                <option value="">Baby</option>
                                <option value="">Books</option>
                                <option value="">Computers</option>
                                <option value="">Digial music</option>
                                <option value="">Electronics</option>
                                <option value="">Girl's fashion</option>
                                <option value="">Home & Kitchen</option>
                                <option value="">Industrial & Scientific</option>
                            </select>
                            <input type="search" placeholder="Search Amazon" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button className="search-btn">
                                <img src={search} alt="search" />
                            </button>
                        </div>

                    </section>

                    {/* Nav tools */}
                    <section className="nav-tools">

                        <div className="language">
                            <img src="" alt="" />
                            <select name="languages" id="languages">
                                <option value="English">EN</option>
                            </select>
                        </div>
                        
                        <div className="account-section">
                            <p>Hello, sign in</p>
                            <h5>Account & Lists</h5>
                        </div>
                        
                        <div className="orders">
                            <p>Returns</p>
                            <h5>& Orders</h5>
                        </div>

                        <Link to="/cart" className="cart">
                            <div className="cart-items">
                                <div className="cart-icon-wrapper">
                                    <img src={cartIcon} alt="cart" />

                                    {/* Badge */}
                                    {itemCount > 0 && (
                                        <span className="cart-count">{itemCount}</span>
                                    )}
                                </div>
                                
                                <h5>Cart</h5>
                            </div>
                        </Link>

                    </section>
                </div>

            </section>

            {/* Nav links */}
            <section className="nav-links">
                <a href="" id="all-menu">
                    <i className="material-icons">menu</i>
                    <strong>All</strong>
                </a>
                <a href="">Today's Deals</a>
                <a href="">Gift Cards</a>
                <a href="">Sell</a>
                <a href="">Registry</a>
                <a href="">Prime Video</a>
                <a href="">Customer Service</a>
            </section>

        </nav>

        </>
        
    )
}

export default NavBar;