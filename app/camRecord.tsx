import { StyleSheet, View, Text, Button } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions, VideoQuality, CameraMode, FlashMode } from 'expo-camera';
import { Screen } from '../constants/Theme';
import { useNavigation, useRouter  } from 'expo-router';
import { useVideoPlayer, VideoView, createVideoPlayer } from 'expo-video';



const CamRecord = () => {
  const router = useRouter()
  const navigation = useNavigation();

  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);

  const [cameraPermission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(); 
  const [flashOn, setFlashOn] = useState<FlashMode>('off');
  const [facing, setFacing] = useState<CameraType>('back');
  const [videoQuality, setVideoQuality] = useState<VideoQuality>('1080p')
  const [CameraMode, setCameraMode] = useState<CameraMode>('video');

  



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


  const redo = () => {
    setVideoUri(null);
  };


  const videoSource =
  videoUri;


  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = false;
  });



 useEffect (() => {
     player.play();
 },[videoUri] );


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
          style={{
            fontSize: Screen.h * 0.07,
            alignSelf: 'center',
            marginTop: Screen.h * 0.2,
            color: 'white',
            fontWeight: '900',
          }}
        >
          {isRecording ? 'Stop Recording' : 'Record Video'}
        </Text>

        <Text
          onPress={navigation.goBack}
          style={{
            fontSize: Screen.h * 0.07,
            alignSelf: 'center',
            marginTop: Screen.h * 0.2,
            color: 'white',
            fontWeight: '900',
          }}
        >
          Go Back
        </Text>
      </CameraView>
    )}

    {videoUri && (
      <View style={styles.contentContainer}>
        <VideoView
          style={styles.video}
          player={player}
          nativeControls={false}
        />
      </View>
    )}

    {videoUri && (
      <Text
        onPress={redo}
        style={{
          fontSize: Screen.h * 0.07,
          alignSelf: 'center',
          marginTop: Screen.h * 0.2,
          color: 'white',
          fontWeight: '900',
        }}
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
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});



export default CamRecord;
