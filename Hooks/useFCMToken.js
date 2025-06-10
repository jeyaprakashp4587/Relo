import {useEffect, useCallback} from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {Api} from '../Api/Api';
import {useData} from '../Context/Contexter';

const useFCMToken = () => {
  const {user} = useData();

  // Save FCM token
  const getTokenAndSave = useCallback(async () => {
    try {
      if (user?.FcmToken) {
        return;
      }
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        const token = await messaging().getToken();
        console.log(token);

        // Save token to the backend
        await axios.post(`${Api}/Profile/saveFcmToken`, {
          userId: user?._id,
          FcmToken: token,
        });
      }
    } catch (error) {
      // console.error('Error getting FCM token:', error);
    }
  }, [user]);

  // Setup foreground notification listener
  const setupForegroundListener = useCallback(() => {
    return messaging().onMessage(async remoteMessage => {});
  }, []);

  useEffect(() => {
    const checkPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    };

    checkPermission();
    getTokenAndSave();

    const unsubscribeOnMessage = setupForegroundListener();

    return () => {
      unsubscribeOnMessage();
    };
  }, [getTokenAndSave, setupForegroundListener]);
};

export default useFCMToken;
