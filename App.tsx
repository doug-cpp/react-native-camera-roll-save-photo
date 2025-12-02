import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  useColorScheme,
  StatusBar,
  Button,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Cam from './CameraComponent';


function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const [showCamera, setShowCamera] = useState(false); // camera inicia fechada

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={{ color: textColor, fontSize: 24 }}>Android POC</Text>
      <Text style={{ color: textColor, fontSize: 16, marginBottom: 20 }}>
        Tirar foto usando a câmera do dispositivo
      </Text>
      {showCamera ? (
        <Cam onClose={() => setShowCamera(false)} />
      ) : (
        <Button title="Abrir Câmera" onPress={() => setShowCamera(true)} />
      )}
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
