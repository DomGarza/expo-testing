import { StyleSheet, View, Text } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions, VideoQuality, CameraMode } from 'expo-camera';
import { Screen } from '../constants/Theme';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation, useRouter  } from 'expo-router';

const CamRecord = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null); 
  const router = useRouter()
  const navigation = useNavigation();
  const [facing, setFacing] = useState('back');
  const [videoQuality, setVideoQuality] = useState('1080p')
  const [CameraMode, setCameraMode] = useState('picture');


  useEffect(() => {
    const timer = setTimeout(() => {
      setCameraMode('video');
    }, 100);

    return () => clearTimeout(timer); 
  }, []);

  const redo = () => {
    setVideoUri(null);
    setCameraMode('picture');
  };

  if (cameraPermission === null) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <Text onPress={requestPermission} style={styles.permissionButton}>Grant Permission</Text>
      </View>
    );
  }


  const startRecording = async () => {
    if (cameraRef.current) {
      console.log('Start recording');

      setIsRecording(true);
  
      try {
        const video = await cameraRef.current.recordAsync({
        });

        console.log('Recording complete:', video.uri);
        setVideoUri(video.uri);
      } catch (error) {
        console.error('Error recording video:', error);
      } finally {
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      console.log('Stop recording');
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };



  return (
    <View style={{ flex: 1 }}>

      {!videoUri && (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1, zIndex: 1 }}
          facing={facing}
          mode={CameraMode}
          videoQuality={videoQuality}
        >
          <Text 
            onPress={isRecording ? stopRecording : startRecording} 
            style={{ fontSize: Screen.h * 0.07, alignSelf: 'center', marginTop: Screen.h * .2, color: 'white', fontWeight: '900' }}
            >
            {isRecording ? 'Stop Recording' : 'Record Video'}
          </Text>
          <Text 
            onPress={navigation.goBack} 
            style={{ fontSize: Screen.h * 0.07, alignSelf: 'center', marginTop: Screen.h * .2, color: 'white', fontWeight: '900' }}
            >
              Go Back
          </Text>
        </CameraView>
      )}

      {videoUri && (
        <Video
          source={{ uri: videoUri }}
          style={{ flex: 1, position: 'absolute', zIndex: 0, height: Screen.h, width: Screen.w }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          isLooping
        />
      )}

      {videoUri && (
        <Text 
          onPress={redo} 
          style={{ fontSize: Screen.h * 0.07, alignSelf: 'center', marginTop: Screen.h * .2, color: 'white', fontWeight: '900' }}
        >
          Record Again
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  permissionButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default CamRecord;
