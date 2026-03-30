import 'shared/styles/global.scss';
import { setup } from 'shared/libs/axios';

// @ts-ignore
const config = JSON.parse(localStorage.getItem("serverConfig"))

const ENV = {
  dev: {
    baseURL: config? config.url : 'http://dev-portal.atops.or.kr/tsp-api/api/admin'
  },
  prod: {
    baseURL: config? config.url : 'http://172.30.1.85:8083/tsp/api/admin'
  }
}

// const api = {
//   baseURL: 'http://api.bnet.com',
// };
// @ts-ignore
const api = process.env.REACT_APP_MODE? ENV[process.env.REACT_APP_MODE] : ENV['dev'];

setup(api);
export default { config: { api } };

// 3.37.6.42
