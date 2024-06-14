import { useEffect, useState } from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import HoverCard from '../HoverCard/HoverCard';
import { fetchAffiliateProfile } from '../../common/services/api.services';
import toast, { Toaster } from 'react-hot-toast';
import './Navbar.css';

export default function Navbar({ color, page, textColor }: any) {
    const account = useCurrentAccount();
    const walletAddress = account ? account.address : '';
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);

    const getAffiliateProfile = async () => {
        try {
            toast.loading('Fetching affiliate profile...');
            const profileDetails = await fetchAffiliateProfile({ walletAddress });
            toast.dismiss();
            if (profileDetails.length) {
                const formattedCampaigns = profileDetails.map((campaign: any) => ({
                    price: campaign.cpc * campaign.validClicks,
                    name: campaign.campaignInfoAddress,
                }));
                setCampaigns(formattedCampaigns);
            } else {
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

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={`navbar py-4 bg-${color}`}>
            <Toaster />
            <div className="container align-center main-container">
                <div className='flex justify-between'>
                <div>
                {page === 'navbar' && !menuOpen && <img className="ham-burg-img" src="/hamburger-white.svg" alt="menu" onClick={handleMenuToggle} />}
               {page=='campaign' && !menuOpen && <img className="ham-burg-img" src="/hamburger-black.svg" alt="menu" onClick={handleMenuToggle} />}
                {page === 'navbar' && menuOpen && <img className="ham-burg-img" src="/close-white.svg" alt="menu" onClick={handleMenuToggle} />}
               {page=='campaign' && menuOpen && <img className="ham-burg-img" src="/close-black.svg" alt="menu" onClick={handleMenuToggle} />}
                <div className={`nav-links flex gap-16 align-center ${menuOpen ? 'open' : 'mobdisplay-none'}`}>
                    <a href="/home" className={`hover:text-blue font-weight-400 font-size-16 mx10 text-${textColor}`}>
                        {page === 'navbar' && <img className='logo' src="/logo.png" alt="logo" />}
                        {page === 'campaign' && <img className='logo' src="/logo.png" alt="logo" />}
                    </a>
                    <a href="/home" className={`home-text hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>Home</a>
                    <a href="/campaigns" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>Become an Affiliate</a>
                    <a href="/campaign/create" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>Start a campaign</a>
                    <a href="https://docs.google.com/document/d/1Sw7LHKA212hwJXeanBH0ow3nqUn_ZSKVSoVMy7Essfw/edit?usp=sharing" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>Docs</a>
                </div>
            </div>
                <div className="nav-actions flex gap-16 align-center">
                    {page === 'navbar'  && (
                        <div className="earning-container">
                            <div className="my-earning">My Earning</div>
                            <HoverCard className="hover-card" campaigns={campaigns} />
                        </div>
                    )}
                    {page === 'navbar' && <ConnectButton />}
                    {page === 'campaign' && (
                        <div className="profile-pic flex align-center">
                            <div className="earning-container">
                            <div className="my-earning text-black mr-16">My Earning</div>
                            <HoverCard className="hover-card" campaigns={campaigns} />
                        </div>
                            <div className="profile-info">
                                <ConnectButton />
                            </div>
                        </div>
                    )}
                </div>

                </div>
            </div>
        </nav>
    );
}
