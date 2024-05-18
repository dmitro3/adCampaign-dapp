import { useEffect, useState } from "react";
import { fetchCampaigns } from "../../common/services/api.services";
import CampaignCard from "../../common/components/CampaignCard";

const Campaigns = () => {

    const [campaigns, setCampaigns] = useState([]);

    const getCampaigns = async () => {
        const response = await fetchCampaigns();
        setCampaigns(response);
    }

    useEffect(()=>{
        getCampaigns()
    },[])

    return(
       <main>
            {
                campaigns.map((campaign:any, index:number)=>(
                    <CampaignCard key={index} campaign={campaign} />
                ))
            }
       </main>
    )
}

export default Campaigns;