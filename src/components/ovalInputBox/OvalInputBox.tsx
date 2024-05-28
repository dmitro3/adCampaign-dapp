import { useEffect, useRef, useState } from 'react';
import './OvalInputBox.scss'

const OvalInputBox = ({endIcon, handleChange, handleBlur, name, placeholder, value, type}: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputContainerRef = useRef(null) as any;

    const handleClickOutside = (event:any) => {
        if (inputContainerRef.current && !inputContainerRef.current.contains(event.target)) {
          setIsFocused(false);
        }
      };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    
    return(
        <section className={`input-container ${isFocused || value ? 'focused' : ''}`} ref={inputContainerRef}>
            <label className="input-label" htmlFor={name}>{placeholder}</label>
            <article className='oval-input-box-container'>
                <input 
                  id={name}
                  className="oval-input"
                  defaultValue={value} 
                  onChange={handleChange} 
                  name={name}
                  onFocus={() => setIsFocused((prev: any)=>!prev)}
                  onBlur={handleBlur}
                  type={type}
                />
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