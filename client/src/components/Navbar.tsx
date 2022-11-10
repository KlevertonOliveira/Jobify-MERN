import { useState } from 'react';
import { FaAlignLeft, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { Logo } from '.';
import Wrapper from '../assets/wrappers/Navbar';
import { useAppContext } from '../contexts/appContext';

export default function Navbar() {
  const { toggleSidebar, logoutUser, state: { user } } = useAppContext();

  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type='button'
          className="toggle-btn"
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type='button'
            className='btn'
            onClick={() => { setShowLogout(!showLogout) }}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showLogout && 'show-dropdown'}`}>
            <button
              type="button"
              className='dropdown-btn'
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}