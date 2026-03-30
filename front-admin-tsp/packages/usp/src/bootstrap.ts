import 'shared/styles/global.scss';
import { setup } from 'shared/libs/axios';
const api = {
  baseURL: 'http://api.bnet.com',
};
setup(api);
export default { config: { api } };
