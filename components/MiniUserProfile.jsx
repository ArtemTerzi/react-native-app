import { ImageBackground, Text, View } from 'react-native';

import avatar from '../assets/defaultAvatar.png';
import { getAuthState } from '../redux/selectors/selectors';

const MiniUserProfile = () => {
  const user = getAuthState();

  return (
    <View
      style={{
        marginTop: 32,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <ImageBackground
        source={user.avatar ? { uri: user.avatar } : avatar}
        style={{
          height: 60,
          width: 60,
          borderRadius: 50,
          overflow: 'hidden',
        }}
      />
      <View style={{ marginLeft: 8 }}>
        <Text style={{ fontFamily: 'RobotoBold' }}>{user.login}</Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
};

export default MiniUserProfile;
