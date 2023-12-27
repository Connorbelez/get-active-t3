import React from "react";
import phoneImg from "@/public/phone.svg";
import hero from "@/public/hero.svg";
// import { FaChevronRight } from "react-icons/fa";
// import { useGlobalContext } from "../../context";
import "./Hero.css";

const Hero = () => {

    return (
      <section className="hero" >
        <div className="hero-center">
          <article className="hero-info">
            <h1>
              Payments infrastructure <br />
              for the internet
            </h1>
            <p className="hero-text">
              Millions of companies of all sizes—from startups to Fortune 500s—use
              Stripe’s software and APIs to accept payments, send payouts, and
              manage their businesses online.
            </p>
            <span className="group">
              <button className="btn">
                Start now{" "}
                <span className="right-arrow">

                </span>
              </button>
              <div className="contact">
                Contact sales{" "}
                <span className="right-arrow">
  
                </span>
              </div>
            </span>
          </article>
          <article className="hero-images">
            <img src={phoneImg} alt="phone image" className="phone-img" />
          </article>
        </div>
      </section>
    );
  };
  
  export default Hero;