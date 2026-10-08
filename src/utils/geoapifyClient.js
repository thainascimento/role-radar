import axios from "axios";
import { GEOAPIFY_KEY } from "./chaves";

const geoapifyClient = axios.create({
    baseURL: 'https://api.geoapify.com/v2/',
    params: {
        apiKey: GEOAPIFY_KEY
    }
});
export default geoapifyClient;