import Navbar from "../../components/navbar/navbar";
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
    </>
  );
}
