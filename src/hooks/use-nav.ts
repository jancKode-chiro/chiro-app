import { useHistory } from 'react-router-dom';
import H from 'history';

interface UseNavReturnType extends H.History {
  goTo: (path: string) => void;
}

export default function useNav(): UseNavReturnType {
  const history = useHistory();

  const goTo = (path: string): void => {
    history.push(`/${history.location.pathname}${path}`);
  };

  return {
    ...history,
    goTo,
  };
}
