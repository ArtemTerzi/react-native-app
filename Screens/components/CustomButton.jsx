import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6C00',
    padding: 16,
    borderRadius: 100,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomButton;
