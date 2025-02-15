import axios from "axios";

const API_KEY = "48857458-08a5976c2d7ede66ca4c44a57";
const BASE_URL = "https://pixabay.com/api/";

export const getImages = (wordKey) => {
    return axios
        .get(BASE_URL, {
            params: {
                key: API_KEY,
                q: wordKey,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
            },
        })
        .then((response) => {
            return response.data.hits;
        })
        .catch((err) => {
            console.error(err);
            return [];
        });
};
