import { useSelector } from 'react-redux';

export const getAuthState = () => useSelector(state => state.auth);
