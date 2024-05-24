import FeatureItem from '../reuseablecomponent/featureitem/FeatureItem';
import './MidSection.scss';

export default function MidSection() {
    const features = [
        {
            imageSrc: './public/up.png',
            altText: 'Upload & Organize',
            title: 'Upload & Organize',
            description: 'Upload in bulk, organize content in categories, add custom filters & upload extras.'
        },
        {
            imageSrc: './public/cam.png',
            altText: 'Ads',
            title: 'Ads',
            description: 'Showcase your content in a beautiful ads catalog.'
        },
        {
            imageSrc: './public/conn.png',
            altText: 'Ads',
            title: 'Ads',
            description: 'Schedule ads in advance & build with a countdown overlay.'
        },
        {
            imageSrc: './public/u&o.png',
            altText: 'Monetization',
            title: 'Monetization',
            description: 'Offer subscriptions or one-time purchases. Accept credit cards & PayPal.'
        },
        {
            imageSrc: './public/ad1.png',
            altText: 'Analytics',
            title: 'Analytics',
            description: 'Know what your audience likes & how your content is performing.'
        },
        {
            imageSrc: './public/ad2.png',
            altText: 'For all devices',
            title: 'For all devices',
            description: 'Get organized on all devices.'
        }
    ];

    return (
        <div className=" midsection flex justify-center bg-white">
            <div className="page-container main-container bg-white">
                <div className="text-center">
                    <h1 className="font-montserrat font-weight-700 font-size-48 mt-8">All-in-one platform</h1>
                    <p className=" mb-80 padding-20 font-montserrat font-size-16 padding-20">Catchy tagline about our features to be added here, then CTAs if required</p>
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