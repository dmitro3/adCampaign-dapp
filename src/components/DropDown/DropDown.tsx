import { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

interface DropdownProps {
    imageSrc: string;
    text: string;
    options: string[];
    onSelect: (value: string) => void;
    droptype: string;
}

const Dropdown: React.FC<DropdownProps> = ({ imageSrc, text, options, onSelect, droptype }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropdown-toggle align-center flex justify-space-around font-size-14 font-weight-500">
                <img src={droptype} alt="dropdown arrow" className="dropdown-arrow" />
                {text}
                <img src={imageSrc} alt="dropdown arrow" className="dropdown-arrow" />
            </button>
            {isOpen && (
                <ul className="dropdown-menu font-size-14">
                    {options.map((option) => (
                        <li key={option} className="dropdown-option" onClick={() => handleSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
