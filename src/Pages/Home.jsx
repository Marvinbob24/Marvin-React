// src/pages/Home.jsx
import React from 'react';
import Layout from '../components/Layouts/Layout';
import Hero from '../components/Hero/hero';
import FanArtSection from '../components/fanart/fanart';
import BestSellingProducts from '../components/BestSelling/bestSelling';
import FeaturesSection from '../components/Features/Features';
import Testimonials from '../components/Test/Test';
import Newsletter from '../components/News/News';


const Home = () => {
  return (
    <Layout>
      <Hero />
      <FanArtSection />
      <BestSellingProducts />
      <FeaturesSection />
      <Testimonials />
      <Newsletter />
      </Layout>
  );
};

export default Home;