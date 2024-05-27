import CustomButton from "../CustomButton/CustomButton";
const ContactForm = () => {
    return (
        <div className="form-container my-2">
            <form>
                <p className='ff-secondary text-black font-weight-600 font-size-18' >Get in touch</p>
                <input type="text" placeholder="Name" className="m-2 font-weight-400 font-size-16 ff-primary" />
                <input type="email" placeholder="Email" className="m-2 font-weight-400 font-size-16 ff-primary" />
                <textarea placeholder="Message" className="m-2 font-weight-400 font-size-16 ff-primary"></textarea>
                <CustomButton title="Send" color="white" backgroundColor="#006AFF" width="100px" />
            </form>
        </div>
    );
} 

export default ContactForm;
