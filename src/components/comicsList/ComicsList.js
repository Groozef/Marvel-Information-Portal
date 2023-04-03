import { useState, useEffect, flushSync } from "react";
import { NavLink } from "react-router-dom";

import AppBanner from '../appBanner/AppBaner'
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";

import './ComicsList.scss';

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]),
          [offset, setOffset] = useState(16),
          [loadingNewComics, setLoadingNewComis] = useState(false),
          [comicsEnded, setComicsEnded] = useState(false),
          [checkNewComics, setCheckNewComics] = useState(false);

    const marvelService = useMarvelService();

    const { loading, error, getAllComics } = marvelService;

    useEffect(() => {
        onRequest(offset, true)
    }, []);

    const onLoadedComicsList = (newComicsList) => {
        let ended = false;

        if (newComicsList.length >= offset) ended = true;

        setComicsList(comicsList => {
            if (!checkNewComics) {
                setCheckNewComics(true);
                return [...newComicsList];
            }
            return [...comicsList, ...newComicsList];
        });
        setOffset(offset => offset + 8);
        setLoadingNewComis(false);
        setComicsEnded(ended);
    }

    const onRequest = (offset, initial) => {
        initial ? setLoadingNewComis(false) : setLoadingNewComis(true);
        getAllComics(offset)
            .then(onLoadedComicsList);
    };

    const comicsItem = (comics) => {
        return comics.map((item, i) => {
            return (
                <li className="comics__list-item" key={i}>
                    <NavLink to={`/comics/${item.id}`}>
                        <div className="comics__image">
                            <img src={item.thumbnail} alt="uw" />
                        </div>
                        <div className="comics__name">
                            {item.title}
                        </div>
                        <div className="comics__price">
                            {item.price}
                        </div>
                    </NavLink>
                </li>
            );
        });
    }

    const errorContent = error ? <ErrorMessage /> : null,
        loadingContent = loading && !loadingNewComics ? <Spinner /> : null,
        content = comicsItem(comicsList);

    return (
        <div className="comics">
            <div className="comics__wrapper">
                <AppBanner />
                <ul className="comics__list">
                    <div className="comics__grid">
                        {errorContent}
                        {loadingContent}
                        {content}
                    </div>
                </ul>
                <div className="comics__btn-wrapper">
                    <button
                        className="button button__main button__long"
                        onClick={() => {
                            onRequest(offset);
                        }}
                        disabled={loadingNewComics}
                        style={{ display: comicsEnded ? 'none' : 'block' }}
                    >
                        <div className="inner">
                            Load more
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ComicsList;