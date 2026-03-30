import axios from 'shared/libs/axios';

export default (params: string) => {
  return axios({
    method: 'get',
    url: `/pms/api/front/bsns-pblanc/${params}`,
  });
};