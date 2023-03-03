import { Component } from 'react';
import PropTypes from 'prop-types'; // Test
import './CharInfo.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    loadingInfo = () => {
        this.setState({
            loading: true,
            error: false,
        })
    };


    loadedInfo = () => {
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

    componentDidUpdate(prevProps) {
        const {charID} = this.props;
        if(this.props.charID !== prevProps.charID) {
            if(!charID) {
                return;
            }
            this.loadingInfo();
            this.marvelService.getChar(charID)
                .then(char => {
                    console.log('Персонаж выбран')
                    // console.log(char)
                    this.loadedInfo();
                    this.setState({
                        char,
                        error: false,
                    })
                })
                .catch(this.onError);
        }
    };


    

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null,
              loadingSekeleton = loading ? <Skeleton /> : null,
              content = !(error || loading || !char) ? <View char={char}/> : null;

        return (
            <div className="charinfo">
                {content}
                {loadingSekeleton}
                {errorMessage}
            </div>
        )
    }
};

const View = ({char}) => {
    const charInfo = char;
    
    return (
        <div className="charinfo__wrapper">
            <div className="charinfo__character-profile profile">
                <div className="charinfo__image">
                    <img src={charInfo.thumbnail} alt="thor" />
                </div>

                <div className="profile-content">
                    <div className="profile-name">
                        {charInfo.name}
                    </div>

                    <div className="profile-btns">
                        <a href={charInfo.homepageURL} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={charInfo.wikiURL} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="charinfo__character-description">
                {charInfo.description}
            </div>

            <div className="charinfo__comics-recomendation">
                <p className='charinfo__comics-title'>Comics:</p>

                <ul className="charinfo__comics-list comics-items">
                    {charInfo.comics.length > 0 ? null : 'This character was not in the comics'}
                    {
                        charInfo.comics.map((item, i, arr) => {
                            return <li className="comics-item" key={i}>{item.name}</li>
                        })
                    }
                </ul>
            </div>

        </div>
    )
};

CharInfo.propTypes = {
    charID: PropTypes.number
}

export default CharInfo;