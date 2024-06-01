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
  return address.slice(0, 4) + '...' + address.slice(-3);
};

export const currencyConverter = (value: number, title: string = 'SUI'):number => {
  if(title ==='SUI'){
    return value/1e9
  }
  return value;
}

export const currencyConverterIntoSUI = (value: number, title: string = 'SUI'):number => {
  if(title ==='SUI'){
    return value*1e9
  }
  return value;
}


export const getTimeLeft = (endDate: any) => {
  console.log('--->', endDate)
  if (endDate) {
    const endMoment = endDate;
    const currentMoment = moment().unix();

    const totalSecondsLeft = endMoment.diff(currentMoment, 'seconds');

    console.log('totalSecondsLeft---->', totalSecondsLeft)


    const daysLeft = Math.floor(totalSecondsLeft / (60 * 60 * 24));
    const hoursLeft = Math.floor((totalSecondsLeft % (60 * 60 * 24)) / (60 * 60));
    const minutesLeft = Math.floor((totalSecondsLeft % (60 * 60)) / 60);
    const secondsLeft = totalSecondsLeft % 60;

    if (daysLeft > 1) {
      return `${daysLeft} Days Left`;
    } else if (daysLeft === 1) {
      return `${hoursLeft} Hours Left`;
    } else if (hoursLeft >= 1) {
      return `${hoursLeft} Hours Left`;
    } else if (minutesLeft >= 1) {
      return `${minutesLeft} Minutes Left`;
    } else {
      return `${secondsLeft} Seconds Left`;
    }
  }
  return 'Invalid end date';
};