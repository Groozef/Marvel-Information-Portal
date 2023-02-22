import { Component } from 'react';
import './CharList.scss';
import aabys from '../../resources/img/abyss.jpg';
import CharInfo from '../charInfo/CharInfo';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';




class CharList extends Component{
    state = {
        charList: [],
        loading: true,
        error: false,
    }


    componentDidMount() {
        const marvelService = new MarvelService();
        marvelService.getAllCharacters(9)
            .then(res => {
                this.loadedList();           
                this.setState({
                    charList: res,
                });
            })
            .catch(this.onError);
    }

    loadingList = () => {
        this.setState({
            loading: true,
            error: false,
        })
    };


    loadedList = () => {
        this.setState({
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    };

    render() {
        const {charList, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null,
              spinnerLoading = loading ? <Spinner /> : null,
              contentList = !(loading || error) ? <CharItem char={{charList}}/> : null;

        return (
            <div className="char__content">
                <div className="char__list">
                    <ul className="char__flex">
                        {errorMessage}
                        {spinnerLoading}
                        {contentList}
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
    }
};

const CharItem = ({char}) => {
    const {charList} = char;
    
    return charList.map(item => {
        return (
            <li className="char__item" id={item.id}>
                <img src={item.thumbnail} alt="aabys" />
                <div className="char__name">{item.name}</div>
            </li>
        )
    });

};



export default CharList;