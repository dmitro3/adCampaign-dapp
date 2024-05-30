import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/footer/footer";
import Lastsection from "../../components/lastsection/Lastsection";
import MidSection from "../../components/midsection/MidSection";
import TopSection from "../../components/topsection/TopSection";


export default function Homepage() {
  return (
    <>
      <Navbar color="dark" page="navbar" textColor="white"/>
      <TopSection />
      <MidSection />
      <Lastsection />
      <Footer />
    </>
  );
}
