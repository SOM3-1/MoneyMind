import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, SafeAreaView, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const HomeContinueScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        {/* Replace with your actual illustration component */}
        <View style={styles.illustration}>
          {/* This would be your SVG or image component */}
        </View>
      </View>

      {/* Header Text */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          AI Personal Finance Manager uses <Text style={styles.boldText}>Plaid</Text>
        </Text>
        <Text style={styles.subHeaderText}>
          to connect your account
        </Text>
      </View>

      {/* Benefits Card */}
      <View style={styles.benefitsCard}>
        {/* Connect in seconds */}
        <View style={styles.benefitRow}>
          <View style={styles.benefitIcon}>
            <Text style={styles.iconText}>⚡</Text>
          </View>
          <View style={styles.benefitTextContainer}>
            <Text style={styles.benefitTitle}>Connect in seconds</Text>
            <Text style={styles.benefitDescription}>
              8000+ apps trust Plaid to quickly connect to financial institutions
            </Text>
          </View>
        </View>

        {/* Keep your data safe */}
        <View style={styles.benefitRow}>
          <View style={styles.benefitIcon}>
            <Text style={styles.iconText}>🛡️</Text>
          </View>
          <View style={styles.benefitTextContainer}>
            <Text style={styles.benefitTitle}>Keep your data safe</Text>
            <Text style={styles.benefitDescription}>
              Plaid uses best-in-class encryption to help protect your data
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to Plaid's{' '}
          <Text 
            style={styles.linkText}
            onPress={() => Linking.openURL('https://plaid.com/privacy-policy')}
          >
            Privacy Policy
          </Text>
          {' '}and to receiving updates on plaid.com
        </Text>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('HomeCardName')}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  illustration: {
    width: 200,
    height: 120,
    // This would be your illustration
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  boldText: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  benefitsCard: {
    backgroundColor: '#F5F7F9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  benefitRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 18,
  },
  benefitTextContainer: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#333',
    marginBottom: 5,
  },
  benefitDescription: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  linkText: {
    color: '#666',
    textDecorationLine: 'underline',
  },
  continueButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  }
});