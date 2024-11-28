import react, {useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../constants/Theme';
import { useRouter, router} from 'expo-router';


export default function HomeScreen() {

  const [example, setExample] = useState(true);

  useEffect(() => {
    setExample(false);
  }, []); 

useEffect(() => {
}, [] );

const camRecordNav = () => {
  router.push({
    pathname: '/CamRecord',
  });
};

  const router = useRouter();

  return (
    <View style={{height: Screen.h, width: Screen.w, alignItems: 'center' }}>
      <Text onPress={camRecordNav}style={{fontSize: Screen.h * .035, width: Screen.w * .8, textAlign: 'center', fontWeight: '700', top: Screen.h * .1}}>Video Recording & Playback</Text>
      <Text style={{fontSize: Screen.h * .0225, fontWeight: '200', top: Screen.h * .12, textDecorationLine: 'underline'}}>expo-camera</Text>
      <Text style={{fontSize: Screen.h * .0225, fontWeight: '200', top: Screen.h * .125,  textDecorationLine: 'underline'}}>expo-video</Text>
      {/* <Text style={{fontSize: Screen.h * .02, fontWeight: '700', top: Screen.h * .17}}>Full Code</Text>
      <Text style={{fontSize: Screen.h * .02, fontWeight: '700', top: Screen.h * .22}}>Community</Text> */}


      </View>
  );
}

const styles = StyleSheet.create({

});
