import axios from 'axios';
import config from '../../config/config.json';

const customAxios = axios.create({
  baseURL: config.baseurl,
});

export default customAxios;
