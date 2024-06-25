import React, { useState } from "react";
import Image from "next/image";
import Image1 from "public/Thumb1.png";
import Image2 from "public/Thumb2.webp";
import Image3 from "public/Thumb3.jpeg";

const ProductPage = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBuy = () => {
    alert("Product purchased!");
  };

  return (
    <div className="product-page">
      <div className="product-gallery">
        <Image src={Image1} alt={"image"} width={600} height={600} />{" "}
        <div className="thumbnail-images">
          <Image src={Image1} alt={"image"} width={400} height={400} />{" "}
          <Image src={Image2} alt={"image"} width={400} height={400} />{" "}
          <Image src={Image3} alt={"image"} width={400} height={400} />{" "}
        </div>
      </div>
      <div className="product-info">
        <h1 className="product-title">Product Name</h1>
        <div className="product-rating">★★★★☆ (100 reviews)</div>
        <div className="product-price">$99.99</div>
        <p className="product-description">
          The Nike Air Jordan series is synonymous with innovation, performance,
          and iconic style. Originally launched in 1985, the Air Jordan line
          revolutionized the sneaker industry and continues to set the standard
          for athletic footwear. Combining cutting-edge technology with timeless
          design, each pair of Air Jordans offers unparalleled comfort and
          support, making them a favorite among athletes and sneaker enthusiasts
          alike.
        </p>

        <ul className="product-specifications">
          <li>
            {" "}
            <strong style={{ color: "black" }}>Color:</strong> Multiple options
            available
          </li>
          <li>
            <strong style={{ color: "black" }}>Material:</strong> Mesh upper
            with synthetic overlays
          </li>
          <li>
            <strong style={{ color: "black" }}>Midsole:</strong> Dual-density
            foam midsole with Max Air in the heel
          </li>
          <li>
            <strong style={{ color: "black" }}>Outsole:</strong> Rubber outsole
            for traction and durability
          </li>
          <li>
            <strong style={{ color: "black" }}>Closure:</strong> Lace-up closure
          </li>
        </ul>
        <div className="product-actions">
          <button className="buy-button" onClick={handleBuy}>
            Buy Now
          </button>
          <button
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            {liked ? "Liked" : "Like"}
          </button>
        </div>
      </div>
      <div className="product-reviews">
        <h2>User Reviews</h2>
        <div className="review">
          <h3>Jane Doe</h3>
          <div className="review-rating">★★★★☆</div>
          <p style={{ color: "black" }}>
            Great shoes! Very comfortable and stylish. Perfect for running and
            casual wear.
          </p>
        </div>
        <div className="review">
          <h3>John Smith</h3>
          <div className="review-rating">★★★★★</div>
          <p style={{ color: "black" }}>
            Best purchase I've made this year. The Air Max 270 provides
            excellent support and cushioning.
          </p>
        </div>
        <div className="review">
          <h3>Alice Johnson</h3>
          <div className="review-rating">★★★☆☆</div>
          <p style={{ color: "black" }}>
            The shoes are good, but I had an issue with the sizing. They run a
            bit small.
          </p>
        </div>
        <div className="review">
          <h3>Jane Doe</h3>
          <div className="review-rating">★★★★☆</div>
          <p style={{ color: "black" }}>
            Great shoes! Very comfortable and stylish. Perfect for running and
            casual wear.
          </p>
        </div>
        <div className="review">
          <h3>Akki</h3>
          <div className="review-rating">★★★★★</div>
          <p style={{ color: "black" }}>Greate fit</p>
        </div>
        <div className="review">
          <h3>Alice </h3>
          <div className="review-rating">★★★☆☆</div>
          <p style={{ color: "black" }}>Best shoes</p>
        </div>
        <div className="review">
          <h3>Jane Doe</h3>
          <div className="review-rating">★★★★☆</div>
          <p style={{ color: "black" }}>
            Great shoes! Very comfortable and stylish. Perfect for running and
            casual wear.
          </p>
        </div>
        <div className="review">
          <h3>John Smith</h3>
          <div className="review-rating">★★★★★</div>
          <p style={{ color: "black" }}>
            Best purchase I've made this year. The Air Max 270 provides
            excellent support and cushioning.
          </p>
        </div>
        <div className="review">
          <h3>Alice Johnson</h3>
          <div className="review-rating">★★★☆☆</div>
          <p style={{ color: "black" }}>
            The shoes are good, but I had an issue with the sizing. They run a
            bit small.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
