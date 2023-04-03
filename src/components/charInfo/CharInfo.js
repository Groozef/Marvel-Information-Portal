import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Test
import './CharInfo.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
    // states:
    const [char, setChar] = useState();

    const {loading, error, getChar, clearError} = useMarvelService();


    const updateChar = () => {
        clearError();
        const {charID} = props;
        getChar(charID)
            .then(char => {
                setChar(char);
            });
    }

    useEffect(() => {
        // props.charID = 1010338;
        updateChar();
    }, [props.charID]);

    // Content processing
    const errorMessage = error ? <ErrorMessage /> : null,
        loadingSekeleton = loading ? <Skeleton /> : null,
        content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
        <div className="charinfo">
            {content}
            {loadingSekeleton}
            {errorMessage}
        </div>
    )
};


const View = ({ char }) => {
    const { thumbnail, name, homepageURL, wikiURL, description,  comics} = char;

    const [comicID, setComicID] = useState(null);

    const getComicID = (resource) => {
        for(let i = resource.length; i > 0; i--) {
            if(resource[i] === '/') {
                const id = resource.slice(i + 1);
                setComicID(id);
                return;
            }
        }
    };




    return (
        <div className="charinfo__wrapper">
            <div className="charinfo__character-profile profile">
                <div className="charinfo__image">
                    <img src={thumbnail} alt="thor" />
                </div>

                <div className="profile-content">
                    <div className="profile-name">
                        {name}
                    </div>

                    <div className="profile-btns">
                        <a href={homepageURL} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wikiURL} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="charinfo__character-description">
                {description}
            </div>

            <div className="charinfo__comics-recomendation">
                <p className='charinfo__comics-title'>Comics:</p>

                <ul className="charinfo__comics-list comics-items">
                    {comics.length > 0 ? null : 'This character was not in the comics'}
                    {
                        comics.map((item, i) => {
                            return <li 
                                        className="comics-item" 
                                        key={i}
                                        onClick={(e) => {
                                            getComicID(item.resourceURI);
                                        }}
                                    >{item.name}</li>
                        })
                    }
                </ul>
            </div>

        </div>
    )
};

CharInfo.propTypes = {
    charID: PropTypes.number,
}



export default CharInfo;