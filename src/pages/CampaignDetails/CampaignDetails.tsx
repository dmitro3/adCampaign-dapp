import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useParams } from "react-router-dom";
import { fetchAffiliateMetrics, fetchAffiliatesByCampaignId, fetchCampaignById, fetchSupportersByCampaignId } from "../../common/services/api.services.ts";
import CampaignDetailsCardWrapper from "../../components/CampaignDetailsCardWrapper/CampaignDetailsCardWrapper.tsx";
import CardTable from "../../components/CardTable/CardTable.tsx";
import CampaignCard from "../../components/campaigncard/CampaignCard.tsx";
import Navbar from "../../components/navbar/navbar.tsx";
import './CampaignDetails.scss'


const CampaignDetails = () => {
    const account  = useCurrentAccount() as {address: string};
    const { id : campaignInfoAddress} = useParams();  
    const [campaign, setCampaign] = useState() as any;
    const [activePopUp, setActivePopUp] = useState<string | null>(null);
    const [affiliates, setAffiliates] = useState([]);
    const [supporters, setSupporters] = useState([]);
    const [metrics, setMetrics] = useState({
        totalClicks: 0,
        totalEarnings: 0,
    });

    const getAffiliatesByCampaignId = async (campaign: any) =>{
        const datas = await fetchAffiliatesByCampaignId({
            campaignInfoAddress
        });
        const transformedData = datas.map((data:any)=> {return {...data, earnings: data.validClicks*campaign.cpc}})
        setAffiliates(transformedData || []);
    }

    const getSupportersByCampaignId = async () => {
        try{
            toast.loading('Loading...')
            const data = await fetchSupportersByCampaignId({
                campaignInfoAddress
            })
            toast.dismiss()
            setSupporters(data || [])
        }catch(err){
            console.log('error-->', err)
            toast.error('Error in loading details')
        }
       
    }

    const getCampaignIdByDetails = async () => {
        try{
            toast.loading('Loading...')
            const data =  await  fetchCampaignById({campaignInfoAddress});
            if(data.length){
                setCampaign(data[0])
                getAffiliatesByCampaignId(data[0])
            }
            toast.dismiss()
        }catch(err){
            console.log('error-->', err)
            toast.error('Error in loading details')
        }
    }

    const getAffiliateMetrics = async () => {
        const {totalClicks} = await fetchAffiliateMetrics({campaignInfoAddress})
        setMetrics({totalClicks: totalClicks, totalEarnings: 0 })
    }

    useEffect(()=>{
        getSupportersByCampaignId()
        getCampaignIdByDetails()
        getAffiliateMetrics()
    }, [campaignInfoAddress])

    const togglePopUp = (campaignId: string) => {
        setActivePopUp(prevPopUp => prevPopUp === campaignId ? null : campaignId);
    };
    return(
        <main className="campaign-details-container">
           <Navbar page='campaign' color='white' textColor='black'/>
        {campaign && <section className="campaign-details-section"> 
            <p className="title ff-tertiary text-transform-capitalize"> { campaign.companyName.length > 20  ? `${campaign.companyName.substring(0,20)}......... Ad Campaign` : campaign.companyName} </p>
            <section className="grid-container">
                <article className="grid-row">
                   <CampaignDetailsCardWrapper totalAffiliates={affiliates?.length} totalClicks={metrics.totalClicks}/>
                   {/* todo - current price and campaign budget */}
                    <CampaignCard
                        key={1}
                        imageSrc={campaign.banner}
                        category={campaign.category}
                        clicks={(campaign?.validClicks + campaign?.invalidClicks) || 0}
                        title={campaign.campaignName}
                        daysLeft={`${Math.ceil((campaign?.endDate - moment().unix()) / (60 * 60 * 24))} days left`}
                        costPerClick={campaign.cpc}
                        totalPrice={campaign.campaignBudget}
                        likes={0}
                        dislikes={0}
                        startDate={campaign.startDate}
                        endDate={campaign.endDate}
                        walletAddress={account?.address}
                        description={campaign.description}
                        url={campaign.originalUrl}
                        campaignInfoAddress={campaign.campaignInfoAddress}
                        togglePopUp={() => togglePopUp(campaign.title)}
                        popUp={activePopUp === campaign.title}
                    />
                </article>
                <article className="grid-row">
                    <CardTable title="Affilates Leaderboard" contents={affiliates} />
                    <CardTable title="Campaign Supporters" contents={supporters}/>
                </article>
            </section>
        </section>}
        </ main>
    )
}

export default CampaignDetails;