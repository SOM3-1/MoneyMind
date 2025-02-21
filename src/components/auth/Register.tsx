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
import { registerUser } from "@services/apiService";
import { CustomAuthHeader } from "@components/reusable/CustomAuthHeader";
import { auth } from "./../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface Prop {
  handleSelection: (val: SelectionType) => void;
}

export const Register: React.FC<Prop> = ({ handleSelection }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const isSignUpDisabled = !fullName || !email || !password;

  const handleRegister = async () => {
    if (isSignUpDisabled) return;

    setIsLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        await registerUser(user.uid, fullName, user.email || "");
        ToastAndroid.show("Registration Successful!", ToastAndroid.SHORT);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Firebase Registration Error:", error.message);
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
          <CustomAuthHeader title={"Sign Up"} />
          <View style={registrationStyles.inputContainer}>
            <CustomTextInput
              label="Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your name"
            />
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

        <TouchableOpacity
          style={[
            registrationStyles.button,
          ]}
          onPress={handleRegister}
          disabled={isSignUpDisabled}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={registrationStyles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={registrationStyles.footerContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={registrationStyles.connectingText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => handleSelection(SelectionType.login)}
              style={registrationStyles.hyperLinkContainer}
            >
              <Text style={registrationStyles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
