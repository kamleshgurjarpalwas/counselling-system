import React from "react";
import HeroSection from "../components/HomePageComponents/HeroSection";
import LatestNews from "../components/HomePageComponents/LatestNews";
import UsefulLinks from "../components/HomePageComponents/UsefulLinks";
import ImportantMessage from "../components/HomePageComponents/ImportantMessage";
import FAQSection from "../components/HomePageComponents/FAQSection";

const Home = () => {
  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="md:col-span-2">
          <HeroSection />
        </div>
        <div className="md:col-span-1">
          <LatestNews />
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="md:col-span-1">
          <UsefulLinks />
        </div>
        <div className="md:col-span-2">
          <ImportantMessage />
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <FAQSection />
      </section>
    </div>
  );
};

export default Home;
