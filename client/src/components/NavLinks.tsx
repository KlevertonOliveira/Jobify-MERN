import { NavLink } from 'react-router-dom';
import links from '../utils/links';

interface NavLinksProps {
  toggleSidebar?: () => void;
}

export default function NavLinks({ toggleSidebar }: NavLinksProps) {
  return (
    <div className="nav-links">
      {links.map(link => (
        <NavLink
          key={link.id}
          to={link.path}
          className={({ isActive }) => `nav-link ${isActive && 'active'}`}
          onClick={toggleSidebar}
          end
        >
          <span className='icon'>{link.icon}</span>
          {link.text}
        </NavLink>
      ))}
    </div>
  )
}