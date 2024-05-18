import { API_URL } from "../config";

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

export const fetchCampaigns = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    //   Authorization: token,
    },
    method: "GET",
  }
  const response = await fetch(`${API_URL}/ad/campaigns`, config)
  const data = response.json();
  return data;
}
