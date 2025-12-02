import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  TouchableOpacity
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  CameraPermissionStatus,
} from 'react-native-vision-camera';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

function Cam({ onClose }: { onClose: () => void }) {
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
  const [permission, setPermission] = useState<CameraPermissionStatus>('not-determined');
  const [isActive, setIsActive] = useState(true);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto();
        console.log('Foto capturada:', photo.path);
        
        // Salva na galeria
        await CameraRoll.saveAsset(`file://${photo.path}`, { type: 'photo' });
        Alert.alert('Sucesso!', 'Foto salva na galeria!');
      } catch (error) {
        console.error('Erro ao tirar foto:', error);
        Alert.alert('Erro', 'Falha ao salvar a foto.');
      }
    }
  };

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
        <Button
          title="Pedir permissão para acessar câmera"
          onPress={async () => {
            const status = await Camera.requestCameraPermission();
            setPermission(status);
          }}
        />
      </>
    );
  }

  if (device == null) return <Text>Nenhum dispositivo de câmera encontrado</Text>;

  return isActive ? (
    <>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
      />
      <View style={styles.overlayContainer}>
        <Text style={styles.overlayText}>Pressione o botão para tirar foto{'\n'}e salvar na galeria</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={takePhoto} style={styles.photoButton} />
          <View style={styles.closeButtonContainer}>
          <Button
            title="Fechar"
            onPress={() => {
              setIsActive(false);
              onClose();
            }}
          />
          </View>
        </View>
      </View>
    </>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  photoButton: {
    backgroundColor: 'whitesmoke',
    paddingBottom: 12,
    borderRadius: 50,
    borderColor: 'grey',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  closeButtonContainer: {
    padding: 10,
    borderRadius: 5,
  },
});

export default Cam;
