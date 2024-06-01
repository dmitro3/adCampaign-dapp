import { API_URL, CLOUDINARY_CLOUD_NAME } from "../config";

export const createAffiliate = async (contents: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: token,
    },
    method: "POST",
    body: JSON.stringify({ 
        ...contents
     }),
  }
  const response = await fetch(`${API_URL}/ad/affiliate/create`, config);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  const data = await response.json();
  return data;
}

export const fetchAffiliatesByCampaignId = async (contents: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: token,
    },
    method: "POST",
    body: JSON.stringify({ 
        ...contents
     }),
  }
  const response = await fetch(`${API_URL}/ad/affiliate/id`, config);
  const data = await response.json();
  return data;
}

export const fetchSupportersByCampaignId = async (contents: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: token,
    },
    method: "POST",
    body: JSON.stringify({ 
        ...contents
     }),
  }
  const response = await fetch(`${API_URL}/ad/supporters/id`, config);
  const data = await response.json();
  return data;
}


export const fetchCampaignById = async (contents: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: token,
    },
    method: "POST",
    body: JSON.stringify({ 
        ...contents
     }),
  }
  const response = await fetch(`${API_URL}/ad/campaigns/id`, config);
  const data = await response.json();
  return data;
}

export const fetchAffiliateProfile = async (contents: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: token,
    },
    method: "POST",
    body: JSON.stringify({ 
        ...contents
     }),
  }
  const response = await fetch(`${API_URL}/ad/affiliate/profile`, config);
  const data = await response.json();
  return data;
}

export const fetchAffiliateMetrics = async (contents: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: token,
    },
    method: "POST",
    body: JSON.stringify({ 
        ...contents
     }),
  }
  const response = await fetch(`${API_URL}/ad/affiliate/metrics`, config);
  const data = await response.json();
  return data;
}

export const createCampaign = async (contents: any) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        //   Authorization: token,
        },
        method: "POST",
        body: JSON.stringify({ 
            ...contents
         }),
      };
    const response = await fetch(`${API_URL}/ad/campaign/create`, config);
    const data = await response.json();
    console.log('data====>', data);
}
export const addSupporters = async (contents: any) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        //   Authorization: token,
        },
        method: "POST",
        body: JSON.stringify({ 
            ...contents
         }),
      };
    await fetch(`${API_URL}/ad/supporters/create`, config);
}

export const fetchCampaigns = async ({page,limit,category,sortBy}: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: token,
    },
    method: "GET",
  }
  const response = await fetch(`${API_URL}/ad/campaigns?page=${page}&limit=${limit}&category=${category}&sortBy=${sortBy}`, config);
  const data = response.json();
  return data;
}

export const uploadImage = async (image: any) => {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,{
    method: 'POST',
    body: image
  })
  const imageData = await response.json() as any;
  const imageURL = imageData.url.toString();
  return imageURL;
}