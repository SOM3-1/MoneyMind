import React, { useState } from "react";
import {
  View,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createBudget } from "@services/budgetService";
import CustomTextInput from "@components/reusable/CustomTextInput";
import { DateTime } from "luxon";
import { registrationStyles } from "@components/auth/registrationStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { CustomActivityIndicator } from "@components/reusable/CustomActivityIndicator";
import { theme } from "src/utils/theme";
import { commonStyles } from "@components/reusable/commonStyles";
import { accountScreenNavigatorStyles } from "../account/accountScreenNavigatorStyles";

export const AddBudget: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  
  const [isProcessing, setIsProcessing] = useState(false);

  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const handleSave = async () => {
    setIsProcessing(true);

    if (!title || !amount || parseFloat(amount) <= 0) {
      showToast("Please enter valid budget details.");
      setIsProcessing(false);
      return;
    }

    try {
      await createBudget({
        title,
        amount: parseFloat(amount),
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      });
      showToast("Budget created successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("Failed to create budget:", error);
      showToast("Failed to create budget.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={styles.headerTextContainer}>
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={commonStyles.header}>Add Budget</Text></View>
        <Text style={accountScreenNavigatorStyles.menuSubtitle}>Enter the details below to add an entry.</Text>
      </View>

      <View style={{ gap: 30, marginTop: 40 }}>
        <CustomTextInput label="Title" value={title} onChangeText={setTitle} editable={true} />

        <CustomTextInput 
          label="Amount" 
          value={amount} 
          onChangeText={(text) =>{
            const numericText = text.replace(/[^0-9.]/g, '');
            setAmount(numericText);
          }} 
          keyboardType="numeric" 
        />

        <CustomTextInput
          label="Start Date"
          value={DateTime.fromJSDate(fromDate).toFormat("MM/dd/yy")}
          editable={false}
          rightIcon={
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={theme.colors.subtitle}
              onPress={() => setShowFromDatePicker(true)}
            />
          }
        />
        <DatePicker
          modal
          open={showFromDatePicker}
          date={fromDate}
          mode="date"
          onConfirm={(date) => {
            setFromDate(date);
            setShowFromDatePicker(false);
          }}
          onCancel={() => setShowFromDatePicker(false)}
        />

        <CustomTextInput
          label="End Date"
          value={DateTime.fromJSDate(toDate).toFormat("MM/dd/yy")}
          editable={false}
          rightIcon={
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={theme.colors.subtitle}
              onPress={() => setShowToDatePicker(true)}
            />
          }
        />
        <DatePicker
          modal
          open={showToDatePicker}
          date={toDate}
          mode="date"
          onConfirm={(date) => {
            if (date < fromDate) {
              showToast("End date cannot be earlier than start date.");
            } else {
              setToDate(date);
            }
            setShowToDatePicker(false);
          }}
          onCancel={() => setShowToDatePicker(false)}
        />
      </View>

      <View style={commonStyles.buttonContainer}>
        <TouchableOpacity onPress={handleSave} style={commonStyles.button}>
          <View>
            <Text style={registrationStyles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>

      {isProcessing && <CustomActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  headerTextContainer: {
    flexDirection: "column",
    gap: 20,
    marginTop: 20,
  },
});

export default AddBudget;
