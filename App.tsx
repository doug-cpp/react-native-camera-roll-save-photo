import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, useColorScheme, StatusBar, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice, useCameraPermission, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera';


 function Cam() {
  const devices = useCameraDevices();
  const device = useCameraDevice('back');

  const [permission, setPermission] = useState<CameraPermissionStatus>('not-determined');

  useEffect(() => {
    async function getPermission() {
      const status = await Camera.requestCameraPermission();
      setPermission(status);
    }
    getPermission();
  }, []);

  if (permission !== 'granted') {
    return (
      <>
        <Text>Sem permissão para câmera</Text>
        <Button title="Pedir permissão" onPress={async () => {
          const status = await Camera.requestCameraPermission();
          setPermission(status);
        }} />
      </>
    );
  }

  if (device == null) return <Text>Nenhum dispositivo de câmera encontrado</Text>;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  );
}


// function Cam() {
//   const device = useCameraDevice('back')
//   const { hasPermission } = useCameraPermission()

//   if (!hasPermission) return <Text>No camera permission</Text>
//   if (device == null) return <Text>No camera device</Text>
//   return (
//     <Camera
//       style={StyleSheet.absoluteFill}
//       device={device}
//       isActive={true}
//     />
//   )
// }


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
      <Cam />
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