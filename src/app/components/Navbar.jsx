'use client'
import MenuComponent from "./menu"
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
const Navbar = ({  setlogstatus }) => {
    return (
        <>
            <nav>
                <h2>mi programa</h2>
                <MenuComponent icon={<FontAwesomeIcon icon={faUser} />}
                    content={
                        <div onClick={() => setlogstatus(false)}>logout</div>
                    }
                    
                />
            </nav>
        </>
    )
}

Navbar.propTypes = {
    setlogstatus: PropTypes.func
};
export default Navbar