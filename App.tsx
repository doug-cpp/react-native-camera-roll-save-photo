import React from 'react';
import { Text, StyleSheet, useColorScheme, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={{ color: textColor, fontSize: 24 }}>
        Android POC Base Template
      </Text>
      <Text style={{ color: textColor, fontSize: 16 }}>
        Let's implement our functionality here
      </Text>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});