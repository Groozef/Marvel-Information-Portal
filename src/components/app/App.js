import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import bgDecoration from '../../resources/img/vision.png';
import './App.scss';

const App = () => {
    return (
        <div className="app">
            <div className="app__container">
                <div className="app__wrapper">
                    <AppHeader />

                    <main className='main'>
                        <RandomChar />
                        <div className="char__content">
                            <CharList />
                        </div>
                    </main>

                    {/* <img className="bg-decoration" src={bgDecoration} alt="vision" /> */}
                </div>
            </div>
        </div>
    )
};
export default App;