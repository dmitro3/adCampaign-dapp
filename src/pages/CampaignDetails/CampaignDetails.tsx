import { useEffect, useState } from "react";
import { mockData } from "../../common/constants";
import CampaignDetailsCardWrapper from "../../components/CampaignDetailsCardWrapper/CampaignDetailsCardWrapper.tsx";
import CardTable from "../../components/CardTable/CardTable.tsx";
import CampaignCard from "../../components/campaigncard/CampaignCard.tsx";
import SearchBar from "../../components/searchbar/SearchBar";
import './CampaignDetails.scss'
import { fetchAffiliatesByCampaignId } from "../../common/services/api.services.ts";

const CampaignDetails = () => {
    const campaign = mockData[0];

    const [affiliates, setAffiliates] = useState([]);

    const getAffiliatesByCampaignId = async () =>{
        const data = await fetchAffiliatesByCampaignId({
            campaignInfoAddress: "0xb7b8d5e6f99b1cc1fa603de9b0ccfd1c40cb7ab6903a9646db3961d6b907476d"
        });
        setAffiliates(data);
    }

    useEffect(()=>{
        getAffiliatesByCampaignId()
    },[])
    
    return(
        <main className="campaign-details-container">
        <SearchBar />
        <section className="campaign-details-section"> 
            <p className="title ff-tertiary">Uber's Ad Campaign</p>
            <section className="grid-container">
                <article className="grid-row">
                   <CampaignDetailsCardWrapper />
                        <CampaignCard
                            key={1}
                            imageSrc={campaign.imageSrc}
                            label={campaign.label}
                            clicks={campaign.clicks}
                            title={campaign.title}
                            daysLeft={campaign.daysLeft}
                            costPerClick={campaign.costPerClick}
                            currentPrice={campaign.currentPrice}
                            totalPrice={campaign.totalPrice}
                            likes={campaign.likes}
                            dislikes={campaign.dislikes}
                            startDate={campaign.startDate}
                            endDate={campaign.endDate}
                            walletAddress={campaign.walletAddress}
                            description={campaign.description}
                            url={campaign.originalUrl}
                            campaignInfoAddress={campaign.campaignInfoAddress}
                        />
                </article>
                <article className="grid-row">
                    <CardTable title="Affilates Leaderboard" contents={affiliates} />
                    <CardTable title="Campaign Supporters" contents={affiliates}/>
                </article>
            </section>
        </section>
        </ main>
       
    )
}

export default CampaignDetails;