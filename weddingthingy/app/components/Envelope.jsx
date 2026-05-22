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
  useGSAP(() => {
    const path = container.current?.querySelector("#stroke-path");
    if (!path) return;

    const pathLength = path.getTotalLength();

    // 1. Instantly hide the vine path using stroke offsets
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    // 2. Animate the vine drawing itself onto the envelope wrapper
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.out",
      delay: 0.4 // Small breathing-room delay for page transitions
    });
  }, { scope: container });

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
    tl.to([".top-flap", ".envelope-body", ".envelope-back", ".envelope-vine-background"], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })
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
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 391 577"
            fill="none"
            preserveAspectRatio="xMidYMid meet" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="stroke-path"
              d="M315.657 37.3113C104.217 -39.9995 -34.3431 124.311 46.6569 180.311C127.657 236.311 295.016 36.5811 337.657 201.311C380.298 366.041 17.3299 571.489 54.6569 366.311C91.984 161.133 339.657 125.311 371.657 387.311C403.657 649.311 4.65695 535.311 4.65695 535.311"
              stroke="#152902"
              strokeWidth="74" /* Tweak this value to match your art aesthetic */
              strokeLinecap="round"
            />
          </svg>
        </div>
      <div className="envelope-wrapper">
        {/* 1. BACK LAYER */}
        <div className="envelope-back" />

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
        <ResponsiveImage
          src="/images/envelopebodyfinalchice-removebg-preview.png"
          alt="Envelope Body"
          className="envelope-body"
          objectFit="contain"
        />

       

        {/* 5. FLAP LAYER — rotates 180° on stage 1 */}
        <div className="top-flap">
          <ResponsiveImage
            src="/images/closeflapfinalchoice-removebg-preview.png"
            alt="Envelope Flap"
            className="flap-image"
            objectFit="contain"
            priority
          />
        </div>

        {/* 6. SEAL LAYER — only visible when closed, triggers stage 1 */}
        {animationStage === "closed" && (
          <ResponsiveImage
            src="/images/seal-removebg-preview.png"
            onClick={handleOpenFlap}
            alt="Wax Seal"
            className="wax-seal"
            objectFit="contain"
          />
        )}
      </div>
    </div>
  );
};

export default Envelope;