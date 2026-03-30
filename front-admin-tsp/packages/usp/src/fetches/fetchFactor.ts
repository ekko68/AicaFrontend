import api from '~/api';
export default (password: string) => {
  return api({
    url: '/member/api/members/me/passwd-check',
    method: 'post',
    params: { passwd: password },
  });
};
