import { useState } from 'react';
import CreateCampaignFormik from '../../components/CreateCampaignForm/CreateCampaignForm';
import Navbar from '../../components/Navbar/navbar';
import './CreateCampaign.scss'

//todo - refactor it
const CreateCampaign = () => {
    const [campaignDetails, setCampaignDetails] = useState<any>();
    return (
        <main className="create-campaign-container">
            <Navbar page='campaign' color='white' textColor='black'/>
            <section className="sub-container">
                <section>
                    <p className="heading"> Start your own campaign </p>
                    <p className="sub-heading"> Lorem Ipsum dior random content about ads etc that can be pushed over here and tells the story about our product to be added here </p>
                </section>
                <div className='preview-container flex justify-space-around'>
                <div className='createform'>
                    <CreateCampaignFormik setCampaignDetails={setCampaignDetails} />
                </div>
                <div className='previewcard'>
                    {/* <CampaignCard {...campaignDetails} /> */}
                </div>
                </div>
            </section>
        </main>
    )
}

export default CreateCampaign;
