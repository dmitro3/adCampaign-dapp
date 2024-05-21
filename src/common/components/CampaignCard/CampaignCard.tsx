import { useState } from "react";
import { createAffiliate, fetchAffiliateProfile } from "../../services/api.services";
import { generateCampaignUrl } from "../../helpers";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { CAMPAIGN_PACKAGE_ID } from "../../config";

const CampaignCard = ({campaign}:any) => {
   const [twitterProfile, setTwitterProfile] = useState('');
    const account  = useCurrentAccount() as {address: string};
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const [campaignUrl, setCampaignUrl] = useState('')
    const [participate, setParticipate] = useState(false);

    const handleParticipate = () => {
        setParticipate(prev=>!prev)
    }

    const handleEndCampaign = () => {
        return new Promise<void>((resolve, reject) => {
            const txb = new TransactionBlock();
            txb.moveCall({
                    arguments: [
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
                    resolve('response--->',tx.effects?.created[0]?.reference?.objectId)  
                  },
                  onError:(error)=>{
                        reject(error)
                      console.log('error--->',error)
                  },
                  onSettled:(data)=>{
                      console.log('data--->', data)
                      alert(data?.effects?.status)
                  }
                },
              );
            }
        )
    }

    // const handleCreateAffiliateProfile = async () => {
    //     return new Promise<void>((resolve, reject) => {
    //         const txb = new TransactionBlock();
    //         txb.moveCall({
    //                 arguments: [],
    //                 target: `${CAMPAIGN_PACKAGE_ID}::campaign_fund::create_affiliate_profile`,
    //             });
    //           signAndExecute(
    //             {
    //               transactionBlock: txb,
    //               options: {
    //                 showEffects: true,
    //               },
    //             },
    //             {
    //               onSuccess: async (tx:any) => {
    //                 resolve(tx.effects?.created[0].reference.objectId )  
    //               },
    //               onError:(error)=>{
    //                     reject(error)
    //                   console.log('error--->',error)
    //               },
    //               onSettled:(data)=>{
    //                   console.log('data--->', data)
    //                   alert(data?.effects?.status)
    //               }
    //             },
    //           );
    //         }
    //     )
    // }

    // const linkCampaignProfileToCampaignParentObj = (affiliateAddress:string) => {
    //     return new Promise((resolve, reject)=>{
    //         const txb = new TransactionBlock();
    //         txb.moveCall({
    //           arguments: [
    //                     txb.object(campaign.campaignInfoAddress),
    //                     txb.object(affiliateAddress),
    //                     ],
    //           target: `${CAMPAIGN_PACKAGE_ID}::campaign_fund::add_affiliate_to_campaign`,
    //         });
        
    //         signAndExecute(
    //           {
    //             transactionBlock: txb,
    //             options: {
    //               showEffects: true,
    //             },
    //           },
    //           {
    //             onSuccess: async (tx:any) => {
    //                 resolve(tx.effects?.created[0].reference.objectId)
    //             },
    //             onError:(error)=>{
    //                 reject(error)
    //                 console.log('error--->',error)
    //             },
    //             onSettled:(data)=>{
    //                 console.log('data--->', data)
    //                 alert(data?.effects?.status)
    //             }
    //           },
    //         );
    //     })
    // }

    // const affiliate_campaign_profile = (profileAddress): any => {
    //     return new Promise((resolve, reject) => {
    //         const txb = new TransactionBlock();
    //         txb.moveCall({
    //           arguments: [
    //                     //todo - need to pass short url
    //                     //todo - need to pass profile address
    //                     txb.pure.u64(parseInt('0')),
    //                     txb.pure.u64(parseInt('0')),
    //                     txb.pure.address(account?.address),
    //                     ],
    //           target: `${CAMPAIGN_PACKAGE_ID}::campaign_fund::create_affiliate`,
    //         });
        
    //         signAndExecute(
    //           {
    //             transactionBlock: txb,
    //             options: {
    //               showEffects: true,
    //             },
    //           },
    //           {
    //             onSuccess: async (tx:any) => {
    //                 resolve(tx.effects?.created[0].reference.objectId)
    //                 alert("success")
    //             },
    //             onError:(error)=>{
    //                 reject(error)
    //                 console.log('error--->',error)
    //             },
    //             onSettled:(data)=>{
    //                 console.log('data--->', data)
                   
    //             }
    //           },
    //         );
    //     })
        
    // }

    // const saveIntoDB = async ({hasProfileAddress, campaignProfileTxAddress, linkTxAddress}:any) => {
       
    //     const response = await createAffiliate({
    //         walletAddress: account?.address,
    //         originalUrl: campaign.originalUrl,
    //         campaignUrl,
    //         campaignObjectAddress: campaign.campaignInfoAddress,
    //         earnings: 0,
    //         profileAddress: hasProfileAddress,
    //         campaignProfileAddress: campaignProfileTxAddress,
    //         linkTxAddress: linkTxAddress,
    //     })
    //     setCampaignUrl(response.campaignUrl)
    // }

    const getAffiliateProfile = async () => {
      const profileDetails = await fetchAffiliateProfile({walletAddress: account?.address})
      if(profileDetails.length){
          return profileDetails[0].profileAddress
      }else{
          return null;
      }
    }

    const handleSubmit = async () => {
        try{
            const affiliateProfile = await getAffiliateProfile()
            const campaignUrl = generateCampaignUrl();
            const response = await createAffiliate({
              twitterProfile,
              originalUrl: campaign.originalUrl,
              campaignUrl,
              walletAddress: account?.address,
              campaignInfoAddress: campaign.campaignInfoAddress,
              profileAddress: affiliateProfile,
            });
            console.log('response-->', response)
            setCampaignUrl(response.campaignUrl)
        }catch(err){
            console.log('error--->', err)
        }
    }

    return(
        <>
            <section style={{ borderBottom: '0.5px solid white', borderTop: '0.5px solid white',}}>
                <p>CampaignName - {campaign.campaignName}</p>
                <p>CompanyName - {campaign.companyName}</p>
                <p> Category - {campaign.category}</p>
                <p>CPC - {campaign.cpc}</p>
                <p>startDate - {campaign.startDate}</p>
                <p>endDate - {campaign.endDate}</p>
                <p>Original URl - {campaign.originalUrl}</p>
                <button style={{margin: 10, width: 100}} onClick={handleParticipate}>participate</button>
                <button style={{margin: 10, width: 100}} onClick={handleEndCampaign}>End cgn..</button>
                {
                  participate && (
                  <>
                    {
                      account?.address ? (
                          <section style={{margin: 10}}>
                          <input onChange={(e)=>setTwitterProfile(e.target.value)} placeholder="Enter your twitter profile" style={{width:'280px', textAlign: 'center'}}  />
                          <button onClick={handleSubmit}>submit</button> 
                         { campaignUrl && <p> campaignUrl - {campaignUrl} </p>}
                          </section>
                          ): 
                          <p>please connect wallet</p>
                    }
                  </>
                  )
                }
            </section>
         
        </>
    )
}

export default CampaignCard;