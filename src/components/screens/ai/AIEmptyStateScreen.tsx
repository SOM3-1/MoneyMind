// MoneyMind/src/components/screens/ai/AIEmptyStateScreen.tsx
//
// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
//
// export const AIEmptyStateScreen: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>AI Powered Insights</Text>
//       <Text style={styles.subtitle}>See your financial story unfold.</Text>
//
//       {/* Use your GIF here: */}
//       <Image
//         source={require('../../../assets/gif/insights.gif')}
//         style={styles.image}
//         resizeMode="contain"
//       />
//
//       <Text style={styles.hintText}>
//         Your financial insights will appear here once you start tracking expenses!
//       </Text>
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9F9',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 32,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginBottom: 24,
//   },
//   hintText: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 8,
//   },
// });
//
// export default AIEmptyStateScreen;
//
// AIEmptyStateScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AIEmptyStateScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Powered Insights</Text>
      <Text style={styles.subtitle}>See your financial story unfold.</Text>
      {/* Use your local GIF here */}
      <Image
        source={require('../../../assets/gif/insights.gif')}
        style={styles.gif}
        resizeMode='contain'
      />
      <Text style={styles.hintText}>
        Your financial insights will appear here once you have budget data!
      </Text>
    </View>
  );
};

export default AIEmptyStateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  hintText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
});
