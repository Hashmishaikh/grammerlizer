import axios from 'axios';
import { baseURL } from './baseUrl';

axios.defaults.withCredentials = true;
export const publicRequest = axios.create({
    baseURL: baseURL,
})