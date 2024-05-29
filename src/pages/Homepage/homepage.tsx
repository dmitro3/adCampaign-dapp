import Navbar from "../../components/Navbar/navbar";
import TopSection from "../../components/TopSection/TopSection";
import MidSection from "../../components/MidSection/MidSection";
import LastSection from "../../components/LastSection/Lastsection";
import Footer from "../../components/Footer/Footer";

export default function Homepage() {
  return (
    <>
      <Navbar color="dark" page="navbar" textColor="white"/>
      <TopSection />
      <MidSection />
      <LastSection />
      <Footer />
    </>
  );
}
