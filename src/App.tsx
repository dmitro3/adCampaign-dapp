import { BrowserRouter, Routes, Route } from "react-router-dom";
import CampaignList from "./components/CampaignList/CampaignList";
import CreateCampaign from "./pages/CreateCampaign/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails/CampaignDetails";
import Homepage from "./pages/Homepage/homepage";
import LegacyCreateCampaign from "./pages/LegacyCreateCampaign";
import './styles/globalstyle.scss' ;

function App() {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/home" index element={<Homepage/>} />
        <Route path="/" index element={<CampaignList/>} />
        <Route path="/campaigns" index element={<CampaignList/>}  />
        <Route path="/campaign/:id" index element={<CampaignDetails />} />
        <Route path="/campaign/create" index element={<CreateCampaign/>} />
        <Route path="/legacy/campaign/create" index element={<LegacyCreateCampaign />} />
    </Routes>
  </BrowserRouter>          
  );
}

export default App;
