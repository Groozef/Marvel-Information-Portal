class MarvelService {
    _apiBASE = 'https://gateway.marvel.com:443/v1/public/characters';
    _publicKey = '6a45b6c1c02d2633c49f95f2ab8d745f';

    // 'https://gateway.marvel.com:443/v1/public/characters?limit=210&apikey=6a540bda7403a767de126831096f3142'

    getResources = async (url) => {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not Fetch: ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getAllCharacters = async (limit) => {
        const res = await this.getResources(`${this._apiBASE}?limit=${limit}&apikey=${this._publicKey}`);

        return res.data.results.map(this._transformChar);
    };

    getChar = async (id) => {
        const res = await this.getResources(`${this._apiBASE}/${id}?limit=100&apikey=${this._publicKey}`);
        console.log('Запрос отправлен на рандомного персонажа')
        return this._transformChar(res.data.results[0]);
    };

    _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepageURL: char.urls[0].url,
            wikiURL: char.urls[1].url,
        }
    };
}

export default MarvelService;