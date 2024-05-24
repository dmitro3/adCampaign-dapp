import { ConnectButton } from '@mysten/dapp-kit';
import './navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar bg-dark py-4">
            <div className="container flex align-center main-container">
                <div className="nav-links flex gap-16 mobdisplay-none">
                    <a href="#" className="hover:text-blue font-weight-400 font-size-16 text-white">Become an Affiliate</a>
                    <a href="#" className="hover:text-blue font-weight-400 font-size-16 text-white">Start a campaign</a>
                    <a href="#" className="hover:text-blue font-weight-400 font-size-16 text-white">About</a>
                </div>
                <div className="nav-actions flex gap-16 align-center">
                    <a href="#" className="hover:text-blue font-weight-400 font-size-16 text-white">My earnings</a>
                    <ConnectButton />
                </div>
            </div>
        </nav>
    );
}
