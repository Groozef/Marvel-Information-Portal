import {Component} from 'react';

import './RandomChar.scss';
import mjolnirIMG from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';


class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateChar();
    }

    state = {
        char: {},
        loading: true,
    };


    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        });
    };

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded);
    };

    render() {
        const {char, loading} = this.state;

        return (
            <div className="randomchar">
                <div className="randomchar-items">
                    <div className="randomchar-item">
                        {loading ? <Spinner/> : <View char={char}/>}
                    </div>
                    <div className="randomchar-item randomchar-try">
                        <div className="randomchar-try__titles">
                            <div className="randomchar-try__title">
                                Random character for today!<br/>
                                Do you want to get to know him better?
                            </div>
                            <div className="randomchar-try__title">
                                Or choose another one
                            </div>
                        </div>
    
                        <a href="#" className="button button__main" onClick={this.updateChar}>
                            <div className="inner">Try it</div>
                        </a>
    
                        <img src={mjolnirIMG} alt="mjolnir" />
                    </div>
                </div>
            </div>
        );
    }
};

const View = (char) => {
    const {name, description, thumbnail, homepage, wiki} = char;

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
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default RandomChar;