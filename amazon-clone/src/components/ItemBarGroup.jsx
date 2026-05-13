import "../styles/ItemBarGroup.css";

const ItemBarGroup = ({title, images}) => {
    return (
        <>
            <section className="best-sellers">
                <h3>{title}</h3>

                <div className="item-bar-group">

                    {images.map((image, index) => (
                        <a href="" key={index}>
                            <img src={image} alt="" />
                        </a>
                    ))
                    }
                    
                </div>
            </section>
        </>
    )
}

export default ItemBarGroup;