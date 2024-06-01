import './Footer.css';

function Footer() {
    return (
        <footer className="footer-container bg-footer py-4">
            <div className="footer-content flex  align-center">
                <div className="social-handles">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="/twitterx.svg" alt="Facebook" className="social-icon" />
                    </a>
                    <a href="https://gmail.com" target="_blank" rel="noopener noreferrer">
                        <img src="/gmail.png" alt="Instagram" className="social-icon" />
                    </a>
                    {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="/linkedin.png" alt="LinkedIn" className="social-icon" />
                    </a> */}
                </div>
                <div className="contact-info flex align-center">
                    <img src='/contact.png' alt='contact'></img>
                    <a href="mailto:example@gmail.com" className="contact-link text-black ff-primary font-size-16">Book a Call</a>
                </div>
                <div className="get-in-touch">
                    <a href="https://forms.gle/" target="_blank" rel="noopener noreferrer" className="get-in-touch-link text-black ff-primary font-size-16">Get in Touch</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
