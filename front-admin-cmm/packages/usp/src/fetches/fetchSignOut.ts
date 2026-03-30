import axios from 'shared/libs/axios';
export default () => {
  return axios({ method: 'post', url: '/member/api/logout/insider' });
};
