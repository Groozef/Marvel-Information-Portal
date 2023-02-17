import './AppHeader.scss';


const AppHeader = () => {
    return (
        <header className="app__header">
            <div className="app__header-title">
                <span>Marvel</span> Information portal
            </div>

            <nav className="app__header-menu">
                <ul className="app__header-list">
                    <li className="app__header-item app__header-item__active"><a href="#">Characters</a></li>
                    <li>/</li>
                    <li className="app__header-item"><a href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
};

export default AppHeader;