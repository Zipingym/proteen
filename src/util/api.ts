import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: '127.0.0.1:8080', // 기본 서버 주소 입력
});
