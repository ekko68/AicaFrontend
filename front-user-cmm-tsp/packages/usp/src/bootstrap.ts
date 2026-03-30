import 'shared/styles/global.scss';
import { setup } from 'shared/libs/axios';
const api = {
  baseURL: 'http://125.6.36.170'
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  // },
};
setup(api);
export default { config: { api } };
