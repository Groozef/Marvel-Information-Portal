import { useState, useEffect } from 'react';

import './RandomChar.scss';
import mjolnirIMG from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
    // states

    const [char, setChar] = useState({});

    const {getChar, loading, error, clearError} =  useMarvelService();

    useEffect(() => {
        updateRandomChar();
    }, []);


    // Getting a character by id using methods of an instance of the marvelService class
    const updateRandomChar = () => {
        clearError();
        const randomID = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // random range
        getChar(randomID) 
            .then(res => {
                console.log('random char');
                setChar(res);
            })
    };

    // content processing
    const errorMessage = error ? <ErrorMessage /> : null,
          spinnerLoading = loading ? <Spinner /> : null,
          content = !(error || loading) ? <CharContent char={{ char }} /> : null;

    return (
        <div className="randomchar">
            <div className="randomchar-items">
                <div className="randomchar-item">
                    {errorMessage}
                    {spinnerLoading}
                    {content}
                </div>
                <div className="randomchar-item randomchar-try">
                    <div className="randomchar-try__titles">
                        <div className="randomchar-try__title">
                            Random character for today!<br />
                            Do you want to get to know him better?
                        </div>
                        <div className="randomchar-try__title">
                            Or choose another one
                        </div>
                    </div>

                    <div href="#" className="button button__main" onClick={updateRandomChar}>
                        <div className="inner">Try it</div>
                    </div>

                    <img src={mjolnirIMG} alt="mjolnir" />
                </div>
            </div>
        </div>
    )
};



const CharContent = ({ char }) => {
    const { char: { name, description, thumbnail, homepageURL, wikiURL } } = char;

    return (
        <>
            <div className="randomchar-img">
                <img src={thumbnail} alt="thor" />
            </div>

            <div className="randomchar-content">
                <div className="randomchar-title">
                    {name}
                </div>
                <div className="randomchar-descr">
                    {description}
                </div>

                <div className="randomchar-btns">
                    <a href={homepageURL} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wikiURL} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
};

export default RandomChar;