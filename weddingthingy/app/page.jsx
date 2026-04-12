"use client";

import React, { useEffect } from "react";
import ResponsiveImage from "./components/ResponsiveImage"; // Adjust path as needed
import "./page.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const Page = () => {
  useEffect(() => {
    // 1. Register the plugin safely on the client
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis smooth scrolling
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 3. Select the path and calculate its length for drawing
    const path = document.getElementById("stroke-path");
    if (path) {
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;

      // 4. Animate the stroke being drawn on scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".spotlight",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    // Cleanup lenis on dismount to prevent memory leaks in React
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <section className="hero">
        <h1>ME WED DIVINE Lorem ipsum dolor sit,</h1>
      </section>

      <section className="spotlight">
        <div className="row">
          <ResponsiveImage
            src="/images/image1.svg"
            alt="desc"
            className="img-container"
            loading="eager"
            unoptimized={true}
          />
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <h2> CEREMONY OF LOVE</h2>
              <p style={{ textAlign: "center", textWrap: "balance" }}>
                OUR JOURNEY TOGETHER HAS BEEN THE GREATEST ADVENTURE OF OUR
                LIVES AND WE ARE SO HONOURED TO HAVE YOU WITNESS THE MOMENT WE
                SAY &quot;I DO&quot;
              </p>
            </div>
          </div>
          {/* </div>
          <div className="col">
            <ResponsiveImage
              src="/images/image2.jpg"
              alt="desc"
              className="img-container"
            />
          </div> */}
        </div>

        <div className="row">
          <div className="col">
            <ResponsiveImage
              src="/images/image3.jpg"
              alt="desc"
              className="img-container"
            />
          </div>
          <div className="col">
            <div className="card">
              <h2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam eaque rerum
              </h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Accusantium atque aliquid, possimus tempore magnam magni officia
                corporis ex quibusdam ullam soluta, ut eaque suscipit nesciunt
                ratione minus asperiores odio doloribus!
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <ResponsiveImage
            src="/images/image1.svg"
            alt="desc"
            className="img-container"
          />
        </div>

        <div className="svg-path">
          <svg
            width="391"
            height="577"
            viewBox="0 0 391 577"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="stroke-path"
              d="M315.657 37.3113C104.217 -39.9995 -34.3431 124.311 46.6569 180.311C127.657 236.311 295.016 36.5811 337.657 201.311C380.298 366.041 17.3299 571.489 54.6569 366.311C91.984 161.133 339.657 125.311 371.657 387.311C403.657 649.311 4.65695 535.311 4.65695 535.311"
              stroke="#152902ff"
              strokeWidth="34"
            />
          </svg>
        </div>
      </section>

      <section className="outro">
        <h1>SHE SAID YES</h1>
      </section>
    </>
  );
};

export default Page;
