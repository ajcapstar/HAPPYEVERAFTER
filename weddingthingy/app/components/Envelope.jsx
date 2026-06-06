"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ResponsiveImage from "./ResponsiveImage";
import "./Envelope.css";

const Envelope = () => {
  const container = useRef();
  // "closed" → "opened" → "revealing" → "revealed"
  const [animationStage, setAnimationStage] = useState("closed");
  const { contextSafe } = useGSAP({ scope: container });

  // ON LOAD ANIMATION — Runs automatically when the page loads to draw the vine out
  useGSAP(
    () => {
      const paths = container.current?.querySelectorAll(".stroke-path");
      if (!paths || paths.length === 0) return;

      paths.forEach((path) => {
        const pathLength = path.getTotalLength();

        // 1. Instantly hide the vine path using stroke offsets
        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        // 2. Animate the vine drawing itself onto the envelope wrapper
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 7,
          ease: "power2.out",
          delay: 0.4, // Small breathing-room delay for page transitions
        });
      });
    },
    { scope: container },
  );

  // STAGE 1 — Click the seal: seal drops, flap opens, card peeks
  const handleOpenFlap = contextSafe(() => {
    if (animationStage !== "closed") return;
    setAnimationStage("opened");

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    tl.to(".wax-seal", {
      scale: 1.2,
      opacity: 0,
      y: 20, // seal "drops" slightly before vanishing
      duration: 0.6,
      ease: "back.in(1.7)",
    })
      .to(".top-flap", { rotateX: 180, y: 70, duration: 1.2 }, "-=0.2")
      .set(".top-flap", { zIndex: 15 }, "-=0.6") // Mid-way through flip, move behind card
      .to(
        ".invitation-card",
        {
          y: "-20%", // card peeks out — still grabbable
          duration: 1,
          ease: "power2.out",
        },
        "+=0.6",
      );
  });

  // STAGE 2 — Click the peeking card: Zoom effect + fade to reveal site
  const handleFinalReveal = contextSafe(() => {
    if (animationStage !== "opened") return;
    setAnimationStage("revealing");

    const tl = gsap.timeline({
      onComplete: () => setAnimationStage("revealed"),
    });

    // 1. Envelope pieces AND the heroic vine background fade out first
    tl.to(
      [
        ".top-flap",
        ".envelope-body",
        ".envelope-back",
        ".envelope-vine-background",
      ],
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
    )
      // 2. Invitation card zoom effect
      .to(".invitation-card", {
        scale: 4,
        clipPath: "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)",
        duration: 1.5,
        ease: "power2.inOut",
        onStart: () => {
          gsap.to(
            ".invitation-card .card-title, .invitation-card .card-divider, .invitation-card .card-subtitle",
            {
              scale: 0.25,
              duration: 1.5,
              ease: "power2.inOut",
            },
          );
        },
      })
      // 3. Final container fade to reveal the site
      .to(
        ".envelope-container",
        {
          opacity: 0,
          duration: 0.6,
        },
        "-=0.8",
      );
  });

  if (animationStage === "revealed") return null;

  return (
    <div ref={container} className="envelope-container">
      {/* 4. HERO VINE LAYER — Placed dynamically right over envelope body, behind seal & flap */}
      <div className="envelope-vine-background">
        {/* <svg
          className="vine-1"
          width="100%"
          height="100%"
          viewBox="0 0 391 577"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-path"
            d="M315.657 37.3113C104.217 -39.9995 -34.3431 124.311 46.6569 180.311C127.657 236.311 295.016 36.5811 337.657 201.311C380.298 366.041 17.3299 571.489 54.6569 366.311C91.984 161.133 339.657 125.311 371.657 387.311C403.657 649.311 4.65695 535.311 4.65695 535.311"
            stroke="#074d20ff"
            strokeWidth="44"
            strokeLinecap="round"
          />
        </svg> */}

        <svg
          className="vine-2"
          width="100%"
          height="100%"
          viewBox="0 0 391 577"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-path"
            d="M87 1.45815C67.4 19.8581 42.8333 15.7915 33 11.4581C11 1.45815 3.16667 15.9581 2 24.4581C1.99996 36.4581 13.4999 32.5153 17.5 30.4581C21.5001 28.401 21.6667 20.4581 20.5 17.9581"
            stroke="#044C38"
            strokeWidth="4"
          />
        </svg>
        <svg
          className="Br-vine-3"
          width="50%"
          height="50%"
          viewBox="0 0 310 291"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="vine-grow-mask">
              {/* This is your new simple center line path from Step 1 */}
              <path
                className="stroke-path"
                d="M122.377 148L123.859 160.412L122.377 148ZM253.377 62.0005L264.934 66.7638L265.091 66.382L265.223 65.9907L253.377 62.0005ZM299.237 24.9709C306.124 24.4959 311.323 18.5277 310.848 11.6405C310.373 4.75326 304.404 -0.44487 297.517 0.0301094L298.377 12.5005L299.237 24.9709ZM17.3771 302L29.1094 297.687C18.7177 269.422 29.0636 237.063 50.4888 209.555C72.02 181.91 101.809 163.045 123.859 160.412L122.377 148L120.895 135.589C89.9452 139.284 54.7342 163.419 30.7654 194.193C6.6906 225.103 -8.96346 266.579 5.64489 306.314L17.3771 302ZM122.377 148L123.859 160.412C209.27 150.214 253.249 95.1141 264.934 66.7638L253.377 62.0005L241.82 57.2372C233.172 78.2202 196.285 126.587 120.895 135.589L122.377 148ZM253.377 62.0005L265.223 65.9907C276.894 31.3423 295.966 25.1965 299.237 24.9709L298.377 12.5005L297.517 0.0301094C281.455 1.13784 255.46 16.6586 241.531 58.0103L253.377 62.0005Z"
                stroke="white"
                strokeWidth="60" // Ensures the white spotlight is wide enough to cover your vine
                strokeLinecap="round"
                fill="none"
              />
            </mask>
          </defs>
          <path
            mask="url(#vine-grow-mask)"
            // className="stroke-path"
            d="M0.367058 287.863C7.59442 286.621 14.8218 285.379 22.0491 284.137C20.0778 277.786 18.8666 271.216 18.4669 264.578C18.0961 258.421 18.4237 252.219 19.4337 246.136C20.789 237.958 23.3226 230 26.5378 222.366C27.2993 220.556 29.3818 219.351 30.1676 217.597C31.0076 215.722 31.4264 213.684 31.9237 211.605C32.4617 209.333 31.4055 206.141 32.584 204.1C34.7981 200.265 37.2263 196.509 39.8231 192.897C41.746 190.223 44.709 188.376 47.3967 186.394C48.908 185.28 51.2658 184.94 52.4692 183.615C53.5667 182.407 54.2179 180.765 55.1312 179.337C57.6812 175.326 59.8764 170.581 63.5911 167.565C64.7195 166.649 67.3579 167.759 68.7665 167.324C70.1897 166.878 71.5924 166.481 72.7013 165.71C74.1103 164.73 73.3373 160.448 74.8645 159.497C82.7228 154.623 91.264 150.76 99.6989 149.44L99.923 149.402C125.6 144.513 150.454 136.272 174.112 125.391C176.883 124.112 181.321 126.277 184.124 124.879C184.124 124.879 184.124 124.879 184.124 124.879C184.124 124.879 184.124 124.879 184.124 124.879C186.682 123.602 189.221 122.293 191.746 120.944C193.543 119.984 195.121 118.485 196.687 117.097C199.62 114.505 201.848 110.818 205.011 108.706C221.703 96.8653 239.664 85.042 248.438 63.4612C254.48 47.6006 264.246 31.2024 274.847 16.8936C279.01 11.6258 284.205 5.01886 289.208 4C289.721 3.98287 290.214 3.75716 290.576 3.38237C290.939 3.00701 291.143 2.51331 291.143 2C291.143 1.48669 290.939 0.992989 290.576 0.617629C290.214 0.242843 289.721 0.0171254 289.208 0C279.769 1.63791 275.808 8.25847 270.668 13.4663C258.588 27.8797 248.182 42.655 239.978 60.5388C232.613 76.3027 214.642 87.9528 198.163 97.6552C195.018 99.4509 190.883 99.5085 187.381 100.532C185.5 101.081 183.52 101.53 181.851 102.421C179.503 103.675 177.138 104.896 174.75 106.087C174.75 106.087 174.75 106.087 174.75 106.087C174.75 106.087 174.75 106.087 174.75 106.087C172.158 107.38 171.223 112.126 168.544 113.372C145.878 123.87 121.946 131.898 97.4932 136.598L97.7173 136.56C86.6165 138.363 76.9174 142.966 67.9971 148.459C66.3175 149.504 62.4504 147.261 60.714 148.467C59.3809 149.394 58.3445 150.762 57.3351 152.149C56.3232 153.538 56.6307 156.471 55.3968 157.473C51.3172 160.785 46.0347 162.884 41.5636 166.036C39.9864 167.148 38.2017 168.089 36.9235 169.497C35.5155 171.047 35.3184 173.64 34.3515 175.493C32.6029 178.82 31.3665 182.39 29.2676 185.309C26.4213 189.268 23.7582 193.387 21.3265 197.598C20.0471 199.814 16.6742 200.89 14.9874 202.993C13.4612 204.894 11.987 206.815 11.0028 209.012C10.0761 211.081 10.5539 213.694 9.78225 215.79C6.49633 224.713 4.2162 233.982 2.66282 243.354C1.50481 250.334 0.71481 257.397 0.313895 264.535C-0.120203 272.231 -0.105511 280 0.367058 287.863Z"
            fill="black"
          />
        </svg>
        <svg
          className="vine-3"
          width="310"
          height="291"
          viewBox="0 0 310 291"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-path"
            d="M114.45 209.948C117.45 213.448 120.85 220.448 110.45 220.448C106.617 219.615 100.05 215.248 104.45 204.448C106.617 200.615 113.45 194.948 123.45 202.948C129.45 208.282 135.75 223.348 112.95 240.948C109.95 243.282 100.85 248.748 88.4502 251.948C84.1169 252.948 73.7502 253.548 66.9502 247.948C62.1169 245.115 49.0502 240.548 35.4502 244.948C28.2836 247.782 12.4502 257.148 6.45023 271.948C5.45023 274.115 3.35023 280.848 2.95023 290.448C-2.24977 267.248 7.78356 246.115 13.4502 238.448M13.4502 238.448C18.2502 232.848 16.9502 217.948 16.9502 211.448C16.9502 194.248 14.9502 187.676 11.9502 183.448C3.15023 171.048 6.95023 152.948 9.95023 145.448M13.4502 238.448C32.6502 216.848 52.7836 216.782 60.4502 219.448C67.2502 222.248 66.9502 230.615 65.9502 234.448C64.3502 241.248 53.9502 240.948 55.9502 234.448C57.9502 226.848 61.7836 220.615 63.4502 218.448C69.4502 210.448 79.4502 220.448 78.4502 227.948C78.4502 234.348 73.1169 237.615 70.4502 238.448M13.4502 238.448C26.2502 200.448 43.4502 182.676 51.4502 177.948M13.4502 238.448C39.8502 202.848 71.7836 189.948 84.4502 187.948C112.05 184.348 138.303 156.448 141.95 140.948C157.95 72.9484 192.95 24.615 208.45 8.94836M93.9502 120.948C94.2836 112.782 91.6502 97.1484 78.4502 99.9484C73.4502 100.615 66.1502 105.348 76.9502 118.948C78.9502 121.782 81.7502 131.048 76.9502 145.448C74.7836 152.448 65.9502 169.38 51.4502 177.948M199.95 44.9484C205.284 59.7817 209.35 94.8484 182.95 116.448C161.617 134.782 105.45 172.748 51.4502 177.948M191.45 131.948C192.784 136.782 194.45 147.948 180.95 150.948C175.45 151.448 173.95 153.276 159.95 147.948C143.45 142.782 98.6502 141.548 51.4502 177.948M76.9502 118.948C60.5502 102.148 58.1169 116.282 58.9502 125.448C60.1502 142.648 49.1169 140.615 43.4502 137.448C35.8502 132.248 39.2836 121.282 41.9502 116.448M279.95 1.44836C280.617 6.7817 280.35 18.5484 273.95 22.9484C265.45 28.4484 268.85 31.7484 258.45 44.9484C252.45 67.4484 228.95 113.248 182.95 116.448M273.95 22.9484C291.95 8.54836 305.117 2.61503 309.45 1.44836M159.95 147.948C187.55 160.348 200.95 156.948 211.95 145.448M211.95 145.448C222.75 131.448 227.117 123.615 227.95 121.448M211.95 145.448C237.15 131.448 247.117 138.948 248.95 144.448C253.45 158.948 239.784 161.948 233.45 158.948C228.25 156.148 228.95 151.448 229.95 149.448C231.55 145.448 235.617 146.448 237.45 147.448M180.95 150.948C186.55 145.348 193.617 146.282 196.45 147.448C201.45 149.948 203.45 147.718 204.95 146.448C211.45 140.948 208.284 131.448 206.95 127.448"
            stroke="black"
            strokeWidth="3"
          />
        </svg>

        <svg
          className="vine-4"
          width="15"
          height="49"
          viewBox="0 0 15 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-path"
            d="M10.3552 48.4721C11.8459 45.4907 13.3366 42.5093 14.8273 39.5279C14.4365 39.1656 14.1056 38.8057 13.8047 38.4386C12.7841 37.17 12.1197 35.8695 11.4574 34.1461C11.0353 33.0538 8.24933 32.116 8.04733 30.4194C7.85246 28.7696 7.80991 27.0552 7.87782 25.3202C7.95964 23.2508 8.54335 21.2004 9.0011 19.1516L9.05504 18.5C9.0777 18.0579 9.09127 17.6158 9.09127 17.1736C9.09127 16.1578 9.09127 15.1419 9.09127 14.1261C9.09127 13.2554 8.8263 12.3846 8.59127 11.5139C8.22168 10.1446 7.09127 8.77537 7.09127 7.40611C7.09127 5.72063 7.5574 4.03515 8.48967 2.34967C8.92288 1.56645 9.45675 0.783223 10.0913 2.89969e-07C6.75794 9.66562e-08 3.42461 -9.66562e-08 0.0912719 -2.89969e-07C0.725795 0.783222 1.25966 1.56645 1.69288 2.34967C2.62514 4.03515 3.09127 5.72063 3.09127 7.40611C3.09127 8.77537 1.96086 10.1446 1.59127 11.5139C1.35625 12.3846 1.09127 13.2554 1.09127 14.1261C1.09127 15.1419 1.09127 16.1578 1.09127 17.1736C1.09127 17.6158 1.10484 18.0579 1.12751 18.5L1.18144 17.8484C0.903532 20.2205 0.97868 22.6329 0.883207 25.0456C0.804245 27.0786 0.848739 29.1441 1.09578 31.2416C1.33274 33.2485 -0.663907 35.9913 0.233283 38.3909C1.47076 41.7561 3.99466 45.1454 7.37193 47.1065C8.33718 47.6784 9.33117 48.1264 10.3552 48.4721Z"
            stroke="black"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="envelope-wrapper">
        {/* 1. BACK LAYER */}
        {/* <div className="envelope-backgroundimage">
          <ResponsiveImage
            src="/images/image2.jpg"
            style={{ width: "100%", height: "100%", margin: "0 auto" }}
            alt="Envelope Background"
            className="envelope-back"
            objectFit="contain"
            priority
          />
        </div> */}

        {/* 2. CARD LAYER — gets its own click once the flap is open */}
        <div
          className={`invitation-card ${animationStage === "opened" ? "ready-to-pull" : ""}`}
          onClick={animationStage === "opened" ? handleFinalReveal : undefined}
        >
          <div className="card-border" />
          <h2 className="card-title">Rachel &amp; Michael</h2>
          <div className="card-divider" />
          <p className="card-subtitle">Save The Date</p>
        </div>

        {/* 3. BODY LAYER — pointer-events: none so clicks reach the card */}
        {/* <ResponsiveImage
          src="/images/envelopebodyfinalchice-removebg-preview.png"
          alt="Envelope Body"
          className="envelope-body"
          objectFit="contain"
        /> */}

        {/* 5. FLAP LAYER — rotates 180° on stage 1 */}
        {/* <div className="top-flap">
          <ResponsiveImage
            src="/images/closeflapfinalchoice-removebg-preview.png"
            alt="Envelope Flap"
            className="flap-image"
            objectFit="contain"
            priority
          />
        </div> */}

        {/* 6. SEAL LAYER — only visible when closed, triggers stage 1 */}
        {/* {animationStage === "closed" && (
          <ResponsiveImage
            src="/images/seal-removebg-preview.png"
            onClick={handleOpenFlap}
            alt="Wax Seal"
            className="wax-seal"
            objectFit="contain"
          />
        )} */}
      </div>
    </div>
  );
};

export default Envelope;
