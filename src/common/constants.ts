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