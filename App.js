import React, { useEffect } from 'react';
import { Alert,SafeAreaView,TouchableOpacity,Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
const  App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(async() => {
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  });

    


  const getNotifications = async () => {
    
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Hello',
      body: 'This is my first notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      }
    })
    
  }
  return(
    <>
    <SafeAreaView style={{flex:1,backgroundColor:"white",}}>
      <TouchableOpacity 
      onPress={getNotifications}
      style={{flex:1,justifyContent:"center",alignSelf:"center"}}>
        <Text>Press Me for notification</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </>
  )
  
}


export default App