import AppHeader from '../appHeader/AppHeader';

import { BrowserRouter as Router, Route, Routes, MemoryRouter } from 'react-router-dom';

import { MainPage, ComicsPage, Page404, SingleComicPage } from '../pages'; // from index.js;

import './App.scss';

const App = () => {
    return (
        <Router>
            <div className="app">
                <div className="app__container">
                    <div className="app__wrapper">
                        <AppHeader />
                        <main className='main'>
                            <Routes>
                                <Route path="/" element={<MainPage />}/>
                                <Route path="/comics" element={<ComicsPage />}/>
                                <Route path="/comics/:comicID" element={<SingleComicPage/>} />
                                <Route path="*" element={<Page404/>}/>
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>
        </Router>
    );

};



export default App;