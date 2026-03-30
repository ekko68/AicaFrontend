import api from '../api';
export default (key: string) =>
  api({
    // url: `/member/api/members/me/${key}`,
    // method: 'get',
    url: `/member/api/members/me/${key}`,
    method: 'post',
    baseURL: process.env.REACT_APP_DOMAIN_MEMBER_BNET
  });
