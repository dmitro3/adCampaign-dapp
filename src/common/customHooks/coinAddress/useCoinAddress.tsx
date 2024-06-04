import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";

const useCoinAddress = () => {
    const [maxCoinValueAddress, setMaxCoinValueAddress] = useState('');
    const [maxCoinValue, setMaxCoinValue] = useState(0);
    const account  = useCurrentAccount() as {address: string};
    const suiObject = useSuiClientQuery('getCoins', 
    {
		owner: account?.address as string,
        coinType:'0x2::sui::SUI'
	}) as {data:{data: any[]}};

    const getMaxBalanceObjectAddress = (balanceArr:any[]) => {
        let highestBalance = '0000000000';
        let highestBalanaceAddress = '';
        balanceArr.forEach(({coinObjectId, balance}:{coinObjectId:string, balance:string})=>{
            if(parseInt(balance) > parseInt(highestBalance)){
                highestBalance = balance;
                highestBalanaceAddress = coinObjectId
            }
        })
        return {highestBalanaceAddress, highestBalance}
    }


    useEffect(()=>{
        if(suiObject?.data?.data?.length>0){
            const {highestBalanaceAddress, highestBalance} = getMaxBalanceObjectAddress(suiObject?.data?.data)
            setMaxCoinValueAddress(highestBalanaceAddress)
            setMaxCoinValue(parseInt(highestBalance));
        }
      },[suiObject?.data?.data])

    return {maxCoinValueAddress, maxCoinValue};
}

export default useCoinAddress;