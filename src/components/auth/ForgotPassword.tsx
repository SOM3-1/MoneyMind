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
import { sendPasswordResetEmail } from "firebase/auth";

interface Prop {
    handleSelection: (val: SelectionType) => void;
}

export const ForgotPassword: React.FC<Prop> = ({ handleSelection }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [isEmailValid, setIsEmailValid] = useState(false);

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

    const isSignUpDisabled = !email;

    const handleAction = async () => {
        if (isSignUpDisabled) return;

        setIsLoading(true);
        setError("");

        try {
            await sendPasswordResetEmail(auth, email);
            ToastAndroid.show("Password reset email sent!", ToastAndroid.SHORT);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Firebase Reset Error:", error.message);
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
                    <CustomAuthHeader title={"Password Recovery"} />
                    <View style={registrationStyles.inputContainer}>
                        <View style={{}}><Text style={registrationStyles.recoveryInstructions}>Enter the email address linked to your account to get a recovery link with instructions.</Text></View>
                        <CustomTextInput
                            label="Email Address"
                            value={email}
                            placeholder="abc@mail.com"
                            onChangeText={(text) => {
                                setEmail(text);
                            }}
                            onBlur={() => validateEmail(email)}
                        />

                        <TouchableOpacity
                            onPress={() => handleSelection(SelectionType.login)}
                            style={registrationStyles.flexRight}
                        >
                            <Text style={registrationStyles.linkText}>Try another account?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={registrationStyles.thirdSection}>
                <TouchableOpacity
                    style={[registrationStyles.button]}
                    onPress={handleAction}
                    disabled={isSignUpDisabled}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={registrationStyles.buttonText}>Recover</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};
