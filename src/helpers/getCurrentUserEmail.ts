import auth from '@react-native-firebase/auth';

export const getCurrentUserEmail = () => {
  const user = auth().currentUser;
  if (user) {
    console.log("User Email:", user.email);
    return user.email;
  } else {
    console.log("No user logged in.");
    return null;
  }
};
