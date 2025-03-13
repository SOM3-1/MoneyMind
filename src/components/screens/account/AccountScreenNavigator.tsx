import React, { useState } from "react";
import { Text, ToastAndroid, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { accountScreenNavigatorStyles } from "./accountScreenNavigatorStyles";
import { List } from "react-native-paper";
import { theme } from "src/utils/theme";
import { deleteUserAccount } from "@services/userService";
import ConfirmDeleteDialog from "@components/reusable/ConfirmDeleteDialog";
import { CustomActivityIndicator } from "@components/reusable/CustomActivityIndicator";
import { ScreenType } from "@ourtypes/ScreenType";

export const AccountScreenNavigator: React.FC = () => {
  const auth = getAuth();

  const [isDeleting, setIsDeleting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      ToastAndroid.show("Logged out successfully!", ToastAndroid.SHORT);
    } catch (error) {

      ToastAndroid.show("Error Logging out!", ToastAndroid.SHORT);
      console.error("Logout Error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    setModalVisible(false);
    setIsDeleting(true);

    try {
      await deleteUserAccount();
      ToastAndroid.show("Account deleted successfully", ToastAndroid.SHORT);
      await signOut(auth);
    } catch (error) {
      console.log(error)
      ToastAndroid.show("Failed to delete account.", ToastAndroid.SHORT);
    } finally {
      setIsDeleting(false);
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
          left={(props) => <List.Icon {...props} icon="account-outline" color={theme.colors.darkText} />}
          right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.darkText} />}
          titleStyle={accountScreenNavigatorStyles.title}
          descriptionStyle={accountScreenNavigatorStyles.subTitle}
        />
        <List.Item
          title="About Us"
          description="Learn more about our company."
          left={(props) => <List.Icon {...props} icon="information-outline" color={theme.colors.darkText} />}
          right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.darkText} />}
          titleStyle={accountScreenNavigatorStyles.title}
          descriptionStyle={accountScreenNavigatorStyles.subTitle}
        />
        <List.Item
          title="Settings"
          description="Customize your app experience."
          left={(props) => <List.Icon {...props} icon="cog-outline" color={theme.colors.darkText} />}
          right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.darkText} />}
          titleStyle={accountScreenNavigatorStyles.title}
          descriptionStyle={accountScreenNavigatorStyles.subTitle}
        />
        <List.Item
          title="Sign Out"
          description="Sign out of your account."
          left={(props) => <List.Icon {...props} icon="logout" color={theme.colors.darkText} />}
          right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.darkText} />}
          onPress={handleLogout}
          titleStyle={accountScreenNavigatorStyles.title}
          descriptionStyle={accountScreenNavigatorStyles.subTitle}
        />
        <List.Item
          title="Delete Account"
          description="Permanently remove your account."
          left={(props) => <List.Icon {...props} icon="delete" color={theme.colors.warning} />}
          right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.warning} />}
          onPress={() => setModalVisible(true)}
          titleStyle={{ ...accountScreenNavigatorStyles.title, color: theme.colors.warning }}
          descriptionStyle={{ ...accountScreenNavigatorStyles.subTitle, color: theme.colors.warning }}
        />
      </List.Section>
      <ConfirmDeleteDialog
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onConfirm={handleDeleteAccount}
        type={ScreenType.BUDGET}
      />
      {isDeleting && <CustomActivityIndicator />}
    </View>
  );
};
