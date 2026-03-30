import 'shared/styles/global.scss';
import { setup } from 'shared/libs/axios';
const api = {
  baseURL: 'http://dev-portal.atops.or.kr/',
};
setup(api);
export default { config: { api } };
