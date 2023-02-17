import './CharInfo.scss';
import thor from '../../resources/img/thor.jpeg';


const CharInfo = () => {
    return (
        <div className="charinfo">
            <div className="charinfo__wrapper">
                <div className="charinfo__character-profile profile">
                    <div className="charinfo__image">
                        <img src={thor} alt="thor" />
                    </div>

                    <div className="profile-content">
                        <div className="profile-name">
                            Thor
                        </div>

                        <div className="profile-btns">
                            <a href="#" className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href="#" className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="charinfo__character-description">
                    In Norse mythology, Loki is a god or jötunn (or both). 
                    Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. 
                    By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, 
                    and the world serpent Jörmungandr. By Sigyn, 
                    Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, 
                    Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, 
                    Loki is referred to as the father of Váli in the Prose Edda.
                </div>

                <div className="charinfo__comics-recomendation">
                    <p className='charinfo__comics-title'>Comics:</p>

                    <ul className="charinfo__comics-list comics-items">
                        <li className="comics-item">All-Winners Squad: Band of Heroes (2011) #3</li>
                        <li className="comics-item">Alpha Flight (1983) #50</li>
                        <li className="comics-item">Amazing Spider-Man (1999) #503</li>
                        <li className="comics-item">Amazing Spider-Man (1999) #504</li>
                        <li className="comics-item">AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)</li>
                        <li className="comics-item">Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)s</li>
                        <li className="comics-item">Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)</li>
                        <li className="comics-item">Vengeance (2011) #4</li>
                        <li className="comics-item">Avengers (1963) #1</li>
                        <li className="comics-item">Avengers (1996) #1</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default CharInfo;