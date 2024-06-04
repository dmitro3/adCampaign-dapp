export const createCampaignInitialValues = {
    companyName: '',
    campaignName: '',
    category: 'Defi',
    description: '',
    originalUrl:'',
    endDate: '',
    campaignBudget: '',
    cpc: ''
}

export const createCampaignInputFields = [
    { placeholder: "Company Name", name: "companyName", type:"text"},
    { placeholder: "Name of Campaign", name: "campaignName", type:"text" },
    { placeholder: "Category", name: "category", type:"text" },
    { placeholder: "Click to Upload Image Banner", name: "banner", type: "image"},
    { placeholder: "Description", name: "description", type:"text"  },
    { placeholder: "CTA link", name: "originalUrl", type:"text"  },
    { placeholder: "Expiration Date", name: "endDate", type:"date" },
    { placeholder: "Budget", name: "campaignBudget", endIcon: '<p>$SUI</p>', type:"text"  },
    { placeholder: "Cost per click", name: "cpc", type:"text"  },
];

export enum CAMPAIGN_STATUS{
    SCHEDULED = 1,
    ONGOING = 2,
    EXPIRED = 3,
}


export const mockData  = [
    {
        imageSrc: '/journey.png',
        label: 'Social',
        clicks: 2345,
        title: 'California Sunset/Twilight Boat Cruise',
        daysLeft: 2,
        costPerClick: 3,
        currentPrice: 48.25,
        totalPrice: 360,
        likes: 150,
        dislikes: 10,
        startDate: "1716826450",
        endDate: "1716923333",
        walletAddress: "0xe1f8bf63617b27bc25b4498330a66e154b06710742f76f2f5e285023e9685e6d",
        description: "Description: Consumers want to know the team behind the brand they are supporting. An About Us page provides the perfect real estate to pull back the curtain and reveal who is working behind the scenes.  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        originalUrl: "www.roginal.com",
        campaignInfoAddress: "0xe1f8bf63617b27bc25b4498330a66e154b06710742f76f2f5e285023e9685e6d",
    },
];


