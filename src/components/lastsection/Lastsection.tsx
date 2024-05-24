
import GridSection from '../reuseablecomponent/gridsection/gridsection';
import InfoBadge from '../reuseablecomponent/infobadge/InfoBadge';
import Button from '../reuseablecomponent/button/button';
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
            <div className="bg-dark text-white font-mulish main-container">
                <header className="header-section text-center py-4">
                    <h1 className="mb-40 font-size-48 font-weight-700 font-montserrat">We help you grow</h1>
                </header>
                <main className="main-container mx-auto">
                    <GridSection
                        title="Monetize your way"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna."
                        imageSrc="./public/img01.png"
                        imageAlt="Monetize your way"
                    >
                        <InfoBadge />
                    </GridSection>
                    <GridSection
                        title="Optimized for growth"
                        description="The ecosystem is designed to help you generate profit. Set up complete ad funnels with ease using the Platform. Generate leads and convert your audience into paying subscribers, at no extra cost."
                        imageSrc="./public/img02.png"
                        imageAlt="Optimized for growth"
                        reverse={true}
                    >
                        <InfoBadge />
                    </GridSection>
                    <section className="lastsec text-center my-16">
                        <h2 className="font-size-48 font-weight-700 font-montserrat">Start your campaign today</h2>
                        <p className="font-size-16 font-weight-400 font-mulish last-section-paragraph">Consistent quality and experience across all platforms and devices.</p>
                        <div className="flex justify-center gap-16 last-section-buttons">
                            <Button title="Get Started" color="white"></Button>
                            <Button title="Connect Wallet" color="black" onClick={scrollToTop}></Button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Lastsection;
