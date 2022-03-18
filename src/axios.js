import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-103b0/us-central1/api' //the API (cloude function) url
});

export default instance;