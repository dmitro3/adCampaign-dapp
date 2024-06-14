import { useEffect, useState } from 'react';
import moment from 'moment';
import { useCurrentAccount, useSignAndExecuteTransactionBlock, useSuiClientQuery, } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { createCampaign } from '../../common/services/api.services';
import { CAMPAIGN_STATUS } from '../../common/constants';
import { CAMPAIGN_CONFIG, CAMPAIGN_PACKAGE_ID } from '../../common/config';

const LegacyCreateCampaign = () => {
    const [transactionFinshed, setTransactionFinished] = useState(false);
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const [maxCoinValueAddress, setMaxCoinValueAddress] = useState('');

    const [formInputs, setFormInputs] = useState({
        companyName:'',
        category: '',
        originalUrl: '',
        cpc:'',
        campaignBudget:'',
        startDate: moment().unix(),
        endDate: '',
    })

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
        return highestBalanaceAddress
    }

    const create = () => {
      try{
        const txb = new TransactionBlock();
        txb.moveCall({
          arguments: [
                      txb.object(CAMPAIGN_CONFIG),
                      txb.pure.string(formInputs.companyName),
                      txb.pure.string(formInputs.category),
                      txb.pure.string(formInputs.originalUrl),
                      txb.object(maxCoinValueAddress),
                      txb.pure.u64(parseInt(formInputs.campaignBudget)),
                      txb.pure.u64(parseInt(formInputs.cpc)),
                      txb.pure.u64(parseInt(formInputs.startDate.toString())),
                      txb.pure.u64(parseInt(formInputs.endDate)),
                      txb.pure.u64(CAMPAIGN_STATUS.ONGOING),
                      txb.pure.address(account.address),
                    ],
          target: `${CAMPAIGN_PACKAGE_ID}::campaign_fund::create_campaign`,
        });
    
        signAndExecute(
          {
            transactionBlock: txb,
            options: {
              showEffects: true,
            },
          },
          {
            onSuccess: (tx) => {
              createCampaign({
                ...formInputs,
                coinObjectAddress: maxCoinValueAddress,
                campaignWalletAddress: account.address,
                campaignInfoAddress: getCampaignObjectAddress(tx.effects?.created || []) || '',
                packageAddress: CAMPAIGN_PACKAGE_ID,
                campaignConfig:CAMPAIGN_CONFIG,
                status: CAMPAIGN_STATUS.ONGOING,
              });
              alert("success")
              setTransactionFinished(true)
            },
            onError:(error)=>{
                console.log('error--->',error)
            }
          },
        );
      } catch(err) {
        console.log('err--->', err)
      }
      }

      const getCampaignObjectAddress = (txArray: any[]) => {
        for(let i = 0; i < txArray.length; i++){
          if(txArray[i]?.owner?.Shared){
            return txArray[i]?.reference.objectId
          }
        }
      }

      useEffect(()=>{
        if(suiObject?.data?.data?.length>0){
            const address = getMaxBalanceObjectAddress(suiObject?.data?.data)
            setMaxCoinValueAddress(address)
        }
      },[suiObject?.data?.data])


    return maxCoinValueAddress ? (
        <main>
            coin - {maxCoinValueAddress}
            <form>                
                <p>Company Name</p>
                <input placeholder='Name' onChange={(e)=>setFormInputs({...formInputs, companyName: e.target.value})}/>
                
                <p>Category</p>
                <input placeholder='0' onChange={(e)=>setFormInputs({...formInputs, category: e.target.value})}/>

                <p>Original URL</p>
                <input placeholder='0' onChange={(e)=>setFormInputs({...formInputs, originalUrl: e.target.value})}/>

                <p>Budget</p>
                <input placeholder='0' type='number' onChange={(e)=>setFormInputs({...formInputs, campaignBudget: e.target.value})}/>
                
                <p>Cost per click (CPC )</p>
                <input placeholder='0' type='number' onChange={(e)=>setFormInputs({...formInputs, cpc: e.target.value})} />
                
                <p>End Date</p>
                <input placeholder='0' type='number' onChange={(e)=>setFormInputs({...formInputs, endDate: e.target.value})} />
            </form>
			<button
				onClick={create}
			>
				Create Campaign
			</button>
      {transactionFinshed && <div>
        <p>Transaction Successfully Comepleted </p>
        <p>Please check assets section in your wallet for receipt ↗️ ⤴</p>
        <p>To see updated details navigate to campaigns section</p>
      </div>}
		</main>
    ) : (<p>please connect wallet</p>)
}

export default LegacyCreateCampaign;