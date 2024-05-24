
interface GridSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    reverse?: boolean;
    children?: React.ReactNode;
}
// name should be chamged
const GridSection: React.FC<GridSectionProps> = ({ title, description, imageSrc, imageAlt, reverse, children }) => {
    return (
        <section className={`margin-bottom-200 grid-container ${reverse ? 'grid-col-rev' : 'grid-col-st'}`}>
            {!reverse ? (
                <>
                    <div className=" flex flex-column gap-8">
                        <h2 className="font-size-48 font-weight-600 font-montserrat">{title}</h2>
                        <p className="font-size-16 font-weight-400 font-mulish">{description}</p>
                        <div className="flex arrow">
                            <a className="font-montserrat">Get Started</a>
                            <img  src='./public/arrow.png' alt="Arrow" />
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={imageSrc} alt={imageAlt} className="main-image" />
                        {children}
                    </div>
                </>
            ) : (
                <>
                    <div className="image-container">
                        <img src={imageSrc} alt={imageAlt} className="main-image" />
                        {children}
                    </div>
                    <div className="flex flex-column gap-8">
                        <h2 className="font-size-48 font-weight-600 font-montserrat">{title}</h2>
                        <p className="font-size-16 font-weight-400 font-mulish">{description}</p>
                        <div className="flex arrow">
                            <a className="font-montserrat">Get Started</a>
                            <img  src='./public/arrow.png' alt="Arrow" />
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default GridSection;
