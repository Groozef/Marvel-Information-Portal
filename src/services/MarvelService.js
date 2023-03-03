class MarvelService {
    // You need to get your key from marvel.com
    _apiBASE = 'https://gateway.marvel.com:443/v1/public/characters';
    _publicKey = '6a45b6c1c02d2633c49f95f2ab8d745f';
    _baseOffset = 210;

    // 'https://gateway.marvel.com:443/v1/public/characters?limit=210&apikey=6a540bda7403a767de126831096f3142'
    // https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=

    getResources = async (url) => {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not Fetch: ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getAllCharacters = async (limit = 9, offset = this._baseOffset) => {
        const res = await this.getResources(`${this._apiBASE}?limit=${limit}&offset=${offset}&apikey=${this._publicKey}`);
        return res.data.results.map(this._transformChar);
    };

    getChar = async (id) => {
        const res = await this.getResources(`${this._apiBASE}/${id}?apikey=${this._publicKey}`);
        return this._transformChar(res.data.results[0]);
    };

    _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 21)}` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepageURL: char.urls[0].url,
            wikiURL: char.urls[1].url,
            comics: char.comics.items.slice(0, 10),
        }
    };
}

export default MarvelService;