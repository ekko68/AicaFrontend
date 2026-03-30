import 'bootstrap';
import ReactDOM from 'react-dom';
import App from './App';
import authentication from "shared/authentication";
import {AxiosPost} from "shared/libs/axios";

const start = () => {
  ReactDOM.render(<App/>, document.getElementById('root'));
};

AxiosPost("/member/api/login/refresh-token/member",
  undefined,
  {
    baseURL: `${process.env.REACT_APP_DOMAIN_MEMBER_BNET}`
  }).then((data: any) => {
  authentication.set(data);
  start();
}).catch(start);



