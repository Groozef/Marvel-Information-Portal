import { NavLink } from 'react-router-dom';
import './AppHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <div className="app__header-title">
                <NavLink to="/">
                    <span>Marvel</span> Information portal
                </NavLink>
            </div>

            <nav className="app__header-menu">
                <ul className="app__header-list">
                    <li className="app__header-item">
                        <NavLink 
                            
                            to="/" 
                            style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit' })}
                        >
                            Characters
                        </NavLink>
                    </li>

                    <li>/</li>

                    <li className="app__header-item">
                        <NavLink 
                            
                            to="/comics" 
                            style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit' })}
                        >
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default AppHeader;