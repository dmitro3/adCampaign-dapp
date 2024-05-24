import Navbar from "../../components/navbar/navbar";
import TopSection from "../../components/topsection/TopSection";
import MidSection from "../../components/midsection/MidSection";
import LastSection from "../../components/lastsection/Lastsection";

import Footer from "../../components/footer/footer";


export default function Homepage() {
  return (
    <>
    <Navbar />
    <TopSection />
    <MidSection />
    <LastSection />
    <Footer />
    </>
  );
}