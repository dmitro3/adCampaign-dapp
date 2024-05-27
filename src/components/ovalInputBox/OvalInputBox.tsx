import './OvalInputBox.scss'

const OvalInputBox = ({handleChange, placeholder, value, endIcon}: any) => {
    return(
    <section>
        <article className='oval-input-box-container'>
            <input onChange={handleChange} placeholder={placeholder} value={value} />
            {endIcon && 
            <div className='end-icon'>
                {endIcon}
            </div>
            }
        </article>
    </section>
    )
}

export default OvalInputBox;