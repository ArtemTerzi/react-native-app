import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
    marginTop: 92,
    marginBottom: 32,
    fontFamily: 'RobotoBold',
  },
  textInput: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: 50,
    paddingLeft: 16,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    marginBottom: 16,
  },
  focusedInput: {
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  textInputLastChild: {
    marginBottom: 43,
  },
  underFormTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  underFormText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
  shownButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 16,
    padding: 12,
  },
  shownButtonText: {
    color: '#1B4371',
  },
});
