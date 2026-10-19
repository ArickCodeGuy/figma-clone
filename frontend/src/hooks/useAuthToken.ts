import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/auth';

/** Current JWT token, `null` when logged out */
export function useAuthToken(): string | null {
  return useSelector(selectAuthToken);
}
