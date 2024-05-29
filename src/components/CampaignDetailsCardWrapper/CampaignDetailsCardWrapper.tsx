import Card from "../Card/Card"
import CardIconLabel from "../CardIconLabel/CardIconLabel"

const CampaignDetailsCardWrapper = ({totalClicks, totalAffiliates}: {totalClicks: number, totalAffiliates: number} ) => {
    const metrics = [
        {
            alt: 'clickicon',
            imageUrl: '/clickicon.png',
            title: 'Total Clicks',
            value: totalClicks
        },
        {
            alt: 'affiliateicon',
            imageUrl: '/affiliateicon.png',
            title: 'Total Affiliates',
            value: totalAffiliates
        }
    ]
    return(
        <div className="grid-container">
            {
                metrics.map(({alt, imageUrl, title, value}, index)=>(
                    <Card key={`metrics-${index}`}>
                        <CardIconLabel 
                            alt={alt}
                            src={imageUrl}
                            extraStyles="flex-reverse"
                            width="300px"
                            height="100px"
                            text={
                                <article className="flex justify-space-around flex-column height-100 ">
                                    <p className="text-black">{title}</p>
                                    <p className="text-black font-size-28 ff-tertiary font-weight-700">{value}</p>
                                </article>
                        } /> 
                    </Card>
                ))
            }
        </div>
    )
}

export default CampaignDetailsCardWrapper;