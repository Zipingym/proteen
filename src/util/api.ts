import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: 'dev.ec2.proteen.degaja.com:8080', // 기본 서버 주소 입력
});
