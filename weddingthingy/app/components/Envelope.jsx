"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ResponsiveImage from "./ResponsiveImage";
import AnimatedTree from "./AnimatedTree";
import "./Envelope.css";

const Envelope = () => {
  const container = useRef();
  // "closed" → "opened" → "revealing" → "revealed"
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
      y: 20,
      duration: 0.6,
      ease: "back.in(1.7)",
    })
      .to(".top-flap", { rotateX: 180, y: 70, duration: 1.2 }, "-=0.2")
      .set(".top-flap", { zIndex: 15 }, "-=0.6")
      .to(
        ".invitation-card",
        {
          y: "-20%",
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
      {/* 4. HERO VINE LAYER */}
      <div className="envelope-vine-background">
        <ResponsiveImage
          src="/images/Gemini_Generated_Image_oizin1oizin1oizi.jpg"
          alt="Envelope Background"
          style={{ width: "100%", height: "100%", margin: "0 auto" }}
          objectFit="contain"
          priority
        />
        <AnimatedTree />
      </div>

      <div className="envelope-wrapper">
        {/* 1. BACK LAYER */}
        <div className="envelope-backgroundimage">
          <ResponsiveImage
            src="/images/image2.jpg"
            style={{ width: "100%", height: "100%", margin: "0 auto" }}
            alt="Envelope Background"
            className="envelope-back"
            objectFit="contain"
            priority
          />
        </div>

        {/* 2. CARD LAYER */}
        <div
          className={`invitation-card ${animationStage === "opened" ? "ready-to-pull" : ""}`}
          onClick={animationStage === "opened" ? handleFinalReveal : undefined}
        >
          <div className="card-border" />
          <h2 className="card-title">Rachel & Michael</h2>
          <div className="card-divider" />
          <p className="card-subtitle">Save The Date</p>
        </div>

        {/* 3. BODY LAYER */}
        <ResponsiveImage
          src="/images/envelopebodyfinalchice-removebg-preview.png"
          alt="Envelope Body"
          className="envelope-body"
          objectFit="contain"
        />

        {/* 5. FLAP LAYER */}
        <div className="top-flap">
          <ResponsiveImage
            src="/images/closeflapfinalchoice-removebg-preview.png"
            alt="Envelope Flap"
            className="flap-image"
            objectFit="contain"
            priority
          />
        </div>

        {/* 6. SEAL LAYER */}
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
