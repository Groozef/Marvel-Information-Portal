import { useHttp } from "../components/hooks/http.hook";

const useMarvelService = () => {
    // You need to get your key from marvel.com
    const _apiBASE = 'https://gateway.marvel.com:443/v1/public/';
    const _publicKey = '6a45b6c1c02d2633c49f95f2ab8d745f';
    const _baseOffsetCharacters = 0;

    const { request, loading, error, clearError } = useHttp();

    const getAllCharacters = async (offset = _baseOffsetCharacters) => {
        const res = await request(`${_apiBASE}/characters?limit=9&offset=${offset}&apikey=${_publicKey}`);
        return res.data.results.map(_transformChar);
    };


    const getChar = async (charID) => {
        const res = await request(`${_apiBASE}/characters/${charID}?apikey=${_publicKey}`);
        return _transformChar(res.data.results[0]);
    };

    const _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 21)}` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepageURL: char.urls[0].url,
            wikiURL: char.urls[1].url,
            comics: char.comics.items.slice(0, 10),
        }
    };

    // https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=210&apikey=


    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBASE}/comics?limit=8&offset=${offset}&apikey=${_publicKey}`);
        return res.data.results.map(_transformComic);
    };

    const getComic = async (comicID) => {
        const res = await request(`${_apiBASE}/comics/${comicID}?apikey=${_publicKey}`);
        return _transformComic(res.data.results[0]);
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description ? comic.description : `There is no description for this comics`,
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of pages',
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            language: comic.textObjects.language || 'en-US',
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'not aviable',
        }
    };


    return {
        // Characters
        getAllCharacters,
        getChar,
        loading,
        error,
        clearError,
        // Comics
        getAllComics,
        getComic
    };
}

export default useMarvelService;