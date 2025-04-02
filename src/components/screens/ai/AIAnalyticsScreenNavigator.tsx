import { EmptyData } from "@components/reusable/EmptyData";
import { AIFinancialAnalysis, DateRange } from "@ourtypes/Ai";
import { ScreenType } from "@ourtypes/ScreenType";
import { onAuthStateChanged } from "@react-native-firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { getAIFinancialAnalysis } from "@services/aiService";
import { auth } from "firebaseConfig";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { homeScreenStyles } from "../home/homeScreenStyles";
import { AIScreenData } from "./AIScreenData";
import { getDateRangeDays } from "@helpers/dateRangeHelper";
import AIDateRangeDropdown from "./AIDateRangeDropdown";
import { Intro } from "./Intro";
import { aiScreenStyles } from "./aiScreenStyles";
import { CustomActivityIndicator } from "@components/reusable/CustomActivityIndicator";
import { theme } from "src/utils/theme";

export const AIAnalyticsScreenNavigator: React.FC = () => {
  const [aiAnalytics, setAiAnalytics] = useState<AIFinancialAnalysis | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange>("this_month");

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAIFinancialAnalysis(selectedRange);
      console.log(data)
      setAiAnalytics(data);
    } catch (error) {
      console.error("Error fetching AI analytics:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAnalytics();
    }, [selectedRange])
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchAnalytics();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDateRangeChange = (newRange: DateRange) => {
    setSelectedRange(newRange);
    fetchAnalytics();
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAnalytics();
  };

  const { startDate, endDate, days } = getDateRangeDays(selectedRange);

  if (loading) return <CustomActivityIndicator />;

  return (
    <View style={{...aiScreenStyles.container, backgroundColor: !aiAnalytics ? theme.colors.white  : theme.colors.background}}>
      <View style={aiScreenStyles.contentContainer}>
        <Intro />
          <ScrollView contentContainerStyle={aiScreenStyles.scrollContent} showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          } >
            <View style={aiScreenStyles.infoContainer}>
              <Text style={homeScreenStyles.transactionTitle}>Expense Overview</Text>
              <Text style={aiScreenStyles.days}>{`Last ${days} Days`}</Text>
            </View>
            <AIDateRangeDropdown
              selectedRange={selectedRange}
              onChange={handleDateRangeChange}
            />
            {!aiAnalytics ? 
              <EmptyData type={ScreenType.AI} /> :
            <AIScreenData aiAnalytics={aiAnalytics} />}
          </ScrollView>
      </View>
    </View>
  );
};
