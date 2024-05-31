import { ConnectButton } from '@mysten/dapp-kit';
import './Navbar.css';

export default function Navbar({ color, page, textColor }: { color: string, page: string, textColor: string }) {
    return (
        <nav className={`navbar py-4 bg-${color}`}>
            <div className="container flex align-center main-container">
                <div className="nav-links flex gap-16 mobdisplay-none">
                    {/* {page === 'campaign' && ( */}
                        {/* // <a href="#" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>My Campaign</a> */}
                    {/* )} */}
                    <a href="/campaigns" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>Become an Affiliate</a>
                    <a href="/campaign/create" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>Start a campaign</a>

                    {/* todo about navigation */}
                    {/* <a href="#" className={`hover:text-blue font-weight-400 font-size-16 text-${textColor}`}>About</a> */}
                </div>
                <div className="nav-actions flex gap-16 align-center">
                    {page === 'navbar' && (<ConnectButton />)}
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
