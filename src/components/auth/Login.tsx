import { SelectionType } from "@ourtypes/Auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { registrationStyles } from "./registrationStyles";
import CustomTextInput from "@components/reusable/CustomTextInput";
import { LogoComponent } from "@components/reusable/LogoComponent";
import { CustomAuthHeader } from "@components/reusable/CustomAuthHeader";
import { auth } from "./../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Checkbox } from "react-native-paper";
import { theme } from "src/utils/theme";

interface Prop {
  handleSelection: (val: SelectionType) => void;
}

export const Login: React.FC<Prop> = ({ handleSelection }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const validateEmail = (email: string) => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setIsEmailValid(isValid);
    if (!isValid) {
      setError("Invalid email format");
    } else if (error === "Invalid email format") {
      setError("");
    }
    return isValid;
  };

  const validatePassword = (password: string) => {
    const isValid = password.length >= 6;
    setIsPasswordValid(isValid);
    if (!isValid) {
      setError("Password must be at least 6 characters");
    } else if (error === "Password must be at least 8 characters") {
      setError("");
    }
    return isValid;
  };

  const isSignUpDisabled = !email || !password;

  const handleLogin = async () => {
    if (isSignUpDisabled) return;

    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        ToastAndroid.show("Login Successful!", ToastAndroid.SHORT);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Firebase Login Error:", error.message);
        setError(error.message);
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      } else {
        console.error("Unexpected Error:", error);
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={registrationStyles.container}>
      <View style={registrationStyles.firstSection}>
        <LogoComponent />
      </View>
      <View style={registrationStyles.secondSection}>
        <View style={registrationStyles.headerSeparator}>
          <CustomAuthHeader title={"Sign In to MoneyMind"} />
          <View style={registrationStyles.inputContainer}>
            <CustomTextInput
              label="Email Address"
              value={email}
              placeholder="abc@mail.com"
              onChangeText={(text) => {
                setEmail(text);
              }}
              onBlur={() => validateEmail(email)}
            />

            <CustomTextInput
              label="Password"
              value={password}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
              onBlur={() => validatePassword(password)}
            />

            <TouchableOpacity
              onPress={() => handleSelection(SelectionType.forgot)}
              style={registrationStyles.flexRight}
            >
              <Text style={registrationStyles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={registrationStyles.thirdSection}>
        {/* {error ? (
                    <Text style={registrationStyles.errorText}>{error}</Text>
                ) : null} */}
        <View style={registrationStyles.loggedInContainer}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
            color={theme.colors.active}
          />
          <Text style={registrationStyles.connectingText}>
            Keep me logged in
          </Text>
        </View>
        <TouchableOpacity
          style={[registrationStyles.button]}
          onPress={handleLogin}
          disabled={isSignUpDisabled}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={registrationStyles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={registrationStyles.footerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={registrationStyles.connectingText}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => handleSelection(SelectionType.registration)}
              style={registrationStyles.hyperLinkContainer}
            >
              <Text style={registrationStyles.linkText}>Sign Up!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
