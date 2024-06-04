import React from 'react';
import './ContactForm.css';

const ContactForm: React.FC = () => {
    return (
        <div className="form-container my-2">
            <p className='ff-secondary text-black font-weight-600 font-size-18'>Get in touch</p>
            <iframe 
                src="https://forms.gle/8BQAWEait5n8iHYc9" 
                width="300px" 
                height="500px"  
                style={{ border: 'none', overflow: 'auto' }}  
                title="Contact Form"
            >
                Loading…
            </iframe>
        </div>
    );
}

export default ContactForm;
