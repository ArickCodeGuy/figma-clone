import { useParams } from 'react-router-dom';

export function ScetchView() {
  const params = useParams();

  return <>ScetchView: {params.id}</>;
}
