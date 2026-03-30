import axios from 'shared/libs/axios';
export default () => {
  return axios({ 
    method: 'post', 
    url: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}/member/api/logout/member` 
  });
  
};
