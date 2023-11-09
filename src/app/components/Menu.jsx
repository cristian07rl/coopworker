'use client'
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MenuComponent = ({content,icon,title}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);

    const handleClick = () => {
        event.stopPropagation();
        setMenuVisible(!menuVisible);
    };

    const handleOutsideClick = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    
    return (
        <div className='dropdown-li' onClick={handleClick}>
            {title} {icon}
            {menuVisible && (
                <div className='dropdown' ref={menuRef}>
                    {content}
                </div>
            ) }
        </div>
    );
};
MenuComponent.propTypes = {
    content: PropTypes.element,
    icon: PropTypes.element,
    title: PropTypes.string
}
export default MenuComponent;
