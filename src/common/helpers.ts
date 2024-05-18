import { API_URL } from "./config";

export const generateRandomAlphaNumeric = (): string => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLimit = 4;
    let randomFourCharacters = '';
  
    for (let i = 0; i < charactersLimit; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomFourCharacters += characters.charAt(randomIndex);
    }
  
    return randomFourCharacters;
  };
  

export const generateCampaignUrl = () => {
    return API_URL+'/'+ generateRandomAlphaNumeric()
  }