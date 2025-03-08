import { getUserName } from "@services/userService";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { homeScreenStyles } from "../screens/home/homeScreenStyles";
import { theme } from "src/utils/theme";

export const Intro: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userName = await getUserName();
        setName(userName);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;
  if (error) return <Text style={{ color: "red" }}>Error: {error}</Text>;

  return (
    <View>
      <Text style={homeScreenStyles.userName}>Hello, {name}!</Text>
      <Text style={homeScreenStyles.subTitle}>Start tracking your expenses to gain valuable insights into your spending habits.</Text>
    </View>
  );
};
