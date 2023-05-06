import { useState } from 'react';

import RandomChar from '../../randomChar/RandomChar';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import CharList from '../../charList/CharList';
import CharInfo from '../../charInfo/CharInfo';


const MainPage = () => {
    const [selectedChar, setChar] = useState(1010338),
          [comicID, setComicID] = useState();



    const onSelectedChar = (id) => {
        if (selectedChar === id) { // so that the state is not updated when you click on the same character again
            return;
        }
        setChar(id);
    };


    return (
        <>
            <ErrorBoundary >
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary >
                    <CharList onSelectedChar={onSelectedChar} charID={selectedChar}/>
                </ErrorBoundary>

                <ErrorBoundary >
                    <CharInfo charID={selectedChar} />
                </ErrorBoundary>
            </div>

        </>
    )
};

CharInfo.defaultProps = {
    charID: 1010338
}

export default MainPage;