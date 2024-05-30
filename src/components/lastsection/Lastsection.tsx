import CustomButton from '../CustomButton/CustomButton';
import { ImageTextGrid } from '../imagetextgrid/ImageTextGrid';
import InfoBadge from '../infobadge/InfoBadge';
import './Lastsection.scss';

const Lastsection = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className=" lastsection  page-container flex justify-center">
            <div className="bg-dark text-white ff-primary main-container mb-30">
                <header className="header-section text-center py-4">
                    <h1 className="mb-40 font-size-48 font-weight-700 font-secondary">We help you grow</h1>
                </header>
                <main className="main-container mx-auto">
                    <ImageTextGrid
                        title="Monetize your way"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna."
                        imageSrc="/img01.png"
                        imageAlt="Monetize your way"
                    >
                        <InfoBadge type='text'/>
                    </ImageTextGrid>
                    <ImageTextGrid
                        title="Optimized for growth"
                        description="The ecosystem is designed to help you generate profit. Set up complete ad funnels with ease using the Platform. Generate leads and convert your audience into paying subscribers, at no extra cost."
                        imageSrc="/img02.png"
                        imageAlt="Optimized for growth"
                        reverse={true}
                    >
                        <InfoBadge type='img'/>
                    </ImageTextGrid>
                    <section className="lastsec text-center my-16">
                        <h2 className="font-size-48 font-weight-700 font-secondary" >Start your campaign today</h2>
                        <p className="font-size-16 font-weight-400 ff-primary last-section-paragraph">Consistent quality and experience across all platforms and devices.</p>
                        <div className="flex justify-center gap-16 last-section-buttons">
                            <CustomButton title="Get Started" color="black" backgroundColor="white"></CustomButton>
                            <CustomButton title="Connect Wallet" color="white" backgroundColor="black" border="1px solid white" onClick={scrollToTop}></CustomButton>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Lastsection;
