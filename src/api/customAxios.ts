import axios from 'axios';
import config from '../../config/config.json';

const customAxios = axios.create({
  baseURL: config.baseurl,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('login-token')}`,
    Authorization: `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM2MzU4NTQsInVzZXJJZCI6MTV9.2NP_IdcAAKdesbnLhtTVjvQ5JrAnH3JJGrFv1GU7J-8'}`,
  },
});

export default customAxios;
