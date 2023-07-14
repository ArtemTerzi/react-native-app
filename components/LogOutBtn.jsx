import { useDispatch } from 'react-redux';
import { authSignOut } from '../redux/auth/authOperations';
import { Feather } from '@expo/vector-icons';

const LogOutBtn = ({ styles }) => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOut());
  };

  return (
    <Feather
      onPress={signOut}
      name="log-out"
      size={24}
      color="#BDBDBD"
      style={[{ marginRight: 16 }, styles]}
    />
  );
};

export default LogOutBtn;
