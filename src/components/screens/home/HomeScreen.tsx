import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator, RefreshControl } from "react-native";
import { Intro } from "../../reusable/Intro";
import { homeScreenStyles } from "./homeScreenStyles";
import { EmptyData } from "../../reusable/EmptyData";
import { LinkTransactions } from "./LinkTransactions";
import { HomeScreenData } from "./HomeScreenData";
import { SearchSortControls } from "./SearchSortControls";
import { getUserTransactions } from "@services/transactionService";
import { Transaction } from "@ourtypes/Transaction";
import { theme } from "src/utils/theme";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./../../../../firebaseConfig"
import { useFocusEffect } from "@react-navigation/native";

export const HomeScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false); 

  const fetchTransactions = async () => {
    try {
      const data = await getUserTransactions();
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoaded(true);
        fetchTransactions();
      } else {
        setLoading(false); 
      }
    });

    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTransactions();
  };

  const handleSearchAndSort = (updatedTransactions: Transaction[]) => {
    setFilteredTransactions(updatedTransactions);
  };

  if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;

  return (
    <View style={homeScreenStyles.container}>
      <View style={homeScreenStyles.homeConatiner}>
        <Intro />

        {transactions.length === 0 ? (
          <EmptyData type="transactions" />
        ) : (
          <View style={{width: '100%', gap: 10}}>
            <SearchSortControls transactions={transactions} onUpdate={handleSearchAndSort} />
            <HomeScreenData transactions={filteredTransactions} onRefresh={onRefresh} refreshing={refreshing} />
          </View>
        )}
      </View>
      <LinkTransactions />
    </View>
  );
};
