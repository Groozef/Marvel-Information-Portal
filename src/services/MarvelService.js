class MarvelService {
    _apiBASE = 'https://gateway.marvel.com:443/v1/public/characters';
    _publicKey = '6a540bda7403a767de126831096f3142';

    'https://gateway.marvel.com:443/v1/public/characters?limit=210&apikey=6a540bda7403a767de126831096f3142'

    
    getResources = async (url) => {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not Fetch: ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getAllCharacters = async () => {
        return await this.getResources(`${this._apiBASE}?limit=100&apikey=${this._publicKey}`)
    };

    getChar = async (id) => {
        return await this.getResources(`${this._apiBASE}/${id}?limit=100&apikey=${this._publicKey}`)
    };

    // _transformChar = () =
}

export default MarvelService;