import { Link } from "react-router-dom";

import "../styles/ItemGroup.css";

const ItemGroup = ({ title, items, variant }) => { 
    return (
        <div className={`item-group-container ${variant || ""}`}>

            <div className="container-content">
                
                <h3>{title}</h3>

                <div className="item-group">

                    {items.map((item, index) => (
                        <Link
                            to="/category"
                            key={index}
                            className={`item ${
                                variant === "card-3" && index === 0
                                    ? "featured-item"
                                    : ""
                            }`}
                        >
                            <img src={item.src} alt={item.label} />
                            <p>{item.label}</p>
                        </Link>
                    ))}

                </div>

            </div>
            
            <a href="" className="see-more">See more</a>

        </div>
    )
}

export default ItemGroup;
