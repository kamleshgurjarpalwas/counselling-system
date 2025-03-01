import React from "react";
import AppRoutes from "./AppRoute";
import Header from "../components/webComponents/Header.jsx";
import Navbar from "../components/webComponents/Navbar.jsx";
import Footer from "../components/webComponents/Footer.jsx";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="flex-grow container max-w-7xl mx-auto">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
