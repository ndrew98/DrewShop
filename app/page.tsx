"use client";
import React from "react";
import Navbar from "./components/Navbar";
import HeaderSlider from "./components/HeaderSlider";
import HomeProducts from "./components/HomeProducts";
import FeaturedProduct from "./components/FeaturedProduct";
import Banner from "./components/Banner";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        {/* <NewsLetter /> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
