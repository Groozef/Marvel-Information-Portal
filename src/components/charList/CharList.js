import './CharList.scss';
import aabys from '../../resources/img/abyss.jpg';
import CharInfo from '../charInfo/CharInfo';


const CharList = () => {
    return (
        <div className="char__content">
            <div className="char__list">
                <ul className="char__flex">
                    <li className="char__item">
                        <img src={aabys} alt="aabys" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={aabys} alt="aabys" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={aabys} alt="aabys" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={aabys} alt="aabys" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={aabys} alt="aabys" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={aabys} alt="aabys" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={aabys} alt="aabys" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={aabys} alt="aabys" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={aabys} alt="aabys" />
                        <div className="char__name">Abyss</div>
                    </li>
                </ul>

                <div className="char__btn_wrapper">
                    <button className="button button__main button__long">
                        <div className="inner">load more</div>
                    </button>
                </div>
            </div>

            <CharInfo />    
        </div>
    )
};

export default CharList;