import { registrationStyles } from "@components/auth/registrationStyles";
import React from "react";
import {Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-paper";
import { theme } from "src/utils/theme";

export const CustomAuthHeader: React.FC<{ title: string }> = ({ title }) => {
    return (<View style={registrationStyles.header}>
        <Text style={registrationStyles.title}>{title}</Text>
        <TouchableOpacity style={{ flexDirection: 'row', gap: 6 }}>
            <Icon source="help-circle-outline" size={20} color={theme.colors.link} />
            <Text style={registrationStyles.linkText}>Help</Text>
        </TouchableOpacity>
    </View>)
}