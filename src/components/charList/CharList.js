import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CharList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

const CharList = (props) => {
    const {loading, error, getAllCharacters} = useMarvelService(); 

    // States
    const [charList, setCharList] = useState([]), // list characters
          [offset, setOffset] = useState(210),
          [loadingNewItems, setLoadingNewItems] = useState(false),
          [charsEnded, setCharsEnded] = useState(false),
          [checkNewChars, setCheckNewChars] = useState(false);

    // Ref
    const itemRefs = useRef([]);
    
    const onFocusCard = (i) => {
        itemRefs[i].current.focus();
    };
    

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onLoadedCharList = (newCharList) => {
        let ended = false;
        if(newCharList.length >= offset) ended = true;
        setCharList(charList => {
            if(!checkNewChars) {
                setCheckNewChars(true);
                return [...newCharList];
            }
            
            return [...charList, ...newCharList];
            
        });

        setLoadingNewItems(false);
        setOffset(offset => offset + 9);
        setCharsEnded(ended);
    };

    const onRequest = (offset, initial) => {
        initial ? setLoadingNewItems(false) : setLoadingNewItems(true);
        getAllCharacters(offset)
            .then(onLoadedCharList);
    }

    const charItem = (char) => {
        const {charList} = char;
        
        return charList.map((item, i) => {
            return (
                <li 
                    className={props.charID === item.id ? 'char__item char__item_selected' : 'char__item'}
                    key={item.id}
                    onClick={() => {
                        props.onSelectedChar(item.id)
                    }}
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    onKeyPress={(event) => {
                        if(event.key === 'Enter') {
                            props.onSelectedChar(item.id);
                            onFocusCard(i);
                        }
                    }}
                >
                    <img src={item.thumbnail} alt="aabys" />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
    };


        
    // Content Processing:
    const errorMessage = error ? <ErrorMessage /> : null,
          spinnerLoading = loading && !loadingNewItems ? <Spinner /> : null,
          renderItems = charItem({charList});

    return (
        <div className="char__content">
            <div className="char__list">
                <ul className="char__flex">
                    {errorMessage}
                    {spinnerLoading}
                    {renderItems}
                </ul>
                <div className="char__btn_wrapper">
                    <button 
                        className="button button__main button__long"
                        disabled={loadingNewItems}
                        onClick={() => {
                            onRequest(offset)
                        }}
                        style={{display: charsEnded ? 'none' : 'block'}}
                    >
                        <div className="inner">load more</div>
                    </button>
                </div>
            </div>

        </div>
    )
};

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;