import './Footer.css';

function Footer() {
    return (
        <footer className="footer-container py-4">
            <div className="footer-content flex  align-center">
                <div className="social-handles">
                    <a href="https://x.com/ad_token84520" target="_blank" rel="noopener noreferrer">
                        <img src="/twitterx.png" alt="Facebook" className="social-icon" />
                    </a>
                    <a href="https://zoro@adtoken.co" target="_blank" rel="noopener noreferrer">
                        <img src="/gmail.png" alt="Instagram" className="social-icon" />
                    </a>
                </div>
                <div className="contact-info flex align-center">
                    <a href=" https://calendly.com/mukuisrani/let-catch-up" target='_blank' rel='noopener noreferrer' className="contact-link text-black ff-primary font-size-16"><img src='/telephone.png' alt='contact' width={22} height={22}></img></a>
                </div>
                <div className="get-in-touch flex align-center">
                    <a href=" https://t.me/mukul601" target="_blank" rel="noopener noreferrer" className="get-in-touch-link text-black ff-primary font-size-16"><img src='/telegram.png' alt='contact' width={22} height={22}></img></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
