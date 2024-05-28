export const createCampaignInitialValues = {
    banner:'',
    companyName: '',
    campaignName: '',
    category: '',
    description: '',
    ctaLink: '',
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
    { placeholder: "End Date (DD/MM/YYY)", name: "endDate", type:"date" },
    { placeholder: "Budget", name: "campaignBudget", endIcon: '<p>$SUI</p>', type:"text"  },
    { placeholder: "Rate per click", name: "cpc", type:"text"  },
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
        dislikes: 10
    },
    {
        imageSrc: '/journey.png',
        label: 'Travel',
        clicks: 1523,
        title: 'New York City Tour',
        daysLeft: 5,
        costPerClick: 2,
        currentPrice: 30.50,
        totalPrice: 250,
        likes: 100,
        dislikes: 15
    },
    {
        imageSrc: '/journey.png',
        label: 'Adventure',
        clicks: 3000,
        title: 'Mountain Hiking Experience',
        daysLeft: 1,
        costPerClick: 5,
        currentPrice: 75.00,
        totalPrice: 500,
        likes: 250,
        dislikes: 5
    },
    {
        imageSrc: '/journey.png',
        label: 'Adventure',
        clicks: 3000,
        title: 'Mountain Hiking Experience',
        daysLeft: 1,
        costPerClick: 5,
        currentPrice: 75.00,
        totalPrice: 500,
        likes: 250,
        dislikes: 5
    },
    {
        imageSrc: '/journey.png',
        label: 'Adventure',
        clicks: 3000,
        title: 'Mountain Hiking Experience',
        daysLeft: 1,
        costPerClick: 5,
        currentPrice: 75.00,
        totalPrice: 500,
        likes: 250,
        dislikes: 5
    },
    {
        imageSrc: '/journey.png',
        label: 'Adventure',
        clicks: 3000,
        title: 'Mountain Hiking Experience',
        daysLeft: 1,
        costPerClick: 5,
        currentPrice: 75.00,
        totalPrice: 500,
        likes: 250,
        dislikes: 5
    },
    {
        imageSrc: '/journey.png',
        label: 'Adventure',
        clicks: 3000,
        title: 'Mountain Hiking Experience',
        daysLeft: 1,
        costPerClick: 5,
        currentPrice: 75.00,
        totalPrice: 500,
        likes: 250,
        dislikes: 5
    },
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
        dislikes: 10
    },
    {
        imageSrc: '/journey.png',
        label: 'Adventure',
        clicks: 3000,
        title: 'Jungle Safari',
        daysLeft: 3,
        costPerClick: 4,
        currentPrice: 60.00,
        totalPrice: 400,
        likes: 200,
        dislikes: 20
    }
];


