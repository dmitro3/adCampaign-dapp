import './ImageTextGrid.css'
interface ImageTextGridProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    reverse?: boolean;
    children?: React.ReactNode;
    link: string;
}
export const ImageTextGrid: React.FC<ImageTextGridProps> = ({ link,title, description, imageSrc, imageAlt, reverse, children }) => {
    return (
        <section className={`img-text-container margin-bottom-200 grid-container ${reverse ? 'grid-col-rev' : 'grid-col-st'}`}>
        <div className={`content-container ${reverse ? 'order-2' : 'order-1'} flex flex-column gap-8`}>
            <h2 className="font-size-48 font-weight-600 ff-secondary">{title}</h2>
            <p className="font-size-16 font-weight-400 ff-primary">{description}</p>
            <div className="flex arrow mt-36">
                <a href={link} className="ff-secondary text-white text-decoration-none">Get Started</a>
                <img src='/arrow.png' alt="Arrow" />
            </div>
        </div>
        <div className={`image-container ${reverse ? 'order-1' : 'order-2'}`}>
            <img src={imageSrc} alt={imageAlt} className="main-image" />
            {children}
        </div>
    </section>
    );
}


