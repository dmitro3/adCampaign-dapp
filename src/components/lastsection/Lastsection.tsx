import { ImageTextGrid } from '../imagetextgrid/ImageTextGrid';
import InfoBadge from '../infobadge/InfoBadge';
import CustomButton from '../CustomButton/CustomButton';
import './Lastsection.scss';

const Lastsection = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleGetStarted = () => {
        window.location.href = '/campaigns';
    };   

    return (
        <div className=" lastsection  bg-dark  flex justify-center">
            <div className="bg-dark text-white ff-primary main-container mb-30">
                <header className="header-section text-center py-4">
                    <h1 className="mb-40 font-size-48 font-weight-700 font-secondary">We help you grow</h1>
                </header>
                <main className="mx-auto">
                    <ImageTextGrid
                        title="Monetize your way"
                        description="We expand your reach through individual affiliates, influencers, and website placements. Maximize revenue with a diverse advertising strategy."
                        imageSrc="/img01.png"
                        imageAlt="Monetize your way"
                        link='/campaigns'
                    >
                        <InfoBadge type='text'/>
                    </ImageTextGrid>
                    <ImageTextGrid
                        title="Optimized for growth"
                        description="Optimize your campaigns with AdToken's analytics. Track performance and achieve remarkable growth."
                        imageSrc="/img02.png"
                        imageAlt="Optimized for growth"
                        reverse={true}
                        link='/campaigns'
                    >
                        <InfoBadge type='img'/>
                    </ImageTextGrid>
                    <section className="lastsec text-center my-16">
                        <h2 className="font-size-48 font-weight-700 font-secondary" >Start your campaign today</h2>
                        <p className="font-size-16 font-weight-400 ff-primary last-section-paragraph">Consistent quality and experience across all platforms and devices.</p>
                        <div className="flex justify-center gap-16 last-section-buttons">
                            <CustomButton title="Get Started" color="black" backgroundColor="white" onClick={handleGetStarted}/>
                            <CustomButton title="Connect Wallet" color="white" backgroundColor="black" border="1px solid white" onClick={scrollToTop}/>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Lastsection;
