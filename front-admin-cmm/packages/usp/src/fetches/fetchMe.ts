import api from '~/api';
export default (key: string) =>
  api({
    url: `/member/api/members/me/${key}`,
    method: 'get',
  });
