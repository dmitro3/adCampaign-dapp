import CreateCampaignFormik from '../../components/CreateCampaignForm/CreateCampaignForm';
import './CreateCampaign.scss'

const CreateCampaign = () => {

    return (
        <main className="create-campaign-container">
            <section className="sub-container">
                <section>
                    <p className="heading"> Start your own campaign </p>
                    <p className="sub-heading"> Lorem Ipsum dior random contetnt about ads etc that can be pushed over here and tells the story about our product to be added here </p>
                </section>
                <CreateCampaignFormik />
            </section>
        </main>
    )
}

export default CreateCampaign;