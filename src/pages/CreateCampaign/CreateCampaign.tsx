import { useState } from 'react';
import CreateCampaignFormik from '../../components/CreateCampaignForm/CreateCampaignForm';
import SearchBar from '../../components/searchbar/SearchBar';
import CampaignCard from '../../components/CampaignCard/CampaignCard';
import './CreateCampaign.scss'

const CreateCampaign = () => {
    const [campaignDetails, setCampaignDetails] = useState<any>();
 
    return (
        <main className="create-campaign-container">
            <SearchBar />
            <section className="sub-container">
                <section>
                    <p className="heading"> Start your own campaign </p>
                    <p className="sub-heading"> Lorem Ipsum dior random content about ads etc that can be pushed over here and tells the story about our product to be added here </p>
                </section>
                <div className='flex justify-space-around'>

                <CreateCampaignFormik setCampaignDetails={setCampaignDetails} />
                <CampaignCard {...campaignDetails} />
                </div>
            </section>
        </main>
    )
}

export default CreateCampaign;
