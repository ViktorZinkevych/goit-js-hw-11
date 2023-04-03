import axios from "axios";

export class UnsplashAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '34953891-a879ecea09bf92699f176873b';

    page = 1;
    q = null;

    async fetchPhotos() {
        try {
            return await axios.get(`${this.#BASE_URL}`, {
                params: {
                    q: this.q,
                    page: this.page,
                    per_page: 40,
                    image_type: "photo",
                    orientation: "horizontal",
                    safesearch: "true",
                    key: this.#API_KEY,

                },
            });
        } catch (err) {
            throw new Error(err.message);
        }
    }

}