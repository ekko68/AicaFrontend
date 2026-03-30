import 'bootstrap';
import ReactDOM from 'react-dom';
import App from './App';
import authentication from "shared/authentication";
import {AxiosPost, TokenUpdate} from "shared/libs/axios";

const start = () => {
  ReactDOM.render(<App/>, document.getElementById('root'));
};

// AxiosPost("/member/api/login/refresh-token/insider",
//   undefined,
//   {
//     baseURL: 'http://api.bnet.com'
//   }).then((data: any) => {
//     console.log('test - ' + JSON.stringify(data))
//   authentication.set(data);
//   start();
// }).catch(start);
TokenUpdate().then(()=> {
  start()
}).catch(start);

// ReactDOM.render(
//   <App/>
//   , document.getElementById('root')
// );


