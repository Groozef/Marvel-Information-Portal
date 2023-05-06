import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useMarvelService from '../../../services/MarvelService';
import ErrorMessage from '../../errorMessage/ErrorMessage';

import './SingleComicPage.scss';

import AppBaner from '../../appBanner/AppBaner';

const SingleComicPage = () => {
    const { comicID } = useParams();

    const { getComic, loading, error, clearError } = useMarvelService();

    const [ comic, setComic ] = useState({});


    useEffect(() => {
        onComicUpdate()
    }, [comicID])

    const onComicUpdate = () => {
        clearError();
        getComic(comicID)
            .then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    
    const errorMessage = error ? <ErrorMessage /> : null,
          content = !(error && loading && !comic) ? <View comic={comic}/> : null;

    const navigate = useNavigate(),
          goBack = () => navigate(-1);

    return (
        <div className="comic">
            <AppBaner />
            <div className="comic-wrapper">
                {errorMessage}
                {content}
                <div className="comic-back___nav">
                    <NavLink to="/comics" className="comic-back__link" style={{fontWeight: 700, fontSize: 18, lineHeight: '21px'}}>Back to all</NavLink>
                    <div 
                        className="comic-back__link" 
                        style={{fontWeight: 700, fontSize: 18, lineHeight: '21px', marginTop: 10, cursor: 'pointer'}}
                        onClick={goBack}
                    >Go back</div>
                </div>
            </div>
        </div>
    );
};

const View = ({ comic }) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className='comic__main-content'>
            <div className="comic-img">
                <img src={thumbnail} alt={title} />
            </div>

            <div className="comic__sub-content">
                <div className="comic-title">
                    {title}
                </div>
                <div className="comic-description">
                    {description}
                </div>
                <div className="comic-pages">
                    {pageCount}
                </div>
                <div className="comic-language">
                    {language}
                </div>
                <div className="comic-price">
                    {price}
                </div>
            </div>
        </div>
    )
}

export default SingleComicPage;