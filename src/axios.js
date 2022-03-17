import axios from "axios";

const instance = axios.create({
    baseURL: '...' //the API (cloude function) url
});

export default instance;