import { Link, NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : undefined}>Home</NavLink>
        </li>
        
        <li>
          <NavLink to="/browse-characters" className={({ isActive }) => isActive ? 'active-link' : undefined}>Browse Characters</NavLink>
        </li>
        
        <li>
          <NavLink to="/comics" className={({ isActive }) => isActive ? 'active-link' : undefined}>Comics</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;