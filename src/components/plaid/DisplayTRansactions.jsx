import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { getTransactions } from "@components/plaid/plaidAPI";

const TransactionsScreen = ({ route }) => {
  const { accessToken } = route.params;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!accessToken) return;

      const data = await getTransactions(accessToken);
      setTransactions(data);
      setLoading(false);
    };

    fetchTransactions();
  }, [accessToken]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Transactions</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : transactions.length === 0 ? (
        <Text>No transactions available.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.transaction_id}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
              <Text style={{ fontSize: 16 }}>{item.merchant_name || item.name}</Text>
              <Text style={{ color: "gray" }}>{item.date}</Text>
              <Text style={{ fontWeight: "bold" }}>${item.amount.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TransactionsScreen;
