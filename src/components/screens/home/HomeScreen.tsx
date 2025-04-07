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
import { ScreenType } from "@ourtypes/ScreenType";
import { CustomActivityIndicator } from "@components/reusable/CustomActivityIndicator";

export const HomeScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false); 

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getUserTransactions();
      const sorted = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setTransactions(sorted);
      setFilteredTransactions(sorted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userLoaded) {
        fetchTransactions();
      }
    }, [userLoaded])
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
    fetchTransactions();
  };

  const handleSearchAndSort = (updatedTransactions: Transaction[]) => {
    setFilteredTransactions(updatedTransactions);
  };

  if (loading) return <CustomActivityIndicator/>;

  return (
    <View style={{...homeScreenStyles.container, backgroundColor: transactions.length ? theme.colors.background : theme.colors.white}}>
      <View style={homeScreenStyles.homeConatiner}>
        <Intro type={ScreenType.TRANSACTIONS}/>

        {transactions.length === 0 ? (
          <EmptyData type={ScreenType.TRANSACTIONS} />
        ) : (
          <View style={{width: '100%', gap: 10}}>
            <SearchSortControls transactions={transactions} onUpdate={handleSearchAndSort} />
            <HomeScreenData transactions={filteredTransactions} onRefresh={onRefresh} refreshing={refreshing} />
          </View>
        )}
      </View>
      <LinkTransactions onRefresh={onRefresh}/>
    </View>
  );
};
