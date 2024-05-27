import { BrowserRouter, Routes, Route } from "react-router-dom";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign/CreateCampaign";
import Homepage from "./pages/Homepage/homepage";
import LegacyCreateCampaign from "./pages/LegacyCreateCampaign";
import './styles/globalstyle.scss' ;

function App() {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" index element={<Homepage/>} />
        <Route path="/campaign" index element={<CampaignList/>} />
        <Route path="/legacy/campaigns" index element={<Campaigns/>} />
        <Route path="/campaign/create" index element={<CreateCampaign/>} />
        <Route path="/legacy/campaign/create" index element={<LegacyCreateCampaign />} />
    </Routes>
  </BrowserRouter>          
  );
}

export default App;
