import CreateCampaignFormik from '../../components/CreateCampaignForm/CreateCampaignForm';
import Navbar from '../../components/navbar/navbar';
import './CreateCampaign.scss'

//todo - refactor it
const CreateCampaign = () => {
    return (
        <main className="create-campaign-container">
            <Navbar page='campaign' color='white' textColor='black'/>
            <section className="sub-container">
                <section>
                    <p className="heading"> Start your own campaign </p>
                    <p className="sub-heading"> Launch your advertising campaign today and reach your target audience with transparency and efficiency. Enter your details below to mint your Campaign and manage with real-time analytics and secure transactions </p>
                </section>
                <div className='preview-container flex justify-space-around'>
                <div className='createform'>
                    <CreateCampaignFormik />
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
