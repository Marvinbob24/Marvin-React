

import image1 from "./image/hero 1.png";
import image2 from "./image/hero 2.png";
import image3 from "./image/hero 4.png";
import "./hero.css";
import { useState } from "react";
import { Button } from "../button/button";

const Images = [
  {
    image: image1,
    h1: "Football",
    text: "Show your team spirit",
    h2: "Authentic jersey, carves, and exclusive gear for true supporters",
    class: "image-sparkle",
  },
  {
    image: image2,
    text: "Court-side Style",
    h1: "Basketball",
    h2: "Represent your team with our premium basketball collection",
    class: "image-power",
  },
  {
    image: image3,
    text: "Serve in Style",
    h1: "Tennis",
    h2: "Elevate your game with our premium tennis apparel and accessories",
    class: "image-reality",
  },
];

const Hero = () => {
  const [viewed, setViewed] = useState(0);

  const next = () => {
    setViewed((curr) => (curr + 1) % Images.length);
  };

  const prev = () => {
    setViewed((curr) => (curr - 1 + Images.length) % Images.length);
  };

  return (
    <div className="hero-container">
      {/* Left preview (desktop only) */}
      <div className="left-side" onClick={prev}>
        <img
          key={viewed}
          src={Images[(viewed - 1 + Images.length) % Images.length].image}
          alt=""
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        >
          Previous
        </button>
      </div>

      {/* Main hero */}
      <div className={Images[viewed].class}>
        <p>{Images[viewed].text}</p>
        <h1>{Images[viewed].h1}</h1>
        <h3>{Images[viewed].h2}</h3>

        <div className="image-wrapper">
          <img
            src={Images[viewed].image}
            key={viewed}
            className="fade-in"
            alt=""
          />

          {/* 👇 Overlay buttons (mobile only) */}
          <button className="mobile-nav prev" onClick={prev}>
            ‹
          </button>
          <button className="mobile-nav next" onClick={next}>
            ›
          </button>
        </div>

        <div className="hoverBtn">
          <Button />
        </div>
      </div>

      {/* Right preview (desktop only) */}
      <div className="right-side" onClick={next}>
        <img key={viewed} src={Images[(viewed + 1) % Images.length].image} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Hero;
