import { useState } from "react";
import { createAffiliate, fetchAffiliateProfile } from "../../services/api.services";
import { generateCampaignUrl } from "../../helpers";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { CAMPAIGN_CONFIG, CAMPAIGN_PACKAGE_ID } from "../../config";
import useCoinAddress from "../../customHooks/coinAddress/useCoinAddress";

const CampaignCard = ({campaign}:any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const maxCoinValueAddress = useCoinAddress();
    const [campaignUrl, setCampaignUrl]  = useState();
    const [hasAddCoin, setHasAddCoin] = useState(false);
    const account  = useCurrentAccount() as {address: string};
    const [addCoinPayload, setAddCoinPayload] = useState({
      coins:'',
      message:''
    })
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

    const toggleAddCoins = () => {
      setHasAddCoin(prev=>!prev)
    }

    //todo - save to the web2 db
    const handleAddCoins = () => {
      setLoading(true)
      setError(false)
      return new Promise<void>((resolve, reject) => {
        const txb = new TransactionBlock();
        txb.moveCall({
                arguments: [
                    txb.object(CAMPAIGN_CONFIG),
                    txb.object(campaign.campaignInfoAddress),
                    txb.pure.string(addCoinPayload.message),
                    txb.pure.u64(addCoinPayload.coins),
                    txb.object(maxCoinValueAddress)
                ],
                target: `${CAMPAIGN_PACKAGE_ID}::campaign_fund::update_campaign_pool`,
            });
          signAndExecute(
            {
              transactionBlock: txb,
              options: {
                showEffects: true,
              },
            },
            {
              onSuccess: async (tx:any) => {   
                setLoading(false)
                console.log('handleAddCoins tx--->',tx)
                resolve(tx)
              },
              onError:(error)=>{
                  setLoading(false)
                  setError(true)
                  reject(error)
                  console.log('error--->',error)
              }
            },
          );
        }
    )
    }

    const handleEndCampaign = () => {
        setLoading(true)
        setError(false)
        return new Promise<void>((resolve, reject) => {
            const txb = new TransactionBlock();
            txb.moveCall({
                    arguments: [
                        txb.object(CAMPAIGN_CONFIG),
                        txb.object(campaign.campaignInfoAddress)
                    ],
                    target: `${CAMPAIGN_PACKAGE_ID}::campaign_fund::end_campaign`,
                });
              signAndExecute(
                {
                  transactionBlock: txb,
                  options: {
                    showEffects: true,
                  },
                },
                {
                  onSuccess: async (tx:any) => {
                    resolve(tx)
                    setLoading(false)
                  },
                  onError:(error)=>{
                      reject(error)
                      setError(true)
                      setLoading(false)
                      console.log('error--->',error)
                  }
                },
              );
            }
        )
    }

    const getAffiliateProfile = async () => {
      setLoading(true)
      const profileDetails = await fetchAffiliateProfile({walletAddress: account?.address})
      setLoading(false)
      if(profileDetails.length){
          return profileDetails[0].profileAddress
      }else{
          return null;
      }
    }

    const handleSubmit = async () => {
        try{
            setLoading(true);
            setError(false);
            const affiliateProfile = await getAffiliateProfile()
            const campaignUrl = generateCampaignUrl();
            const response = await createAffiliate({
              originalUrl: campaign.originalUrl,
              campaignUrl,
              walletAddress: account?.address,
              campaignInfoAddress: campaign.campaignInfoAddress,
              profileAddress: affiliateProfile,
              expirationTime: campaign.endDate,
            });
            console.log('response--->', response)
            setCampaignUrl(response?.campaignUrl)
            setLoading(false)
        }catch(err){
            setLoading(false)
            setError(true);
            console.log('error--->', err)
        }
    }

    return(
          <section style={{ borderBottom: '0.5px solid white', borderTop: '0.5px solid white',}}>
              <p>CampaignName - {campaign.campaignName}</p>
              <p>CompanyName - {campaign.companyName}</p>
              <p> Category - {campaign.category}</p>
              <p>CPC - {campaign.cpc}</p>
              <p>startDate - {campaign.startDate}</p>
              <p>endDate - {campaign.endDate}</p>
              <p>Original URl - {campaign.originalUrl}</p>
             { !loading ? <>
              <button style={{margin: 10, width: 100}} onClick={toggleAddCoins}>Add funds</button>
              <button style={{margin: 10, width: 100}} onClick={handleSubmit}>participate</button>
              <button style={{margin: 10, width: 100}} onClick={handleEndCampaign}>End cgn..</button>
              </> : <p>loading....</p>}
              {error &&  <p>error occured </p>}
              {campaignUrl && <p> { campaignUrl } </p>}

              {
                hasAddCoin && (
                  <div>
                    <input placeholder="enter the amount" type="number" onChange={(e)=>setAddCoinPayload({...addCoinPayload, coins: e.target.value})}/>
                    <br />
                    <input placeholder="message" onChange={(e)=>setAddCoinPayload({...addCoinPayload, message: e.target.value})}/>
                    <br />
                    <button onClick={handleAddCoins}>submit</button>
                  </div>
                )
              }

          </section>
    )
}

export default CampaignCard;