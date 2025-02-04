import React, { useState } from "react";
import { View, Button, Text, FlatList, ActivityIndicator } from "react-native";
import { create, open } from "react-native-plaid-link-sdk";
import { getPlaidLinkToken, exchangePublicToken, getTransactions } from "@components/plaid/plaidAPI";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleCreateLink = async () => {
    const token = await getPlaidLinkToken();
    if (!token) {
      console.error("Failed to retrieve link token");
      return;
    }

    setDisabled(false); 
    create({ token, logLevel: "DEBUG" });
  };

  const fetchTransactions = async (accessToken) => {
    setLoading(true);
    const data = await getTransactions(accessToken);
    setTransactions(data);
    setLoading(false);
  };

  const handleOpenLink = () => {
    open({
      onSuccess: async (successData) => {
        console.log("Plaid linked successfully:", successData);

        if (!successData.publicToken) {
          console.error("Public token is missing!");
          return;
        }

        const accessToken = await exchangePublicToken(successData.publicToken);
        setAccessToken(accessToken);

        if (accessToken) {
          fetchTransactions(accessToken);
        }
      },
      onExit: (exitData) => console.log("Plaid exit:", exitData),
      iosPresentationStyle: "MODAL",
    });

    setDisabled(true);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Plaid Integration</Text>

      <Button title="Create Link Token" onPress={handleCreateLink} />

      <Button title="Open Link" onPress={handleOpenLink} disabled={disabled} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.transaction_id}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
              <Text style={{ fontSize: 16 }}>{item.merchant_name || item.name}</Text>
              <Text style={{ color: "gray" }}>{item.date}</Text>
              <Text style={{ fontWeight: "bold" }}>${item.amount.toFixed(2)}</Text>
              <Text style={{ color: "blue" }}>Category: {item.customCategory || "Other"}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No transactions found.</Text>
      )}
    </View>
  );
};

export default App;
