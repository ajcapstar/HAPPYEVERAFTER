import React from "react";
import ResponsiveImage from "./components/ResponsiveImage"; // Adjust path as needed
import "./page.css";

const Page = () => {
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
          />
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur quod cum officiis aut odio debitis quisquam. Reiciendis,
                et magnam laboriosam aspernatur accusamus suscipit? Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Eaque quis sit
                exercitationem autem accusantium vero recusandae atque facilis a
                sapiente.
              </p>
            </div>
          </div>
          <div className="col">
            <ResponsiveImage
              src="/images/image2.jpg"
              alt="desc"
              className="img-container"
            />
          </div>
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
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M315.657 37.3113C104.217 -39.9995 -34.3431 124.311 46.6569 180.311C127.657 236.311 295.016 36.5811 337.657 201.311C380.298 366.041 17.3299 571.489 54.6569 366.311C91.984 161.133 339.657 125.311 371.657 387.311C403.657 649.311 4.65695 535.311 4.65695 535.311"
              stroke="#81AEE3"
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
