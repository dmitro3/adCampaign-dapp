import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCampaign from "./pages/CreateCampaign";
import Campaigns from "./pages/Campaigns";
import Homepage from "./pages/Homepage/homepage";
import CampaignExplorer from "./components/campaignexplorer/CampaignExplorer";
import './styles/globalstyle.scss' ;

function App() {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" index element={<Homepage/>} />
        <Route path="/campaign" index element={<CampaignExplorer/>} />
        <Route path="/legacy/campaigns" index element={<Campaigns/>} />
        <Route path="/campaign/create" index element={<CreateCampaign/>} />
    </Routes>
  </BrowserRouter>          
  );
}

export default App;
