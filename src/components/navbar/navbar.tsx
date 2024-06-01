import { useEffect, useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import HoverCard from '../HoverCard/HoverCard';
import { fetchAffiliateProfile } from '../../common/services/api.services';
import toast, { Toaster } from 'react-hot-toast';
import './Navbar.css';

export default function Navbar({ color, page, textColor }: any) {
    const account = useCurrentAccount();
    const walletAddress = account ? account.address : '';
    console.log('walletAddress', walletAddress);
    const [profileAddress, setProfileAddress] = useState<string | null>(null);
    const [campaigns, setCampaigns] = useState<any[]>([]);

    const getAffiliateProfile = async () => {
        try {
            toast.loading('Fetching affiliate profile...');
            const profileDetails = await fetchAffiliateProfile({ walletAddress });
            toast.dismiss();
            if (profileDetails.length) {
                setProfileAddress(profileDetails[0].profileAddress);
                const formattedCampaigns = profileDetails.map((campaign: any) => ({
                    price: campaign.cpc * campaign.validClicks,
                    name: campaign.campaignInfoAddress,
                }));
                setCampaigns(formattedCampaigns);
            } else {
                setProfileAddress(null);
                setCampaigns([]);
            }
        } catch (error) {
            toast.dismiss();
            toast.error('Error fetching affiliate profile.');
            console.error('Error fetching affiliate profile', error);
            throw error;
        }
    };

    useEffect(() => {
        if (walletAddress) {
            getAffiliateProfile();
        }
    }, [walletAddress]);

    return (
        <nav className={`navbar py-4 bg-${color}`}>
            <Toaster />
            <div className="container flex align-center main-container">
                <div className="nav-links flex gap-16 mobdisplay-none align-center">
                <a href="/" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>
    {page === 'navbar' && <img className='logo' src="/logowhite.png" alt="logo" />}
    {page === 'campaign' && <img className='logo' src="/logoblack.png" alt="logo" />}
</a>
                    <a href="/campaigns" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>Become an Affiliate</a>
                    <a href="/campaign/create" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>Start a campaign</a>
                </div>
                <div className="nav-actions flex gap-16 align-center">
                    {page === 'navbar' && profileAddress && (
                        <div className="earning-container">
                            <div className="my-earning">My Earning</div>
                            <HoverCard className="hover-card" campaigns={campaigns} />
                        </div>
                    )}
                    {page === 'navbar' && <ConnectButton />}
                    {page === 'campaign' && (
                        <div className="profile-pic flex align-center">
                            <img src="/profile.png" alt="profile" className="profile-image" />
                            <div className="profile-info">
                                <ConnectButton />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
