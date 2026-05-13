import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Recommendations from "../../components/Recommendations";

import ItemGroup from "../../components/ItemGroup";
import ItemBarGroup from "../../components/ItemBarGroup";

// ItemGroup images
import img1 from '../../assets/landing/img1.jpg'
import img2 from '../../assets/landing/img2.jpg'
import img3 from '../../assets/landing/img3.jpg'
import img4 from '../../assets/landing/img4.jpg'
import img5 from '../../assets/landing/img5.jpg'
import img6 from '../../assets/landing/img6.jpg'
import img7 from '../../assets/landing/img7.jpg'
import img8 from '../../assets/landing/img8.jpg'
import img9 from '../../assets/landing/img9.jpg'
import img10 from '../../assets/landing/img10.jpg'
import img11 from '../../assets/landing/img11.jpg'
import img12 from '../../assets/landing/img12.jpg'
import img13 from '../../assets/landing/img13.jpg'
import img14 from '../../assets/landing/img14.jpg'
import img15 from '../../assets/landing/img15.jpg'
import img16 from '../../assets/landing/img16.jpg'
import img17 from '../../assets/landing/img17.jpg'
import img18 from '../../assets/landing/img18.jpg'
import img19 from '../../assets/landing/img19.jpg'
import img20 from '../../assets/landing/img20.jpg'
import img21 from '../../assets/landing/img21.jpg'
import img22 from '../../assets/landing/img22.jpg'
import img23 from '../../assets/landing/img23.jpg'
import img24 from '../../assets/landing/img24.jpg'
import img25 from '../../assets/landing/img25.jpg'
import img26 from '../../assets/landing/img26.jpg'
import img27 from '../../assets/landing/img27.jpg'
import img28 from '../../assets/landing/img28.jpg'
import img29 from '../../assets/landing/img29.jpg'

// ItemBarGroup images
import product1 from '../../assets/products/product1.jpg'
import product5 from '../../assets/products/product5.jpg'
import product9 from '../../assets/products/product9.jpg'
import product7 from '../../assets/products/product7.jpg'
import product4 from '../../assets/products/product4.jpg'
import product6 from '../../assets/products/product6.jpg'
import product10 from '../../assets/products/product10.jpg'
import product2 from '../../assets/products/product2.jpg'
import product8 from '../../assets/products/product8.jpg'
import product11 from '../../assets/products/product11.jpg'
import product3 from '../../assets/products/product3.jpg'
import product12 from '../../assets/products/product12.jpg'


import "../../styles/App.css";
import "../../styles/Home.css";

const Home = () => {

    // ItemGroup - Gaming items card
    const gamingItems = [
        { src: img5 },
    ];

    // ItemGroup - Home items card
    const homeItems = [
        { src: img1, label: "Kitchen & Dining" },
        { src: img2, label: "Home Improvements" },
        { src: img3, label: "Decor" },
        { src: img4, label: "Bedding & Bath" }
    ];

    // ItemGroup - Kitchen items card
    const kitchenItems = [
        { src: img6, label: "Cooker" },
        { src: img7, label: "Coffee" },
        { src: img8, label: "Pots and Pans" },
        { src: img9, label: "Kettles" }
    ];

    // ItemGroup - Gift items 1 card 
    const gitfItems1 = [
        { src: img10, label: "Apparel" },
        { src: img11, label: "Shoes" },
        { src: img12, label: "Jewelry" },
        { src: img13, label: "Handbangs" }
    ];

    // ItemGroup - Family items card
    const familyItems = [
        { src: img14, label: "Outdoor Play Sets" },
        { src: img15, label: "Learning Toys" },
        { src: img16, label: "Action Figures" },
        { src: img17, label: "Pretend Pay Toys" }
    ];

    // ItemGroup - Gear items card
    const gearItems = [
        { src: img18, label: "Clothing" },
        { src: img19, label: "Trackers" },
        { src: img20, label: "Equipment" },
        { src: img21, label: "Deals" }
    ];

    // ItemGroup - Travel items card
    const travelItems = [
        { src: img22, label: "Backpacks" },
        { src: img23, label: "Suitcases" },
        { src: img24, label: "Accessories" },
        { src: img25, label: "Handbangs" }
    ];

    // ItemGroup - Beauty items card
    const beautyItems = [
        { src: img26, label: "Makeup" },
        { src: img27, label: "Brushes" },
        { src: img28, label: "Sponges" },
        { src: img29, label: "Mirrors" }
    ];

    return (
        <>
            <NavBar />

            <div className="home-page">
               
                {/* Hero - Banner image */}
                <section className="banner"></section>

                {/* ItemGroup - row 1 */}
                <section className="home-grid">
                    <ItemGroup title="Get your game on" items={gamingItems} variant="card-1" />
                    <ItemGroup title="New home arrivals under $50" items={homeItems} />
                    <ItemGroup title="Top categories in Kitchen appliances" items={kitchenItems} variant="card-3" />
                    <ItemGroup title="Find gifts for Mom" items={gitfItems1} />
                </section>

                {/* ItemGroup - row 2 */}
                <section className="home-grid">
                    <ItemGroup title="Have more fun with family" items={familyItems} />
                    <ItemGroup title="Gear up to get fit" items={gearItems} />
                    <ItemGroup title="Most-loved travel essentials" items={travelItems} />
                    <ItemGroup title="Level up your beauty routine" items={beautyItems} />
                </section>
            
                {/* ItemBarGroup - 1 */}
                <ItemBarGroup 
                    title="Best Sellers in Clothing, Shoes & Jewelry" 
                    images={[product1, product5, product9, product7, product4, product6]} 
                />

                {/* ItemBarGroup - 2 */}
                <ItemBarGroup 
                    title="Based on your browsing history" 
                    images={[product10, product2, product8, product12, product3, product11]} 
                />

                {/* ItemGroup - row 2 */}
                <section className="home-grid">
                    <ItemGroup title="Have more fun with family" items={familyItems} />
                    <ItemGroup title="Gear up to get fit" items={gearItems} />
                    <ItemGroup title="Most-loved travel essentials" items={travelItems} />
                    <ItemGroup title="Level up your beauty routine" items={beautyItems} />
                </section>

                <Recommendations/>
                
                <Footer />
            </div>
        </>
    )
}

export default Home;