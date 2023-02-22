import { Component } from 'react';

import './RandomChar.scss';
import mjolnirIMG from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.updateRandomChar();
        // this.timerID = setInterval(this.updateRandomChar, 3000);
    }

    // componentWillUnmount() {
        // clearInterval(this.timerID);
    // }

    onCharLoaded = () => {
        this.setState({
            loading: false,
            error: false,
        });
    };

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false,
        })
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    };

    updateRandomChar = () => {
        const randomID = Math.floor(Math.random() * (1011400 - 1011000) + 1011000),
              marvelService = new MarvelService();
        
        this.onCharLoading();
        marvelService.getChar(randomID)
            .then(res => {
                this.onCharLoaded();
                this.setState({
                    char: res,
                })
            })
            .catch(this.onError);
    };

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null,
              soinnerLoading = loading ? <Spinner /> : null,
              content = !(error || loading) ? <CharContent char={{char}}/> : null;

        return (
            <div className="randomchar">
                <div className="randomchar-items">
                    <div className="randomchar-item">
                        {errorMessage}
                        {soinnerLoading}
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

                        <div href="#" className="button button__main" onClick={this.updateRandomChar}>
                            <div className="inner">Try it</div>
                        </div>

                        <img src={mjolnirIMG} alt="mjolnir" />
                    </div>
                </div>
            </div>
        );
    }
};

const CharContent = ({char}) => {
    const {char: {name, description, thumbnail, homepageURL, wikiURL}} = char;

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