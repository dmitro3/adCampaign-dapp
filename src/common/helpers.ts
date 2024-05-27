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


export const getMaxBalanceObjectAddress = (balanceArr:any[]) => {
    let highestBalance = '0000000000';
    let highestBalanaceAddress = '';
    balanceArr.forEach(({coinObjectId, balance}:{coinObjectId:string, balance:string})=>{
        if(parseInt(balance) > parseInt(highestBalance)){
            highestBalance = balance;
            highestBalanaceAddress = coinObjectId
        }
    })
    return highestBalanaceAddress
}
