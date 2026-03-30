import axios from 'shared/libs/axios';
export default () =>
  axios({
    url: '/member/api/login/refresh-token/insider',
    method: 'post',
    baseURL: 'http://dev-portal.atops.or.kr/',
  });
