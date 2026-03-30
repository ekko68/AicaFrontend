import axios from 'shared/libs/axios';
export type UserType = {
  loginId: string;
  passwd: string;
};
export default (data: UserType) => {
  return axios({
    method: 'post',
    url: '/member/api/login/insider',
    data,
  });
};
