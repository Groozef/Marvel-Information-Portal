import './AppBaner.scss';
import AvengersIMG from '../../resources/img/Avengers.png';
import AvengersLogo from '../../resources/img/Avengers_logo.png';

const AppBanner = () => {

    return (
        <div className="app__baner baner">
            <div className="baner__wrapper">
                <div className="banner__flex-container">
                    <div className="baner__avengers-image">
                        <img src={AvengersIMG} alt="avengers" />
                    </div>

                    <div className="baner__description">
                        New comics every week!
                        Stay tuned!
                    </div>

                    <div className="baner__avengers-logo">
                        <img src={AvengersLogo} alt="avengers-logo" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AppBanner;