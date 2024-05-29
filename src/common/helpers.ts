import moment from 'moment';
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

export const shortnerAddress = (address: string): string => {
  return address.slice(0, 5) + '...' + address.slice(-5);
};


export const getTimeLeft = (endDate: string) => {
  if (!moment(endDate, 'YYYY-MM-DD', true).isValid()) {
    throw new Error('Invalid date format. Please use YYYY-MM-DD.');
  }

  const endMoment = moment(endDate, 'YYYY-MM-DD');
  const currentMoment = moment();

  const getDaysLeft = (end: any, current: any) => {
    return end.diff(current, 'days');
  };

  const getHoursLeft = (end: any, current: any) => {
    return end.diff(current, 'hours');
  };

  const getMinutesLeft = (end: any, current: any) => {
    return end.diff(current, 'minutes');
  };

  const daysLeft = getDaysLeft(endMoment, currentMoment);
  const hoursLeft = getHoursLeft(endMoment, currentMoment);
  const minutesLeft = getMinutesLeft(endMoment, currentMoment);

  if (daysLeft > 1) {
    return `${daysLeft} Days Left`;
  } else if (daysLeft === 1) {
    return `${hoursLeft} Hours Left`;
  } else if (hoursLeft >= 1) {
    return `${hoursLeft} Hours Left`;
  } else {
    return `${minutesLeft || 0} Minutes Left`;
  }
};