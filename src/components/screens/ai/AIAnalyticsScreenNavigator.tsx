import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Modal, Pressable } from 'react-native';
import { Svg, G, Circle, Text as SvgText } from 'react-native-svg';


const PERIOD_OPTIONS = [
  { label: 'This Month', value: 'this_month' },
  { label: 'Past Month', value: 'past_month' },
  { label: 'Past 3 Months', value: 'past_3_months' },
  { label: 'Past 6 Months', value: 'past_6_months' },
  { label: 'Past Year', value: 'past_year' },
];

function getPeriodLabel(value: string) {
  const found = PERIOD_OPTIONS.find(item => item.value === value);
  return found ? found.label : '';
}

const AIAnalyticsDetailedScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('this_month');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchAnalytics(selectedPeriod);
  }, [selectedPeriod]);

  const fetchAnalytics = async (period: string) => {
    try {
      setLoading(true);
      setAnalytics(null);
      let useSample = true;
      let result;
      if (!useSample) {
        const response = await fetch(
          'https://moneymind-ml-e5aeade0d0hdc9e3.canadacentral-01.azurewebsites.net/predict',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: 'user123',
              date_range: period,
            }),
          }
        );
        result = await response.json();
      } else {
        result = require('./sample.json');
      }
      if (!result || result.error) {
        setAnalytics(null);
      } else {
        setAnalytics(result);
      }
    } catch (err) {
      console.warn('AI fetch error:', err);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>AI Powered Insights</Text>
      <Text style={styles.screenSubtitle}>See your financial story unfold.</Text>

      <TouchableOpacity
        style={styles.periodSelector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.periodSelectorText}>
          {getPeriodLabel(selectedPeriod)} ▼
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Timeframe</Text>
            {PERIOD_OPTIONS.map((option, index) => (
              <Pressable
                key={index}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedPeriod(option.value);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{option.label}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setModalVisible(false)} style={styles.modalCancel}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size='large' color='#999' />
          <Text>Loading analytics for {getPeriodLabel(selectedPeriod)}...</Text>
        </View>
      )}

      {!loading && !analytics && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No data found for {getPeriodLabel(selectedPeriod)}.
          </Text>
          <Text style={styles.emptyTextSub}>
            Try selecting a different period or adding transactions.
          </Text>
        </View>
      )}

      {!loading && analytics && (
        <>
          <View style={styles.cardRow}>
            <View style={[styles.card, { backgroundColor: '#4da6ff' }]}>
              <Text style={styles.cardTitle}>Total Expenses</Text>
              <Text style={styles.cardValue}>${analytics.total_expenses ?? 0}</Text>
            </View>
            <View style={[styles.card, { backgroundColor: '#7367f0' }]}>
              <Text style={styles.cardTitle}>Exceeded Budget</Text>
              <Text style={styles.cardValue}>{analytics.exceeded_budget ?? 0} times</Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={[styles.card, { backgroundColor: '#54cfa0' }]}>
              <Text style={styles.cardTitle}>Savings</Text>
              <Text style={styles.cardValue}>${analytics.savings?.amount ?? 0}</Text>
              <Text style={styles.cardSubValue}>{analytics.savings?.percentage ?? ''} vs. last mo.</Text>
            </View>
            <View style={[styles.card, { backgroundColor: '#00cfe8' }]}>
              <Text style={styles.cardTitle}>Budget Utilization</Text>
              <Text style={styles.cardValue}>{analytics.budget_utilization?.percentage ?? '0%'}</Text>
              <Text style={styles.cardSubValue}>{analytics.budget_utilization?.change ?? ''}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Suggested Savings Categories</Text>




          <View style={styles.suggestionCard}>
            <View style={styles.suggestionLeft}>
              <Text style={styles.suggestionTitle}>Potential Savings</Text>
              <View style={styles.iconRow}>
                <Text style={styles.suggestionSubtitle}>{analytics.potential_savings.category}</Text>
              </View>
            </View>
            <Text style={styles.suggestionValue}>${analytics.potential_savings.saved_amount}</Text>
          </View>

          <View style={styles.suggestionCard}>
            <View style={styles.suggestionLeft}>
              <Text style={styles.suggestionTitle}>Constant Spending</Text>
              <View style={styles.iconRow}>
                <Text style={styles.suggestionSubtitle}>{analytics.constant_spending.category}</Text>
              </View>
            </View>
            <Text style={styles.suggestionValue}>${analytics.constant_spending.amount}</Text>
          </View>
          {/* 🔽 Insert Pie Chart Here */}
          <View style={styles.pieContainer}>
            <Svg height="200" width="200" viewBox="0 0 200 200">
              <G rotation="-90" origin="100, 100">
                {(() => {
                  const colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087'];
                  const values = Object.values(analytics.categories);
                  const total = values.reduce((a, b) => a + b, 0);
                  const r = 70;
                  const strokeWidth = 35;
                  const circumference = 2 * Math.PI * r;

                  let cumulativeAngle = 0;

                  return values.map((val, index) => {
                    const percentage = val / total;
                    const dashLength = percentage * circumference;
                    const dashGap = circumference - dashLength;
                    const strokeDasharray = `${dashLength} ${dashGap}`;
                    const strokeDashoffset = -cumulativeAngle * circumference;

                    cumulativeAngle += percentage;

                    return (
                      <Circle
                        key={index}
                        cx="100"
                        cy="100"
                        r={r}
                        stroke={colors[index % colors.length]}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="butt"
                        fill="none"
                      />
                    );
                  });
                })()}
              </G>

              {/* Center Text */}
              <SvgText
                x="80"
                y="95"
                fontSize="16"
                fontWeight="600"
                fill="#444"
              >
                $
              </SvgText>

              {/* Amount (slightly right to center-align) */}
              <SvgText
                x="90"
                y="95"
                fontSize="18"
                fontWeight="bold"
                fill="#333"
              >
                {Object.values(analytics.categories).reduce((a, b) => a + b, 0)}
                </SvgText>
              <SvgText
                x="100"
                y="115"
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                Spending
              </SvgText>
            </Svg>

            {/* Legend */}
            <View style={styles.pieLabels}>
              {Object.entries(analytics.categories).map(([label, value], i) => (
                <View key={i} style={styles.pieLabelRow}>
                  <View
                    style={[
                      styles.pieColorDot,
                      { backgroundColor: ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087'][i % 5] },
                    ]}
                  />
                  <Text style={styles.pieLabelText}>{label}</Text>
                  <Text style={styles.pieAmountText}>${value.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={styles.sectionTitle}>AI Analytics</Text>

          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsTitle}>Expense Trend</Text>
            <Text style={styles.analyticsValue}>
              {analytics.expense_trend ?? '—'}
            </Text>
          </View>

          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsTitle}>Spending Trend</Text>
            <Text style={styles.analyticsValue}>
              {analytics.spending_trend ?? '—'}
            </Text>
          </View>

          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsTitle}>Future Risk</Text>
            <Text style={styles.analyticsValue}>
              {analytics.future_risk_prediction ?? '—'}
            </Text>
          </View>

          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsTitle}>Predicted Next Month’s Expenses</Text>
            <Text style={styles.analyticsValue}>
              ${analytics.predicted_future_expenses?.toLocaleString() ?? '—'}
            </Text>
          </View>

          <View style={styles.analyticsCard}>
            <Text style={styles.analyticsTitle}>Predicted Savings Next Month</Text>
            <Text style={styles.analyticsValue}>
              ${analytics.predicted_savings_next_month?.toLocaleString() ?? '—'}
            </Text>
          </View>




        </>
      )}

    </ScrollView>
  );
};

export default AIAnalyticsDetailedScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  screenSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  periodSelector: {
    alignSelf: 'flex-end',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 20,
  },
  periodSelectorText: {
    fontSize: 14,
    color: '#333',
  },
  loadingOverlay: {
    marginBottom: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  emptyTextSub: {
    fontSize: 14,
    color: '#999',
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    padding: 16,
  },
  cardTitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubValue: {
    fontSize: 13,
    color: '#f7f7f7',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  modalOption: {
    paddingVertical: 12,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#007aff',
  },
  modalCancel: {
    marginTop: 10,
    paddingVertical: 12,
  },
  modalCancelText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
    color: '#333',
  },
  suggestionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f6f8',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  suggestionLeft: {
    flexDirection: 'column',
  },
  suggestionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  suggestionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  suggestionValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#005ea2',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pieContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },

  pieLabels: {
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 20,
  },

  pieLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  pieColorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },

  pieLabelText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },

  pieAmountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 12,
    paddingHorizontal: 16,
    color: '#222',
  },

analyticsCard: {
  backgroundColor: '#f9f9f9',
  borderRadius: 8,
  borderWidth: 1.5,
  borderColor: '#ccc',
  paddingVertical: 14,
  paddingHorizontal: 18,
  marginHorizontal: 10,
  marginBottom: 12,
},
  analyticsTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },

  analyticsValue: {
    fontSize: 15,
    color: '#111',
  },



});