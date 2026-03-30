import 'bootstrap';
import App from './App';
import ReactDOM from 'react-dom';
import { fetchRefreshToken } from '~/fetches';
import authentication from 'shared/authentication';

// app 실행
const start = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

// 토큰 갱신
fetchRefreshToken()
.then((res: any) => {
  authentication.set(res.data);  
  start();
})
.catch(start);


