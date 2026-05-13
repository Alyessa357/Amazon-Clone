import {useCartContext} from "../features/cart/cartContext";
import "../styles/Item.css";

const Item = ({img, title, rating, sales, price}) => {

    const {addToCart} = useCartContext();

    return (
        <div className="product-card">

            <img src={img} alt={title} className="product-img"/>

            <h4 className="product-title">{title}</h4>

            <div className="product-rating">
                ⭐ {rating} <span>({sales})</span>
            </div>

            <h3 className="product-price">R {price}</h3>

            <button 
                className="add-btn"
                onClick={() => addToCart({
                    id: title,
                    img,
                    title,
                    rating,
                    sales,
                    price
                })}
            >
                Add to cart
            </button>

        </div>
    )
}

export default Item;