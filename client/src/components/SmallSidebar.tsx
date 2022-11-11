import { FaTimes } from 'react-icons/fa';
import { Logo } from '.';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { useAppContext } from '../contexts/appContext';
import NavLinks from './NavLinks';

export default function SmallSidebar() {
  const { state: { showSidebar }, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar && 'show-sidebar'}`}>
        <div className="content">
          <button
            className="close-btn"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  )
}