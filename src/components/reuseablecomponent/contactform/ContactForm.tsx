const ContactForm = () => {
    return (
        <div className="form-container my-2">
            <form>
                <p className='font-montserrat text-black font-weight-600 font-size-18' style={{ marginBottom: '0px' }}>Get in touch</p>
                <input type="text" placeholder="Name" className="m-2 font-weight-400 font-size-16 font-mulish" />
                <input type="email" placeholder="Email" className="m-2 font-weight-400 font-size-16 font-mulish" />
                <textarea placeholder="Message" className="m-2 font-weight-400 font-size-16 font-mulish"></textarea>
                <button className=" button-blue m-4 btn">Send</button>
            </form>
        </div>
    );
}

export default ContactForm;
