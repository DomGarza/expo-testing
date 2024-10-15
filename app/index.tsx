import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '../constants/Theme';
import { useRouter, router} from 'expo-router';


export default function HomeScreen() {



const camRecordNav = () => {
  router.push({
    pathname: '/camRecord',
  });
};

  const router = useRouter();

  return (
    <View style={{height: Screen.h, width: Screen.w, alignItems: 'center' }}>
      <Text onPress={camRecordNav}style={{fontSize: Screen.h * .025, fontWeight: '700', top: Screen.h * .1}}>Camera Recording Test</Text>
      </View>
  );
}

const styles = StyleSheet.create({

});
