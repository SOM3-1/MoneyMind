import auth from '@react-native-firebase/auth';

export const getgetCurrentUser = () => {
  const user = auth().currentUser;
  if (user) {
    return user.uid;
  } else {
    return null;
  }
};
