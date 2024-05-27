import './FeatureItem.css';

interface FeatureItemProps {
    imageSrc: string;
    altText: string;
    title: string;
    description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ imageSrc, altText, title, description }) => {
    return (
        <div className="text-center feature-card">
            <div className="image-item align-center flex mb-4">
                <img src={imageSrc} alt={altText} />
                <h2 className="ff-secondary font-weight-600">{title}</h2>
            </div>
            <p className="font-size-16 ff-primary font-weight-400 feature-description">{description}</p>
        </div>
    );
}

export default FeatureItem;