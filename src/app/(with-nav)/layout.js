// src/app/(with-nav)/layout.js
import NavBar from "@/components/NavBar";
import Footer from "@/components/footer/Footer";

export default function WithNavLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
