import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import CharList from '../charList/CharList';
import bgDecoration from '../../resources/img/vision.png';
import CharInfo from '../charInfo/CharInfo';
import './App.scss';

class App extends Component {
    state = {
        selectedChar: null,
    }

    onSelectedChar = (id) => {
        if(this.state.selectedChar === id) { // so that the state is not updated when you click on the same character again
            return;
        }
        // console.log('Значение передано');

        this.setState({
            selectedChar: id,
        })
    };

    render() {
        return (
            <div className="app">
                <div className="app__container">
                    <div className="app__wrapper">
                        <AppHeader />
                        <main className='main'>
                            <ErrorBoundary >
                                <RandomChar />
                            </ErrorBoundary>

                            <div className="char__content">
                                <ErrorBoundary >
                                    <CharList onSelectedChar={this.onSelectedChar} charID={this.state.selectedChar}/>
                                </ErrorBoundary>

                                <ErrorBoundary >
                                    <CharInfo charID={this.state.selectedChar}/>
                                </ErrorBoundary>
                            </div>
                        </main>
    
                        <img className="bg-decoration" src={bgDecoration} alt="vision" />
                    </div>
                </div>
            </div>
        );
    };
};
export default App;