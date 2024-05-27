import ContactForm from '../ContactForm/ContactForm';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer-container bg-footer py-4">
            <div className="maincontainer main-container flex justify-space-evenly">
                <div className="contact-info grid">
                    <h2 className="ff-primary font-size-16 text-black font-weight-600">Contact info</h2>
                    <div className='flex justify-center'>
                        <img src="location.png" alt="Location icon" className="mb-4" />
                    </div>
                </div>
                <ContactForm />
            </div>
        </footer>
    );
}

export default Footer;
