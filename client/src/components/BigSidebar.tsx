import { Logo } from '.';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useAppContext } from '../contexts/appContext';
import NavLinks from './NavLinks';

export default function BigSidebar() {
  const { state: { showSidebar } } = useAppContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${!showSidebar && 'show-sidebar'}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}