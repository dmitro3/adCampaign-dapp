
import FeatureItem from '../featureitem/FeatureItem';
import './MidSection.scss';

export default function MidSection() {
    const features = [
        {
            imageSrc: '/upload.png',
            altText: 'Upload & Organize',
            title: 'Decentralized Platform',
            description: 'Harness the power of blockchain to eliminate middlemen and ensure trustless transactions.'
        },
        {
            imageSrc: '/camera.png',
            altText: 'Ads',
            title: 'Real-Time Payments',
            description: 'Experience instant on-chain payment processing for affiliates and advertisers, enhancing cash flow and efficiency.'
        },
        {
            imageSrc: '/connection.png',
            altText: 'Ads',
            title: 'Global Reach',
            description: 'Tap into a vast network of global users and influencers to maximize your campaign’s impact.'
        },
        {
            imageSrc: '/dollar.png',
            altText: 'Monetization',
            title: 'Crowdfunded Campaigns',
            description: 'Grow your campaign with community support. Fans can contribute funds, amplifying your reach and effectiveness.'
        },
        {
            imageSrc: '/nodes.png',
            altText: 'Analytics',
            title: 'Flexible Campaigns',
            description: 'Create and manage campaigns with customizable options tailored to your specific advertising needs.'
        },
        {
            imageSrc: '/computer.png',
            altText: 'For all devices',
            title: 'On-Chain Fraud Detection',
            description: 'Utilize advanced on-chain fraud detection and reporting mechanisms to ensure a secure and reliable advertising environment.'
        }
    ];

    return (
        <div className=" midsection flex justify-center bg-white text-black">
            <div className="page-container main-container bg-white">
                <div className="text-center">
                    <h1 className="ff-secondary font-weight-700 font-size-48 mt-68">Transform Your Ads with AdToken</h1>
                    <p className=" mb-80 padding-20 ff-secondary font-size-16 padding-20">Explore the unique features that bring transparency, security, and efficiency to your advertising.</p>
                </div>
                
                <div className="grid-container-3 grid-container-1 mb-80">
                    {features.map((feature, index) => (
                        <FeatureItem
                            key={index}
                            imageSrc={feature.imageSrc}
                            altText={feature.altText}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}