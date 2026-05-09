"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ResponsiveImage from "./ResponsiveImage";
import "./Envelope.css";

const Envelope = () => {
  const container = useRef();
  // "closed" → "opened" (flap up, card peeking) → "pulled" (card fully out)
  const [animationStage, setAnimationStage] = useState("closed");
  const { contextSafe } = useGSAP({ scope: container });

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
      .to(".top-flap", { rotateX: 180, duration: 1.2 }, "-=0.2")
      .to(
        ".invitation-card",
        {
          y: "-10%", // card peeks out — still grabbable
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      );
  });

  // STAGE 2 — Click the peeking card: card slides fully out
  const handlePullCard = contextSafe(() => {
    if (animationStage !== "opened") return;
    setAnimationStage("pulled");

    gsap.to(".invitation-card", {
      y: "-85%",
      scale: 1.1,
      duration: 1.5,
      ease: "back.out(1.4)",
    });
  });

  return (
    <div ref={container} className="envelope-container">
      <div className="envelope-wrapper">
        {/* 1. BACK LAYER */}
        <div className="envelope-back" />

        {/* 2. CARD LAYER — gets its own click once the flap is open */}
        <div
          className={`invitation-card ${animationStage === "opened" ? "ready-to-pull" : ""}`}
          onClick={handlePullCard}
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

        {/* 4. FLAP LAYER — rotates 180° on stage 1 */}
        <div className="top-flap">
          <ResponsiveImage
            src="/images/closeflapfinalchoice-removebg-preview.png"
            alt="Envelope Flap"
            className="flap-image"
            objectFit="contain"
          />
        </div>

        {/* 5. SEAL LAYER — only visible when closed, triggers stage 1 */}
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
