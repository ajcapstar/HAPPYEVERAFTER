import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <>
      <section className="hero">
        <h1>ME WED DIVINE</h1>
      </section>
      <section className="spotlight">
        <div className="row">
          <Image src="/images/image1.svg" alt="desc" fill />
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <h2></h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tenetur quod cum officiis aut odio debitis quisquam. Reiciendis,
                et magnam laboriosam aspernatur accusamus suscipit?
              </p>
            </div>
          </div>
        </div>

        <div className="row"></div>

        <div className="row"></div>
      </section>
      <section className="outro">SHE SAID YES</section>
    </>
  );
};

export default page;
