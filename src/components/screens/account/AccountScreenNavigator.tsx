import React from "react";
import { Text, ToastAndroid, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { accountScreenNavigatorStyles } from "./accountScreenNavigatorStyles";
import { List } from "react-native-paper";
import { theme } from "src/utils/theme";

export const AccountScreenNavigator: React.FC = () => {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
       ToastAndroid.show("Logged out successfully!", ToastAndroid.SHORT);
    } catch (error) {

      ToastAndroid.show("Error Logging out!", ToastAndroid.SHORT);
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={accountScreenNavigatorStyles.container}>
      <View style={accountScreenNavigatorStyles.headerContainer}>
        <Text style={accountScreenNavigatorStyles.menuTitle}>Account Settings</Text>
        <Text style={accountScreenNavigatorStyles.menuSubtitle}>Manage your account</Text>
      </View>
      <List.Section>
        <List.Item
          title="Profile"
          description="Update your personal information."
          left={(props) => <List.Icon {...props} icon="account-outline"  color={theme.colors.darkText}/>}
          right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.darkText}/>}
          titleStyle={accountScreenNavigatorStyles.title}
          descriptionStyle={accountScreenNavigatorStyles.subTitle}
        />
        <List.Item
          title="About Us"
          description="Learn more about our company."
          left={(props) => <List.Icon {...props} icon="information-outline" color={theme.colors.darkText}/>}
          right={(props) => <List.Icon {...props} icon="chevron-right"color={theme.colors.darkText} />}
          titleStyle={accountScreenNavigatorStyles.title}
          descriptionStyle={accountScreenNavigatorStyles.subTitle}
        />
        <List.Item
          title="Settings"
          description="Customize your app experience."
          left={(props) => <List.Icon {...props} icon="cog-outline" color={theme.colors.darkText}/>}
          right={(props) => <List.Icon {...props} icon="chevron-right"color={theme.colors.darkText} />}
          titleStyle={accountScreenNavigatorStyles.title}
          descriptionStyle={accountScreenNavigatorStyles.subTitle}
        />
        <List.Item
          title="Sign Out"
          description="Sign out of your account."
          left={(props) => <List.Icon {...props} icon="logout" color={theme.colors.darkText}/>}
          right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.darkText} />}
          onPress={handleLogout}
          titleStyle={accountScreenNavigatorStyles.title}
          descriptionStyle={accountScreenNavigatorStyles.subTitle}
        />
      </List.Section>
    </View>
  );
};
