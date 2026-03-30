import axios from 'shared/libs/axios';

export const fetchRefreshToken = () =>
  axios({
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/login/refresh-token/member`,
    method: 'post',
  });

// sns 로그인 설정 api
export const fetchGetSnsConfig =  () => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/self/sns`,
  });
};

export default fetchRefreshToken;
