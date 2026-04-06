import React from "react";
import ResponsiveImage from "./components/ResponsiveImage"; // Adjust path as needed
import "./page.css";

const Page = () => {
  return (
    <>
      <section className="hero">
        <h1>ME WED DIVINE</h1>
      </section>

      <section className="spotlight">
        <div className="row">
          <ResponsiveImage
            src="/images/image1.svg"
            alt="desc"
            width="50%"
            height="400px"
            className="img-container"
          />
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur quod cum officiis aut odio debitis quisquam. Reiciendis,
                et magnam laboriosam aspernatur accusamus suscipit?
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <ResponsiveImage
            src="/images/image2.jpg"
            alt="desc"
            width="50%"
            height="400px"
            className="img-container"
          />
        </div>

        <div className="row">
          <ResponsiveImage
            src="/images/image3.jpg"
            alt="desc"
            width="50%"
            height="400px"
            className="img-container"
          />
        </div>
      </section>

      <section className="outro">SHE SAID YES</section>
    </>
  );
};

export default Page;
