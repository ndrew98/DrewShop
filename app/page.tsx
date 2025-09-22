"use client";
import React from "react";
import Navbar from "./Navbar";
import HeaderSlider from "./components/HeaderSlider";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        {/* <HomeProducts /> */}
        {/* <FeaturedProduct /> */}
        {/* <Banner /> */}
        {/* <NewsLetter /> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
