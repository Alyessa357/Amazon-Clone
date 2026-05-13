import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Recommendations from "../../components/Recommendations";
import Item from "../../components/Item";
import SortByDropdown from "../../components/SortByDropdown";
import { SORT_OPTION_IDS, sortProducts } from "../../features/products/sortOptions";
import products from "../../features/products/data";
import { useMemo, useState } from "react";
import { useSearch } from "../../features/searchContext";
import { useCartContext } from "../../features/cart/cartContext";
import { Link } from "react-router-dom";

import '../../styles/Category.css'

const Category = () => {

    const { query } = useSearch();

    const { cart, total, addToCart, removeFromCart } = useCartContext();

    const [sortBy, setSortBy] = useState(SORT_OPTION_IDS.featured);

    const filteredProducts = useMemo(
        () =>
            products.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            ),
        [query]
    );

    const sortedProducts = useMemo(
        () => sortProducts(filteredProducts, sortBy),
        [filteredProducts, sortBy]
    );

    const totalResults = filteredProducts.length;
    const q = query.trim();

    return(
        <>
            <NavBar />

            <div className="category-page">
                
                {/* PRODUCT SORTING - AI FEATURE 2 */}
                <div className="results-toolbar">
                    <p className="results-toolbar__line">
                        {totalResults === 0 ? (
                            <>0 results</>
                        ) : (
                        <>
                            1-{totalResults} of {totalResults} result{totalResults !== 1 ? "s" : ""}
                            {q ? (
                                <>
                                    {" "}for <span className="results-query">&quot;{q}&quot;</span>
                                </>
                            ) : null}
                        </>
                        )}
                    </p>

                    <SortByDropdown value={sortBy} onChange={setSortBy} className="sort-by" />
                </div>
                
                {/* MAIN SECTION */}
                <main>

                    {/* SIDEBAR */}
                    <aside>
                
                        <h5>Popular Shopping Ideas</h5>
                        <ul>
                            <li>Sets</li>
                            <li>Table</li>
                            <li>Light</li>
                        </ul>

                        <div className="reviews">
                            <h5>Customer Reviews</h5>
                            <span>⭐⭐⭐⭐</span>
                            <span className="review-text">& Up</span>
                        </div>

                        <div className="price-range">
                            <h5>Price</h5>
                            <h5>R0 - R5000</h5>
                            <span>Reset price range</span>
                        </div>

                        <p className="price-range-scale">Clear</p>
                        <ul>
                            <li>Up to $10</li>
                            <li>$10 to $20</li>
                            <li>$20 to $25</li>
                            <li>$25 to $30</li>
                            <li>$30 & above</li>
                        </ul>

                        <h5>Deals & Discounts</h5>
                        <ul>
                            <li>All Discounts</li>
                            <li>Buy More, Save More</li>
                            <li>Coupons</li>
                            <li>Today's Deals</li>
                        </ul>

                        <h5>Condition</h5>
                        <div className="filter-option">
                            <label>
                                <input type="checkbox" />
                                New
                            </label>
                            <label>
                                <input type="checkbox" />
                                Used
                            </label>
                        </div>

                        <h5>Brands</h5>
                        <div className="filter-option">
                            <label>
                                <input type="checkbox" />
                                Oneida
                            </label>
                            <label>
                                <input type="checkbox" />
                                Amazon Basics
                            </label>
                            <label>
                                <input type="checkbox" />
                                Cuisinart
                            </label>
                            <label>
                                <input type="checkbox" />
                                OXO
                            </label>
                            <label>
                                <input type="checkbox" />
                                Corelle
                            </label>
                            <label>
                                <input type="checkbox" />
                                Mikasa
                            </label>
                            <label>
                                <input type="checkbox" />
                                Lenox
                            </label>
                        </div>
                        
                        <h5>Seller</h5>
                        <div className="filter-option">
                            <label>
                                <input type="checkbox" />
                                diythinker
                            </label>
                            <label>
                                <input type="checkbox" />
                                Amazon.com
                            </label>
                        </div>
                        
                        <h5>All Top Brands</h5>
                        <div className="filter-option">
                            <label>
                                <input type="checkbox" />
                                Top Brands
                            </label>
                        </div>

                        <h5>From Our Brands</h5>
                        <div className="filter-option">
                            <label>
                                <input type="checkbox" />
                                Amazon Brands
                            </label>
                        </div>

                        <h5>Premium Brands</h5>
                        <div className="filter-option">
                            <label>
                                <input type="checkbox" />
                                Premium Brands
                            </label>
                        </div>

                        <h5>Sustainability Features</h5>
                        <ul className="">
                            <li>Any Feature</li>
                            <li>Carbon Impact</li>
                        </ul>

                        <h5>Handmade Products</h5>
                        <div className="filter-option">
                            <label>
                                <input type="checkbox" />
                                Handmade
                            </label>
                        </div>

                        <h5>Customizable Products</h5>
                        <div className="filter-option">
                            <label>
                                <input type="checkbox" />
                                Customizable
                            </label>
                        </div>

                        <h5>Department</h5>
                        <ul>
                            <li>Home & Kitchen</li>
                            <li>Carbon Impact</li>
                        </ul>
                
                    </aside>

                    {/* PRODUCTS SECTION*/}
                    <section className="products">

                        <h2>Results</h2>
                        <p>Check each product page for other buying options. Price and other details may vary based on product size and color.</p>
                        
                        <div className="product-grid">
                            {sortedProducts.map(product => (
                                <Item key={product.id} {...product} />
                            ))}
                        </div>

                    </section>

                    {/* MINI SIDE CART */}
                    {cart.length > 0 && (

                        <section className="mini-cart">

                            <div className="mini-cart-subtotal">
                                <h1>Subtotal</h1>
                                <h2>R{total.toFixed(2)}</h2>
                                <Link to="/cart">
                                    <button>Go to Cart</button>
                                </Link>
                            </div>
                            

                            {cart.map(item => (

                                <div key={item.id} className="mini-cart-item" >

                                    <img src={item.img} alt={item.title} />

                                    <div className="mini-cart-item-info">
                                        <p>R{item.price}</p> 

                                        <div className="mini-qty">
                                            <button onClick={() => removeFromCart(item)}> - </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => addToCart(item)}> + </button>
                                        </div>
                                    </div>

                                </div>

                            ))}

                        </section>

                    )}
                    
                </main>

                <Recommendations/>
                
                <Footer />
            </div>
           
        </>
    )
}

export default Category;
