import ContactForm from '../reuseablecomponent/contactform/ContactForm';
import './footer.css';

function Footer() {
    return (
        <footer className="bg-footer py-4" style={{ marginTop: '30px' }}>
            <div className="maincontainer main-container flex justify-space-evenly">
                <div className="contact-info grid">
                    <h2 className="font-mulish font-size-16 text-black font-weight-600">Contact info</h2>
                    <div className='flex justify-center'>
                        <img src="./public/location.png" alt="Location icon" className="mb-4" />
                    </div>
                </div>
                <ContactForm />
            </div>
        </footer>
    );
}

export default Footer;
