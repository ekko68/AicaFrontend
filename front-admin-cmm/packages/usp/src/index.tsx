import 'bootstrap';
import ReactDOM from 'react-dom';
import App from './App';
import authentication from 'shared/authentication';
import { fetchRefreshToken } from '~/fetches';
const start = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

fetchRefreshToken()
  .then((res: any) => {
    authentication.set(res.data);
    start();
  })
  .catch(start);