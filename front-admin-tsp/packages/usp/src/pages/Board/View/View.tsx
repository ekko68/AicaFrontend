import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetchBoard } from '~/fetches';

const fetcher = (key: string) => {
  return fetchBoard(key);
};
function View() {
  const params = useParams();
  const { id } = params;

  const { data } = useSWR(id, fetcher);
  if (!data) return <div>loading...</div>;
  return <div>{data.title}</div>;
}
export default View;
