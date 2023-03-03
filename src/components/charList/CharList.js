import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CharList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';




class CharList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            charList: [],
            loading: true,
            error: false,
            limit: 9,
            offset: 210,
            loadingNewItems: false,
            charsEnded: false
        }
        this.itemRefs = [];
    }

    marvelService = new MarvelService();

    onSetRef = (ref) => {
        this.itemRefs.push(ref);
    };

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (limit, offset) => {
        this.onLoadingCharList();

        this.marvelService.getAllCharacters(limit, offset)
            .then(this.onLoadedCharList)
            .catch(this.onError);
    };

    onLoadingCharList = () => {
        this.setState({
            error: false,
            loadingNewItems: true
        })
    };


    onLoadedCharList = (newCharList) => {
        let ended = false;
        if(newCharList.length >= this.state) {
            ended = true;
        }
        this.setState(({limit}) => {
            return {
                charList: [...newCharList],
                loading: false,
                error: false,
                limit: limit + 9,
                loadingNewItems: false,
                charsEnded: ended
            }
        });       
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    };

    onFocusCard = (id) => {
        this.tabRef[id].current.focus();
    };

    CharItem = (char) => {
        const {charList} = char;
        
        return charList.map((item, i) => {
            return (
                <li 
                    className={this.props.charID === item.id ? 'char__item char__item_selected' : 'char__item'}
                    key={item.id}
                    onClick={() => {
                        this.props.onSelectedChar(item.id)
                    }}
                    tabIndex={0}
                    ref={this.onSetRef}
                    onKeyPress={(event) => {
                        if(event.key === 'Enter') {
                            this.props.onSelectedChar(item.id);
                            this.onFocusCard(i);
                        }
                    }}
                >
                    <img src={item.thumbnail} alt="aabys" />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
    };


    render() {
        const {charList, loading, error, limit, loadingNewItems, charsEnded, offset} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null,
              spinnerLoading = loading ? <Spinner /> : null,
              renderItems = this.CharItem({charList}),
              contentList = !(loading || error) ? renderItems : null;

        return (
            <div className="char__content">
                <div className="char__list">
                    <ul className="char__flex">
                        {errorMessage}
                        {spinnerLoading}
                        {contentList}
                    </ul>
                    <div className="char__btn_wrapper">
                        <button 
                            className="button button__main button__long"
                            disabled={loadingNewItems}
                            onClick={() => {
                                this.onRequest(limit, offset)
                            }}
                            style={{display: charsEnded ? 'none' : 'block'}}
                        >
                            <div className="inner">load more</div>
                        </button>
                    </div>
                </div>

            </div>
        )
    }
};

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}




export default CharList;