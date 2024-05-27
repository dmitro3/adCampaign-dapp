import OvalInputBox from "../../components/ovalInputBox/OvalInputBox";
import Button from "../../components/reuseablecomponent/button/button";
import './CreateCampaign.scss'

const CreateCampaign = () => {
    return(
        <main className="create-campaign-container">
            <section className="sub-container">
                <section>
                    <p className="heading"> Start your own campaign </p>
                    <p className="sub-heading"> Lorem Ipsum dior random contetnt about ads etc that can be pushed over here and tells the story about our product to be added here </p>
                </section>
                <section >
                    <OvalInputBox placeholder="company name" />
                    <OvalInputBox placeholder="Name of campaign" />
                    <OvalInputBox placeholder="Category" />
                    <OvalInputBox placeholder="Description" />
                    <OvalInputBox placeholder="CTA link" />
                    <OvalInputBox placeholder="End Date" />
                    <OvalInputBox placeholder="Budget" endIcon={<p>$SUI</p>} />
                    <OvalInputBox placeholder="Rate per click" />
                </section>
                <section>
                    <Button color="blue" title="Create" width="203px" height="50px" />
                </section>
            </section>
        </main>
    )
}

export default CreateCampaign;