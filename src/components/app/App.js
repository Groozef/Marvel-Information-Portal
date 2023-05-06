import { lazy, Suspense } from 'react';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import { ComicsPage, SingleComicPage } from '../pages'; // from index.js;

import './App.scss';

const Page404 = lazy(() => import('../pages/404Error/404')),
      MainPage = lazy(() => import('../pages/mainPage/MainPage')),
      ComicsPage = lazy(() => import('../pages/comicsPage/ComicsPage')),
      SingleComicPage = lazy(() => import('../pages/singleComicPage/SingleComicPage'));
      
const App = () => {
    return (
        <Router>
            <div className="app">
                <div className="app__container">
                    <div className="app__wrapper">
                        <AppHeader />
                        <main className='main'>
                            <Suspense fallback={<Spinner/>}>
                                <Routes>
                                    <Route path="/" element={<MainPage />} />
                                    <Route path="/comics" element={<ComicsPage />} />
                                    <Route path="/comics/:comicID" element={<SingleComicPage />} />
                                    <Route path="*" element={<Page404 />} />
                                </Routes>
                            </Suspense>
                        </main>
                    </div>
                </div>
            </div>
        </Router>
    );

};



export default App;