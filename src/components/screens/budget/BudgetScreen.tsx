import { EmptyData } from "@components/reusable/EmptyData"
import { Intro } from "@components/reusable/Intro"
import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import { homeScreenStyles } from "../home/homeScreenStyles"
import { BudgetLink } from "./BudgetLink"
import { onAuthStateChanged } from "@react-native-firebase/auth"
import { useFocusEffect } from "@react-navigation/native"
import { auth } from "../../../../firebaseConfig"
import { theme } from "src/utils/theme"
import { getUserBudgetTransactions } from "@services/budgetTransactionsService"
import { BudgetScreenData } from "./BudgetScreenData"
import { Budget } from "@ourtypes/Budget"
import SearchSortControls from "./SearchSortControls"
import { ScreenType } from "@ourtypes/ScreenType"
import { CustomActivityIndicator } from "@components/reusable/CustomActivityIndicator"

export const BudgetScreen: React.FC = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  const fetchbudgets = async () => {
    try {
      const data = await getUserBudgetTransactions();
      setBudgets(data);
      setFilteredBudgets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchbudgets();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoaded(true);
        fetchbudgets();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchbudgets();
  };

  const handleSearchAndSort = (updatedBudgets: Budget[]) => {
    setFilteredBudgets(updatedBudgets);
  };

  if (loading) return <CustomActivityIndicator />;

  return (
    <View style={{...homeScreenStyles.container,backgroundColor: budgets.length ? theme.colors.background : theme.colors.white}}>
      <View style={homeScreenStyles.homeConatiner}>
        <Intro type={ScreenType.BUDGET}/>
        {budgets.length === 0 ? (
          <EmptyData type={ScreenType.BUDGET} />
        ) : (
          <View style={{ width: '100%', gap: 10 }}>
            <SearchSortControls budgets={budgets} onUpdate={handleSearchAndSort} />
            <BudgetScreenData budgets={filteredBudgets} onRefresh={onRefresh} refreshing={refreshing} />
          </View>
        )}
      </View>
      <BudgetLink />
    </View>)
}